// One place that knows how to load the workspace chunk, shared by the route
// and by the landing pages' background preload.
type WorkspaceModule = typeof import('../pages/Workspace');

let loaded: WorkspaceModule | null = null;

export const loadWorkspace = () =>
  import('../pages/Workspace').then((m) => {
    loaded = m;
    return m;
  });

// Once the chunk is in memory, the route renders the component directly
// instead of through React.lazy, which suspends for a tick even when the
// code is already there. That tick is what a page transition would catch.
export const getLoadedWorkspace = () => loaded;
