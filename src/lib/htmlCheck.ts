export type UnclosedTag = {
  name: string;
  from: number;
  to: number;
};

const VOID_TAGS = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);

const TAG_RE = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)>/g;

// Walks the code once with a stack, returning every opening tag that never
// found a matching close. Used for both the inline squiggle and the stats.
export function findUnclosedTags(code: string): UnclosedTag[] {
  const stack: UnclosedTag[] = [];
  let match: RegExpExecArray | null;
  TAG_RE.lastIndex = 0;

  while ((match = TAG_RE.exec(code)) !== null) {
    const full = match[0];
    const name = match[1].toLowerCase();
    const selfClosing = match[2] === '/';
    const isClosing = full.startsWith('</');

    if (VOID_TAGS.has(name) || selfClosing) continue;

    if (isClosing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name) {
          stack.splice(i, 1);
          break;
        }
      }
    } else {
      stack.push({ name, from: match.index, to: match.index + full.length });
    }
  }

  return stack;
}

export function countUnclosed(code: string): number {
  return findUnclosedTags(code).length;
}

// Browsers accept whitespace around "=" in an attribute (href= "x" parses
// the same as href="x"), so every check here must too, or valid HTML that
// just happens to have a space gets wrongly flagged as missing.
export function hasImgWithSrcAndAlt(code: string): boolean {
  const match = code.match(/<img\b[^>]*>/i);
  if (!match) return false;
  const tag = match[0];
  return /\bsrc\s*=\s*"[^"]+"/i.test(tag) && /\balt\s*=\s*"[^"]*"/i.test(tag);
}

export function hasAnyAttribute(code: string, attr: string): boolean {
  return new RegExp(`\\b${attr}\\s*=\\s*"[^"]+"`, 'i').test(code);
}
