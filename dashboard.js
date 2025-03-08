// ユーザー情報取得
async function fetchUser() {
    const res = await fetch("https://akane-quin.glitch.me/api/user", { credentials: "include" });
    return res.ok ? res.json() : null;
}

// サーバーデータ取得
async function fetchServers() {
    const res = await fetch("https://akane-quin.glitch.me/api/servers", { credentials: "include" });
    return res.ok ? res.json() : [];
}

// サーバーを表示
async function loadDashboard() {
    const user = await fetchUser();
    if (!user) return location.href = "index.html"; // 未ログインならトップに戻る

    const servers = await fetchServers();
    const serverList = document.getElementById("server-list");
    serverList.innerHTML = "";

    servers.forEach(server => {
        const div = document.createElement("div");
        div.className = "server-card";
        div.innerHTML = `
            <img src="${server.icon || 'default-server.png'}" alt="${server.name}">
            <p>${server.name}</p>
            ${server.botInServer 
                ? `<button onclick="viewStats('${server.id}')">統計を見る</button>`
                : `<button onclick="inviteBot('${server.id}')">Botを導入</button>`}
        `;
        serverList.appendChild(div);
    });
}

// 統計ページへ
function viewStats(serverId) {
    location.href = `server_stats.html?id=${serverId}`;
}

// Botの導入
function inviteBot(serverId) {
    location.href = `https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8&guild_id=${serverId}`;
}

// ログアウト
document.getElementById("logout-btn").addEventListener("click", () => {
    fetch("https://akane-quin.glitch.me/logout", { credentials: "include" }).then(() => location.href = "index.html");
});

// 読み込み
document.addEventListener("DOMContentLoaded", loadDashboard);
