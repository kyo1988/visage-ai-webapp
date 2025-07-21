//
// visage-ai-webapp/app/report/[id]/page.tsx
// 【最終完成形コード - paramsに一切触れない、真の抜け殻】
//
import ClientReportPage from './ClientReportPage';

// 未知のIDにも対応できるように、ダイナミックレンダリングを有効化
export const dynamicParams = true; 

// ビルド時に静的生成したいIDがあれば、ここで列挙します
export async function generateStaticParams() {
  return []; 
}

// このページコンポーネントの唯一の役割は、
// ただClientReportPageを呼び出すこと。それだけです。
export default function Page() {
  // ClientReportPageは自立しているので、何も渡す必要はありません。
  return <ClientReportPage />;
}