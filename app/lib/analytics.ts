import { gaEvent } from './gtag';

export function track(id: string, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  // 既存のconsoleログとカスタムイベントを維持
  console.log('[track]', id, payload);
  window.dispatchEvent(new CustomEvent('analytics', { detail: { id, ...payload }}));
  
  // GA4イベント送信を追加（エラーが発生しても既存機能に影響しないようtry/catchで囲む）
  try {
    gaEvent(id, payload);
  } catch (error) {
    console.warn('[analytics] GA4 event failed:', error);
  }
}