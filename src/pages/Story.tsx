import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { TransitionLink } from '../components/TransitionLink';
import { Logo } from '../components/Logo';
import { usePageMeta } from '../lib/pageMeta';
import { useTheme } from '../lib/ThemeContext';
import { AI_STORY } from '../data/aiStory';
import { GAME_STORY } from '../data/gameStory';
import type { DemoId, Story as StoryData } from '../data/storyTypes';
import { ElizaDemo } from '../components/demos/ElizaDemo';
import { PerceptronDemo } from '../components/demos/PerceptronDemo';
import { NextWordDemo } from '../components/demos/NextWordDemo';
import { GameFeelDemo } from '../components/demos/GameFeelDemo';
import './Story.css';

const STORIES: Record<StoryData['id'], StoryData> = { ai: AI_STORY, 'game-design': GAME_STORY };

const DEMOS: Record<DemoId, () => ReactNode> = {
  eliza: () => <ElizaDemo />,
  perceptron: () => <PerceptronDemo />,
  nextword: () => <NextWordDemo />,
  gamefeel: () => <GameFeelDemo />,
};

const PART_TITLES: Record<string, string> = {
  history: 'Part one: the history',
  ideas: 'Part two: how games are designed',
};

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The history sections: one long page per story, told in eras, with an
// era index that follows you down the page (a sidebar on wide screens, a
// row of chips on phones). Reading pages, so they follow the light/dark
// theme like the workspace; the top bar is navy like every other page, so
// the logo stays put during page transitions.
export default function Story({ id }: { id: StoryData['id'] }) {
  const story = STORIES[id];
  const other = id === 'ai' ? GAME_STORY : AI_STORY;
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState(story.eras[0].id);
  const chipsRef = useRef<HTMLDivElement>(null);

  usePageMeta({ title: story.meta.title, description: story.meta.description, path: story.path });

  // Arriving at /ai#some-era jumps there; otherwise start at the top.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    target.scrollIntoView({ block: 'start' });
    // The page settles in from 98.5% scale, so a jump measured mid-animation
    // lands short. Aim again once it has finished.
    const main = document.getElementById('story-main');
    const again = () => target.scrollIntoView({ block: 'start' });
    main?.addEventListener('animationend', again, { once: true });
    return () => main?.removeEventListener('animationend', again);
  }, [story]);

  // Which era is on screen: the last one whose top has passed a line a
  // third of the way down the window.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight / 3;
        let current = story.eras[0].id;
        for (const era of story.eras) {
          const el = document.getElementById(era.id);
          if (el && el.getBoundingClientRect().top <= line) current = era.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [story]);

  // Keep the active chip visible in the phone chip row by scrolling the row
  // itself (scrollIntoView would also move the page).
  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-era="${active}"]`);
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    const left = chip.offsetLeft - row.clientWidth / 2 + chip.offsetWidth / 2;
    row.scrollTo({ left, behavior: reduceMotion() ? 'auto' : 'smooth' });
  }, [active]);

  const goTo = (e: React.MouseEvent, eraId: string) => {
    const el = document.getElementById(eraId);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${eraId}`);
    // Move focus with the view, for keyboard and screen reader users.
    el.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  };

  const eraLinks = (className: string) =>
    story.eras.map((era, i) => (
      <Fragment key={era.id}>
        {era.part && era.part !== story.eras[i - 1]?.part && <span className={`${className}-part`}>{era.part}</span>}
        <a
          href={`#${era.id}`}
          data-era={era.id}
          className={`${className}-link ${active === era.id ? 'active' : ''}`}
          aria-current={active === era.id ? 'location' : undefined}
          onClick={(e) => goTo(e, era.id)}
        >
          <span className={`${className}-title`}>{era.title}</span>
          <span className={`${className}-years`}>{era.years}</span>
        </a>
      </Fragment>
    ));

  return (
    <div className="story">
      <a className="story-skip" href="#story-main">
        Skip to the story
      </a>
      <header className="story-topbar">
        <TransitionLink to="/" className="brand-row story-brand" aria-label="tagsmiths home">
          <Logo size={20} />
        </TransitionLink>
        <nav className="story-switch" aria-label="Stories">
          {[AI_STORY, GAME_STORY].map((s) => (
            <TransitionLink key={s.id} to={s.path} className={`story-switch-link ${s.id === id ? 'active' : ''}`} aria-current={s.id === id ? 'page' : undefined}>
              {s.label}
            </TransitionLink>
          ))}
        </nav>
        <button type="button" className="story-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </header>

      <div className="story-chips" ref={chipsRef} aria-label="Eras">
        {eraLinks('story-chip')}
      </div>

      <div className="story-layout">
        <nav className="story-index" aria-label="Eras">
          {eraLinks('story-index')}
        </nav>

        <main className="story-main view-settle" id="story-main" tabIndex={-1}>
          <header className="story-hero">
            <span className="story-eyebrow">{story.eyebrow}</span>
            <h1 className="story-h1">{story.title}</h1>
            <p className="story-intro">{story.intro}</p>
            <aside className="story-bigidea">
              <h2 className="story-bigidea-title">{story.bigIdea.title}</h2>
              <p>{story.bigIdea.text}</p>
            </aside>
          </header>

          {story.eras.map((era, i) => (
            <Fragment key={era.id}>
              {era.part && era.part !== story.eras[i - 1]?.part && <p className="story-part">{PART_TITLES[era.part] ?? era.part}</p>}
              <section className="story-era" id={era.id} aria-labelledby={`${era.id}-h`}>
                <div className="story-era-head">
                  <span className="story-era-years">{era.years}</span>
                  <h2 id={`${era.id}-h`} className="story-era-title" tabIndex={-1}>
                    {era.title}
                  </h2>
                  <p className="story-era-blurb">{era.blurb}</p>
                </div>
                <ol className="story-timeline">
                  {era.entries.map((entry) => (
                    <li key={entry.title} className="story-entry">
                      <span className="story-year">{entry.year}</span>
                      <div className="story-entry-body">
                        <h3 className="story-entry-title">{entry.title}</h3>
                        <p className="story-entry-text">{entry.text}</p>
                        {entry.demo && DEMOS[entry.demo]()}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Fragment>
          ))}

          <section className="story-sources" aria-labelledby="sources-h">
            <h2 id="sources-h" className="story-sources-title">
              Sources and further reading
            </h2>
            <ul>
              {story.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="story-small">
              Spotted a mistake? Dates in history are often argued over. Where sources disagree, this page says "about" or "by one estimate."
            </p>
          </section>

          <footer className="story-next">
            <TransitionLink to={other.path} className="story-next-card">
              <span className="story-eyebrow">next story</span>
              <span className="story-next-title">{other.title}</span>
              <span className="story-next-go">read the {other.label} story →</span>
            </TransitionLink>
            <p className="story-small">
              <TransitionLink to="/">← back to code.</TransitionLink> · tagsmiths is a hobby project by{' '}
              <a href="https://fenwickvale.com" rel="noopener">
                Fenwick &amp; Vale
              </a>
              . No accounts, no cookies, no analytics.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
