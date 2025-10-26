"use client";
import { useEffect } from "react";
import Image from "next/image";
import { track } from "@/app/lib/analytics";
import { useTranslations } from "@/app/lib/intl";

type Product = {
  id: string;
  name: string;
  brand?: string;
  price?: string;
  image: string;
  url: string;
  source?: string;
  keyword?: string;
};

export default function ProductGridClient({ products, tags }: { products: Product[]; tags?: string[] }) {
  const t = useTranslations("report");
  
  useEffect(()=>{ track("report_products_rendered", { count: products?.length ?? 0, tags }); },[products, tags]);
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <article key={p.id} className="card flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <a
            href={p.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={() => track("report_product_click", { productId: p.id, url: p.url, source: p.source ?? "rakuten", keyword: p.keyword })}
            className="flex h-full flex-col"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="rounded-lg border object-cover bg-[#f8fafc]"
                priority={false}               // LCP回避：商品はpriority禁止
              />
            </div>
            <h3 className="mt-3 font-semibold clamp-2">{p.name}</h3>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{p.brand ?? "—"}</p>
              {p.price && <p className="text-sm font-medium">{p.price}</p>}
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] text-slate-500">
                {p.source === 'crystalai' ? 'via CrystalAI' : `via ${p.source || 'Rakuten'}`}{p.keyword ? ` • ${p.keyword}` : ""}
              </span>
            </div>
            <div className="mt-auto pt-3">
              <span className="inline-flex w-full justify-center rounded-lg border bg-white py-2 text-sm hover:bg-slate-50">
                {t("viewProduct")}
              </span>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
