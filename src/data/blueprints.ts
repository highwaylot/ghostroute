export type Blueprint = {
  id: string;
  title: string;
  desc: string;
  code: string;
};

// Full, copy-pasteable page skeletons — the "I know the tags, now how do
// they actually fit together into a real page" gap that per-tag entries
// can't fill on their own.
export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'basic-page',
    title: 'Basic page',
    desc: 'The minimum real page: doctype, metadata, one heading, one paragraph.',
    code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Page Title</h1>
    <p>This is the content of the page.</p>
  </body>
</html>`,
  },
  {
    id: 'header-nav-main-footer',
    title: 'Header + nav + main + footer',
    desc: 'The standard page skeleton most real sites are built on.',
    code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Site</title>
  </head>
  <body>
    <header>
      <h1>Site Name</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>

    <main>
      <h2>Welcome</h2>
      <p>This is the main content of the page.</p>
    </main>

    <footer>
      <p>&copy; 2025 My Site</p>
    </footer>
  </body>
</html>`,
  },
  {
    id: 'blog-post',
    title: 'Blog post',
    desc: 'A single article: title, meta line, body paragraphs, a quote, and an image.',
    code: `<article>
  <h1>How to Learn HTML</h1>
  <p><small>Posted January 1, 2025</small></p>

  <p>Getting started with HTML is easier than it looks.</p>

  <blockquote>
    The best way to learn is by building something real.
  </blockquote>

  <figure>
    <img src="code.jpg" alt="A laptop showing code">
    <figcaption>Writing your first page.</figcaption>
  </figure>

  <p>Keep practicing, and it clicks fast.</p>
</article>`,
  },
  {
    id: 'contact-form',
    title: 'Contact form',
    desc: 'A basic form with labeled fields and a submit button.',
    code: `<form>
  <label for="name">Name</label>
  <input type="text" id="name">

  <label for="email">Email</label>
  <input type="email" id="email">

  <label for="message">Message</label>
  <input type="text" id="message">

  <button>Send</button>
</form>`,
  },
  {
    id: 'card-grid',
    title: 'Card list',
    desc: 'A repeated group of cards — the pattern behind most "list of things" sections.',
    code: `<div class="card">
  <img src="item1.jpg" alt="First item">
  <h3>First Item</h3>
  <p>A short description.</p>
</div>

<div class="card">
  <img src="item2.jpg" alt="Second item">
  <h3>Second Item</h3>
  <p>A short description.</p>
</div>`,
  },
  {
    id: 'data-table',
    title: 'Data table',
    desc: 'Real tabular data with a header row.',
    code: `<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Ann</td>
    <td>92</td>
  </tr>
  <tr>
    <td>Ben</td>
    <td>85</td>
  </tr>
</table>`,
  },
];
