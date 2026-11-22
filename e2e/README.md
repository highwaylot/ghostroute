# Browser checks

End-to-end checks against the production build, served the way Vercel
serves it (clean URLs, rewrites, real 404s). They use Playwright, which is
not a dependency of the site; install it wherever you run these.

```sh
npm run build
node e2e/serve.mjs &          # http://localhost:4173, mimics vercel.json
node e2e/seo.cjs              # prerendered HTML, takeover, sitemap, no-JS
node e2e/app.cjs              # workspace, transitions, logo position
node e2e/stories.cjs          # the ai and game design pages and demos
```

Set `CHROMIUM_PATH` to use a Chromium that Playwright did not install.
Build with `VERCEL_ENV=preview` to see a staging build: every page is then
`noindex, nofollow` and robots.txt disallows everything.
