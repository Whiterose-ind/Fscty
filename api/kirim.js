// Mengambil token rahasia dari Environment Variables Vercel
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Sekarang file ini AMAN untuk kamu commit dan push ke GitHub!
const textUrI = encodeURIComponent(`🚨 *Target Clicked!*\nNama: ${nama}\nPesan: ${pesan}`);
const telegramRes = await fetch(
    `https://telegram.org{BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${textUrI}&parse_mode=Markdown`
);
