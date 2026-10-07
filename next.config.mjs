/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile antd và các package liên quan để tránh lỗi cache vendor-chunks trên Windows
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/nextjs-registry',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-input',
    'rc-table',
    'rc-tree',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
