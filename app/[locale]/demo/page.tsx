import DemoClient from './DemoClient';

export async function generateMetadata({params:{locale}}:{params:{locale:string}}){
  const messages = locale === 'ja' 
    ? await import('../../../messages/ja.json')
    : await import('../../../messages/en.json');
  
  return {
    title: locale === 'ja' ? 'Visage AI – デモ予約（日本語）' : 'Visage AI – Book a Demo',
    description: locale === 'ja' ? 'AI肌診断のデモを予約' : 'Book a demo of AI skin analysis',
    other: {
      link: [
        { rel:'preconnect', href:'https://cal.com' },
        { rel:'dns-prefetch', href:'//cal.com' }
      ]
    }
  };
}

export default function DemoPage({params:{locale}}:{params:{locale:string}}){
  // UPDATED: Cal.com埋め込みURLを環境変数から読み込み
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL;
  if (!calUrl) {
    throw new Error('NEXT_PUBLIC_CAL_URL environment variable is required');
  }
  
  return <DemoClient locale={locale} calUrl={calUrl} />;
}
