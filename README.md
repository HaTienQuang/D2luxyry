# Len Decor & D2 Luxury - Landing Page (Next.js & Tailwind CSS)

Trang Landing Page cao cấp cho thương hiệu thiết kế & thi công nội thất **Len Decor / D2 Luxury**, được xây dựng dựa trên bố cục và linh hồn của website [lendecor.vn](https://lendecor.vn/) bằng công nghệ **Next.js 14 (App Router)** và **Tailwind CSS**.

---

## 🌟 Tính Năng Nổi Bật & Bố Cục Component

1. **Header ([`src/components/Header.tsx`](src/components/Header.tsx))**:
   - Thanh thông tin liên hệ và địa chỉ showroom phía trên.
   - Header dính (sticky) thông minh với logo thương hiệu trung tâm, hiệu ứng thu nhỏ mượt mà khi cuộn trang.
   - Menu điều hướng phân chia đối xứng (Trái - Phải) và Mobile Drawer menu tối ưu cho điện thoại.

2. **Hero Banner Slider ([`src/components/HeroSlider.tsx`](src/components/HeroSlider.tsx))**:
   - Sử dụng trực tiếp ảnh chất lượng cao từ thư mục `hero/` (`main.jpg`, `luxury-interior.jpg`).
   - Tự động chuyển slide, hiệu ứng phóng to chậm (Ken Burns effect), thanh điều hướng và nút CTA trực tiếp.

3. **Dự án tiêu biểu ([`src/components/ProjectsSection.tsx`](src/components/ProjectsSection.tsx))**:
   - Phân loại danh mục tab: *Tất cả*, *Biệt thự / Villa*, *Penthouse / Căn hộ*, *Văn phòng cao cấp*.
   - Tích hợp toàn bộ dự án và ảnh từ thư mục `projects/` (Grand Island Ecopark, Vinhomes Ocean Park, Vintage Villa Tam Đảo, Ba Vì, Đà Lạt, Vinhomes Metropolis, Văn phòng 300m2).
   - Tích hợp **Project Modal / Lightbox ([`src/components/ProjectModal.tsx`](src/components/ProjectModal.tsx))** cho phép bấm xem toàn bộ bộ sưu tập ảnh (hơn 20+ góc ảnh mỗi dự án), phím mũi tên & Esc để đóng.

4. **Về Len Decor & Triết lý ấm êm ([`src/components/AboutSection.tsx`](src/components/AboutSection.tsx))**:
   - Ảnh chân dung & thương hiệu từ `about/main.jpg`.
   - Thông điệp của Founder/CEO Phạm Minh Tuyền: *"Ăn - mặc - ở là 3 yếu tố gắn liền suốt cuộc đời, chọn một và làm thật tốt..."*.
   - 4 thông số khẳng định vị thế: 14+ Năm kinh nghiệm, 300+ Nhân sự, 02 Phân xưởng sản xuất, 1000+ Công trình.

5. **Dịch vụ của chúng tôi ([`src/components/ServicesSection.tsx`](src/components/ServicesSection.tsx))**:
   - 4 dịch vụ cốt lõi: Thiết kế Kiến trúc - Nội thất, Thi công xây dựng, Sản xuất đồ gỗ nội thất, Cải tạo không gian.
   - Sử dụng ảnh từ thư mục `services/` (`main.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, `gallery-5.jpg`).
   - Quy trình làm việc 4 bước chuẩn mực từ khảo sát đến bàn giao chìa khóa trao tay.

6. **Khách hàng nói gì ([`src/components/TestimonialsSection.tsx`](src/components/TestimonialsSection.tsx))**:
   - Slider 12 đánh giá thực tế của khách hàng từ Hà Nội đến TP.HCM và các tỉnh thành (Chị Trang, Chị Phương, Anh Nam, Anh Đức Anh, Anh Thuận, Anh Thịnh...).
   - Ảnh đại diện lưu trữ nội bộ tại `public/reviews/`.
   - Liên kết trực tiếp kênh video review thực tế trên YouTube.

7. **Báo chí ([`src/components/PressSection.tsx`](src/components/PressSection.tsx))**:
   - Đưa tin từ các đầu báo uy tín: Báo Thanh Niên, Báo CafeBiz / CafeF, Báo VietNamNet.
   - Ảnh bìa bài báo lưu tại `public/press/`.

8. **Tư vấn & Báo giá ([`src/components/ConsultationSection.tsx`](src/components/ConsultationSection.tsx))**:
   - Form đăng ký thông tin chi tiết (Họ tên, SĐT, Email, Loại công trình, Diện tích, Nhu cầu) với phản hồi tức thì.
   - 3 kênh liên hệ nhanh: Zalo, Messenger, Hotline gọi trực tiếp.

9. **Footer ([`src/components/Footer.tsx`](src/components/Footer.tsx))**:
   - Trụ sở chính TP.HCM, Chi nhánh Hà Nội, Xưởng sản xuất 1 (Bình Tân, HCM), Xưởng sản xuất 2 (Bình Thuận).
   - Nút cuộn nhanh lên đầu trang.

10. **Tiện ích nổi & Zalo QR ([`src/components/FloatingWidgets.tsx`](src/components/FloatingWidgets.tsx) & [`src/components/ZaloModal.tsx`](src/components/ZaloModal.tsx))**:
    - Nút Hotline nhấp nháy gọi nhanh.
    - Nút Zalo bấm mở Modal quét mã QR trực tiếp từ file `zalo-qr.png`.
    - Nút Scroll to Top tự xuất hiện khi cuộn trang.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Chạy ở môi trường phát triển (Development):
```bash
npm run dev
```
Truy cập trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### 2. Xây dựng bản sản phẩm (Build & Start):
```bash
npm run build
npm run start
```

---

## 📁 Cấu Trúc Thư Mục Dữ Liệu & Tùy Biến

- **[`src/data/siteData.ts`](src/data/siteData.ts)**: Nơi cấu hình toàn bộ thông tin công ty, hotline, địa chỉ, danh sách dự án, dịch vụ, phản hồi khách hàng và bài báo. Bạn có thể thay đổi số điện thoại, tên thương hiệu tại đây một cách dễ dàng.
- **`public/`**:
  - `hero/`: Ảnh slider đầu trang.
  - `about/`: Ảnh phần giới thiệu & Founder.
  - `services/`: Ảnh các dịch vụ.
  - `projects/`: Toàn bộ thư mục ảnh dự án (Grand Island Ecopark, Ocean Park, Tam Đảo, Ba Vì, Đà Lạt...).
  - `logo.png`, `logo-tight.png`: Logo nhận diện thương hiệu.
  - `zalo-qr.png`: Ảnh mã QR Zalo cho khách hàng quét kết nối.

