import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './lib/ThemeContext.tsx'

const app = (
  <StrictMode>
    <ThemeProvider>
      {/* Synchronous navigations: the page transitions (TransitionLink) need
          the new page in the DOM in the same tick they start. */}
      <BrowserRouter useTransitions={false}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

const root = document.getElementById('root')!

// Public pages arrive as finished HTML (scripts/prerender.mjs), so React
// takes over the page that is already there instead of drawing it again.
// Pages without it (the app shell for deeper workspace addresses) render
// from scratch.
if (root.dataset.prerendered !== undefined) {
  hydrateRoot(root, app, {
    // The prerendered page is what a first-time visitor sees. A returning
    // learner's saved progress or theme can differ from it; React then
    // quietly redraws that part, which is expected, so it is not logged.
    onRecoverableError: (error) => {
      if (import.meta.env.DEV) console.warn('hydration redraw:', error)
    },
  })
} else {
  createRoot(root).render(app)
}
