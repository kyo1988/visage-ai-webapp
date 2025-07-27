import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// .env.localから、クライアントサイド用の環境変数を読み込みます
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Firebaseアプリを初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// このコードは、ブラウザ（クライアント）でのみ実行されるようにします
if (typeof window !== 'undefined') {
    // NEXT_PUBLIC_RECAPTCHA_SITE_KEYが設定されている場合のみ、App Checkを初期化
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      try {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true
        });
      } catch (error) {
        console.error("Firebase App Check initialization error:", error);
      }
    } else {
      console.warn("Firebase App Check: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set. App Check is disabled.");
    }
  }

// Firestoreのインスタンスをエクスポート
export { db };