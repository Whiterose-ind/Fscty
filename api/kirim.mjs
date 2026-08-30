export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { nama, pesan } = req.body; 

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        
        const textUrI = encodeURIComponent(`🚨 *Target Clicked!*\nNama: ${nama}\nPesan: ${pesan}`);

        // PERBAIKAN: Menggunakan backtick (`) dan URL API Telegram yang benar
        const telegramRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${textUrI}&parse_mode=Markdown`
        );

        const result = await telegramRes.json();

        if (!result.ok) {
            return res.status(500).json({ error: 'Telegram API Error', detail: result.description });
        }

        return res.status(200).json({ success: true, message: 'Payload Injected!' });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
