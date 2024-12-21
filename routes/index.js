const express = require('express');
const router = express.Router();

// メインダッシュボード
router.get('/', (req, res) => {
    res.render('index', { title: 'Dashboard', description: 'Bot Control Panel' });
});

// ステータスページ
router.get('/status', (req, res) => {
    res.render('status', { title: 'Bot Status', description: 'Current Bot Status' });
});

module.exports = router;
