import type { KeyEntry } from './keyIndex';
import type { NestEntry } from './nest';

// Email doesn't need a wide Nest — it reuses HTML's own <table>/<td>/<img>/<a>
// entries for the tags themselves (see EMAIL_CHAPTERS' own reasoning: email
// isn't a wide vocabulary, it's a dense set of constraints). What it does
// need is a small, sharp reference for the email-specific *patterns* those
// tags get bent into — the stuff no HTML page ever needs, grouped to match
// EMAIL_CHAPTERS' four chapters.
export const EMAIL_KEY_INDEX: KeyEntry[] = [
  {
    tag: 'role="presentation"',
    category: 'why tables',
    desc: 'Marks a layout table as pure layout, not tabular data, so screen readers skip announcing "table" and its row/column count.',
    example: '<table role="presentation" width="600">\n  ...\n</table>',
  },
  {
    tag: 'nested centering table',
    category: 'why tables',
    desc: 'The standard trick for a fixed-width email centered in any client: an outer full-width table wrapping an inner fixed-width one.',
    example: '<table width="100%"><tr><td align="center">\n  <table width="600">...</table>\n</td></tr></table>',
  },
  {
    tag: 'style="" (inline)',
    category: 'inline styles',
    desc: 'Styling written directly on the tag itself, because many clients strip out <style> blocks and ignore linked stylesheets entirely.',
    example: '<td style="padding: 16px; font-family: Arial, sans-serif;">',
  },
  {
    tag: 'bgcolor + background-color',
    category: 'inline styles',
    desc: 'The same color set twice, two different ways, so both old clients (bgcolor attribute) and modern ones (CSS) render it.',
    example: '<td bgcolor="#2563eb" style="background-color: #2563eb;">',
  },
  {
    tag: 'bulletproof button',
    category: 'images & buttons',
    desc: 'A <table>-and-<a> pattern for a button that stays clickable and colored even in clients that strip border-radius or padding on links.',
    example: '<table><tr><td bgcolor="#2563eb" style="border-radius:4px;">\n  <a href="#" style="padding:12px 24px; display:inline-block; color:#fff;">Shop now</a>\n</td></tr></table>',
  },
  {
    tag: 'width/height attributes on <img>',
    category: 'images & buttons',
    desc: 'Explicit width and height attributes (not just CSS) on every email image, so the layout doesn\'t collapse before images finish loading — or if they never do.',
    example: '<img src="logo.png" alt="Acme" width="120" height="40">',
  },
  {
    tag: 'XHTML doctype + MSO conditionals',
    category: 'client quirks',
    desc: 'The XHTML 1.0 Transitional doctype email still targets today, plus <!--[if mso]--> comments that feed Outlook-only markup without other clients seeing it.',
    example: '<!--[if mso]>\n<table role="presentation" width="600"><tr><td>\n<![endif]-->\n  content\n<!--[if mso]>\n</td></tr></table>\n<![endif]-->',
  },
  {
    tag: 'preheader text',
    category: 'client quirks',
    desc: 'A short line of hidden text right after <body> that inbox previews show next to the subject line — without it, the preview shows whatever text happens to come first.',
    example: '<div style="display:none; max-height:0; overflow:hidden;">\n  Your order has shipped — track it inside.\n</div>',
  },
];

export const EMAIL_KEY_CATEGORIES = Array.from(new Set(EMAIL_KEY_INDEX.map((e) => e.category)));

export const EMAIL_NEST: NestEntry[] = [
  {
    tag: 'role="presentation"',
    category: 'why tables',
    stats: {
      type: 'attribute, on a layout <table>',
      appliesTo: 'any table used for layout instead of data',
      screenReaderEffect: 'skips announcing it as a table at all',
      commonValues: 'role="presentation"',
    },
    whatItDoes:
      "Tells assistive tech this table isn't data — no row/column announcements, no \"table with 3 columns\" navigation mode — because it's only here for layout email clients otherwise force onto tables.",
    whereItGoes: 'On every layout <table> in an email — the outer centering table, inner content tables, button tables, all of them.',
    mistakes: [
      "Leaving it off a layout table — a screen reader user hears \"table, 1 column, 1 row\" for every purely cosmetic wrapper in the email, which adds up fast.",
      'Adding it to an actual data table (like a real order summary with rows/columns that matter) — that hides real structure a screen reader user needs.',
    ],
    example: '<table role="presentation" width="600" cellpadding="0" cellspacing="0">\n  <tr><td>Content</td></tr>\n</table>',
    related: ['nested centering table'],
  },
  {
    tag: 'nested centering table',
    category: 'why tables',
    stats: {
      type: 'layout pattern',
      appliesTo: 'centering a fixed-width email in the inbox pane',
      screenReaderEffect: 'n/a (both tables carry role="presentation")',
      commonValues: 'outer width="100%", inner width="600"',
    },
    whatItDoes:
      "CSS's margin: 0 auto isn't reliable across email clients. The workaround: an outer table stretched to 100% width, with align=\"center\" (or a centered <td>) holding a fixed-width inner table that carries the actual content — the outer table's extra width is what centers the inner one.",
    whereItGoes: 'Wraps the entire email body, right after <body> opens.',
    mistakes: [
      'Skipping the outer full-width table and just setting the content table\'s own alignment — several clients, Outlook especially, ignore that and left-align it instead.',
      'Forgetting cellpadding="0" cellspacing="0" on both tables — browsers add default spacing between cells that throws off pixel-precise layouts.',
    ],
    example: '<table role="presentation" width="100%"><tr><td align="center">\n  <table role="presentation" width="600">\n    <tr><td>Content</td></tr>\n  </table>\n</td></tr></table>',
    related: ['role="presentation"'],
  },
  {
    tag: 'style="" (inline)',
    category: 'inline styles',
    stats: {
      type: 'attribute',
      appliesTo: 'any tag',
      screenReaderEffect: 'n/a',
      commonValues: 'style="padding: 16px; font-family: Arial, sans-serif;"',
    },
    whatItDoes:
      "Puts CSS directly on the element it styles, because a large share of email clients (Gmail among them, in some contexts) strip <style> blocks in <head> and ignore <link>-ed stylesheets outright — inline is the one styling method that survives almost everywhere.",
    whereItGoes: 'On every styled tag, individually — there is no cascade to lean on the way there is on the web.',
    mistakes: [
      "Relying on a <style> block for anything that must render everywhere — treat it as a bonus for capable clients, never as the only copy of an important style.",
      'Assuming inline styles cascade like a stylesheet does — each tag needs its own full style="" attribute; nothing inherits down automatically the way it does in a browser.',
    ],
    example: '<td style="padding: 16px; font-family: Arial, sans-serif; color: #222;">\n  Hello\n</td>',
    related: ['bgcolor + background-color'],
  },
  {
    tag: 'bgcolor + background-color',
    category: 'inline styles',
    stats: {
      type: 'attribute + inline style, paired',
      appliesTo: 'table cells and tables needing a background fill',
      screenReaderEffect: 'n/a',
      commonValues: 'bgcolor="#2563eb" style="background-color: #2563eb;"',
    },
    whatItDoes:
      "Sets the exact same color twice, in two different syntaxes — the old HTML bgcolor attribute for clients that don't respect CSS backgrounds, and the CSS background-color property for the ones that do — so the fill renders consistently either way.",
    whereItGoes: 'On any <td> or <table> that needs a solid background color, especially inside a bulletproof button.',
    mistakes: [
      'Setting only background-color and skipping bgcolor — some older or stripped-down clients render a plain white cell instead.',
      'Letting the two values drift out of sync after an edit — updating one color without the other silently reintroduces the exact inconsistency this pattern exists to prevent.',
    ],
    example: '<td bgcolor="#2563eb" style="background-color: #2563eb; padding: 12px;">\n  Content\n</td>',
    related: ['style="" (inline)', 'bulletproof button'],
  },
  {
    tag: 'bulletproof button',
    category: 'images & buttons',
    stats: {
      type: 'layout pattern (table + link, styled together)',
      appliesTo: 'any call-to-action link styled to look like a button',
      screenReaderEffect: 'n/a (the <a> itself remains a normal, focusable link)',
      commonValues: 'a colored <td> wrapping a padded, inline-block <a>',
    },
    whatItDoes:
      "Solves the fact that Outlook (rendering with Word's engine) ignores CSS padding and border-radius directly on an <a> tag. Instead, the color and rounded corners live on a <td>, and the link itself just gets display: inline-block and its own padding — a combination Outlook happens to respect.",
    whereItGoes: 'Anywhere a styled, clickable call-to-action needs to render consistently across clients, especially Outlook.',
    mistakes: [
      "Styling the <a> tag alone with background-color and border-radius and calling it done — it looks right in a browser preview and then renders as a plain blue underlined link in Outlook.",
      'Forgetting display: inline-block (or block) on the <a> — without it, the padding meant to make the clickable area feel button-sized doesn\'t apply the way expected.',
    ],
    example: '<table role="presentation"><tr>\n  <td bgcolor="#2563eb" style="border-radius: 4px;">\n    <a href="#" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none;">Shop now</a>\n  </td>\n</tr></table>',
    related: ['bgcolor + background-color'],
  },
  {
    tag: 'width/height attributes on <img>',
    category: 'images & buttons',
    stats: {
      type: 'attribute',
      appliesTo: '<img> tags in email',
      screenReaderEffect: 'n/a',
      commonValues: 'width="120" height="40" (pixel values, no unit)',
    },
    whatItDoes:
      'Reserves the image\'s exact space in the layout before it loads — which matters far more in email than on the web, since a large share of clients block images by default until the recipient opts in.',
    whereItGoes: 'On every <img> tag in an email, alongside its src and alt.',
    mistakes: [
      "Relying on CSS width/height instead of the HTML attributes — several clients that strip <style> blocks strip inline CSS sizing too, but still respect the plain HTML attributes.",
      "Skipping alt text because \"the image says it all\" — with images blocked by default, alt text is often the only thing the recipient sees at all until they choose to load images.",
    ],
    example: '<img src="hero.png" alt="Summer sale, 30% off" width="600" height="200" style="display: block;">',
    related: [],
  },
  {
    tag: 'XHTML doctype + MSO conditionals',
    category: 'client quirks',
    stats: {
      type: 'doctype + comment syntax',
      appliesTo: 'the whole email document, and any Outlook-only markup within it',
      screenReaderEffect: 'n/a',
      commonValues: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ...>',
    },
    whatItDoes:
      "Outlook on Windows renders using Word's HTML engine, not a real browser engine — the XHTML 1.0 Transitional doctype is what that engine expects. MSO conditional comments (<!--[if mso]-->...<!--[endif]-->) then let markup be aimed at Outlook specifically, invisible to every other client that just sees an HTML comment.",
    whereItGoes: 'The doctype goes at the very top of the file. MSO conditionals wrap any Outlook-specific fallback markup, typically extra table wrappers for layout Outlook otherwise mangles.',
    mistakes: [
      "Using a modern HTML5 doctype (<!DOCTYPE html>) out of habit — Outlook's Word engine handles it far less predictably than the XHTML doctype the ecosystem has standardized on.",
      'Writing real content inside an MSO conditional block that other clients also need to see — anything inside <!--[if mso]--> is invisible everywhere except Outlook.',
    ],
    example: '<!--[if mso]>\n<table role="presentation" width="600" align="center"><tr><td>\n<![endif]-->\n  <div style="max-width: 600px; margin: 0 auto;">Content</div>\n<!--[if mso]>\n</td></tr></table>\n<![endif]-->',
    related: ['nested centering table'],
  },
  {
    tag: 'preheader text',
    category: 'client quirks',
    stats: {
      type: 'hidden markup pattern',
      appliesTo: 'the start of the email body',
      screenReaderEffect: 'read normally, since it is real text, just visually hidden',
      commonValues: 'display:none; max-height:0; overflow:hidden;',
    },
    whatItDoes:
      "Most inbox lists show a short preview snippet next to the subject line, pulled from whatever text comes first in the email body. Preheader text is a deliberately written, visually hidden line placed right after <body> so that preview shows something chosen on purpose instead of whatever stray text (like \"View in browser\") happened to load first.",
    whereItGoes: 'Immediately inside <body>, before the visible layout tables begin.',
    mistakes: [
      "Forgetting it entirely — the inbox preview then shows the first visible text in the email, often something unhelpful like a \"having trouble viewing this?\" link.",
      "Writing a preheader shorter than what most inbox previews display — some clients pad the empty space by pulling in whatever text comes right after it, showing an odd trailing fragment.",
    ],
    example: '<body>\n  <div style="display:none; max-height:0; overflow:hidden;">\n    Your order has shipped — track it inside.\n  </div>\n  <table role="presentation" width="100%">...</table>\n</body>',
    related: ['nested centering table'],
  },
];

export function getEmailNestEntry(tag: string): NestEntry | undefined {
  return EMAIL_NEST.find((e) => e.tag === tag);
}
