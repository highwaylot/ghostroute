import { TransitionLink } from '../components/TransitionLink';
import { Logo } from '../components/Logo';
import { usePageMeta } from '../lib/pageMeta';
import { usePreloadWorkspace } from '../lib/usePreloadWorkspace';
import './Home.css';

type Props = {
  title: string;
  backTo: string;
  backLabel: string;
  previewTo?: string;
};

export default function ComingSoon({ title, backTo, backLabel, previewTo }: Props) {
  usePreloadWorkspace();
  usePageMeta({
    title: `${title} (coming soon) · tagsmiths`,
    description: `The ${title} track is not built yet. HTML and CSS are live on tagsmiths now.`,
    path: `/${title.toLowerCase()}`,
    noindex: true,
  });
  return (
    <div className="landing">
      <TransitionLink to="/" className="landing-brand">
        <Logo size={20} />
      </TransitionLink>
      <main className="landing-inner view-settle">
        <TransitionLink to={backTo} className="landing-back">
          ← {backLabel}
        </TransitionLink>
        <span className="landing-eyebrow">{title}</span>
        <h1 className="landing-hero landing-hero-sub">coming soon.</h1>
        <p className="landing-blurb">
          {previewTo
            ? "Not finished, but there's an early draft of the Route to poke at."
            : "This track isn't built yet. HTML (website and email) and CSS are live now."}
        </p>
        {!previewTo && (
          <p className="landing-blurb">
            <TransitionLink to="/html" className="landing-back">
              html →
            </TransitionLink>{' '}
            ·{' '}
            <TransitionLink to="/css/website" className="landing-back">
              css →
            </TransitionLink>
          </p>
        )}
        {previewTo && (
          <TransitionLink to={previewTo} className="landing-back" style={{ marginTop: 8 }}>
            try the early draft →
          </TransitionLink>
        )}
      </main>
    </div>
  );
}
