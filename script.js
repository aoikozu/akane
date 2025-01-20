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
