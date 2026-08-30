export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    try {
        const { pesan } = req.body; 
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        
        const textUrI = encodeURIComponent(pesan);
        
        // PERBAIKAN: Hapus parse_mode=Markdown agar teks aneh dari hardware tidak menyumbat API Telegram
        const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${textUrI}`);
        const result = await telegramRes.json();

        if (!result.ok) return res.status(500).json({ error: 'Telegram Error', detail: result.description });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Server Error', message: error.message });
    }
}