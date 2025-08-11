'use client';
import { useTranslations } from '@/app/lib/intl';
import { Icons } from "@/components/Icons";

export const PrivacySection = () => {
  const t = useTranslations();
  const items = [
    { id: 1, icon: <Icons.ShieldCheck />, title: t('privacy1_title'), desc: t('privacy1_desc') },
    { id: 2, icon: <Icons.LockClosed />, title: t('privacy2_title'), desc: t('privacy2_desc') },
    { id: 3, icon: <Icons.ClipboardDocumentCheck />, title: t('privacy3_title'), desc: t('privacy3_desc') },
  ];

  return (
    <section className="py-20 md:py-24 bg-brand-beige">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold">{t("privacy_main_title")}</h3>
        <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("privacy_main_subtitle")}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.id} className="bg-white p-8 rounded-4xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 mx-auto mb-6">{item.icon}</div>
              <h4 className="font-display text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-brand-text-sub">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};