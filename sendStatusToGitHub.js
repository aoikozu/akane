const fetch = require('node-fetch');
const fs = require('fs');
const { Octokit } = require('@octokit/rest');


// GitHubの情報を設定
const GITHUB_OWNER = 'aoikozu'; // GitHubユーザー名
const GITHUB_REPO = 'akane-dashboard'; // リポジトリ名
const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN; // GitHubのPersonal Access Token
const FILE_PATH = 'data.json'; // 更新するファイル

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function uploadStatus() {
  try {
    // ステータスデータを読み込む
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    
    // ファイルの現在のSHAを取得
    const { data: fileData } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });
    const fileSHA = fileData.sha;

    // ファイルをアップロード
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: 'Update status.json',
      content: Buffer.from(data).toString('base64'), // Base64エンコード
      sha: fileSHA, // 必要に応じて既存ファイルのSHAを指定
    });

    console.log('✅ GitHubにステータスをアップロードしました！');
  } catch (error) {
    console.error('⚠️ ステータスのアップロード中にエラーが発生しました:', error.message);
  }
}

// 例: 1分ごとにステータスをアップロード
setInterval(uploadStatus, 6000);
