import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { SiteFooter } from '../components/SiteFooter';
import { usePageMeta } from '../lib/pageMeta';
import './Home.css';

const TRACKS = [
  {
    id: 'website',
    label: 'website',
    desc: 'Structure, text, lists, links, media, layout — build a real page.',
    to: '/html/website',
    ready: true,
  },
  {
    id: 'email',
    label: 'email template',
    desc: 'Table layouts, inline styles, and client quirks — a genuinely different ruleset.',
    to: '/html/email',
    ready: true,
  },
];

export default function HtmlHub() {
  usePageMeta({
    title: 'HTML · tagsmiths',
    description: 'Pick an HTML track on tagsmiths: build a real web page, or build an email that survives Gmail and Outlook.',
    path: '/html',
  });
  return (
    <div className="landing">
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <main className="landing-inner">
        <Link to="/" className="landing-back">
          ← code.
        </Link>
        <span className="landing-eyebrow">html</span>
        <h1 className="landing-hero landing-hero-sub">what are you building?</h1>
        <div className="landing-tiles landing-tiles-grid">
          {TRACKS.map((track) => (
            <Link key={track.id} to={track.to} className="landing-tile landing-tile-card">
              <span className="landing-tile-label">{track.label}</span>
              <span className="landing-tile-desc">{track.desc}</span>
              {!track.ready && <span className="landing-tile-badge">coming soon</span>}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
