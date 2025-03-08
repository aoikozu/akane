document.addEventListener("DOMContentLoaded", async () => {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userAvatar = document.getElementById("user-avatar");

    // ✅ ユーザー情報取得
    async function fetchUser() {
        const res = await fetch("https://akane-quin.glitch.me/api/user", { credentials: "include" });
        if (!res.ok) return null;
        return await res.json();
    }

    // ✅ サーバー情報取得
    async function fetchServers() {
        const res = await fetch("https://akane-quin.glitch.me/api/servers", { credentials: "include" });
        if (!res.ok) return null;
        return await res.json();
    }

    // ✅ ログイン処理
    loginBtn.addEventListener("click", () => {
        window.location.href = "https://akane-quin.glitch.me/auth/discord";
    });

    // ✅ ログアウト処理
    logoutBtn.addEventListener("click", async () => {
        await fetch("https://akane-quin.glitch.me/logout", { credentials: "include" });
        location.reload();
    });

    // ✅ ユーザー情報の表示
    const user = await fetchUser();
    if (user) {
        loginBtn.style.display = "none"; // ログインボタンを非表示
        logoutBtn.style.display = "inline-block"; // ログアウトボタンを表示
        userAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        userAvatar.style.display = "inline-block"; // ユーザーアイコンを表示
    }

    // ✅ サーバー情報の表示
    const serverList = document.getElementById("server-list");
    const servers = await fetchServers();
    if (servers && servers.length > 0) {
        serverList.innerHTML = "";
        servers.forEach(server => {
            const serverCard = document.createElement("div");
            serverCard.className = "server-card";
            serverCard.innerHTML = `
                <img src="${server.icon || 'default-icon.png'}" alt="${server.name}">
                <h3>${server.name}</h3>
                ${server.botInServer ? `<button onclick="viewServer('${server.id}')">詳細を見る</button>` : `<button onclick="inviteBot('${server.id}')">Botを導入</button>`}
            `;
            serverList.appendChild(serverCard);
        });
    } else {
        serverList.innerHTML = "<p>管理者権限のあるサーバーがありません。</p>";
    }
});

// ✅ サーバー統計ページへ移動
function viewServer(serverId) {
    window.location.href = `server.html?id=${serverId}`;
}

// ✅ Bot導入ページへ移動
function inviteBot(serverId) {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8&guild_id=${serverId}`;
}
