import { html, nothing } from "lit";
import { isLandingPage } from "./landing";
import { t } from "./config";

/** Copies a code and reports what happened, falling back to selecting the text when the clipboard is refused. */
export async function copyCode(code: string, el?: Element | null): Promise<string> {
  try {
    await navigator.clipboard.writeText(code);
    return t({ ar: "اتنسخ الكود ✓", en: "Code copied ✓" });
  } catch {
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    return t({ ar: "حددنا الكود، انسخيه من قائمة النسخ", en: "The code is selected, copy it from your menu" });
  }
}

export const codeCss = `
.wf-code { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .625rem; }
.wf-code__value { padding: .5rem 1.125rem; border: 2px dashed var(--wf-accent-ink); border-radius: .75rem; font-size: 1.375rem; font-weight: 900; letter-spacing: .12em;
  color: var(--wf-title); direction: ltr; user-select: all; -webkit-user-select: all; }
.wf-code__copy { min-height: 2.75rem; }
.wf-code__status { flex-basis: 100%; text-align: center; font-size: .875rem; font-weight: 700; color: var(--wf-accent-ink); }
`;

/** A code with a copy button and its live status line. */
export function codeBlock(code: string, status: string, onCopy: (e: Event) => void) {
  return html`<div class="wf-code">
    <span class="wf-code__value">${code}</span>
    <button type="button" class="wf-btn wf-code__copy" @click=${onCopy}>${t({ ar: "انسخي الكود", en: "Copy code" })}</button>
    ${status ? html`<span class="wf-code__status" role="status">${status}</span>` : nothing}
  </div>`;
}

/**
 * Codes reach shoppers only after the merchant confirms they exist in Salla, so a template's sample codes
 * never show on a live page. The editor and template previews always show them.
 */
export function codesReady(cfg: Record<string, any>): boolean {
  return !isLandingPage() || cfg.codes_ready === true;
}
