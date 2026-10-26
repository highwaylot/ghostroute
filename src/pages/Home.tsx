import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { CodeFlow } from '../components/CodeFlow';
import { SiteFooter } from '../components/SiteFooter';
import { usePageMeta } from '../lib/pageMeta';
import './Home.css';

const LANGUAGES = [
  { id: 'html', label: 'html', to: '/html', ready: true },
  // CSS has no hub page (one track, not several), so it goes straight to
  // its workspace rather than through a chooser the way html does.
  { id: 'css', label: 'css', to: '/css/website', ready: true },
  { id: 'js', label: 'javascript', to: '/javascript', ready: false },
];

export default function Home() {
  usePageMeta({
    title: 'tagsmiths — learn HTML and CSS by writing real code in your browser',
    description:
      'Free, in-browser lessons: write real HTML and CSS and watch it render as you type. Guided steps, debugging puzzles and a full reference. No sign-up.',
    path: '/',
  });
  return (
    <div className="landing">
      <CodeFlow />
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <main className="landing-inner">
        <h1 className="landing-hero">code.</h1>
        <p className="landing-mission">we bring the complexity of code to the average person</p>
        <p className="landing-what">
          Learn HTML and CSS by writing real code in your browser and watching it render as you type. Free, no
          sign-up, and your work saves in this browser.
        </p>
        <div className="landing-tiles">
          {LANGUAGES.map((lang) => (
            <Link key={lang.id} to={lang.to} className="landing-tile">
              <span className="landing-tile-label">{lang.label}</span>
              {!lang.ready && <span className="landing-tile-badge">coming soon</span>}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
