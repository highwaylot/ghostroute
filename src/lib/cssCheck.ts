// Shared regex-based CSS rule inspection, used by cssPuzzles.ts and
// cssProjects.ts (and mirrors the same flat-rule assumption cssSteps.ts's
// local hasRule already relies on: no nested rules inside the block being
// matched, which is true for every plain selector puzzle here — media
// queries are handled separately with their own direct patterns since
// they always contain nested rules).

// Returns the raw text between a matching selector's { and its next } —
// or null if no rule with that selector exists at all. Extracting the
// block first (once) and then testing property patterns against just
// that text is more reliable than cramming everything into one regex,
// especially for checks that need to assert something is *absent*.
export function ruleBody(code: string, selectorPattern: string): string | null {
  const re = new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`, 'i');
  const m = code.match(re);
  return m ? m[1] : null;
}

export function ruleExists(code: string, selectorPattern: string): boolean {
  return ruleBody(code, selectorPattern) !== null;
}

// True if a rule with this selector exists AND its body matches the given
// property/value pattern.
export function hasRule(code: string, selectorPattern: string, propertyPattern: string): boolean {
  const body = ruleBody(code, selectorPattern);
  return body !== null && new RegExp(propertyPattern, 'i').test(body);
}
