const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // CORSを許可

let isMaintenance = false; // メンテナンスモード

// ステータスAPI
app.get("/status", (req, res) => {
    if (isMaintenance) {
        return res.json({ status: "maintenance", timestamp: Date.now() });
    }
    res.json({ status: "online", timestamp: Date.now() });
});

// メンテナンスモードの切り替え（手動）
app.get("/toggle-maintenance", (req, res) => {
    isMaintenance = !isMaintenance;
    res.json({ message: `メンテナンス: ${isMaintenance ? "ON" : "OFF"}` });
});

app.listen(3000, () => {
    console.log("Status API running on port 3000");
});
