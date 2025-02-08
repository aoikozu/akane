// 時計をリアルタイムで更新する関数
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // 時間を2桁にフォーマット
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 分を2桁にフォーマット
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 秒を2桁にフォーマット

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// 1秒ごとに時計を更新
setInterval(updateClock, 1000);

// ページが読み込まれたらすぐに時計を表示
document.addEventListener('DOMContentLoaded', updateClock);

// 画像の右クリックとドラッグを無効化
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.member-card img');
    images.forEach(img => {
        // 右クリック禁止
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            alert('この画像は保護されています。右クリック操作は無効です。');
        });

        // ドラッグ禁止
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
});

async function checkLoginStatus() {
    try {
        const response = await fetch("https://your-glitch-project.glitch.me/api/user", { credentials: "include" });
        
        if (!response.ok) throw new Error("未ログイン");

        const user = await response.json();
        
        // ログインボタンを隠して、ユーザー情報を表示
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("user-profile").style.display = "flex";
        document.getElementById("user-name").textContent = `${user.username}#${user.discriminator}`;
        document.getElementById("user-avatar").src = user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` 
            : "default-avatar.png";
    } catch (error) {
        console.log("ログインしていません");
    }
}

// ログインボタンの処理
document.getElementById("login-btn").addEventListener("click", () => {
    window.location.href = "https://your-glitch-project.glitch.me/auth/discord";
});

// ログアウト処理
document.getElementById("logout-btn").addEventListener("click", () => {
    window.location.href = "https://your-glitch-project.glitch.me/logout";
});

// ページ読み込み時にログイン状態をチェック
document.addEventListener("DOMContentLoaded", checkLoginStatus);
