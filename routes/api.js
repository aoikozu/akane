const express = require('express');
const axios = require('axios');
const router = express.Router();

const BOT_API_URL = process.env.BOT_API_URL; // GlitchのBotのAPI URL
const BOT_API_KEY = process.env.BOT_API_KEY; // BotのAPI認証キー

// Botのステータス情報を取得
router.get('/status', async (req, res) => {
    try {
        const response = await axios.get(`${BOT_API_URL}/status`, {
            headers: { Authorization: `Bearer ${BOT_API_KEY}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching bot status:', error);
        res.status(500).json({ error: 'Failed to fetch bot status' });
    }
});

module.exports = router;
