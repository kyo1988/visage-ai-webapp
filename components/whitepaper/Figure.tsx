'use client';

interface FigureProps {
  number: number;
  title: string;
  src: string;
  alt: string;
  caption: string;
  footnote?: string;
  downloadLink?: string;
}

export default function Figure({ 
  number, 
  title, 
  src, 
  alt, 
  caption, 
  footnote, 
  downloadLink 
}: FigureProps) {
  return (
    <figure className="my-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.12)]">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto rounded-lg"
        />
        <figcaption className="mt-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-[15px] font-semibold text-slate-900 mb-1">
                Figure {number}: {title}
              </h4>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                {caption}
              </p>
              {footnote && (
                <p className="text-[12px] text-slate-500 mt-2 italic">
                  {footnote}
                </p>
              )}
            </div>
            {downloadLink && (
              <a
                href={downloadLink}
                className="ml-4 text-[12px] text-blue-600 hover:text-blue-800 underline"
                download
              >
                Download
              </a>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
