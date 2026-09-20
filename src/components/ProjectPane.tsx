import { useEffect, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';

const STORAGE_KEY = 'tagsmiths-project-bio-page';

function loadCode(starter: string): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? starter;
  } catch {
    return starter;
  }
}

export function ProjectPane() {
  const project = PROJECTS[0];
  const [code, setCode] = useState(() => loadCode(project.starter));
  const [openHint, setOpenHint] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable — nothing to do
    }
  }, [code]);

  const doneCount = project.requirements.filter((r) => r.check(code)).length;

  return (
    <div className="project-pane">
      <div className="project-brief">
        <h2 className="project-title">{project.title}</h2>
        <p className="project-desc">{project.brief}</p>
      </div>

      <div className="project-checklist">
        <span className="project-checklist-count">
          {doneCount} / {project.requirements.length} done
        </span>
        {project.requirements.map((req) => {
          const done = req.check(code);
          const isOpen = openHint === req.id;
          return (
            <div key={req.id} className={`checklist-row ${done ? 'done' : ''}`}>
              <button
                className="checklist-item"
                onClick={() => setOpenHint(isOpen ? null : req.id)}
                disabled={done}
              >
                <span className="checklist-dot" />
                <span>{req.desc}</span>
                {!done && <span className="checklist-hint-toggle">{isOpen ? 'hide hint' : 'need a hint?'}</span>}
              </button>
              {isOpen && !done && <pre className="checklist-hint">{req.hint}</pre>}
            </div>
          );
        })}
      </div>

      <EditorPanel label="active coding window" className="code-panel project-editor">
        <CodeEditor value={code} onChange={setCode} />
      </EditorPanel>

      <EditorPanel label="output" className="output-panel">
        <iframe title="project preview" srcDoc={code} />
      </EditorPanel>

      <DiagnosticsPanel code={code} />
    </div>
  );
}
