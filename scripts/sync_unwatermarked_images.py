import os
import sys
import shutil
from collections import defaultdict
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_SRC = r'D:\D2luxury\ảnh xóa logo'
BASE_PUB = r'D:\D2luxury\public'
BASE_ROOT = r'D:\D2luxury'

def convert_and_save(src_path, dst_path):
    ext = os.path.splitext(dst_path)[1].lower()
    src_ext = os.path.splitext(src_path)[1].lower()
    
    if ext == src_ext:
        shutil.copy2(src_path, dst_path)
        return

    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    with Image.open(src_path) as im:
        if ext in ('.jpg', '.jpeg'):
            if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                bg = Image.new('RGB', im.size, (255, 255, 255))
                if im.mode != 'RGBA':
                    im = im.convert('RGBA')
                bg.paste(im, mask=im.split()[3])
                bg.save(dst_path, format='JPEG', quality=95)
            else:
                if im.mode != 'RGB':
                    im = im.convert('RGB')
                im.save(dst_path, format='JPEG', quality=95)
        elif ext == '.webp':
            im.save(dst_path, format='WEBP', quality=95)
        elif ext == '.gif':
            rgb = im.convert('RGB')
            p_im = rgb.quantize(colors=256, method=Image.Resampling.LANCZOS)
            p_im.save(dst_path, format='GIF')
        elif ext == '.png':
            im.save(dst_path, format='PNG')
        else:
            shutil.copy2(src_path, dst_path)

def sync_category(src_subfolder, pub_target_folder, root_target_folder=None):
    print(f"\n==========================================")
    print(f"Syncing: {src_subfolder} -> public/{pub_target_folder}")
    print(f"==========================================")
    
    src_dir = os.path.join(BASE_SRC, src_subfolder)
    dst_pub_dir = os.path.join(BASE_PUB, pub_target_folder)
    dst_root_dir = os.path.join(BASE_ROOT, root_target_folder) if root_target_folder else None

    if not os.path.exists(src_dir):
        print(f"Error: {src_dir} not found!")
        return 0, 0

    copied_direct = 0
    overwritten_converted = 0

    for root, dirs, files in os.walk(src_dir):
        rel_dir = os.path.relpath(root, src_dir)
        target_pub_sub = os.path.join(dst_pub_dir, rel_dir) if rel_dir != '.' else dst_pub_dir
        target_root_sub = os.path.join(dst_root_dir, rel_dir) if (dst_root_dir and rel_dir != '.') else dst_root_dir

        os.makedirs(target_pub_sub, exist_ok=True)
        if target_root_sub:
            os.makedirs(target_root_sub, exist_ok=True)

        # Index existing files in destination before modifying
        existing_map = defaultdict(list)
        for ef in os.listdir(target_pub_sub):
            e_stem, e_ext = os.path.splitext(ef)
            existing_map[e_stem.lower()].append(ef)

        for f in files:
            src_file_path = os.path.join(root, f)
            stem, src_ext = os.path.splitext(f)

            # 1. Direct copy of clean file
            dst_file_pub = os.path.join(target_pub_sub, f)
            shutil.copy2(src_file_path, dst_file_pub)
            copied_direct += 1
            if target_root_sub:
                shutil.copy2(src_file_path, os.path.join(target_root_sub, f))

            # 2. Check if destination had alternate extension files for this stem
            if stem.lower() in existing_map:
                for alt_f in existing_map[stem.lower()]:
                    if alt_f.lower() != f.lower():
                        existing_dst = os.path.join(target_pub_sub, alt_f)
                        try:
                            convert_and_save(src_file_path, existing_dst)
                            overwritten_converted += 1
                            if target_root_sub:
                                root_existing_dst = os.path.join(target_root_sub, alt_f)
                                convert_and_save(src_file_path, root_existing_dst)
                        except Exception as err:
                            print(f"Warning converting {existing_dst}: {err}")

    print(f"Done {src_subfolder}: copied {copied_direct} direct, converted {overwritten_converted} alternate extensions.")
    return copied_direct, overwritten_converted

def main():
    total_copied = 0
    total_converted = 0

    # 1. Hero Banners
    c1, o1 = sync_category('02_Hero_Banners', 'hero', 'hero')
    total_copied += c1
    total_converted += o1

    # 2. About Company
    c2, o2 = sync_category('03_About_Company', 'about', 'about')
    total_copied += c2
    total_converted += o2

    # 3. Services
    c3, o3 = sync_category('04_Services', 'services', 'services')
    total_copied += c3
    total_converted += o3

    # 4. Consultation & 3D
    print(f"\n==========================================")
    print(f"Syncing: 06_Consultation_3D")
    print(f"==========================================")
    src_c = os.path.join(BASE_SRC, '06_Consultation_3D')
    for f in os.listdir(src_c):
        fp = os.path.join(src_c, f)
        if 'consultation' in f.lower():
            pub_cons = os.path.join(BASE_PUB, 'consultation')
            os.makedirs(pub_cons, exist_ok=True)
            shutil.copy2(fp, os.path.join(pub_cons, f))
            total_copied += 1
            convert_and_save(fp, os.path.join(pub_cons, 'consultation-interior.webp'))
            total_converted += 1
            print("  Updated public/consultation/consultation-interior.webp")
        elif '3d-sample' in f.lower():
            pub_proj = os.path.join(BASE_PUB, 'projects')
            shutil.copy2(fp, os.path.join(pub_proj, f))
            total_copied += 1
            convert_and_save(fp, os.path.join(pub_proj, 'd2-luxury-3d-sample.jpg'))
            total_converted += 1
            print("  Updated public/projects/d2-luxury-3d-sample.jpg")

    # 5. Projects
    c5, o5 = sync_category('05_Projects', 'projects', 'projects')
    total_copied += c5
    total_converted += o5

    print(f"\n==========================================")
    print(f"SUMMARY:")
    print(f"Total direct unwatermarked images placed: {total_copied}")
    print(f"Total matching alternate-extension images updated: {total_converted}")
    print(f"Total image files updated across project: {total_copied + total_converted}")
    print(f"==========================================")

if __name__ == '__main__':
    main()
