import os
import re
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

PUB_DIR = r'D:\D2luxury\public'
ROOT_DIR = r'D:\D2luxury'

def fix_disk_gifs():
    print("=== 1. Overwriting 256-color .gif files on disk with full TrueColor .png data ===")
    count = 0
    for base in [os.path.join(PUB_DIR, 'projects'), os.path.join(ROOT_DIR, 'projects')]:
        if not os.path.exists(base):
            continue
        for root, dirs, files in os.walk(base):
            for f in files:
                if f.lower().endswith('.gif'):
                    gif_path = os.path.join(root, f)
                    png_path = os.path.join(root, f[:-4] + '.png')
                    if os.path.exists(png_path):
                        shutil.copy2(png_path, gif_path)
                        count += 1
    print(f"Overwrote {count} .gif files with sharp, full-color .png data.")

def fix_code_references():
    print("\n=== 2. Updating code references from .gif to .png ===")
    code_files = [
        r'D:\D2luxury\src\data\allProjects.ts',
        r'D:\D2luxury\src\data\siteData.ts',
        r'D:\D2luxury\src\components\HeroSlider.tsx',
        r'D:\D2luxury\src\components\ProjectsSection.tsx',
        r'D:\D2luxury\src\app\page.tsx',
        r'D:\D2luxury\src\app\api\generate-concept\route.ts'
    ]

    for fp in code_files:
        if not os.path.exists(fp):
            continue
        with open(fp, 'r', encoding='utf-8') as handle:
            content = handle.read()

        # Replace .gif in project image paths with .png
        new_content = re.sub(r'(/projects/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-]+)\.gif', r'\1.png', content)
        
        # In allProjects.ts and siteData.ts, also update .jpg in /projects/ to .png for maximum fidelity
        if 'allProjects.ts' in fp or 'siteData.ts' in fp:
            new_content = re.sub(r'(/projects/[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-]+)\.jpg', r'\1.png', new_content)

        if new_content != content:
            with open(fp, 'w', encoding='utf-8') as handle:
                handle.write(new_content)
            print(f"Updated image references in {os.path.basename(fp)}")
        else:
            print(f"No changes needed in {os.path.basename(fp)}")

if __name__ == '__main__':
    fix_disk_gifs()
    fix_code_references()
