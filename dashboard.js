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

    // ✅ ログイン処理（callback or callback2 を自動選択）
    loginBtn.addEventListener("click", () => {
        const clientId = "1272343342692171816"; // ← 実際のDiscord BotのClient ID
        const useCallback2 = window.location.pathname.includes("/akane");

        const redirectUri = useCallback2
            ? "https://akane-quin.glitch.me/auth/callback2"
            : "https://akane-quin.glitch.me/auth/callback";

        const encodedRedirectUri = encodeURIComponent(redirectUri);

        const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&response_type=code&scope=identify%20guilds`;

        window.location.href = discordAuthUrl;
    });

    // ✅ ログアウト処理
    logoutBtn.addEventListener("click", async () => {
        await fetch("https://akane-quin.glitch.me/logout", { credentials: "include" });
        location.reload();
    });

    // ✅ ユーザー情報の表示
    const user = await fetchUser();
    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        userAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        userAvatar.style.display = "inline-block";
    }

    // ✅ サーバー情報の表示
    const serverList = document.getElementById("server-list");
    const servers = await fetchServers();
    if (servers && servers.length > 0) {
        serverList.innerHTML = "";
        servers.forEach(server => {
            const serverCard = document.createElement("div");
            serverCard.className = "server-card";
            const iconUrl = server.icon
                ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`
                : "default-icon.png";
            serverCard.innerHTML = `
                <img src="${iconUrl}" alt="${server.name}">
                <h3>${server.name}</h3>
                ${server.botInServer 
                    ? `<button onclick="viewServer('${server.id}')">詳細を見る</button>`
                    : `<button onclick="inviteBot('${server.id}')">Botを導入</button>`}
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

// ✅ Bot導入ページへ移動（常に callback2 を使用）
function inviteBot(serverId) {
    const clientId = "1272343342692171816";
    const redirectUri = encodeURIComponent("https://akane-quin.glitch.me/auth/callback2");
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8&guild_id=${serverId}&redirect_uri=${redirectUri}&response_type=code`;
}
