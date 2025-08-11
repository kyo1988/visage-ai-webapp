'use client';
import React, {createContext, useContext} from 'react';

type Messages = Record<string, any>;

type Ctx = {
  locale: string;
  messages: Messages;
};

// 翻訳関数の型定義
export type TranslationFunction = (key: string, vars?: Record<string, string | number>) => string;

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  messages,
  children
}: {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{locale, messages}}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale(): string {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('I18nProvider is missing above in the tree.');
  return ctx.locale;
}

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc: any, key: string) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

/**
 * useTranslations() → (key) => messages[key]
 * useTranslations('nav') → (key) => messages['nav'][key]
 * 置換: {name} などの簡易テンプレート対応
 */
export function useTranslations(namespace?: string): TranslationFunction {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('I18nProvider is missing above in the tree.');

  return (key: string, vars?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let val = getByPath(ctx.messages, fullKey);

    if (typeof val !== 'string') {
      // 未定義はキーをそのまま返す（デバッグしやすく）
      return key;
    }
    if (vars) {
      for (const k of Object.keys(vars)) {
        val = val.replaceAll(`{${k}}`, String(vars[k]));
      }
    }
    return val as string;
  };
}

// デフォルトエクスポートとしても提供
export default {
  useTranslations,
  useLocale,
  I18nProvider
};
