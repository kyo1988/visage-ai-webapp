//
// visage-ai-webapp/firebase-admin.js
// 【最終確定版コード - .env利用 / 正しいモジュラーインポート版】
//
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// アプリが既に初期化されていない場合のみ、初期化を実行します
// (Next.jsのホットリロードで、重複エラーが出るのを防ぐため)
if (!getApps().length) {
  try {
    // .env ファイルから環境変数を読み込んで認証情報を設定
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // .envファイル内の '\n' という文字列を、実際の改行に置換
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // エラー発生時には、ここで処理を中断させるか、適切なエラーハンドリングを行う
    // ここではコンソールにエラーを出力するに留めます
  }
}

// 初期化されたアプリからFirestoreのインスタンスを取得してエクスポート
const db = getFirestore();

// 他のファイルから `import { db } from '...'` で使えるように、名前付きエクスポートを行う
export { db };