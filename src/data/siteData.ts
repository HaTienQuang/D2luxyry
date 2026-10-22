export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'villa' | 'apartment' | 'office';
  categoryLabel: string;
  location: string;
  style: string;
  year?: string;
  mainImage: string;
  gallery: string[];
  description: string;
}

export interface Review {
  id: number;
  author: string;
  quote: string;
  avatar: string;
  rating: number;
  project?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  image: string;
  features: string[];
}

export interface PressArticle {
  id: string;
  publisher: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  image: string;
}

export const siteConfig = {
  name: "D2 Luxury Design",
  domain: "d2luxurydesign.com",
  siteUrl: "https://d2luxurydesign.com",
  brandSubtitle: "Kiến tạo không gian sống thượng lưu",
  tagline: "Đơn Vị Thiết Kế Và Thi Công Nội Thất Trọn Gói",
  established: 2012,
  experienceYears: "14+",
  phone1: "0967 323 335",
  phone1Contact: "0967 323 335 (Mr. Dũng)",
  phone2: "0867 612 199",
  hotline: "0967323335",
  hotline2: "0867612199",
  hotlineFormatted: "0967 323 335 (Mr. Dũng) – 0867 612 199",
  zaloUrl: "https://zalo.me/0967323335",
  messengerUrl: "https://m.me/100064762506404",
  email: "d2luxurydesign@gmail.com",
  youtubeUrl: "https://www.youtube.com/@d2luxury",
  facebookUrl: "https://www.facebook.com/profile.php?id=61575009790250&mibextid=wwXIfr",
  // Địa chỉ Văn phòng & Xưởng sản xuất chính thức
  officeHanoi: "Số 20, Lô C9, KĐT Geleximco, La Dương, Hà Đông, Tp Hà Nội",
  workshopHanoi: "Nhà thờ Cần Kiệm, Hạ Bằng, Tp Hà Nội",
  workshopHCMC: "80C đường Gò Cát, phường Long Trường, Tp Hồ Chí Minh",
  workshopPhuQuoc: "Khu phố 10, Dương Đông, Đặc khu Phú Quốc, tỉnh An Giang",
  // Compatibility fields
  addressHanoi: "Số 20, Lô C9, KĐT Geleximco, La Dương, Hà Đông, Tp Hà Nội",
  addressHCMC: "80C đường Gò Cát, phường Long Trường, Tp Hồ Chí Minh",
  workshop1: "Nhà thờ Cần Kiệm, Hạ Bằng, Tp Hà Nội",
  workshop2: "80C đường Gò Cát, phường Long Trường, Tp Hồ Chí Minh",
  workshop3: "Khu phố 10, Dương Đông, Đặc khu Phú Quốc, tỉnh An Giang",
  stats: [
    { value: "14+", label: "Năm kinh nghiệm" },
    { value: "300+", label: "Nhân sự lành nghề" },
    { value: "03", label: "Xưởng sản xuất quy mô" },
    { value: "1000+", label: "Công trình bàn giao" },
  ],
  quoteCEO: {
    author: "CEO D2 Luxury Design",
    role: "Founder / CEO D2 Luxury Design",
    text: "Chúng tôi bắt đầu từ ý nghĩ, rằng ai mà không ước ao có một căn phòng đúng nghĩa của riêng mình. Chắc sẽ đỡ hơn nhiều nếu nhìn quanh đều là những món đồ decor mình yêu thích. Chúng tôi bắt đầu sáng tạo những gì mình nghĩ rằng bản thân sẽ tự hào sở hữu. Thế là D2 Luxury Design ra đời… Tôi nghĩ ăn - mặc - ở là 3 yếu tố gắn liền suốt cuộc đời của mỗi người, hãy chọn một và làm thật tốt thì sẽ thành công thôi."
  }
};

export const navLinks = [
  { href: "#sec-duan", label: "Dự án tiêu biểu" },
  { href: "#sec-dichvu", label: "Dịch vụ" },
  { href: "#sec-gioithieu", label: "Về D2 Luxury Design" },
  { href: "#sec-khachhang", label: "Khách hàng" },
  { href: "#sec-baochi", label: "Báo chí" },
  { href: "#sec-tuvan", label: "Liên hệ tư vấn" },
];

export const heroSlides = [
  {
    id: 1,
    title: "KIẾN TẠO KHÔNG GIAN THƯỢNG LƯU",
    subtitle: "D2 LUXURY DESIGN",
    description: "Đơn vị tiên phong thiết kế kiến trúc và thi công nội thất trọn gói cao cấp từ năm 2012.",
    image: "/hero/main.jpg",
    ctaText: "Khám phá dự án",
    ctaLink: "#sec-duan",
  },
  {
    id: 2,
    title: "TINH HOA NỘI THẤT & NGHỆ THUẬT SỐNG",
    subtitle: "DẤU ẤN ĐỘC BẢN CHO TỪNG GIA CHỦ",
    description: "Tân cổ điển, Đông Dương, Hiện đại cao cấp - tỉ mỉ từng chi tiết với 2 nhà xưởng sản xuất quy mô.",
    image: "/hero/luxury-interior.jpg",
    ctaText: "Nhận tư vấn ngay",
    ctaLink: "#sec-tuvan",
  },
];

export const projectsData: Project[] = [
  {
    id: "grand-island-ecopark",
    title: "Biệt thự Đảo Grand Island Ecopark",
    slug: "thiet-ke-villa-tai-grand-island-ecopark",
    category: "villa",
    categoryLabel: "Biệt thự cao cấp",
    location: "Khu đô thị Ecopark, Hưng Yên",
    style: "Modern Luxury & Neo Classic",
    year: "2024",
    mainImage: "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
    gallery: [
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/main.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-1.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-2.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-3.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-4.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-5.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-6.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-7.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-8.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-9.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-10.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-11.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-12.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-13.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-14.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-15.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-16.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-17.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-18.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-19.gif",
      "/projects/thiet-ke-villa-tai-grand-island-ecopark/photo-20.gif",
    ],
    description: "Công trình biệt thự đảo siêu sang với diện tích hơn 600m2, thiết kế mở giao hòa cùng thiên nhiên ven hồ, kết hợp vật liệu đá tự nhiên, gỗ óc chó cao cấp và kim loại mạ vàng tinh tế."
  },
  {
    id: "vinhomes-ocean-park",
    title: "Biệt thự Vinhomes Ocean Park",
    slug: "thiet-ke-villa-vinhomes-ocean-park",
    category: "villa",
    categoryLabel: "Biệt thự đơn lập",
    location: "Gia Lâm, Hà Nội",
    style: "Tân cổ điển thanh lịch",
    year: "2024",
    mainImage: "/projects/thiet-ke-villa-vinhomes-ocean-park/main.gif",
    gallery: [
      "/projects/thiet-ke-villa-vinhomes-ocean-park/main.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-1.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-2.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-3.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-4.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-5.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-6.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-7.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-8.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-9.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-10.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-11.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-12.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-13.gif",
      "/projects/thiet-ke-villa-vinhomes-ocean-park/photo-14.gif",
    ],
    description: "Không gian sống quý phái với những đường nét phào chỉ sắc sảo, hệ thống ánh sáng phân tầng ấm áp và đồ nội thất may đo theo chuẩn mực nghệ thuật hoàng gia đương đại."
  },
  {
    id: "vintage-villa-tam-dao",
    title: "Vintage Villa Nghỉ Dưỡng Tam Đảo",
    slug: "thiet-ke-vintage-villa-tai-tam-dao",
    category: "villa",
    categoryLabel: "Villa Nghỉ dưỡng",
    location: "Tam Đảo, Vĩnh Phúc",
    style: "Vintage & Farmhouse Châu Âu",
    year: "2023",
    mainImage: "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
    gallery: [
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/main.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-1.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-2.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-3.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-4.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-5.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-6.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-7.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-8.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-9.gif",
      "/projects/thiet-ke-vintage-villa-tai-tam-dao/photo-10.gif",
    ],
    description: "Ngôi biệt thự nghỉ dưỡng giữa lưng chừng đồi mây, đậm chất thơ với tone màu gỗ mộc trầm ấm, lò sưởi cổ điển và những góc ban công ngắm nhìn trọn vẹn thung lũng sương mù."
  },
  {
    id: "villa-ba-vi",
    title: "Biệt thự Vườn Nghỉ Dưỡng Ba Vì",
    slug: "thiet-ke-villa-tai-ba-vi",
    category: "villa",
    categoryLabel: "Biệt thự nhà vườn",
    location: "Ba Vì, Hà Nội",
    style: "Đông Dương (Indochine) & Resort",
    year: "2023",
    mainImage: "/projects/thiet-ke-villa-tai-ba-vi/photo-1.gif",
    gallery: [
      "/projects/thiet-ke-villa-tai-ba-vi/photo-1.gif",
      "/projects/thiet-ke-villa-tai-ba-vi/photo-2.gif",
      "/projects/thiet-ke-villa-tai-ba-vi/photo-3.gif",
    ],
    description: "Sự kết hợp tinh tế giữa vẻ đẹp truyền thống Việt Nam và kiến trúc thuộc địa Pháp lãng mạn, mang đến chốn an yên tĩnh lặng trút bỏ mọi ồn ào phố thị."
  },
  {
    id: "villa-da-lat",
    title: "Villa Nghỉ Dưỡng Sương Mù Đà Lạt",
    slug: "villa-da-lat",
    category: "villa",
    categoryLabel: "Villa Nghỉ dưỡng",
    location: "Đà Lạt, Lâm Đồng",
    style: "Scandinavian & Rustic Luxury",
    year: "2024",
    mainImage: "/projects/villa-da-lat/main.jpg",
    gallery: [
      "/projects/villa-da-lat/main.jpg",
      "/projects/villa-da-lat/gallery-1.jpg",
      "/projects/villa-da-lat/gallery-2.jpg",
      "/projects/villa-da-lat/gallery-3.jpg",
    ],
    description: "Căn villa độc đáo giữa rừng thông Đà Lạt, sử dụng gỗ tuyết tùng kết hợp kính khổ lớn tạo view panorama tuyệt mỹ, nội thất êm dịu mang lại cảm giác thư thái tuyệt đối."
  },
  {
    id: "vinhomes-metropolis",
    title: "Căn hộ Penthouse Vinhomes Metropolis",
    slug: "vinhomes-metropolis",
    category: "apartment",
    categoryLabel: "Penthouse / Căn hộ cao cấp",
    location: "Liễu Giai, Ba Đình, Hà Nội",
    style: "Modern Luxury Italy",
    year: "2024",
    mainImage: "/projects/vinhomes-metropolis/main.jpg",
    gallery: [
      "/projects/vinhomes-metropolis/main.jpg",
      "/projects/vinhomes-metropolis/gallery-1.jpg",
      "/projects/vinhomes-metropolis/gallery-2.jpg",
      "/projects/vinhomes-metropolis/gallery-3.jpg",
      "/projects/vinhomes-metropolis/gallery-4.jpg",
    ],
    description: "Không gian sống trên cao với tầm view trọn hồ Tây. Sử dụng phong cách Modern Luxury Ý với da bò tự nhiên, đá marble nguyên khối và hệ thống chiếu sáng thông minh điều khiển tự động."
  },
  {
    id: "van-phong-300m2",
    title: "Văn phòng Điều Hành Cao Cấp 300m2",
    slug: "van-phong-300m2",
    category: "office",
    categoryLabel: "Không gian văn phòng & Showroom",
    location: "Quận 1, TP. Hồ Chí Minh",
    style: "Boutique Executive Office",
    year: "2023",
    mainImage: "/projects/van-phong-300m2/main.jpg",
    gallery: [
      "/projects/van-phong-300m2/main.jpg",
      "/projects/van-phong-300m2/gallery-1.jpg",
      "/projects/van-phong-300m2/gallery-2.jpg",
      "/projects/van-phong-300m2/gallery-3.jpg",
    ],
    description: "Thiết kế văn phòng hạng sang khơi nguồn sáng tạo, khẳng định vị thế thương hiệu với phòng họp VIP đẳng cấp quốc tế và lounge tiếp khách thượng lưu."
  }
];

export const servicesData: Service[] = [
  {
    id: "thiet-ke-kien-truc-noi-that",
    number: "01",
    title: "Thiết kế Kiến trúc – Nội thất",
    shortDesc: "Định hình phong cách sống độc bản qua các bản vẽ 2D/3D chi tiết và tối ưu hóa công năng chuẩn phong thủy.",
    image: "/services/main.jpg",
    features: [
      "Khảo sát hiện trạng & lắng nghe nhu cầu chuyên sâu",
      "Bản vẽ mặt bằng bố trí công năng tối ưu 100%",
      "Phối cảnh 3D trực quan sống động từng góc nhìn",
      "Hồ sơ kỹ thuật thi công kiến trúc, điện nước, kết cấu chi tiết",
    ]
  },
  {
    id: "thi-cong-xay-dung",
    number: "02",
    title: "Thi công Xây dựng Trọn gói",
    shortDesc: "Giám sát nghiêm ngặt từ phần thô đến kết cấu chịu lực, cam kết đúng tiến độ và an toàn lao động.",
    image: "/services/gallery-1.jpg",
    features: [
      "Quản lý kỹ thuật và giám sát chuyên trách 24/7",
      "Vật liệu xây dựng cao cấp có nguồn gốc xuất xứ rõ ràng",
      "Cam kết bảo hành kết cấu dài hạn",
      "Bàn giao đúng tiến độ cam kết theo hợp đồng",
    ]
  },
  {
    id: "thi-cong-noi-ngoai-that",
    number: "03",
    title: "Sản xuất & Thi công Nội thất",
    shortDesc: "Sở hữu 2 xưởng sản xuất quy mô lớn với máy móc hiện đại, đáp ứng may đo nội thất cao cấp đạt độ chuẩn xác 99%.",
    image: "/services/gallery-2.jpg",
    features: [
      "Trực tiếp sản xuất không qua trung gian giúp tối ưu chi phí",
      "Thợ thủ công lành nghề với kinh nghiệm trên 10 năm",
      "Chất liệu gỗ tự nhiên quý, gỗ công nghiệp An Cường cao cấp",
      "Lắp đặt hoàn thiện tỉ mỉ và vệ sinh công nghiệp trước bàn giao",
    ]
  },
  {
    id: "cai-tao-noi-ngoai-that",
    number: "04",
    title: "Cải tạo & Nâng cấp Không gian",
    shortDesc: "Hô biến công trình cũ thành tác phẩm kiến trúc thời thượng, nâng tầm giá trị tài sản bền vững.",
    image: "/services/gallery-5.jpg",
    features: [
      "Đánh giá kết cấu cũ và tư vấn giải pháp gia cố tối ưu",
      "Tái cơ cấu không gian mở, tăng cường ánh sáng tự nhiên",
      "Nâng cấp hệ thống kỹ thuật hiện đại, tiết kiệm năng lượng",
      "Tiết kiệm tối đa thời gian thi công mà không ảnh hưởng kết cấu chung",
    ]
  }
];

export const reviewsData: Review[] = [
  {
    id: 1,
    author: "Chị Trang",
    project: "Biệt thự Villa Thảo Điền, TP.HCM",
    rating: 5,
    avatar: "/reviews/avatar-1.webp",
    quote: "Cám ơn công ty, cám ơn Tuyền, cám ơn Len, cám ơn Vương, đã cho chị một công trình đạt hơn 90%. Có sai sót, nhưng cách các bạn giải quyết nhanh chóng và thỏa đáng. Chúc em và công ty của mình ngày càng phát triển, có được những bạn nhân viên tâm huyết và có thật nhiều thiết kế trong mơ."
  },
  {
    id: 2,
    author: "Chị Phương",
    project: "Căn hộ Duplex cao cấp",
    rating: 5,
    avatar: "/reviews/avatar-2.jpg",
    quote: "Là một người hoạt động trong lĩnh vực làm đẹp nên tiêu chuẩn về cái đẹp của chị rất cao và Len đã đáp ứng được tất cả yêu cầu của chị. Chúc cho Len ngày càng phát triển hơn nữa. Chị nghĩ là mình chỉ cần tập trung kiếm tiền thôi còn làm nhà đã có Len lo rồi."
  },
  {
    id: 3,
    author: "Anh Nam",
    project: "Villa Ocean Park Gia Lâm, Hà Nội",
    rating: 5,
    avatar: "/reviews/avatar-3.webp",
    quote: "Tôi biết Len qua Facebook, nhưng mà đi đến quyết định lựa chọn Len cho công trình của mình thì phải là sau khi xem công trình thực tế. Tôi xem đến tận 5 căn của Len, từ căn đang xây thô, căn đã hoàn thiện cho đến căn đã được sử dụng. Sau khi xem xong, tôi cảm thấy đúng với nhu cầu của tôi."
  },
  {
    id: 4,
    author: "Anh Đức Anh",
    project: "Biệt thự Mizuki Park",
    rating: 5,
    avatar: "/reviews/avatar-4.webp",
    quote: "Ban đầu mình chưa có ý tưởng chi tiết. Các bạn trong team Len đã hỗ trợ mình nhiều trong việc đưa ra ý tưởng từ ngoại thất cho đến nội thất. Khi Len đưa cho mình bản thiết kế là mình đồng ý luôn. Team Len từ khâu thiết kế đến sau khi hoàn thành công trình đã hỗ trợ rất nhanh chóng. Đội ngũ thi công tại công trường rất là gọn gàng và nhiệt tình."
  },
  {
    id: 5,
    author: "Anh Thuận",
    project: "Biệt thự Mr Thuận, Cần Thơ",
    rating: 5,
    avatar: "/reviews/avatar-5.svg",
    quote: "Cám ơn anh Tuyền, các bạn thiết kế, thi công đã chăm chút hoàn thiện cho căn nhà ở mức độ là trên 90% so với thiết kế ban đầu. Tôi hy vọng sẽ có cơ hội gặp lại Len trong những công trình sau."
  },
  {
    id: 6,
    author: "Anh Thịnh",
    project: "Nhà phố Long Biên, Hà Nội",
    rating: 5,
    avatar: "/reviews/avatar-6.webp",
    quote: "Cách đây 6 năm, đó là một cái gì đó rất mới mẻ với em khi làm nhà. Em tìm những giải pháp chú trọng vào chi tiết và D2 Luxury Design cho thấy được điều đấy. Sau 6 năm thì thường người ta sẽ thay đổi 1 đội thi công khác, nhưng em nghĩ rằng mình đang làm căn nhà mới theo phong cách của D2 Luxury Design và không có vấn đề gì trong quá trình làm việc, nên chẳng có lý do gì để không tìm đến D2 Luxury Design đầu tiên."
  },
  {
    id: 7,
    author: "Chị Trang",
    project: "Biệt thự Mrs Hồng, Vinhomes",
    rating: 5,
    avatar: "/reviews/avatar-7.webp",
    quote: "Điều tiên quyết để chị lựa chọn D2 Luxury Design là sự tử tế, sự chân thành đối với khách hàng. Đây là căn thứ 3 chị xây dựng và cũng là căn chị ưng ý nhất. Chị được tiếp xúc với các bạn là những người hết lòng vì khách hàng, chỉn chu ngay từ đầu cho đến cả khi đã bàn giao nhà xong. Đó là cái duyên cái phúc của chị để tìm được đội ngũ như D2 Luxury Design."
  },
  {
    id: 8,
    author: "Anh Thụy",
    project: "HD Villa, Bình Thạnh",
    rating: 5,
    avatar: "/reviews/avatar-8.webp",
    quote: "Để tìm một khách hàng mới đã khó rồi và việc giữ được khách hàng đó còn khó hơn nữa. Việc các bạn lắng nghe mong muốn của chủ nhà là một cái thành công. Anh cảm thấy rất dễ dàng khi làm việc với D2 Luxury Design."
  },
  {
    id: 9,
    author: "Chị Dung",
    project: "Biệt thự Đức Trọng, Lâm Đồng",
    rating: 5,
    avatar: "/reviews/avatar-9.webp",
    quote: "Hai ngày chị chọn trang thiết bị cùng với D2 Luxury Design, đội ngũ có một phòng có tất cả các trang thiết bị để cho chị tha hồ lựa. Ngày đó chị hạnh phúc lắm. Chị rất thích xây nhà, rất thích decor nhà. Chị sẽ muốn decor thêm và người chị muốn làm việc là D2 Luxury Design chứ không phải đơn vị nào khác."
  },
  {
    id: 10,
    author: "Anh Kiệt",
    project: "Biệt thự Song lập ID Junction",
    rating: 5,
    avatar: "/reviews/avatar-10.webp",
    quote: "Từ lúc hình thành bản vẽ cho đến lúc hoàn thành công trình, D2 Luxury Design rất chu đáo và tận tâm. Mỗi người công nhân ở đây được bố trí công việc, phối hợp nhau rất hài hòa để công việc diễn ra tốt đẹp. Tinh thần làm việc của anh em rất đáng hoan nghênh và ghi nhận, nỗ lực tăng ca. Tôi rất quý tinh thần của anh em."
  },
  {
    id: 11,
    author: "Chị Vi",
    project: "Bella Na Villa, Tây Ninh",
    rating: 5,
    avatar: "/reviews/avatar-11.webp",
    quote: "Năng lực sản xuất của D2 Luxury Design rất là lớn. Đội ngũ có đầy đủ nhân sự từ quản lý cho đến thợ, nhân công. Rất tận tâm tận tình. Cái gì chưa được là thay luôn, làm hài lòng anh chị chứ không bao giờ phản đối hết."
  },
  {
    id: 12,
    author: "Anh Thạnh",
    project: "Biệt thự Mr Hoàng, Q9",
    rating: 5,
    avatar: "/reviews/avatar-12.webp",
    quote: "Việc làm của công ty nói chung, cái tâm của đội ngũ D2 Luxury Design dồn nén vào trong ngôi nhà của anh chị, anh chị cho 10 điểm tuyệt đối."
  }
];

export const pressArticles: PressArticle[] = [
  {
    id: "thanhnien",
    publisher: "THANHNIEN.VN",
    date: "30/11/2023",
    title: "CEO D2 Luxury Design: ‘Xác định nhân sự chính là linh hồn của D2 Luxury Design’",
    excerpt: "“Nhân sự là linh hồn của D2 Luxury Design. Nhân viên đứng thứ nhất, khách hàng đứng thứ hai, và tôi chỉ đứng thứ 3” – Không chỉ nhấn mạnh vai trò của nhân sự, CEO D2 Luxury Design luôn xây dựng chính sách phúc lợi tốt để phát triển thương hiệu bền vững.",
    url: "https://thanhnien.vn",
    image: "/press/press-1.webp"
  },
  {
    id: "cafebiz",
    publisher: "CAFEBIZ / CAFEF",
    date: "24/11/2023",
    title: "D2 Luxury Design và hành trình hơn 10 năm kiến tạo những ngôi nhà mơ ước",
    excerpt: "Đi lên từ đam mê kiến trúc, bằng sự tử tế và chân thành, D2 Luxury Design đã thành công chuyển mình để trở thành một trong những thương hiệu thiết kế – thi công nội ngoại thất danh tiếng tại Việt Nam.",
    url: "https://cafef.vn",
    image: "/press/press-2.jpg"
  },
  {
    id: "vietnamnet",
    publisher: "VIETNAMNET.VN",
    date: "05/12/2023",
    title: "Triết lý ‘bổn phận ấm êm’ của thương hiệu thiết kế nội thất D2 Luxury Design",
    excerpt: "Từ sự đam mê không gian sống hoàn mỹ, D2 Luxury Design đã có những bước phát triển mạnh mẽ và trở thành một trong những đơn vị uy tín hàng đầu cho phân khúc biệt thự cao cấp.",
    url: "https://vietnamnet.vn",
    image: "/press/press-3.webp"
  }
];

