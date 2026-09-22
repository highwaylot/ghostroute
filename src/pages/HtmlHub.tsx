import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
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
  return (
    <div className="landing">
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <div className="landing-inner">
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
      </div>
    </div>
  );
}
