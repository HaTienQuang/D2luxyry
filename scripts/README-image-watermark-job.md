# Image watermark replacement job

This job reads images from a source folder, removes recognized legacy marks, adds
`public/logo.jpg`, and writes a mirrored folder tree to a separate output folder.
It never overwrites the source folder.

## Requirements

- Python 3
- OpenCV (`cv2`)
- Pillow
- NumPy

## Safe default run

Preview the number of files first:

```powershell
npm run images:replace-watermarks -- --dry-run
```

Process all supported images from `public` into `watermark-output`:

```powershell
npm run images:replace-watermarks
```

The default mode automatically removes confidently detected red/blue corner
logos and places the new logo in the top-right corner. Existing source files are
not changed. Results and status details are recorded in
`watermark-output/manifest.json`.

## Review a small batch

```powershell
npm run images:replace-watermarks -- --limit 20 --debug-masks
```

Removal masks are written under `watermark-output/_masks`. Delete the output
folder or pass `--overwrite` before running those files again.

## Faint center or bottom text

Faint transparent text is ambiguous in architectural images. For a folder known
to contain that type of watermark, enable text detection and review its masks:

```powershell
npm run images:replace-watermarks -- --source public/projects/example --output watermark-output/example --detect-text --debug-masks
```

For consistent watermark positions, a normalized region is safer and more
complete. Values are `x,y,width,height`, each from `0` to `1`:

```powershell
npm run images:replace-watermarks -- --source public/projects/example --output watermark-output/example --region 0.08,0.46,0.84,0.08 --debug-masks
```

Repeat `--region` when an image set has multiple fixed marks. A forced region is
fully inpainted, so keep it as tight as possible.

## Useful options

```text
--logo-position top-left|top-right|bottom-left|bottom-right
--logo-width 0.18
--no-logo
--copy-clean
--workers 4
--overwrite
```

Run `python scripts/replace_image_watermarks.py --help` for all options.
