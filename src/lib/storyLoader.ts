type StoryModule = typeof import('../pages/Story');

// Same pattern as workspaceLoader: the history pages (both stories, their
// demos) are one chunk, fetched on demand and kept once loaded so later
// visits render without a Suspense fallback.
let loaded: StoryModule | null = null;

export const loadStory = () =>
  import('../pages/Story').then((m) => {
    loaded = m;
    return m;
  });

export const getLoadedStory = () => loaded;
