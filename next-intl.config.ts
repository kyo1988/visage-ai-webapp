// next-intl.config.ts
import {getRequestConfig} from 'next-intl/server';

export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

export default getRequestConfig(async (params) => {
  const l: Locale =
    params?.locale && (locales as readonly string[]).includes(params.locale)
      ? (params.locale as Locale)
      : defaultLocale;

  const messages = (await import(`./messages/${l}.json`)).default;
  return {locale: l, messages};
});
