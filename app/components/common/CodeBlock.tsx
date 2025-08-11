'use client';
import {useState} from 'react';
import {track} from '@/app/lib/analytics';

type Props = { code: string; id: string; className?: string; onCopy?: () => void };

export default function CodeBlock({code, id, className, onCopy}: Props) {
  const [ok, setOk] = useState(false);
  return (
    <div className={`relative ${className ?? ''}`}>
      <pre className="bg-slate-900 text-slate-50 p-4 overflow-auto">{code}</pre>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setOk(true);
          setTimeout(() => setOk(false), 1200);
          track('docs_copy', {id});
          onCopy?.();
        }}
        className="absolute top-2 right-2 text-xs border rounded px-2 py-1 text-white/90 hover:bg-white/10"
        aria-label="Copy code"
      >
        {ok ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
