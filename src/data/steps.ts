export type Step = {
  tag: string;
  why: string;
  insert: string;
};

export const STEPS: Step[] = [
  {
    tag: '<!DOCTYPE html>',
    why: 'Every page starts by telling the browser "this is modern HTML." Nothing renders correctly without it.',
    insert: '<!DOCTYPE html>\n',
  },
  {
    tag: '<html></html>',
    why: 'The root container. Everything else on the page lives inside these two tags.',
    insert: '<html>\n\n</html>\n',
  },
  {
    tag: '<head></head>',
    why: "Holds information about the page that visitors don't see directly, like its title.",
    insert: '  <head>\n\n  </head>\n',
  },
  {
    tag: '<title></title>',
    why: 'The text shown in the browser tab. Goes inside <head>.',
    insert: '    <title>My First Page</title>\n',
  },
  {
    tag: '<body></body>',
    why: 'Everything visitors actually see and click goes inside here.',
    insert: '  <body>\n\n  </body>\n',
  },
  {
    tag: '<h1></h1>',
    why: 'A big heading, the most important line of text on the page. Goes inside <body>.',
    insert: '    <h1>Hello, world.</h1>\n',
  },
  {
    tag: '<p></p>',
    why: 'A normal paragraph of text. Sits right alongside your heading.',
    insert: '    <p>This is my first paragraph.</p>\n',
  },
];
