import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { CodeFlow } from '../components/CodeFlow';
import './Home.css';

const LANGUAGES = [
  { id: 'html', label: 'html', to: '/html', ready: true },
  // CSS has no hub page (one track, not several), so it goes straight to
  // its workspace rather than through a chooser the way html does.
  { id: 'css', label: 'css', to: '/css/website', ready: true },
  { id: 'js', label: 'javascript', to: '/javascript', ready: false },
];

export default function Home() {
  return (
    <div className="landing">
      <CodeFlow />
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <div className="landing-inner">
        <h1 className="landing-hero">code.</h1>
        <p className="landing-mission">Average Joe Coding Dimenium</p>
        <div className="landing-tiles">
          {LANGUAGES.map((lang) => (
            <Link key={lang.id} to={lang.to} className="landing-tile">
              <span className="landing-tile-label">{lang.label}</span>
              {!lang.ready && <span className="landing-tile-badge">coming soon</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
