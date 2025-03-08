document.addEventListener("DOMContentLoaded", () => {
    const serverList = document.getElementById("server-list");

    // 🔹 ここに連携サーバー情報を追加
    const servers = [
        {
            name: "茜-あかね-公式サーバー",
            description: "茜-あかね-の公式サポートサーバーです。",
            invite: "https://discord.gg/xxxxx",
        },
        {
            name: "作成中",
            description: "作成中",
            invite: "https://discord.gg/yyyyy",
        },
        {
            name: "作成中",
            description: "作成中",
            invite: "https://discord.gg/zzzzz",
        }
    ];

    // 🔹 サーバーリストを生成
    servers.forEach(server => {
        const serverCard = document.createElement("div");
        serverCard.className = "server-card";
        serverCard.innerHTML = `
            <img src="${server.icon}" alt="${server.name}">
            <h3>${server.name}</h3>
            <p>${server.description}</p>
            <button onclick="joinServer('${server.invite}')">参加する</button>
        `;
        serverList.appendChild(serverCard);
    });
});

// 🔹 参加ボタン処理
function joinServer(inviteUrl) {
    window.open(inviteUrl, "_blank");
}
