import { useEffect, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { PreviewFrame } from './PreviewFrame';
import { DiagnosticsPanel } from './DiagnosticsPanel';

export const MY_PROJECTS_KEY = 'tagsmiths-my-projects';

export type SavedProject = {
  id: string;
  name: string;
  code: string;
  savedAt: number;
};

const BLANK_STARTER = `<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
  </head>
  <body>
    <h1>New project</h1>
  </body>
</html>
`;

export function loadMyProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(MY_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMyProjects(projects: SavedProject[]) {
  try {
    localStorage.setItem(MY_PROJECTS_KEY, JSON.stringify(projects));
  } catch {
    // storage unavailable — nothing to do
  }
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `p${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Shared with SandboxPane's "save to my projects" action, so a save from
// Sandbox and one made inside My Projects itself go through the same path.
export function saveAsMyProject(name: string, code: string): void {
  const projects = loadMyProjects();
  const proj: SavedProject = { id: newId(), name, code, savedAt: Date.now() };
  saveMyProjects([proj, ...projects]);
}

export function MyProjectsPane() {
  const [projects, setProjects] = useState<SavedProject[]>(loadMyProjects);
  const [activeId, setActiveId] = useState<string | null>(() => loadMyProjects()[0]?.id ?? null);

  useEffect(() => {
    saveMyProjects(projects);
  }, [projects]);

  const active = projects.find((p) => p.id === activeId) ?? null;

  const handleNew = () => {
    const name = window.prompt('Name this project:', 'Untitled project');
    if (!name) return;
    const proj: SavedProject = { id: newId(), name, code: BLANK_STARTER, savedAt: Date.now() };
    setProjects((prev) => [proj, ...prev]);
    setActiveId(proj.id);
  };

  const handleRename = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    const name = window.prompt('Rename project:', proj.name);
    if (!name) return;
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const handleDelete = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    if (!window.confirm(`Delete "${proj.name}"? This can't be undone.`)) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleCodeChange = (code: string) => {
    if (!activeId) return;
    setProjects((prev) => prev.map((p) => (p.id === activeId ? { ...p, code } : p)));
  };

  return (
    <div className="myprojects-pane">
      <div className="myprojects-list">
        <button className="myprojects-new" onClick={handleNew}>
          + new project
        </button>
        {projects.length === 0 && (
          <p className="myprojects-empty">
            Nothing saved yet. Create one here, or use "save to my projects" from Sandbox.
          </p>
        )}
        {projects.map((p) => (
          <div key={p.id} className={`myprojects-item ${activeId === p.id ? 'active' : ''}`}>
            <button className="myprojects-item-name" onClick={() => setActiveId(p.id)}>
              {p.name}
            </button>
            <div className="myprojects-item-actions">
              <button onClick={() => handleRename(p.id)} title="Rename">
                ✎
              </button>
              <button onClick={() => handleDelete(p.id)} title="Delete">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {active ? (
        <div className="myprojects-body">
          <EditorPanel label={`active coding window — ${active.name}`} className="code-panel">
            <CodeEditor value={active.code} onChange={handleCodeChange} />
          </EditorPanel>
          <EditorPanel label="output" className="output-panel">
            <PreviewFrame code={active.code} title="my project preview" />
          </EditorPanel>
          <DiagnosticsPanel code={active.code} />
        </div>
      ) : (
        <div className="myprojects-body myprojects-placeholder">
          <p>Select a project on the left, or create a new one.</p>
        </div>
      )}
    </div>
  );
}
