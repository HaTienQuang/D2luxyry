#!/usr/bin/env python3
"""Remove legacy watermarks and add the D2 logo without changing source files."""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageOps


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
DEFAULT_SOURCE = Path("public")
DEFAULT_OUTPUT = Path("watermark-output")
DEFAULT_LOGO = Path("public/logo.jpg")


@dataclass
class Result:
    source: str
    output: str | None
    status: str
    masked_pixels: int = 0
    message: str = ""


def parse_region(value: str) -> tuple[float, float, float, float]:
    try:
        region = tuple(float(part.strip()) for part in value.split(","))
    except ValueError as exc:
        raise argparse.ArgumentTypeError("region must contain four numbers: x,y,width,height") from exc
    if len(region) != 4 or any(number < 0 or number > 1 for number in region):
        raise argparse.ArgumentTypeError("region values must be between 0 and 1")
    x, y, width, height = region
    if width == 0 or height == 0 or x + width > 1 or y + height > 1:
        raise argparse.ArgumentTypeError("region must have a positive size and fit inside the image")
    return region


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Remove old logos/watermarks, add a new logo, and write to a separate folder."
    )
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE, help="Source image folder")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="New output folder")
    parser.add_argument("--logo", type=Path, default=DEFAULT_LOGO, help="Replacement logo")
    parser.add_argument(
        "--region",
        action="append",
        type=parse_region,
        default=[],
        metavar="X,Y,W,H",
        help="Always remove a normalized region; may be repeated (example: 0,0,0.18,0.12)",
    )
    parser.add_argument("--limit", type=int, default=0, help="Process only the first N images")
    parser.add_argument("--workers", type=int, default=max(1, min(4, os.cpu_count() or 1)))
    parser.add_argument("--logo-width", type=float, default=0.18, help="Logo width relative to image width")
    parser.add_argument("--logo-position", choices=("top-left", "top-right", "bottom-left", "bottom-right"), default="top-right")
    parser.add_argument(
        "--detect-text",
        action="store_true",
        help="Also detect faint text bands; review results because complex architecture can cause false positives",
    )
    parser.add_argument("--no-logo", action="store_true", help="Only remove watermarks")
    parser.add_argument("--copy-clean", action="store_true", help="Also copy images where no watermark was found")
    parser.add_argument("--dry-run", action="store_true", help="Scan only; do not write images")
    parser.add_argument("--debug-masks", action="store_true", help="Save removal masks under output/_masks")
    parser.add_argument("--overwrite", action="store_true", help="Replace files already present in output")
    return parser


def validate_paths(source: Path, output: Path, logo: Path) -> None:
    if not source.is_dir():
        raise ValueError(f"Source folder does not exist: {source}")
    if not logo.is_file():
        raise ValueError(f"Logo does not exist: {logo}")
    source_resolved = source.resolve()
    output_resolved = output.resolve()
    if source_resolved == output_resolved:
        raise ValueError("Output must be different from source")
    if source_resolved in output_resolved.parents:
        raise ValueError("Output cannot be inside source; this prevents recursive reprocessing")


def load_image(path: Path) -> tuple[np.ndarray, str]:
    with Image.open(path) as image:
        image.seek(0)
        image = ImageOps.exif_transpose(image).convert("RGB")
        return cv2.cvtColor(np.asarray(image), cv2.COLOR_RGB2BGR), image.format or path.suffix[1:].upper()


def normalized_box(shape: tuple[int, ...], region: tuple[float, float, float, float]) -> tuple[int, int, int, int]:
    height, width = shape[:2]
    x, y, region_width, region_height = region
    return (
        round(x * width),
        round(y * height),
        round((x + region_width) * width),
        round((y + region_height) * height),
    )


def candidate_pixels(image: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hue, saturation, value = cv2.split(hsv)

    red = (((hue <= 12) | (hue >= 168)) & (saturation >= 105) & (value >= 100))
    blue = ((hue >= 90) & (hue <= 140) & (saturation >= 80) & (value >= 75))

    # Small bright strokes relative to their surroundings are typical of white text watermarks.
    kernel_size = max(9, (min(image.shape[:2]) // 45) | 1)
    top_hat = cv2.morphologyEx(
        gray,
        cv2.MORPH_TOPHAT,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size)),
    )
    white_strokes = (value >= 150) & (saturation <= 90) & (top_hat >= 12)
    return (
        red.astype(np.uint8) * 255,
        blue.astype(np.uint8) * 255,
        white_strokes.astype(np.uint8) * 255,
    )


def grouped_text_mask(
    strokes: np.ndarray,
    minimum_width: float,
    maximum_height: float,
    minimum_strokes: int,
    join_ratio: float,
) -> np.ndarray:
    """Keep only horizontal groups of many small strokes, not isolated bright details."""
    height, width = strokes.shape
    join_width = max(5, round(width * join_ratio)) | 1
    joined = cv2.morphologyEx(
        strokes,
        cv2.MORPH_CLOSE,
        cv2.getStructuringElement(cv2.MORPH_RECT, (join_width, 3)),
        iterations=2,
    )
    stroke_count, stroke_labels, stroke_stats, _ = cv2.connectedComponentsWithStats(strokes, 8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(joined, 8)
    output = np.zeros_like(strokes)
    for label in range(1, count):
        x, y, component_width, component_height, _ = stats[label]
        if component_width < width * minimum_width or component_height > height * maximum_height:
            continue
        if component_width / max(component_height, 1) < 2.2:
            continue
        component = labels == label
        component_strokes = np.unique(stroke_labels[component & (strokes > 0)])
        component_strokes = component_strokes[component_strokes != 0]
        meaningful_strokes = sum(stroke_stats[index, cv2.CC_STAT_AREA] >= 2 for index in component_strokes)
        fill_ratio = np.count_nonzero(component & (strokes > 0)) / max(1, component_width * component_height)
        if meaningful_strokes < minimum_strokes or not 0.015 <= fill_ratio <= 0.55:
            continue
        output[component & (strokes > 0)] = 255
    return output


def aligned_character_mask(strokes: np.ndarray, minimum_span: float, minimum_characters: int) -> np.ndarray:
    """Find widely spaced watermark characters sharing the same baseline."""
    height, width = strokes.shape
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(strokes, 8)
    characters: list[int] = []
    for label in range(1, count):
        _, _, character_width, character_height, area = stats[label]
        if (
            height * 0.035 <= character_height <= height * 0.55
            and 2 <= character_width <= width * 0.06
            and area >= 8
            and character_width / max(character_height, 1) <= 2.2
        ):
            characters.append(label)

    output = np.zeros_like(strokes)
    for anchor in characters:
        anchor_y = centroids[anchor][1]
        anchor_height = stats[anchor, cv2.CC_STAT_HEIGHT]
        line = [
            label for label in characters
            if abs(centroids[label][1] - anchor_y) <= max(4, anchor_height * 0.45)
        ]
        if len(line) < minimum_characters:
            continue
        left = min(stats[label, cv2.CC_STAT_LEFT] for label in line)
        right = max(stats[label, cv2.CC_STAT_LEFT] + stats[label, cv2.CC_STAT_WIDTH] for label in line)
        if right - left < width * minimum_span:
            continue
        line_top = min(stats[label, cv2.CC_STAT_TOP] for label in line)
        line_bottom = max(stats[label, cv2.CC_STAT_TOP] + stats[label, cv2.CC_STAT_HEIGHT] for label in line)
        line_height = line_bottom - line_top
        for label in characters:
            character_y = centroids[label][1]
            character_x = centroids[label][0]
            if (
                line_top - line_height * 0.35 <= character_y <= line_bottom + line_height * 0.35
                and left - width * 0.03 <= character_x <= right + width * 0.03
            ):
                output[labels == label] = 255
    return output


def find_watermark_mask(
    image: np.ndarray,
    forced_regions: list[tuple[float, float, float, float]],
    detect_text: bool,
) -> np.ndarray:
    height, width = image.shape[:2]
    red, blue, white = candidate_pixels(image)
    mask = np.zeros((height, width), dtype=np.uint8)
    corner_regions = [
        ("corner", (0.0, 0.0, 0.25, 0.16)),
        ("corner", (0.75, 0.0, 0.25, 0.16)),
        ("corner", (0.0, 0.84, 0.25, 0.16)),
        ("corner", (0.75, 0.84, 0.25, 0.16)),
    ]
    colored_bottom_logo = False

    for corner_index, (name, region) in enumerate(corner_regions):
        x1, y1, x2, y2 = normalized_box(image.shape, region)
        red_roi = red[y1:y2, x1:x2]
        blue_roi = blue[y1:y2, x1:x2]
        white_roi = white[y1:y2, x1:x2]

        if name == "corner":
            red_count = np.count_nonzero(red_roi)
            blue_count = np.count_nonzero(blue_roi)
            if red_count >= red_roi.size * 0.001 and blue_count >= blue_roi.size * 0.0005:
                colored_roi = red_roi | blue_roi
                points = cv2.findNonZero(colored_roi)
                color_x, color_y, color_width, color_height = cv2.boundingRect(points)
                # Colored legacy marks use red/blue across the complete logo. Filling their compact
                # bounding box removes anti-aliased edges and nearby dark text in one pass.
                if color_width < colored_roi.shape[1] * 0.92 and color_height < colored_roi.shape[0] * 0.85:
                    pad = max(3, round(min(height, width) * 0.004))
                    cv2.rectangle(
                        mask[y1:y2, x1:x2],
                        (max(0, color_x - pad), max(0, color_y - pad)),
                        (min(colored_roi.shape[1] - 1, color_x + color_width + pad), min(colored_roi.shape[0] - 1, color_y + color_height + pad)),
                        255,
                        -1,
                    )
                    if corner_index >= 2:
                        colored_bottom_logo = True
            # White corner logos must form a long horizontal word group.
            mask[y1:y2, x1:x2] |= grouped_text_mask(white_roi, 0.20, 0.65, 7, 0.035)

    # The legacy bottom-corner logo set consistently includes a large title and a smaller
    # year line across the center. Restricting this scan to that set avoids damaging clean images.
    if colored_bottom_logo or detect_text:
        text_regions = [
            ("middle", (0.04, 0.43, 0.92, 0.18)),
            ("year", (0.20, 0.54, 0.60, 0.13)),
        ]
        for name, region in text_regions:
            x1, y1, x2, y2 = normalized_box(image.shape, region)
            white_roi = white[y1:y2, x1:x2]
            minimum_width = 0.25 if name == "middle" else 0.12
            minimum_characters = 5 if name == "middle" else 4
            text_mask = aligned_character_mask(white_roi, minimum_width, minimum_characters)
            text_mask |= grouped_text_mask(
                white_roi,
                minimum_width,
                0.75,
                minimum_characters,
                0.055,
            )
            mask[y1:y2, x1:x2] |= text_mask

    for region in forced_regions:
        x1, y1, x2, y2 = normalized_box(image.shape, region)
        mask[y1:y2, x1:x2] = 255

    dilation = max(3, round(min(height, width) * 0.004)) | 1
    return cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilation, dilation)), iterations=1)


def prepare_logo(path: Path) -> Image.Image:
    logo = Image.open(path).convert("RGBA")
    pixels = np.asarray(logo).copy()
    rgb = pixels[:, :, :3]
    # logo.jpg has a white background. Make near-white pixels transparent for a clean overlay.
    whiteness = rgb.min(axis=2)
    alpha = np.clip((225 - whiteness) * 17, 0, 255).astype(np.uint8)
    pixels[:, :, 3] = np.minimum(pixels[:, :, 3], alpha)
    return Image.fromarray(pixels, "RGBA")


def add_logo(image: np.ndarray, logo: Image.Image, relative_width: float, position: str) -> np.ndarray:
    height, width = image.shape[:2]
    target_width = max(80, round(width * relative_width))
    target_width = min(target_width, round(width * 0.45))
    target_height = max(1, round(logo.height * target_width / logo.width))
    resized = logo.resize((target_width, target_height), Image.Resampling.LANCZOS)
    margin = max(8, round(min(width, height) * 0.025))
    x = margin if position.endswith("left") else width - target_width - margin
    y = margin if position.startswith("top") else height - target_height - margin
    base = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).convert("RGBA")
    base.alpha_composite(resized, (max(0, x), max(0, y)))
    return cv2.cvtColor(np.asarray(base.convert("RGB")), cv2.COLOR_RGB2BGR)


def save_image(path: Path, image: np.ndarray, source_format: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    output = Image.fromarray(rgb)
    suffix = path.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        output.save(path, "JPEG", quality=94, optimize=True, subsampling=0)
    elif suffix == ".png":
        output.save(path, "PNG", optimize=True)
    elif suffix == ".webp":
        output.save(path, "WEBP", quality=94, method=5)
    elif suffix == ".gif":
        output.save(path, "GIF")
    else:
        output.save(path, source_format)


def process_image(
    source_path: Path,
    destination: Path,
    source_root: Path,
    logo: Image.Image,
    args: argparse.Namespace,
) -> Result:
    relative = source_path.relative_to(source_root)
    result = Result(str(relative), None, "skipped")
    try:
        if destination.exists() and not args.overwrite:
            result.message = "output already exists"
            return result
        image, source_format = load_image(source_path)
        mask = find_watermark_mask(image, args.region, args.detect_text)
        result.masked_pixels = int(np.count_nonzero(mask))

        if result.masked_pixels:
            radius = max(2, round(min(image.shape[:2]) * 0.004))
            image = cv2.inpaint(image, mask, radius, cv2.INPAINT_TELEA)
        elif not args.copy_clean and args.no_logo:
            result.message = "no watermark detected"
            return result

        if not args.no_logo:
            image = add_logo(image, logo, args.logo_width, args.logo_position)

        result.output = str(destination)
        result.status = "would-process" if args.dry_run else "processed"
        if not args.dry_run:
            save_image(destination, image, source_format)
            if args.debug_masks and result.masked_pixels:
                mask_path = args.output / "_masks" / relative.with_suffix(".png")
                mask_path.parent.mkdir(parents=True, exist_ok=True)
                cv2.imwrite(str(mask_path), mask)
        return result
    except Exception as exc:  # Continue processing the rest of a large batch.
        result.status = "error"
        result.message = str(exc)
        return result


def main() -> int:
    args = build_parser().parse_args()
    try:
        validate_paths(args.source, args.output, args.logo)
        if not 0.05 <= args.logo_width <= 0.45:
            raise ValueError("--logo-width must be between 0.05 and 0.45")
        if args.limit < 0 or args.workers < 1:
            raise ValueError("--limit cannot be negative and --workers must be positive")
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 2

    source = args.source.resolve()
    args.output = args.output.resolve()
    logo_path = args.logo.resolve()
    excluded = {logo_path}
    files = sorted(
        path for path in source.rglob("*")
        if path.is_file()
        and path.suffix.lower() in IMAGE_EXTENSIONS
        and path.resolve() not in excluded
        and path.name.lower() not in {"logo.png", "logo-white.png", "logo-tight.png", "icon.png", "apple-icon.png", "zalo-qr.png", "zalo-qr-card.png"}
    )
    if args.limit:
        files = files[: args.limit]
    if not files:
        print("No supported images found.")
        return 0

    logo = prepare_logo(logo_path)
    started = time.time()
    results: list[Result] = []
    print(f"Scanning {len(files)} images with {args.workers} workers...")
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(process_image, path, args.output / path.relative_to(source), source, logo, args): path
            for path in files
        }
        for completed, future in enumerate(as_completed(futures), 1):
            result = future.result()
            results.append(result)
            if result.status == "error":
                print(f"[ERROR] {result.source}: {result.message}")
            elif completed % 25 == 0 or completed == len(files):
                print(f"Progress: {completed}/{len(files)}")

    results.sort(key=lambda item: item.source)
    counts = {status: sum(item.status == status for item in results) for status in {item.status for item in results}}
    manifest = {
        "source": str(source),
        "output": str(args.output),
        "logo": str(logo_path),
        "dry_run": args.dry_run,
        "duration_seconds": round(time.time() - started, 2),
        "counts": counts,
        "results": [asdict(result) for result in results],
    }
    if not args.dry_run:
        args.output.mkdir(parents=True, exist_ok=True)
        (args.output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(counts, ensure_ascii=False), f"in {manifest['duration_seconds']}s")
    if not args.dry_run:
        print(f"Output: {args.output}")
        print(f"Manifest: {args.output / 'manifest.json'}")
    return 1 if counts.get("error", 0) else 0


if __name__ == "__main__":
    raise SystemExit(main())
