import { useEffect, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';

const STORAGE_PREFIX = 'tagsmiths-project-';

function loadCode(projectId: string, starter: string): string {
  try {
    return localStorage.getItem(STORAGE_PREFIX + projectId) ?? starter;
  } catch {
    return starter;
  }
}

export function ProjectPane() {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];
  const [code, setCode] = useState(() => loadCode(project.id, project.starter));
  const [openHint, setOpenHint] = useState<string | null>(null);

  const selectProject = (i: number) => {
    setIndex(i);
    setCode(loadCode(PROJECTS[i].id, PROJECTS[i].starter));
    setOpenHint(null);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PREFIX + project.id, code);
    } catch {
      // storage unavailable — nothing to do
    }
  }, [code, project.id]);

  const doneCount = project.requirements.filter((r) => r.check(code)).length;
  const allDone = doneCount === project.requirements.length;

  return (
    <div className="project-pane">
      <div className="project-list">
        {PROJECTS.map((p, i) => {
          const pCode = i === index ? code : loadCode(p.id, p.starter);
          const pDone = p.requirements.filter((r) => r.check(pCode)).length;
          return (
            <button
              key={p.id}
              className={`project-pick ${i === index ? 'active' : ''}`}
              onClick={() => selectProject(i)}
            >
              <span className="project-pick-title">{p.title}</span>
              <span className="project-pick-progress">
                {pDone}/{p.requirements.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="project-body">
        <div className="project-brief">
          <h2 className="project-title">{project.title}</h2>
          <p className="project-desc">{project.brief}</p>
        </div>

        <div className="project-checklist">
          <span className={`project-checklist-count ${allDone ? 'ok' : ''}`}>
            {allDone ? 'all requirements met' : `${doneCount} / ${project.requirements.length} done`}
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
                  {!done && (
                    <span className="checklist-hint-toggle">{isOpen ? 'hide hint' : 'need a hint?'}</span>
                  )}
                </button>
                {isOpen && !done && <pre className="checklist-hint">{req.hint}</pre>}
              </div>
            );
          })}
        </div>

        <EditorPanel
          label="active coding window"
          className="code-panel project-editor"
          actions={
            <button
              className="editor-panel-bar-clear"
              onClick={() => {
                if (window.confirm('Reset back to the starting template? This can\'t be undone.')) {
                  setCode(project.starter);
                }
              }}
            >
              reset to starter
            </button>
          }
        >
          <CodeEditor value={code} onChange={setCode} />
        </EditorPanel>

        <EditorPanel label="output" className="output-panel">
          <iframe title="project preview" srcDoc={code} />
        </EditorPanel>

        <DiagnosticsPanel code={code} />
      </div>
    </div>
  );
}
