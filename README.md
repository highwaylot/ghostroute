# Tagsmiths

A live HTML learning site: a step-by-step route showing the next tag to
write and why, a "Check my work" verifier with a progressive hint ladder
instead of hand-holding, a Fix This Code puzzle page, a freeform Sandbox,
and a searchable Key Index glossary.

- **Route** — write each tag yourself, hit Check My Work; wrong attempts
  reveal hints one step at a time (vague → specific → exact).
- **Fix This Code** — small broken-HTML puzzles to debug.
- **Sandbox** — no route, no checks, just a blank page to build on.
- **Reset this step** — clears the editor, kept separate from undo/redo.

Player code runs in a real CodeMirror editor with HTML syntax
highlighting and inline squiggle diagnostics for unclosed tags
(`src/lib/htmlCheck.ts`).

## Dev

```
npm install
npm run dev
```

## Deploy

Hosted on Vercel via its GitHub integration — push to `main` and it
redeploys automatically.
