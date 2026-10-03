const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://dluxurydesign.com/',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return fetchUrl(redirectUrl).then(resolve);
        }
        if (res.statusCode !== 200) {
          console.warn(`[HTTP ${res.statusCode}] ${url}`);
          return resolve('');
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    );
    req.on('error', (err) => {
      console.warn(`[Error] ${url}:`, err.message);
      resolve('');
    });
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return resolve(true);
    }
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://dluxurydesign.com/',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return downloadFile(redirectUrl, destPath).then(resolve);
        }
        if (res.statusCode !== 200) {
          return resolve(false);
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(() => resolve(true));
        });
        fileStream.on('error', () => {
          fs.unlink(destPath, () => {});
          resolve(false);
        });
      }
    );
    req.on('error', () => {
      fs.unlink(destPath, () => {});
      resolve(false);
    });
  });
}

async function main() {
  console.log('=== STEP 1: Crawling all project URLs from DLUXURYDESIGN.COM ===');

  const pagesToScan = [
    'https://dluxurydesign.com/',
    'https://dluxurydesign.com/page/2/',
    'https://dluxurydesign.com/page/3/',
    'https://dluxurydesign.com/page/4/',
    'https://dluxurydesign.com/page/5/',
    'https://dluxurydesign.com/page/6/',
    'https://dluxurydesign.com/chuyen-muc/apartment/',
    'https://dluxurydesign.com/chuyen-muc/house/',
    'https://dluxurydesign.com/chuyen-muc/penhouse/',
    'https://dluxurydesign.com/chuyen-muc/showroom/',
    'https://dluxurydesign.com/chuyen-muc/villa/',
    'https://dluxurydesign.com/chuyen-muc/restaurant/',
    'https://dluxurydesign.com/chuyen-muc/office/',
    'https://dluxurydesign.com/gioi-thieu/',
    'https://dluxurydesign.com/lien-he/',
  ];

  const projectUrlSet = new Set();

  for (const pageUrl of pagesToScan) {
    console.log(`Scanning: ${pageUrl}`);
    const html = await fetchUrl(pageUrl);
    if (!html) continue;

    const linkRegex = /href="(https:\/\/dluxurydesign\.com\/[a-zA-Z0-9\-_]+\/)"/g;
    let m;
    while ((m = linkRegex.exec(html)) !== null) {
      const u = m[1];
      if (
        !u.includes('/page/') &&
        !u.includes('/chuyen-muc/') &&
        !u.includes('/category/') &&
        !u.includes('/tag/') &&
        !u.includes('/wp-content/') &&
        !u.includes('/wp-includes/') &&
        !u.includes('/wp-json/') &&
        !u.includes('/feed/') &&
        !u.includes('/comments/') &&
        !u.includes('/gioi-thieu/') &&
        !u.includes('/lien-he/') &&
        !u.includes('/tin-tuc/') &&
        u !== 'https://dluxurydesign.com/'
      ) {
        projectUrlSet.add(u);
      }
    }
  }

  const projectUrls = Array.from(projectUrlSet);
  console.log(`Found ${projectUrls.length} distinct project URLs!`);
  console.log(projectUrls);

  console.log('\n=== STEP 2: Extracting rich details & downloading images for each project ===');

  const baseImageDir = path.join('d:', 'Dluxury', 'public', 'images', 'projects');
  const allProjects = [];

  for (let idx = 0; idx < projectUrls.length; idx++) {
    const url = projectUrls[idx];
    const slug = url.replace('https://dluxurydesign.com/', '').replace(/\/$/, '');
    console.log(`\n[${idx + 1}/${projectUrls.length}] Processing project: ${slug}`);

    const html = await fetchUrl(url);
    if (!html) continue;

    // Title
    const titleMatch =
      html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!title) {
      title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Category determination
    let category = 'can-ho';
    let categoryLabel = 'Căn hộ / Apartment';
    const lowerTitle = (title + ' ' + url).toLowerCase();
    if (lowerTitle.includes('biet-thu') || lowerTitle.includes('biệt thự') || lowerTitle.includes('villa')) {
      category = 'biet-thu';
      categoryLabel = 'Biệt thự / Villa';
    } else if (lowerTitle.includes('nha-o') || lowerTitle.includes('nha-pho') || lowerTitle.includes('nhà')) {
      category = 'nha-pho';
      categoryLabel = 'Nhà phố / House';
    } else if (lowerTitle.includes('penhouse') || lowerTitle.includes('penthouse') || lowerTitle.includes('tân cổ')) {
      category = 'penhouse';
      categoryLabel = 'Penthouse & Tân Cổ';
    } else if (lowerTitle.includes('van-phong') || lowerTitle.includes('văn phòng') || lowerTitle.includes('office')) {
      category = 'van-phong';
      categoryLabel = 'Văn phòng / Office';
    } else if (lowerTitle.includes('showroom') || lowerTitle.includes('cua-hang')) {
      category = 'showroom';
      categoryLabel = 'Showroom';
    } else if (lowerTitle.includes('nha-hang') || lowerTitle.includes('restaurant') || lowerTitle.includes('cafe')) {
      category = 'nha-hang';
      categoryLabel = 'Nhà hàng / F&B';
    }

    // Paragraphs
    const contentMatch =
      html.match(/<div class="[^"]*entry-content[^"]*"[\s\S]*?<\/div>\s*<!-- \.entry-content -->/i) ||
      html.match(/<div class="[^"]*entry-content[^"]*"[\s\S]*?<\/div>/i);
    const contentHtml = contentMatch ? contentMatch[0] : html;

    const paragraphs = [...contentHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim())
      .filter((p) => p.length > 25 && !p.includes('HOTLINE') && !p.includes('Email') && !p.includes('Địa chỉ'));

    const description =
      paragraphs.length > 0
        ? paragraphs.slice(0, 3).join(' ')
        : `Dự án ${title} được thiết kế và thi công hoàn thiện bởi đội ngũ kiến trúc sư D'Luxury Design với tiêu chuẩn cao cấp, tối ưu hóa công năng và thẩm mỹ.`;

    // Extract all project images
    const imgMatches = [...contentHtml.matchAll(/src="([^"]+\.(?:jpg|jpeg|png|webp|gif))"/gi)].map(
      (m) => m[1]
    );

    const validImgUrls = [...new Set(imgMatches.filter((img) =>
      img.includes('/uploads/') &&
      !img.includes('logo') &&
      !img.includes('avatar') &&
      !img.includes('icon')
    ))];

    console.log(`  Found ${validImgUrls.length} images for ${slug}`);

    const projectDir = path.join(baseImageDir, slug);
    const localGallery = [];

    for (let i = 0; i < validImgUrls.length; i++) {
      const imgUrl = validImgUrls[i];
      const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
      const filename = i === 0 ? `main${ext}` : `photo-${i}${ext}`;
      const destPath = path.join(projectDir, filename);
      const webPath = `/images/projects/${slug}/${filename}`;

      process.stdout.write(`    Downloading img ${i + 1}/${validImgUrls.length}... `);
      const ok = await downloadFile(imgUrl, destPath);
      if (ok) {
        localGallery.push(webPath);
        process.stdout.write('OK\n');
      } else {
        process.stdout.write('FAILED\n');
      }
    }

    if (localGallery.length === 0) {
      localGallery.push('/images/hero/main.jpg');
    }

    // Style and specs
    const style = lowerTitle.includes('tân cổ')
      ? 'Phong cách Tân Cổ Điển'
      : lowerTitle.includes('tối giản') || lowerTitle.includes('japandi')
      ? 'Phong cách Tối Giản'
      : lowerTitle.includes('resort') || lowerTitle.includes('đà lạt')
      ? 'Phong cách Resort Nghỉ Dưỡng'
      : 'Phong cách Hiện Đại Sang Trọng';

    const area = lowerTitle.includes('300m2')
      ? '300m²'
      : category === 'biet-thu'
      ? '380m² - 550m²'
      : category === 'penhouse'
      ? '220m² - 320m²'
      : category === 'nha-pho'
      ? '200m² - 280m²'
      : '110m² - 175m²';

    const location = lowerTitle.includes('đà lạt')
      ? 'Đà Lạt, Lâm Đồng'
      : lowerTitle.includes('metropolis') || lowerTitle.includes('han jadin') || lowerTitle.includes('ocean park') || lowerTitle.includes('vinsmart') || lowerTitle.includes('hà nội') || lowerTitle.includes('phúc thọ')
      ? 'Hà Nội'
      : 'Hà Nội & TP. HCM';

    allProjects.push({
      id: slug,
      title,
      category,
      categoryLabel,
      style,
      area,
      location,
      year: '2024 - 2025',
      image: localGallery[0],
      description,
      gallery: localGallery,
      originalUrl: url,
    });
  }

  fs.writeFileSync(
    path.join('d:', 'Dluxury', 'all_scraped_projects.json'),
    JSON.stringify(allProjects, null, 2),
    'utf8'
  );

  console.log(`\n=== SUCCESS: Saved ${allProjects.length} complete projects to all_scraped_projects.json ===`);
}

main();

