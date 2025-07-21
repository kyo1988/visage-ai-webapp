//
// visage-ai-webapp/app/report/[id]/ReportView.tsx
// 【新規作成 - データ取得とUIレンダリング担当コンポーネント】
//
import { db } from '../../../firebase-admin.js';
import { notFound } from 'next/navigation';
import ClientReportPage from './ClientReportPage';

// 型定義（page.tsxから移動）
interface ReportData {
  skinAge: number;
  skinType: string;
  createdAt: string;
  scores: {
    wrinkles: number;
    texture: number;
    pores: number;
    brightening: number;
    transparency: number;
    spots: number;
  };
}

/**
 * Firestoreからデータを取得する関数（page.tsxから移動）
 */
async function getReportData(id: string): Promise<ReportData | null> {
  try {
    const docRef = db.collection('reports').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log(`Report with ID: ${id} not found in Firestore.`);
      return null;
    }

    const data = docSnap.data();
    
    return {
      skinAge: data?.skinAge,
      skinType: data?.skinType,
      createdAt: data?.createdAt.toDate().toISOString(),
      scores: data?.scores,
    } as ReportData;

  } catch (error) {
    console.error("Firestore data fetching error in ReportView:", error);
    return null;
  }
}

/**
 * このコンポーネントが、実質的なサーバー処理とUIへのデータ渡しを行う
 * @param id 親コンポーネントから渡される、ただの文字列
 */
export default async function ReportView({ id }: { id: string }) {
  // 親から渡された安全な 'id' 文字列を使ってデータを取得
  const reportData = await getReportData(id);

  // データがなければ404ページを表示
  if (!reportData) {
    notFound();
  }

  // Client Componentにデータを渡す
  return <ClientReportPage initialData={reportData} />;
}