/**
 * Cấu hình hệ thống nhận thông tin tư vấn khách hàng (D'Luxury Design)
 * Hỗ trợ gửi Email trực tiếp, Google Sheets CRM và Telegram
 */
export const LEAD_CONFIG = {
  // 1. Email quản trị viên nhận thông báo khách hàng đăng ký (d2luxurydesign@gmail.com)
  adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'd2luxurydesign@gmail.com',

  // 2. Cấu hình Google Apps Script Webhook (nếu có)
  googleScriptUrl:
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbzKg0YVI_MU3YoJll_4AEnujhTeQycwdlPDnuOjMGqtY0Hy7qIfwpJjbkpq8QzhCl6Hgg/exec',

  // 3. Cấu hình Telegram phụ trợ (nếu có)
  telegramBotToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8987108385:AAHimdTJBN5MWqYol2BTP81PpoJkjWoFYxg',
  telegramChatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '6929317961',
};
