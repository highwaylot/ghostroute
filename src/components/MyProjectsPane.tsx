import { useEffect, useRef, useState } from 'react';
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
  const [creating, setCreating] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const newInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveMyProjects(projects);
  }, [projects]);

  useEffect(() => {
    if (creating) newInputRef.current?.focus();
  }, [creating]);

  useEffect(() => {
    if (renamingId) renameInputRef.current?.focus();
  }, [renamingId]);

  const active = projects.find((p) => p.id === activeId) ?? null;

  const startCreate = () => {
    setCreating(true);
    setNameDraft('');
  };

  // Starts genuinely blank — no boilerplate template — so it's the user's
  // page from the first character, not a fill-in-the-blank of ours.
  const confirmCreate = () => {
    const name = nameDraft.trim();
    if (!name) return;
    const proj: SavedProject = { id: newId(), name, code: '', savedAt: Date.now() };
    setProjects((prev) => [proj, ...prev]);
    setActiveId(proj.id);
    setCreating(false);
  };

  const startRename = (id: string, currentName: string) => {
    setRenamingId(id);
    setRenameDraft(currentName);
    setConfirmDeleteId(null);
  };

  const confirmRename = () => {
    const name = renameDraft.trim();
    if (name && renamingId) {
      setProjects((prev) => prev.map((p) => (p.id === renamingId ? { ...p, name } : p)));
    }
    setRenamingId(null);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
    setConfirmDeleteId(null);
  };

  const handleCodeChange = (code: string) => {
    if (!activeId) return;
    setProjects((prev) => prev.map((p) => (p.id === activeId ? { ...p, code } : p)));
  };

  return (
    <div className="myprojects-pane">
      <div className="myprojects-list">
        {creating ? (
          <div className="myprojects-new-form">
            <input
              ref={newInputRef}
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmCreate();
                if (e.key === 'Escape') setCreating(false);
              }}
              placeholder="Project name…"
            />
            <div className="myprojects-new-form-actions">
              <button className="myprojects-confirm" onClick={confirmCreate} disabled={!nameDraft.trim()}>
                create
              </button>
              <button className="myprojects-cancel" onClick={() => setCreating(false)}>
                cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="myprojects-new" onClick={startCreate}>
            + new project
          </button>
        )}

        {projects.length === 0 && !creating && (
          <p className="myprojects-empty">
            Nothing saved yet. Create one here, or use "save to my projects" from Sandbox.
          </p>
        )}

        {projects.map((p) => (
          <div key={p.id} className={`myprojects-item ${activeId === p.id ? 'active' : ''}`}>
            {renamingId === p.id ? (
              <input
                ref={renameInputRef}
                className="myprojects-rename-input"
                value={renameDraft}
                onChange={(e) => setRenameDraft(e.target.value)}
                onBlur={confirmRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmRename();
                  if (e.key === 'Escape') setRenamingId(null);
                }}
              />
            ) : confirmDeleteId === p.id ? (
              <div className="myprojects-confirm-delete">
                <span>Delete?</span>
                <button onClick={() => handleDelete(p.id)}>yes</button>
                <button onClick={() => setConfirmDeleteId(null)}>no</button>
              </div>
            ) : (
              <>
                <button className="myprojects-item-name" onClick={() => setActiveId(p.id)}>
                  {p.name}
                </button>
                <div className="myprojects-item-actions">
                  <button onClick={() => startRename(p.id, p.name)} title="Rename">
                    ✎
                  </button>
                  <button onClick={() => setConfirmDeleteId(p.id)} title="Delete">
                    ×
                  </button>
                </div>
              </>
            )}
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
