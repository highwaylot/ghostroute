import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { usePageMeta } from '../lib/pageMeta';
import { usePreloadWorkspace } from '../lib/usePreloadWorkspace';
import './Home.css';

// Unknown paths used to fall through to the landing page with no hint
// that the address was wrong. Now they say so, and are kept out of search.
export default function NotFound() {
  usePreloadWorkspace();
  usePageMeta({
    title: 'Page not found · tagsmiths',
    description: 'That page does not exist on tagsmiths.',
    path: '/404',
    noindex: true,
  });
  return (
    <div className="landing">
      <Link to="/" className="landing-brand" aria-label="tagsmiths home">
        <Logo size={20} />
      </Link>
      <main className="landing-inner view-settle">
        <span className="landing-eyebrow">404</span>
        <h1 className="landing-hero landing-hero-sub">page not found.</h1>
        <p className="landing-blurb">That address does not match anything here.</p>
        <p className="landing-blurb">
          <Link to="/" className="landing-back">
            ← home
          </Link>{' '}
          ·{' '}
          <Link to="/html/website" className="landing-back">
            start the HTML route →
          </Link>
        </p>
      </main>
    </div>
  );
}
