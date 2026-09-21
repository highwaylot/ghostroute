import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';
import { PreviewFrame } from './PreviewFrame';
import { useSuccessFlash } from '../lib/useSuccessFlash';

const STORAGE_PREFIX = 'tagsmiths-project-';

function loadCode(projectId: string, starter: string): string {
  try {
    return localStorage.getItem(STORAGE_PREFIX + projectId) ?? starter;
  } catch {
    return starter;
  }
}

export function ProjectPane() {
  const { item } = useParams<{ item?: string }>();
  const navigate = useNavigate();
  const urlIndex = PROJECTS.findIndex((p) => p.id === item);
  const [index, setIndex] = useState(urlIndex >= 0 ? urlIndex : 0);
  const project = PROJECTS[index];
  const [code, setCode] = useState(() => loadCode(project.id, project.starter));
  const [openHint, setOpenHint] = useState<string | null>(null);
  const [flash, triggerFlash] = useSuccessFlash();
  const wasDone = useRef(false);

  // Keep the URL and the active project in sync both ways: picking a new
  // project updates the URL (so refresh/back/forward/sharing all land on
  // the right one), and a URL that already names a project (e.g. from a
  // direct link) selects it on load.
  useEffect(() => {
    if (urlIndex >= 0 && urlIndex !== index) {
      setIndex(urlIndex);
      setCode(loadCode(PROJECTS[urlIndex].id, PROJECTS[urlIndex].starter));
      setOpenHint(null);
      wasDone.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const selectProject = (i: number) => {
    setIndex(i);
    setCode(loadCode(PROJECTS[i].id, PROJECTS[i].starter));
    setOpenHint(null);
    wasDone.current = false;
    navigate(`/html/website/solve/project/${PROJECTS[i].id}`);
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

  useEffect(() => {
    if (allDone && !wasDone.current) {
      triggerFlash();
    }
    wasDone.current = allDone;
  }, [allDone, triggerFlash]);

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

        {allDone && (
          <p className="solved-banner project-solved-banner">✓ Project complete — every requirement met</p>
        )}

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
          className={`code-panel project-editor ${flash ? 'flash-success' : ''}`}
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
          <PreviewFrame code={code} title="project preview" />
        </EditorPanel>

        <DiagnosticsPanel code={code} />
      </div>
    </div>
  );
}
