import "server-only";
import { cert, getApps, getApp, initializeApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

type LocaleEnv = {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
};

function readEnv(): LocaleEnv {
  const projectId =
    process.env.FIREBASE_PROJECT_ID || 
    process.env.GOOGLE_CLOUD_PROJECT || 
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL || 
    process.env.GOOGLE_CLIENT_EMAIL;
  const raw = process.env.FIREBASE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;
  const privateKey = raw ? raw.replace(/\\n/g, "\n") : undefined;
  return { projectId, clientEmail, privateKey };
}

let _app: App | null = null;
let _db: Firestore | null = null;

/** 失敗時は null を返す（フォールバック可） */
export function getDbOrNull(): Firestore | null {
  if (_db) return _db;
  const env = readEnv();
  if (!env.projectId || !env.clientEmail || !env.privateKey) {
    console.warn("[firebase] missing env", {
      hasProjectId: !!env.projectId,
      hasClientEmail: !!env.clientEmail,
      hasPrivateKey: !!env.privateKey,
    });
    return null;
  }
  try {
    _app = getApps().length
      ? getApp()
      : initializeApp({
          credential: cert({
            projectId: env.projectId,
            clientEmail: env.clientEmail,
            privateKey: env.privateKey,
          }),
        });
    _db = getFirestore(_app);
    return _db;
  } catch (e) {
    console.error("[firebase] init failed:", e);
    return null;
  }
}
