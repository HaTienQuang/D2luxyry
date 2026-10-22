/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lendecor.vn',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/thiet-ke-kien-truc', destination: '/architecture', permanent: true },
      { source: '/thiet-ke-noi-that', destination: '/interior', permanent: true },
      { source: '/thi-cong-xay-dung', destination: '/construction', permanent: true },
      { source: '/gioi-thieu', destination: '/about', permanent: true },
      { source: '/lien-he', destination: '/contact', permanent: true },
      { source: '/du-an', destination: '/projects', permanent: true },
      { source: '/du-an/:slug*', destination: '/projects/:slug*', permanent: true },
      { source: '/du-an-cua-d2-luxury', destination: '/projects', permanent: true },
      { source: '/du-an-cua-d2-luxury/:slug*', destination: '/projects/:slug*', permanent: true },
      { source: '/du-an-cua-lens-decor', destination: '/projects', permanent: true },
      { source: '/du-an-cua-lens-decor/:slug*', destination: '/projects/:slug*', permanent: true },
    ];
  },
};

export default nextConfig;

