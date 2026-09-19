export type Step = {
  tag: string;
  why: string;
  hints: string[];
  check: (code: string) => boolean;
};

const has = (code: string, re: RegExp) => re.test(code);

export const STEPS: Step[] = [
  {
    tag: '<!DOCTYPE html>',
    why: 'Every page starts by telling the browser "this is modern HTML." Nothing renders correctly without it.',
    hints: [
      'Every HTML page starts with one special line, before any tags.',
      'It starts with <!DOCTYPE and ends with a closing >.',
      'Type exactly: <!DOCTYPE html>',
    ],
    check: (code) => has(code, /<!DOCTYPE\s+html\s*>/i),
  },
  {
    tag: '<html></html>',
    why: 'The root container. Everything else on the page lives inside these two tags.',
    hints: [
      'Add a tag that wraps the entire rest of the page.',
      'It has an opening and closing form: <html> ... </html>.',
      'Type an opening <html> tag and a closing </html> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<html[^>]*>/i) && has(code, /<\/html>/i),
  },
  {
    tag: '<head></head>',
    why: "Holds information about the page that visitors don't see directly, like its title.",
    hints: [
      'Add a section inside <html> for page info that is not shown directly.',
      'It has an opening and closing form: <head> ... </head>.',
      'Type an opening <head> tag and a closing </head> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<head[^>]*>/i) && has(code, /<\/head>/i),
  },
  {
    tag: '<title></title>',
    why: 'The text shown in the browser tab. Goes inside <head>.',
    hints: [
      'Add a tag inside <head> that names the browser tab.',
      'It has an opening and closing form: <title> ... </title>.',
      'Type: <title>My First Page</title>',
    ],
    check: (code) => has(code, /<title[^>]*>[^<]*<\/title>/i),
  },
  {
    tag: '<body></body>',
    why: 'Everything visitors actually see and click goes inside here.',
    hints: [
      'Add a section, as a sibling of <head>, for everything visible.',
      'It has an opening and closing form: <body> ... </body>.',
      'Type an opening <body> tag and a closing </body> tag, with a blank line between.',
    ],
    check: (code) => has(code, /<body[^>]*>/i) && has(code, /<\/body>/i),
  },
  {
    tag: '<h1></h1>',
    why: 'A big heading, the most important line of text on the page. Goes inside <body>.',
    hints: [
      'Add the biggest heading tag inside <body>.',
      'It has an opening and closing form: <h1> ... </h1>.',
      'Type: <h1>Hello, world.</h1>',
    ],
    check: (code) => has(code, /<h1[^>]*>[^<]*<\/h1>/i),
  },
  {
    tag: '<p></p>',
    why: 'A normal paragraph of text. Sits right alongside your heading.',
    hints: [
      'Add a paragraph tag inside <body>, near your heading.',
      'It has an opening and closing form: <p> ... </p>.',
      'Type: <p>This is my first paragraph.</p>',
    ],
    check: (code) => has(code, /<p[^>]*>[^<]*<\/p>/i),
  },
];
