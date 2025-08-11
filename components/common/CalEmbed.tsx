'use client';

import {useEffect} from 'react';

type Props = {
  url?: string;              // 例: https://cal.com/your-team/intro
  height?: number | string;  // 例: 700
};

export default function CalEmbed({url, height = 700}: Props) {
  const src = url ?? process.env.NEXT_PUBLIC_CAL_URL ?? '';
  useEffect(() => {
    // Cal.com の埋め込みスクリプト (必要なら)
    if (!document.querySelector('script[data-cal]')) {
      const s = document.createElement('script');
      s.src = 'https://cal.com/embed.js';
      s.async = true;
      s.dataset.cal = 'true';
      document.body.appendChild(s);
    }
  }, []);

  if (!src) {
    return <div className="text-sm text-gray-500">CALのURLが未設定です（NEXT_PUBLIC_CAL_URL）</div>;
  }

  return (
    <iframe
      title="Book a demo"
      src={src}
      style={{width: '100%', height: typeof height === 'number' ? `${height}px` : height, border: 0}}
      allow="camera;microphone;fullscreen;clipboard-read;clipboard-write"
    />
  );
}
