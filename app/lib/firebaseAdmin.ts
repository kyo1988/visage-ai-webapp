import "server-only";
import { cert, getApp, getApps, initializeApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

type SAEnv = {
  projectId?: string;
  clientEmail?: string;
  privateKeyRaw?: string;
};

function readEnv(): SAEnv {
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || 
               process.env.GOOGLE_CLOUD_PROJECT || 
               process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL,
    privateKeyRaw: process.env.FIREBASE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY,
  };
}

function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return undefined;
  let s = raw.trim();

  // 1) base64 っぽければデコード（PEMは "=" や A–Z/+/= のみで構成されることが多い）
  const looksBase64 = /^[A-Za-z0-9+/=\s]+$/.test(s) && !s.includes("BEGIN PRIVATE KEY");
  if (looksBase64) {
    try {
      const decoded = Buffer.from(s.replace(/\s+/g, ""), "base64").toString("utf8");
      if (decoded.includes("BEGIN PRIVATE KEY")) {
        s = decoded;
      }
    } catch { /* ignore */ }
  }

  // 2) JSON でよくある \\n → 改行
  s = s.replace(/\\n/g, "\n");

  // 3) 余計な引用符の削除（環境変数に `"-----BEGIN ..."` のように入れてしまった場合）
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  if (s.startsWith("'") && s.endsWith("'")) s = s.slice(1, -1);

  // 4) 改行コード正規化
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 5) 末尾に改行が無い PEM でも動くが、体裁を整える
  if (!s.endsWith("\n")) s += "\n";

  return s;
}

let _app: App | null = null;
let _db: Firestore | null = null;
let _logged = false;

export function getDbOrNull(): Firestore | null {
  if (_db) return _db;

  const env = readEnv();
  const privateKey = normalizePrivateKey(env.privateKeyRaw);

  if (!_logged) {
    _logged = true;
    const shape =
      !env.privateKeyRaw ? "missing"
      : env.privateKeyRaw.includes("BEGIN PRIVATE KEY") ? "pem"
      : /^[A-Za-z0-9+/=\s]+$/.test(env.privateKeyRaw) ? "base64?"
      : "escaped/json?";
    console.info("[firebase] key-shape:", shape, {
      hasProjectId: !!env.projectId,
      hasClientEmail: !!env.clientEmail,
      hasPrivateKey: !!env.privateKeyRaw,
      normalized: !!privateKey,
    });
  }

  if (!env.projectId || !env.clientEmail || !privateKey) {
    console.warn("[firebase] missing env", {
      hasProjectId: !!env.projectId,
      hasClientEmail: !!env.clientEmail,
      hasPrivateKey: !!env.privateKeyRaw,
      normalized: !!privateKey,
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
            privateKey: privateKey,
          }),
        });
    _db = getFirestore(_app);
    return _db;
  } catch (e) {
    console.error("[firebase] init failed:", e);
    return null;
  }
}
