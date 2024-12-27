const fetch = require('node-fetch');
const fs = require('fs');

// GitHubの情報を設定
const GITHUB_OWNER = 'aoikozu'; // GitHubユーザー名
const GITHUB_REPO = 'akane-dashboard'; // リポジトリ名
const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN; // GitHubのPersonal Access Token
const FILE_PATH = 'data.json'; // 更新するファイル

// Botのステータスを取得する関数（例としてダミーデータを使用）
function getBotStatus() {
    return {
        timestamp: new Date().toISOString(),
        memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        uptime: process.uptime(),
        cpu: Math.random().toFixed(2), // ダミーデータ
        servers: 5, // ダミーデータ
        members: 1000 // ダミーデータ
    };
}

// GitHubのファイルを更新する関数
async function updateGitHubFile(content) {
    const url = `https://api.github.com/repos/aoikozu/akane-dashboad/contents/data.json`;

    // ファイルの現在の情報を取得
    const response = await fetch(url, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch file data:', response.statusText);
        return;
    }

    const fileData = await response.json();
    const sha = fileData.sha; // ファイルの現在のSHAを取得

    // 新しいコンテンツをBase64エンコード
    const encodedContent = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

    // ファイルを更新
    const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update bot status',
            content: encodedContent,
            sha: sha
        })
    });

    if (!updateResponse.ok) {
        console.error('Failed to update file:', updateResponse.statusText);
    } else {
        console.log('File updated successfully on GitHub');
    }
}

// 実行する関数
async function sendStatus() {
    const status = getBotStatus();
    console.log('Sending status to GitHub:', status);

    await updateGitHubFile(status);
}

// 一定間隔でGitHubに送信
setInterval(sendStatus, 60000); // 1分ごとに実行
