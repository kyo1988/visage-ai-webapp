export function track(id: string, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  // GA4 等に差し替え想定。暫定は console で可視化。
  console.log('[track]', id, payload);
  window.dispatchEvent(new CustomEvent('analytics', { detail: { id, ...payload }}));
}