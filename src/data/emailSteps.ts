import type { Step } from './steps';

export type { Step };

// A tiny promo email — the whole route is about hardening this one page
// against the way email clients actually render, not building it from
// scratch. The HTML skeleton itself is assumed knowledge already.
export const EMAIL_STARTER = `<!DOCTYPE html>
<html>
  <head>
    <title>Big Sale</title>
  </head>
  <body>
    <table>
      <tr>
        <td>
          <h1>Big Sale This Week</h1>
          <p>Everything is 30% off, this week only.</p>
          <img src="sale.jpg">
          <a href="https://example.com/shop">Shop Now</a>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

function has(code: string, re: RegExp) {
  return re.test(code);
}

export const EMAIL_STEPS: Step[] = [
  // --- layout ---
  {
    tag: 'email doctype',
    chapter: 'layout',
    why: "Outlook renders with Word's engine, and it behaves more predictably with the older XHTML Transitional doctype than the HTML5 one you'd use for a website.",
    hints: [
      'Replace the whole first line — there\'s a much longer, older-style doctype used specifically for email.',
      'It\'s the XHTML 1.0 Transitional public doctype.',
      'Replace the first line with:\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    ],
    check: (code) =>
      has(code, /<!DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\/EN"/i),
  },
  {
    tag: 'role="presentation"',
    chapter: 'layout',
    why: 'This table isn\'t real tabular data, it\'s a layout hack — role="presentation" tells screen readers to skip announcing it as a table.',
    hints: [
      'Add an attribute to your outer <table> that says "this isn\'t data, it\'s just layout."',
      'The attribute is role, and the value is presentation.',
      'Add to your <table>: role="presentation"',
    ],
    check: (code) => has(code, /<table\b[^>]*\brole\s*=\s*"presentation"/i),
  },
  {
    tag: 'width="600"',
    chapter: 'layout',
    why: 'Without a fixed width, your layout table stretches to fill whatever window it\'s viewed in — unpredictable and often ugly. 600px is the long-standing safe width for email.',
    hints: [
      'Add a width attribute directly on the outer <table>.',
      'It\'s a plain number, no "px" — HTML attributes don\'t use units.',
      'Add to your <table>: width="600"',
    ],
    check: (code) => has(code, /<table\b[^>]*\bwidth\s*=\s*"600"/i),
  },

  // --- styling ---
  {
    tag: 'style="" on <h1>',
    chapter: 'styling',
    why: "A <style> block in <head> gets stripped by a lot of email clients — Gmail among them. Styling has to live directly on the tag via the style attribute to be reliable.",
    hints: [
      'Add a style attribute directly to your <h1>, not a <style> block.',
      'Inside the quotes, write CSS declarations the same way you would inside curly braces, just without them.',
      'Add to <h1>: style="font-family: sans-serif; color: #1e2440;"',
    ],
    check: (code) => has(code, /<h1\b[^>]*\bstyle\s*=\s*"[^"]*font-family[^"]*"/i),
  },
  {
    tag: 'bgcolor + style background',
    chapter: 'styling',
    why: 'bgcolor is an old HTML attribute some clients still need, while background-color in a style attribute is what modern clients read — setting both together covers the widest range.',
    hints: [
      'Add two things to your <td>: a legacy attribute, and a modern style property, both doing the same job.',
      'bgcolor="..." is the attribute; style="background-color: ...;" is the modern one.',
      'Add to <td>: bgcolor="#f4f5fa" style="background-color: #f4f5fa;"',
    ],
    check: (code) =>
      has(code, /<td\b[^>]*\bbgcolor\s*=\s*"[^"]+"[^>]*\bstyle\s*=\s*"[^"]*background-color[^"]*"/i) ||
      has(code, /<td\b[^>]*\bstyle\s*=\s*"[^"]*background-color[^"]*"[^>]*\bbgcolor\s*=\s*"[^"]+"/i),
  },

  // --- images-buttons ---
  {
    tag: 'alt text (email-critical)',
    chapter: 'images-buttons',
    why: 'Most email clients block images by default until the reader clicks "show images" — alt text isn\'t just accessibility here, it\'s often the only thing anyone sees at all.',
    hints: [
      'Your <img> is missing the attribute that shows as fallback text.',
      'alt takes a short description of what the image would show.',
      'Fix it to: <img src="sale.jpg" alt="30% off everything this week">',
    ],
    check: (code) => {
      const m = code.match(/<img\b[^>]*>/i);
      if (!m) return false;
      return /\balt\s*=\s*"[^"]+"/i.test(m[0]);
    },
  },
  {
    tag: 'bulletproof button',
    chapter: 'images-buttons',
    why: 'A CSS-styled <a> with padding and a background color looks fine almost everywhere except Outlook, which frequently ignores both. Putting the background and padding on a <td> around the link, instead of the link itself, survives there too.',
    hints: [
      'Wrap your "Shop Now" link in a table cell, and move the background color and padding onto that cell instead of the link.',
      'Something like: <td style="background-color: ...; padding: ...;"><a href="...">Shop Now</a></td>',
      'Fix it to: <td style="background-color: #3b63e8; padding: 12px 24px;"><a href="https://example.com/shop" style="color: #fff;">Shop Now</a></td>',
    ],
    check: (code) =>
      // Tight wrapper only — the <a> has to sit directly inside the
      // colored <td> (just whitespace between), not merely somewhere
      // inside a td that happens to have a background-color further up.
      has(
        code,
        /<td\b[^>]*style\s*=\s*"[^"]*background-color[^"]*"[^>]*>\s*<a\b[^>]*>[\s\S]*?<\/a>\s*<\/td>/i,
      ),
  },

  // --- compatibility ---
  {
    tag: 'preheader text',
    chapter: 'compatibility',
    why: 'The preheader is the snippet an inbox shows next to the subject line before the email is even opened — without one, it just shows whatever text happens to come first in your body, which is rarely what you\'d choose.',
    hints: [
      'Add a short hidden line of text right at the very top of <body>, before your table.',
      'Hide it with an inline style that sets display: none, so it never shows in the actual email — only in the inbox preview.',
      'Add right after <body>: <div style="display: none;">30% off everything — this week only.</div>',
    ],
    check: (code) => {
      const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<table/i);
      if (!bodyMatch) return false;
      return /<(div|span)\b[^>]*\bstyle\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>[\s\S]*?<\/(div|span)>/i.test(
        bodyMatch[1],
      );
    },
  },
];
