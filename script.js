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
