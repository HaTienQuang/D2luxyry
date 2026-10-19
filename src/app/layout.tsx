import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://d2luxury.vn"),
  title: "D2 Luxury - Đơn Vị Thiết Kế Và Thi Công Kiến Trúc & Nội Thất Trọn Gói",
  description: "Từ năm 2012, D2 Luxury là đơn vị thiết kế kiến trúc, nội thất & thi công trọn gói phân khúc cao cấp, sở hữu xưởng quy mô lớn và hàng trăm nhân sự lành nghề.",
  keywords: "thiết kế nội thất, thi công nội thất biệt thự, kiến trúc tân cổ điển, d2 luxury, villa ecopark, vinhomes, penthouse",
  icons: {
    icon: "/logo-tight.png",
    apple: "/logo-tight.png",
  },
  openGraph: {
    title: "D2 Luxury - Thiết Kế & Thi Công Nội Thất Biệt Thự Cao Cấp",
    description: "Đơn vị thiết kế và thi công nội ngoại thất phân khúc cao cấp với đa dạng phong cách thiết kế.",
    images: ["/hero/main.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${lora.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-white text-luxury-dark selection:bg-luxury-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
