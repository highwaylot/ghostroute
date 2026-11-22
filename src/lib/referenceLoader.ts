type ReferenceModule = typeof import('../pages/Reference');

// Same pattern as storyLoader: the reference pages are their own chunk,
// kept once loaded so later visits render without a Suspense fallback.
let loaded: ReferenceModule | null = null;

export const loadReference = () =>
  import('../pages/Reference').then((m) => {
    loaded = m;
    return m;
  });

export const getLoadedReference = () => loaded;
