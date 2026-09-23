export type KeyEntry = {
  tag: string;
  category: string;
  desc: string;
  example: string;
};

export const KEY_INDEX: KeyEntry[] = [
  {
    tag: '<!DOCTYPE html>',
    category: 'document',
    desc: 'The very first line of any HTML page. Tells the browser to use modern rules.',
    example: '<!DOCTYPE html>',
  },
  {
    tag: '<html>',
    category: 'document',
    desc: 'The root element. Everything else lives inside it.',
    example: '<html>\n  ...\n</html>',
  },
  {
    tag: 'lang=""',
    category: 'document',
    desc: 'Declares the page\'s language, on <html>. Screen readers and translation tools rely on it.',
    example: '<html lang="en">',
  },
  {
    tag: '<meta name="viewport">',
    category: 'document',
    desc: 'Tells mobile browsers to render at the device\'s actual width instead of zoomed-out desktop scale. Goes in <head>.',
    example: '<meta name="viewport" content="width=device-width, initial-scale=1">',
  },
  {
    tag: '<head>',
    category: 'document',
    desc: 'Page metadata: title, styles, scripts. Not shown directly to visitors.',
    example: '<head>\n  <title>My Page</title>\n</head>',
  },
  {
    tag: '<title>',
    category: 'document',
    desc: 'The text shown in the browser tab. Goes inside <head>.',
    example: '<title>About Me</title>',
  },
  {
    tag: '<body>',
    category: 'document',
    desc: 'Everything visible on the page lives here.',
    example: '<body>\n  <h1>Hello</h1>\n</body>',
  },
  {
    tag: '<meta charset="utf-8">',
    category: 'document',
    desc: 'Tells the browser which characters your text uses. Almost always utf-8. Goes in <head>.',
    example: '<meta charset="utf-8">',
  },
  {
    tag: '<h1> – <h6>',
    category: 'text',
    desc: 'Headings, biggest to smallest. Use one <h1> per page.',
    example: '<h1>Main title</h1>\n<h2>Section</h2>',
  },
  {
    tag: '<p>',
    category: 'text',
    desc: 'A paragraph of normal text.',
    example: '<p>This is a paragraph.</p>',
  },
  {
    tag: '<strong>',
    category: 'text',
    desc: 'Marks text as important. Browsers show it bold.',
    example: 'This is <strong>important</strong>.',
  },
  {
    tag: '<em>',
    category: 'text',
    desc: 'Marks text with emphasis. Browsers show it italic.',
    example: 'This is <em>emphasized</em>.',
  },
  {
    tag: '<br>',
    category: 'text',
    desc: 'A line break. Has no closing tag.',
    example: 'Line one<br>\nLine two',
  },
  {
    tag: '<hr>',
    category: 'text',
    desc: 'A horizontal divider line. Has no closing tag.',
    example: '<p>Above</p>\n<hr>\n<p>Below</p>',
  },
  {
    tag: '<small>',
    category: 'text',
    desc: 'Marks text as a side comment or fine print — legal text, disclaimers.',
    example: '<small>Terms apply.</small>',
  },
  {
    tag: '<mark>',
    category: 'text',
    desc: 'Highlights text, like a highlighter pen. Browsers show a yellow background.',
    example: 'Search result: <mark>found it</mark>',
  },
  {
    tag: '<blockquote>',
    category: 'text',
    desc: 'A quoted block of text from another source, usually indented by the browser.',
    example: '<blockquote>To be or not to be.</blockquote>',
  },
  {
    tag: '<code> / <pre>',
    category: 'text',
    desc: '<code> marks inline code. <pre> preserves whitespace/line breaks exactly as typed — use together for code blocks.',
    example: '<pre><code>let x = 5;</code></pre>',
  },
  {
    tag: '<a href="">',
    category: 'links & media',
    desc: 'A clickable link. href is where it goes.',
    example: '<a href="https://example.com">Visit</a>',
  },
  {
    tag: 'target="_blank" / rel=""',
    category: 'links & media',
    desc: 'target="_blank" opens the link in a new tab. Always pair it with rel="noopener" — without it, the new tab gets risky access back to this page.',
    example: '<a href="https://example.com" target="_blank" rel="noopener">Visit</a>',
  },
  {
    tag: '<img src="" alt="">',
    category: 'links & media',
    desc: 'Shows an image. src is the file, alt is a text backup for screen readers and broken images.',
    example: '<img src="cat.jpg" alt="A sleeping cat">',
  },
  {
    tag: '<figure> / <figcaption>',
    category: 'links & media',
    desc: 'Groups an image (or other media) with a caption that describes it.',
    example: '<figure>\n  <img src="cat.jpg" alt="Cat">\n  <figcaption>My cat.</figcaption>\n</figure>',
  },
  {
    tag: '<ul> / <li>',
    category: 'lists',
    desc: 'A bullet list. Each item is an <li> inside a <ul>.',
    example: '<ul>\n  <li>First</li>\n  <li>Second</li>\n</ul>',
  },
  {
    tag: '<ol> / <li>',
    category: 'lists',
    desc: 'A numbered list. Same idea as <ul>, but ordered.',
    example: '<ol>\n  <li>Step one</li>\n  <li>Step two</li>\n</ol>',
  },
  {
    tag: '<div>',
    category: 'grouping',
    desc: 'An invisible box used to group things together for layout.',
    example: '<div>\n  <p>Grouped content</p>\n</div>',
  },
  {
    tag: '<span>',
    category: 'grouping',
    desc: 'Like <div> but for a small chunk of text inline.',
    example: 'Some <span>highlighted</span> words.',
  },
  {
    tag: 'class=""',
    category: 'grouping',
    desc: 'Labels an element so CSS or JS can target it. Reusable across many elements.',
    example: '<p class="highlight">Styled text</p>',
  },
  {
    tag: 'id=""',
    category: 'grouping',
    desc: 'A unique name for one specific element on the page. Should only appear once.',
    example: '<h1 id="main-title">Title</h1>',
  },
  {
    tag: '<header>',
    category: 'layout',
    desc: 'The top introductory section of a page — logo, title, top nav.',
    example: '<header>\n  <h1>Site Name</h1>\n</header>',
  },
  {
    tag: '<nav>',
    category: 'layout',
    desc: 'Marks a block of navigation links, like a menu bar.',
    example: '<nav>\n  <a href="/">Home</a>\n</nav>',
  },
  {
    tag: '<main>',
    category: 'layout',
    desc: 'The primary content of the page. Only one per page.',
    example: '<main>\n  <p>Page content</p>\n</main>',
  },
  {
    tag: '<footer>',
    category: 'layout',
    desc: 'The bottom section of a page, usually credits or links.',
    example: '<footer>\n  <p>&copy; 2025</p>\n</footer>',
  },
  {
    tag: '<table> / <tr> / <td>',
    category: 'layout',
    desc: 'A data table. <tr> is a row, <td> is a cell. <th> is a header cell.',
    example: '<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Ann</td><td>30</td></tr>\n</table>',
  },
  {
    tag: '<button>',
    category: 'forms',
    desc: 'A clickable button.',
    example: '<button>Click me</button>',
  },
  {
    tag: '<input>',
    category: 'forms',
    desc: 'A box the user can type into. type="" changes its behavior (text, email, checkbox...).',
    example: '<input type="text" placeholder="Your name">',
  },
  {
    tag: '<label>',
    category: 'forms',
    desc: 'Text tied to a form control — clicking the label focuses the input. Improves accessibility a lot.',
    example: '<label for="name">Name</label>\n<input id="name">',
  },
  {
    tag: '<select> / <option>',
    category: 'forms',
    desc: 'A dropdown menu. Each <option> is one choice.',
    example: '<select>\n  <option>Red</option>\n  <option>Blue</option>\n</select>',
  },
  {
    tag: '<form>',
    category: 'forms',
    desc: 'Groups inputs together so they can be submitted at once.',
    example: '<form>\n  <input type="text">\n  <button>Submit</button>\n</form>',
  },
  {
    tag: '<!-- comment -->',
    category: 'other',
    desc: 'Notes for humans reading the code. The browser ignores this text.',
    example: '<!-- TODO: replace this placeholder -->',
  },
  {
    tag: '<script>',
    category: 'other',
    desc: 'Where JavaScript code lives, or a link to a separate JS file.',
    example: '<script src="app.js"></script>',
  },
  {
    tag: '<link rel="stylesheet">',
    category: 'other',
    desc: 'Connects a CSS file so it can style this page.',
    example: '<link rel="stylesheet" href="style.css">',
  },
  {
    tag: '<iframe>',
    category: 'links & media',
    desc: 'Embeds a whole separate page inside this one. Always give it a title for accessibility.',
    example: '<iframe src="https://example.com/map" title="Location map"></iframe>',
  },
  {
    tag: '<video>',
    category: 'links & media',
    desc: 'Embeds a video. Needs the controls attribute or visitors can\'t play/pause it.',
    example: '<video src="clip.mp4" controls></video>',
  },
  {
    tag: '<audio>',
    category: 'links & media',
    desc: 'Embeds a sound clip, same deal as <video> — add controls so it\'s playable.',
    example: '<audio src="clip.mp3" controls></audio>',
  },
  {
    tag: '<svg>',
    category: 'links & media',
    desc: 'Draws vector graphics right in the HTML. Meaningful icons need a <title> for accessibility.',
    example: '<svg role="img" viewBox="0 0 20 20">\n  <title>Warning</title>\n  <circle cx="10" cy="10" r="8" />\n</svg>',
  },
  {
    tag: '<template>',
    category: 'other',
    desc: 'Holds markup that isn\'t rendered until JavaScript clones it in. Inert on its own.',
    example: '<template id="row">\n  <li></li>\n</template>',
  },
];

export const KEY_CATEGORIES = Array.from(new Set(KEY_INDEX.map((e) => e.category)));
