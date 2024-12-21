require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// EJSテンプレートエンジン設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイル設定
app.use(express.static(path.join(__dirname, 'public')));

// ルート設定
app.use('/api', apiRoutes); // API用ルート
app.use('/', indexRoutes);  // Webページルート

// サーバー起動
app.listen(PORT, () => {
    console.log(`Dashboard running on http://localhost:${PORT}`);
});
