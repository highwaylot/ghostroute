import { Link } from 'react-router-dom';
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
    desc: 'HTML email has its own rules — a separate track.',
    to: '/html/email',
    ready: false,
  },
  {
    id: 'document',
    label: 'document / resume',
    desc: 'A styled personal page or resume.',
    to: '/html/document',
    ready: false,
  },
  {
    id: 'forms',
    label: 'forms',
    desc: 'Inputs, labels, and validation as their own focused track.',
    to: '/html/forms',
    ready: false,
  },
];

export default function HtmlHub() {
  return (
    <div className="landing">
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
