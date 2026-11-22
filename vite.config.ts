import { execSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The date each kind of content last changed, from git, so "Updated" on a
// page and <lastmod> in the sitemap are real dates, not the build date.
// Falls back to the latest commit's date where a file's history is not in
// the checkout (shallow clones).
const CONTENT_FILES: Record<string, string[]> = {
  ai: ['src/data/aiStory.ts'],
  'game-design': ['src/data/gameStory.ts'],
  'reference-html': ['src/data/nest.ts'],
  'reference-css': ['src/data/cssNest.ts'],
  'reference-email': ['src/data/emailNest.ts'],
  'track-html': ['src/data/steps.ts', 'src/data/chapters.ts'],
  'track-css': ['src/data/cssSteps.ts', 'src/data/cssChapters.ts'],
  'track-email': ['src/data/emailSteps.ts', 'src/data/emailChapters.ts'],
  site: ['src/pages/Home.tsx', 'src/pages/HtmlHub.tsx'],
}

function gitDate(files: string[]): string {
  const run = (cmd: string) => {
    try {
      return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
      return ''
    }
  }
  return run(`git log -1 --format=%cs -- ${files.join(' ')}`) || run('git log -1 --format=%cs') || new Date().toISOString().slice(0, 10)
}

const CONTENT_DATES = Object.fromEntries(Object.entries(CONTENT_FILES).map(([k, files]) => [k, gitDate(files)]))

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: {
    __CONTENT_DATES__: JSON.stringify(CONTENT_DATES),
  },
  build: {
    // The prerender step reads the manifest to link each page's lazy CSS
    // and JS up front, so the static HTML is styled before any JS runs.
    manifest: !isSsrBuild,
    copyPublicDir: !isSsrBuild,
  },
}))
