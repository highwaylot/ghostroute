import { findUnclosedTags } from './htmlCheck';

export type Severity = 'error' | 'warning';

export type Diagnostic = {
  from: number;
  to: number;
  line: number;
  severity: Severity;
  title: string;
  explain: string;
};

const COMMON_TYPOS: Record<string, string> = {
  srv: 'src',
  scr: 'src',
  hlink: 'href',
  hef: 'href',
  calss: 'class',
  clas: 'class',
  claas: 'class',
  styel: 'style',
  altt: 'alt',
  titel: 'title',
};

function lineOf(code: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index && i < code.length; i++) {
    if (code[i] === '\n') line++;
  }
  return line;
}

// Best-effort static checks — not a full HTML parser, but enough to catch
// the mistakes that actually derail beginners: a tag that never closes with
// ">", a misspelled attribute, a link with nowhere to go, content dropped
// after </html>. Each diagnostic explains *why* it matters, not just what
// rule broke.
export function runDiagnostics(code: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  // 1. Unclosed tags (existing stack-based check)
  for (const tag of findUnclosedTags(code)) {
    diagnostics.push({
      from: tag.from,
      to: tag.to,
      line: lineOf(code, tag.from),
      severity: 'error',
      title: `<${tag.name}> is never closed`,
      explain: `Every opening <${tag.name}> tag needs a matching </${tag.name}>. Without it, everything after this point can end up nested inside it by accident.`,
    });
  }

  // 2. A tag that opens with "<name" but never finds its closing ">"
  //    before the next "<" starts — this is the one that silently eats
  //    the rest of the page, since the browser keeps looking for ">".
  const openStart = /<([a-zA-Z][a-zA-Z0-9]*)\b/g;
  let m: RegExpExecArray | null;
  while ((m = openStart.exec(code)) !== null) {
    const tagStart = m.index;
    const afterName = tagStart + m[0].length;
    const nextGt = code.indexOf('>', afterName);
    const nextLt = code.indexOf('<', afterName);
    const brokenNoClose = nextGt === -1;
    const brokenNestedLt = nextLt !== -1 && (nextGt === -1 || nextLt < nextGt);
    if (brokenNoClose || brokenNestedLt) {
      diagnostics.push({
        from: tagStart,
        to: brokenNestedLt ? nextLt : Math.min(tagStart + 80, code.length),
        line: lineOf(code, tagStart),
        severity: 'error',
        title: `<${m[1]}> is missing its closing ">"`,
        explain: `This tag opens but never finishes with a ">". The browser keeps reading everything after it as part of this tag, which is often why content just stops showing up.`,
      });
    }
  }

  // 3. Common misspelled attributes
  for (const [typo, correct] of Object.entries(COMMON_TYPOS)) {
    const re = new RegExp(`\\b${typo}=`, 'g');
    let tm: RegExpExecArray | null;
    while ((tm = re.exec(code)) !== null) {
      diagnostics.push({
        from: tm.index,
        to: tm.index + typo.length,
        line: lineOf(code, tm.index),
        severity: 'error',
        title: `"${typo}" isn't a real attribute`,
        explain: `You probably meant "${correct}". The browser doesn't recognize "${typo}", so it's ignored completely rather than causing a visible error.`,
      });
    }
  }

  // 4. <img> missing alt or src
  const imgRe = /<img\b[^>]*>/gi;
  let im: RegExpExecArray | null;
  while ((im = imgRe.exec(code)) !== null) {
    const tag = im[0];
    if (!/\bsrc=/.test(tag)) {
      diagnostics.push({
        from: im.index,
        to: im.index + tag.length,
        line: lineOf(code, im.index),
        severity: 'error',
        title: '<img> has no src',
        explain: 'Without src, the browser has no file or URL to load — nothing will show.',
      });
    }
    if (!/\balt=/.test(tag)) {
      diagnostics.push({
        from: im.index,
        to: im.index + tag.length,
        line: lineOf(code, im.index),
        severity: 'warning',
        title: '<img> has no alt text',
        explain: 'alt is shown if the image fails to load, and read aloud by screen readers. Add alt="a short description".',
      });
    }
  }

  // 5. <a> missing href
  const aRe = /<a\b[^>]*>/gi;
  let am: RegExpExecArray | null;
  while ((am = aRe.exec(code)) !== null) {
    if (!/\bhref=/.test(am[0])) {
      diagnostics.push({
        from: am.index,
        to: am.index + am[0].length,
        line: lineOf(code, am.index),
        severity: 'warning',
        title: '<a> has no href',
        explain: "Without href, this link goes nowhere when clicked. Add href=\"https://...\" (or a page on your own site).",
      });
    }
  }

  // 6. href/src value with no real destination shape
  const attrValRe = /\b(href|src)="([^"]*)"/gi;
  let vm: RegExpExecArray | null;
  while ((vm = attrValRe.exec(code)) !== null) {
    const value = vm[2];
    const hasKnownScheme = /^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/|data:)/i.test(value);
    const looksLikeBareDomain = /^[\w-]+(\.[\w-]+)+/i.test(value);
    const isRisky = value !== '' && !hasKnownScheme && looksLikeBareDomain;
    if (isRisky) {
      diagnostics.push({
        from: vm.index,
        to: vm.index + vm[0].length,
        line: lineOf(code, vm.index),
        severity: 'warning',
        title: `"${value}" is missing https://`,
        explain: `Browsers usually need a full address. Try "https://${value}" so this actually points off-site instead of to a page named "${value}" on your own site.`,
      });
    }
  }

  // 7. Anything after </html>
  const htmlCloseMatch = code.match(/<\/html\s*>/i);
  if (htmlCloseMatch && htmlCloseMatch.index !== undefined) {
    const closeEnd = htmlCloseMatch.index + htmlCloseMatch[0].length;
    const after = code.slice(closeEnd);
    const firstNonSpace = after.search(/\S/);
    if (firstNonSpace !== -1) {
      const from = closeEnd + firstNonSpace;
      diagnostics.push({
        from,
        to: code.length,
        line: lineOf(code, from),
        severity: 'error',
        title: 'Content exists after </html>',
        explain: 'Nothing should come after the closing </html> tag. Move this back up inside <body>, before </body>.',
      });
    }
  }

  return diagnostics.sort((a, b) => a.from - b.from);
}
