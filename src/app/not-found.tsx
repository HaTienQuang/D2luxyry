import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f0ec] text-black px-4 text-center">
      <span className="text-sm font-mono tracking-widest text-gray-500 uppercase">
        404 &bull; Page Not Found
      </span>
      <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-wider mt-2 mb-4">
        Trang Không Tồn Tại
      </h1>
      <p className="text-sm text-gray-600 max-w-md mb-8">
        Đường dẫn bạn truy cập có thể đã được thay đổi hoặc không tồn tại.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-black hover:bg-[#222] text-white text-xs font-serif tracking-widest uppercase transition-colors"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}

