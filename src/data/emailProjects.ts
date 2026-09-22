import type { Project } from './projects';
import { hasImgWithSrcAndAlt } from '../lib/htmlCheck';

export type { Project };

const has = (code: string, re: RegExp) => re.test(code);

export const EMAIL_PROJECTS: Project[] = [
  {
    id: 'email-promo',
    title: 'promo email',
    difficulty: 'basic',
    brief:
      "Build a small promotional email from scratch — a table-based layout, inline styles, a hidden preheader, and a button that survives Outlook. Nothing here checks in a fixed order.",
    starter: `<!DOCTYPE html>
<html>
  <head>
    <title>Promo</title>
  </head>
  <body>

  </body>
</html>
`,
    requirements: [
      {
        id: 'preheader',
        desc: 'A hidden preheader line right at the top of <body>',
        hint: '<div style="display: none;">A short teaser for the inbox preview.</div>',
        check: (code) => {
          const bodyMatch = code.match(/<body[^>]*>([\s\S]*)/i);
          if (!bodyMatch) return false;
          return /<(div|span)\b[^>]*\bstyle\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>[\s\S]*?<\/(div|span)>/i.test(
            bodyMatch[1],
          );
        },
      },
      {
        id: 'layout-table',
        desc: 'A layout table marked role="presentation" with a fixed width',
        hint: '<table role="presentation" width="600">\n  ...\n</table>',
        check: (code) => {
          const m = code.match(/<table\b[^>]*>/i);
          if (!m) return false;
          return /\brole\s*=\s*"presentation"/i.test(m[0]) && /\bwidth\s*=\s*"\d+"/i.test(m[0]);
        },
      },
      {
        id: 'heading',
        desc: 'A heading with an inline style (not a <style> block)',
        hint: '<h1 style="font-family: sans-serif; color: #1e2440;">Big Sale</h1>',
        check: (code) => has(code, /<h1\b[^>]*\bstyle\s*=\s*"[^"]+"[^>]*>[\s\S]*?<\/h1>/i),
      },
      {
        id: 'image',
        desc: 'An image with alt text',
        hint: '<img src="banner.jpg" alt="30% off everything">',
        check: (code) => hasImgWithSrcAndAlt(code),
      },
      {
        id: 'button',
        desc: 'A bulletproof button — the link\'s background and padding live on its <td>, not the <a>',
        hint: '<td style="background-color: #3b63e8; padding: 12px 24px;"><a href="#" style="color: #fff;">Shop Now</a></td>',
        check: (code) =>
          has(
            code,
            /<td\b[^>]*style\s*=\s*"[^"]*background-color[^"]*"[^>]*>\s*<a\b[^>]*>[\s\S]*?<\/a>\s*<\/td>/i,
          ),
      },
      {
        id: 'color-scheme',
        desc: 'A color-scheme meta tag so clients don\'t auto-invert your colors in dark mode',
        hint: '<meta name="color-scheme" content="light">',
        check: (code) => has(code, /<meta\b[^>]*\bname\s*=\s*"color-scheme"[^>]*>/i),
      },
    ],
  },
];
