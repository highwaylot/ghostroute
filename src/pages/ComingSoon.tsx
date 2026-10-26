import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { usePageMeta } from '../lib/pageMeta';
import './Home.css';

type Props = {
  title: string;
  backTo: string;
  backLabel: string;
  previewTo?: string;
};

export default function ComingSoon({ title, backTo, backLabel, previewTo }: Props) {
  usePageMeta({
    title: `${title} (coming soon) · tagsmiths`,
    description: `The ${title} track is not built yet. HTML and CSS are live on tagsmiths now.`,
    path: `/${title.toLowerCase()}`,
    noindex: true,
  });
  return (
    <div className="landing">
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <main className="landing-inner">
        <Link to={backTo} className="landing-back">
          ← {backLabel}
        </Link>
        <span className="landing-eyebrow">{title}</span>
        <h1 className="landing-hero landing-hero-sub">coming soon.</h1>
        <p className="landing-blurb">
          {previewTo
            ? "Not finished, but there's an early draft of the Route to poke at."
            : "This track isn't built yet. HTML (website and email) and CSS are live now."}
        </p>
        {!previewTo && (
          <p className="landing-blurb">
            <Link to="/html" className="landing-back">
              html →
            </Link>{' '}
            ·{' '}
            <Link to="/css/website" className="landing-back">
              css →
            </Link>
          </p>
        )}
        {previewTo && (
          <Link to={previewTo} className="landing-back" style={{ marginTop: 8 }}>
            try the early draft →
          </Link>
        )}
      </main>
    </div>
  );
}
