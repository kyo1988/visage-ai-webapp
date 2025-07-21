'use client';
import { useTranslation } from "@/context/LanguageContext";
import { Icons } from "@/components/Icons";

export const ResultsSection = () => {
  const { t, lang } = useTranslation();
  const results = [
    { id: 1, icon: <Icons.ChartPie />, title: t("result1_title"), desc: t("result1_desc"), highlight: "20%" },
    { id: 2, icon: <Icons.FaceSmile />, title: t("result2_title"), desc: t("result2_desc"), highlight: "5%" },
    { id: 3, icon: <Icons.Sparkles />, title: t("result3_title"), desc: t("result3_desc"), highlight: `10`, smallText: lang === 'ja' ? 'ポイント' : 'points' },
  ];

  return (
    <section id="results" className="py-20 md:py-24 bg-[#f8f4ed]">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold">{t("results_main_title")}</h3>
        <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("results_main_subtitle")}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {results.map(result => (
            <div key={result.id} className="bg-white p-8 rounded-4xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all flex flex-col items-center">
              <h4 className="font-display text-xl font-bold mb-2 h-16">{result.title.replace(result.highlight, '').replace(result.smallText ?? '', '')}</h4>
              <p className="text-4xl font-bold bg-gradient-to-r from-brand-pink-hover to-brand-pink-brown text-transparent bg-clip-text mb-4">
                {result.highlight}
                {result.smallText && <span className="text-lg text-brand-pink-brown">{result.smallText}</span>}
              </p>
              <p className="text-brand-text-sub flex-grow">{result.desc}</p>
              <div className="w-20 h-20 mt-6">{result.icon}</div>
            </div>
          ))}
        </div>
        <p className="mt-16 font-medium text-brand-pink-brown">{t("results_conclusion")}</p>
      </div>
    </section>
  );
};