// One place that knows how to load the workspace chunk, shared by the lazy
// route and by the landing pages' background preload. Calling it again is
// free: the browser keeps the module after the first load.
export const loadWorkspace = () => import('../pages/Workspace');
