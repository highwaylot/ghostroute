import { Link } from 'react-router-dom';
import './Home.css';

type Props = {
  title: string;
  backTo: string;
  backLabel: string;
};

export default function ComingSoon({ title, backTo, backLabel }: Props) {
  return (
    <div className="landing">
      <div className="landing-inner">
        <Link to={backTo} className="landing-back">
          ← {backLabel}
        </Link>
        <span className="landing-eyebrow">{title}</span>
        <h1 className="landing-hero landing-hero-sub">coming soon.</h1>
        <p className="landing-blurb">This track isn't built yet — html/website is the only live one right now.</p>
      </div>
    </div>
  );
}
