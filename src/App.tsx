import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HtmlHub from './pages/HtmlHub';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';
import { loadWorkspace } from './lib/workspaceLoader';

// The workspace carries the code editor, every lesson and both Nest books,
// which is most of the app's weight. Loading it on demand keeps the landing
// pages small; the editor arrives with the first workspace route.
// The landing pages also preload it in the background (usePreloadWorkspace),
// so clicking a track is instant instead of a silent 1-2s wait.
const Workspace = lazy(loadWorkspace);

function Loading() {
  return (
    <div className="route-loading" role="status">
      loading the workspace…
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/html" element={<HtmlHub />} />
      <Route path="/html/website" element={<Workspace />} />
      <Route path="/html/website/:mode" element={<Workspace />} />
      <Route path="/html/website/:mode/:sub" element={<Workspace />} />
      <Route path="/html/website/:mode/:sub/:item" element={<Workspace />} />
      {/* CSS track — same Workspace component, same everything, just a
          different URL prefix so Workspace knows which data set to load.
          No new pages were built for this; see Workspace's `track`. */}
      <Route path="/css/website" element={<Workspace />} />
      <Route path="/css/website/:mode" element={<Workspace />} />
      <Route path="/css/website/:mode/:sub" element={<Workspace />} />
      <Route path="/css/website/:mode/:sub/:item" element={<Workspace />} />
      {/* Email track — same Workspace, same reasoning as CSS above. */}
      <Route path="/html/email" element={<Workspace />} />
      <Route path="/html/email/:mode" element={<Workspace />} />
      <Route path="/html/email/:mode/:sub" element={<Workspace />} />
      <Route path="/html/email/:mode/:sub/:item" element={<Workspace />} />
      {/* The css track shipped — anything still pointing at /css (old
          bookmarks, the former "coming soon" tile) lands on the real thing. */}
      <Route path="/css" element={<Navigate to="/css/website" replace />} />
      <Route
        path="/javascript"
        element={<ComingSoon title="javascript" backTo="/" backLabel="code." />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
}

export default App;
