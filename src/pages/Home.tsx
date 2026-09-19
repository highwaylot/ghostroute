import { Link } from 'react-router-dom';
import './Home.css';

const LANGUAGES = [
  { id: 'html', label: 'html', to: '/html', ready: true },
  { id: 'css', label: 'css', to: '/css', ready: false },
  { id: 'js', label: 'javascript', to: '/javascript', ready: false },
];

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-inner">
        <span className="landing-eyebrow">tagsmiths</span>
        <h1 className="landing-hero">code.</h1>
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
