import type { Puzzle } from './puzzles';

export type { Puzzle };

// Ids are prefixed so they never collide with the website puzzle set —
// solved-state is tracked in one shared localStorage set keyed by id.
export const EMAIL_PUZZLES: Puzzle[] = [
  {
    id: 'email-table-no-role',
    title: 'A layout table pretending to be data',
    difficulty: 'basic',
    prompt: 'This table exists purely for layout, but nothing tells a screen reader that. Fix it.',
    broken: '<table width="600">\n  <tr>\n    <td>Welcome to the newsletter.</td>\n  </tr>\n</table>',
    hints: [
      'A table used only for layout needs an attribute saying so.',
      'role="presentation" tells assistive tech to skip announcing it as tabular data.',
      'Fix it to: <table width="600" role="presentation">',
    ],
    check: (code) => {
      const m = code.match(/<table\b[^>]*>/i);
      if (!m) return false;
      return /\brole\s*=\s*"presentation"/i.test(m[0]);
    },
  },
  {
    id: 'email-img-no-alt',
    title: 'An image nobody can see yet',
    difficulty: 'basic',
    prompt: 'Most inboxes block this image until someone clicks "show images" — right now there\'s nothing to show in the meantime. Fix it.',
    broken: '<img src="banner.jpg">',
    hints: [
      'With images blocked by default, this attribute is often the only thing a reader sees at all.',
      'alt gives fallback text shown before (or instead of) the image loading.',
      'Fix it to: <img src="banner.jpg" alt="20% off your first order">',
    ],
    check: (code) => {
      const m = code.match(/<img\b[^>]*>/i);
      if (!m) return false;
      return /\balt\s*=\s*"[^"]+"/i.test(m[0]);
    },
  },
  {
    id: 'email-head-style-block',
    title: 'A style rule that never arrives',
    difficulty: 'basic',
    prompt: 'This rule is written correctly, but a lot of email clients strip <style> blocks entirely — it may never even reach the reader. Move it somewhere safer.',
    broken: '<head>\n  <style>\n    p { color: #444; }\n  </style>\n</head>\n<body>\n  <p>Thanks for subscribing.</p>\n</body>',
    hints: [
      'A <head><style> rule is a gamble in email — move the same styling directly onto the tag it targets.',
      'Delete the <style> block and add a style attribute to the <p> itself.',
      'Fix it to: <p style="color: #444;">Thanks for subscribing.</p>',
    ],
    check: (code) => has(code, /<p\b[^>]*\bstyle\s*=\s*"[^"]*color[^"]*"/i),
  },
  {
    id: 'email-button-css-only',
    title: 'A button held together by CSS alone',
    difficulty: 'medium',
    prompt: 'This "button" is just a styled link. It\'ll render fine in most clients, but Outlook frequently drops the background and padding entirely, leaving plain blue text. Make it survive there too.',
    broken: '<a href="https://example.com/shop" style="background-color: #3b63e8; color: #fff; padding: 12px 24px;">Shop Now</a>',
    hints: [
      'Outlook (Word\'s engine) is unreliable about styling an <a> directly — the background and padding need to live somewhere sturdier.',
      'Wrap the link in a <td>, and move the background-color and padding onto that <td> instead.',
      'Fix it to: <td style="background-color: #3b63e8; padding: 12px 24px;"><a href="https://example.com/shop" style="color: #fff;">Shop Now</a></td>',
    ],
    check: (code) =>
      has(
        code,
        /<td\b[^>]*style\s*=\s*"[^"]*background-color[^"]*"[^>]*>\s*<a\b[^>]*>[\s\S]*?<\/a>\s*<\/td>/i,
      ),
  },
  {
    id: 'email-no-preheader',
    title: 'An inbox preview left to chance',
    difficulty: 'medium',
    prompt: "This email has no preheader, so the inbox preview snippet will just be whatever text happens to appear first in the body — usually not a good look. Add one.",
    broken: '<body>\n  <table role="presentation" width="600">\n    <tr>\n      <td>Welcome back! Here\'s what\'s new this month.</td>\n    </tr>\n  </table>\n</body>',
    hints: [
      'Add a short line of hidden text right at the very start of <body>, before the table.',
      'Hide it with display: none in an inline style, so it only shows in the inbox preview, never in the email itself.',
      'Add right after <body>: <div style="display: none;">Here\'s what\'s new this month.</div>',
    ],
    check: (code) => {
      const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<table/i);
      if (!bodyMatch) return false;
      return /<(div|span)\b[^>]*\bstyle\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>[\s\S]*?<\/(div|span)>/i.test(
        bodyMatch[1],
      );
    },
  },
  {
    id: 'email-vw-width',
    title: 'A width that only means something on a website',
    difficulty: 'hard',
    prompt: 'This container is sized with a viewport-relative unit, which plenty of email clients (Outlook included) don\'t support at all — it\'ll fall back to an unpredictable width. Fix it.',
    broken: '<table style="width: 90vw;">\n  <tr>\n    <td>Content</td>\n  </tr>\n</table>',
    hints: [
      'vw is a CSS unit relative to the browser viewport — email clients aren\'t browsers rendering a window, so it doesn\'t reliably apply.',
      'Use a fixed pixel width instead, on both the width attribute and the style, for the widest support.',
      'Fix it to: <table width="600" style="width: 600px;">',
    ],
    check: (code) => {
      const m = code.match(/<table\b[^>]*>/i);
      if (!m) return false;
      const tag = m[0];
      return !/vw\b/i.test(tag) && /\bwidth\s*=\s*"\d+"/i.test(tag);
    },
  },
  {
    id: 'email-no-color-scheme',
    title: "A palette that isn't ready for dark mode",
    difficulty: 'hard',
    prompt: 'This email never says whether it\'s designed for light or dark mode, so some clients will auto-invert its colors — often wrecking the contrast. Fix it.',
    broken: '<head>\n  <title>Newsletter</title>\n</head>',
    hints: [
      'Add a <meta> tag in <head> that tells clients which color schemes this design actually supports.',
      'The attribute is name="color-scheme", with light, dark, or both as the content.',
      'Add to <head>: <meta name="color-scheme" content="light">',
    ],
    check: (code) => has(code, /<meta\b[^>]*\bname\s*=\s*"color-scheme"[^>]*>/i),
  },
];

function has(code: string, re: RegExp) {
  return re.test(code);
}
