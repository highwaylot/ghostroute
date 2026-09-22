import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import './Home.css';

type Props = {
  title: string;
  backTo: string;
  backLabel: string;
  previewTo?: string;
};

export default function ComingSoon({ title, backTo, backLabel, previewTo }: Props) {
  return (
    <div className="landing">
      <Link to="/" className="landing-brand">
        <Logo size={20} />
      </Link>
      <div className="landing-inner">
        <Link to={backTo} className="landing-back">
          ← {backLabel}
        </Link>
        <span className="landing-eyebrow">{title}</span>
        <h1 className="landing-hero landing-hero-sub">coming soon.</h1>
        <p className="landing-blurb">
          {previewTo
            ? "Not finished, but there's an early draft of the Route to poke at."
            : 'This track isn\'t built yet — html/website is the only live one right now.'}
        </p>
        {previewTo && (
          <Link to={previewTo} className="landing-back" style={{ marginTop: 8 }}>
            try the early draft →
          </Link>
        )}
      </div>
    </div>
  );
}
