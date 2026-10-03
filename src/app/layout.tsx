import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App as AntdApp } from 'antd';
import { Be_Vietnam_Pro, Lora, Caveat } from 'next/font/google';
import theme from '@/theme/themeConfig';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-bevietnam',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif-luxury',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "D'Luxury Design – Thiết Kế & Thi Công Nội Thất Trọn Gói Cao Cấp",
  description:
    "D'Luxury Design mang đến giải pháp thiết kế và thi công nội thất trọn gói toàn diện, kiến tạo không gian sống tiện nghi, thẩm mỹ và đẳng cấp hàng đầu.",
  keywords:
    "D'Luxury Design, thiết kế nội thất, thi công nội thất trọn gói, nội thất biệt thự, nội thất chung cư cao cấp, luxury interior",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${lora.variable} ${caveat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

