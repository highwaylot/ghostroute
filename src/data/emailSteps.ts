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
    why:
      "A website uses the short <!DOCTYPE html>. Email uses an older, longer doctype called XHTML 1.0 Transitional. Outlook draws the page more predictably with it. Replace your first line with the long version.",
    hints: [
      "Replace the whole first line. Email uses a much longer, older doctype.",
      "It is the XHTML 1.0 Transitional doctype.",
      "Replace the first line with:\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">",
    ],
    check: (code) =>
      has(code, /<!DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\/EN"/i),
  },
  {
    tag: 'role="presentation"',
    chapter: 'layout',
    why:
      "This table is not a table of data. It is only here to lay the email out. role=\"presentation\" tells screen readers to skip past it instead of announcing a table.",
    hints: [
      "Add an attribute to your outer <table> that says \"this is layout, not data.\"",
      "The attribute is role, and the value is presentation.",
      "Add to your <table>: role=\"presentation\"",
    ],
    check: (code) => has(code, /<table\b[^>]*\brole\s*=\s*"presentation"/i),
  },
  {
    tag: 'width="600"',
    chapter: 'layout',
    why:
      "Without a width, your table stretches to fill the whole window, and that looks different everywhere. 600 pixels is the width email has used for years. Set it as an attribute on the table.",
    hints: [
      "Add a width attribute directly on the outer <table>.",
      "It is a plain number, no px. HTML attributes do not use units.",
      "Add to your <table>: width=\"600\"",
    ],
    check: (code) => has(code, /<table\b[^>]*\bwidth\s*=\s*"600"/i),
  },

  // --- styling ---
  {
    tag: 'style="" on <h1>',
    chapter: 'styling',
    why:
      "Gmail and others throw away the <style> tag. The CSS that survives is written on the tag itself: style=\"color: #1e2440;\". Inside the quotes you write the same property: value pairs, with no braces. Style your <h1> this way.",
    hints: [
      "Add a style attribute directly on your <h1>, not a <style> block.",
      "Inside the quotes, write CSS the same way you would inside braces, just without the braces.",
      "Add to <h1>: style=\"font-family: sans-serif; color: #1e2440;\"",
    ],
    check: (code) => has(code, /<h1\b[^>]*\bstyle\s*=\s*"[^"]*font-family[^"]*"/i),
  },
  {
    tag: 'bgcolor + style background',
    chapter: 'styling',
    why:
      "Two ways to set a background, for two generations of email client. bgcolor=\"...\" is an old attribute some clients still need. style=\"background-color: ...;\" is what modern clients read. Set both on the <td>, with the same color.",
    hints: [
      "Add two things to your <td>: an old attribute and a modern style property, both setting the same color.",
      "bgcolor=\"...\" is the attribute. style=\"background-color: ...;\" is the modern one.",
      "Add to <td>: bgcolor=\"#f4f5fa\" style=\"background-color: #f4f5fa;\"",
    ],
    check: (code) =>
      has(code, /<td\b[^>]*\bbgcolor\s*=\s*"[^"]+"[^>]*\bstyle\s*=\s*"[^"]*background-color[^"]*"/i) ||
      has(code, /<td\b[^>]*\bstyle\s*=\s*"[^"]*background-color[^"]*"[^>]*\bbgcolor\s*=\s*"[^"]+"/i),
  },

  // --- images-buttons ---
  {
    tag: 'alt text (email-critical)',
    chapter: 'images-buttons',
    why:
      "Most clients hide images until the reader clicks \"show images.\" Until then, the alt text is all they see. In email, alt is not a nicety. It is often the whole message.",
    hints: [
      "Your <img> is missing the attribute that shows as text when the image is hidden.",
      "alt takes a short description of what the image would show.",
      "Fix it to: <img src=\"sale.jpg\" alt=\"30% off everything this week\">",
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
    why:
      "A link with padding and a background color looks like a button in most clients. Outlook ignores both. The fix: put the background and padding on a <td> around the link, not on the link. Outlook respects a cell.",
    hints: [
      "Wrap your \"Shop Now\" link in a table cell, and move the background color and padding onto that cell.",
      "Something like: <td style=\"background-color: ...; padding: ...;\"><a href=\"...\">Shop Now</a></td>",
      "Fix it to: <td style=\"background-color: #3b63e8; padding: 12px 24px;\"><a href=\"https://example.com/shop\" style=\"color: #fff;\">Shop Now</a></td>",
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
    why:
      "The preheader is the short line an inbox shows next to the subject, before the email is opened. If you do not write one, the inbox shows whatever text comes first in your body. Put a hidden line at the very top so you choose that text.",
    hints: [
      "Add a short hidden line of text right at the top of <body>, before your table.",
      "Hide it with a style attribute that sets display: none. It shows in the inbox preview, not in the opened email.",
      "Add right after <body>: <div style=\"display: none;\">30% off everything \u2014 this week only.</div>",
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
