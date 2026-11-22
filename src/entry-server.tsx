import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';
import { ThemeProvider } from './lib/ThemeContext';
import { takeSsrMeta } from './lib/pageMeta';

// Build-time only (scripts/prerender.ts): renders one route to HTML,
// waiting for lazy pages, and returns the <head> values the page asked
// for through usePageMeta.
export async function render(url: string) {
  const { prelude } = await prerender(
    <StrictMode>
      <ThemeProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </StrictMode>,
  );
  const html = await new Response(prelude).text();
  return { html, meta: takeSsrMeta() };
}
export { getRoutes } from './lib/seo';
