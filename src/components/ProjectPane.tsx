import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECTS, type Difficulty } from '../data/projects';
import { CodeEditor } from './CodeEditor';
import { EditorPanel } from './EditorPanel';
import { DiagnosticsPanel } from './DiagnosticsPanel';
import { PreviewFrame } from './PreviewFrame';
import { useSuccessFlash } from '../lib/useSuccessFlash';
import { PROJECT_STORAGE_PREFIX, loadProjectCode as loadCode } from '../lib/projectProgress';
import { DIFFICULTY_VAR } from '../lib/difficulty';

const TIERS: { id: Difficulty; label: string }[] = [
  { id: 'basic', label: 'basic' },
  { id: 'medium', label: 'medium' },
  { id: 'hard', label: 'hard' },
];

export function ProjectPane() {
  const { item } = useParams<{ item?: string }>();
  const navigate = useNavigate();
  const urlIndex = PROJECTS.findIndex((p) => p.id === item);
  const [index, setIndex] = useState(urlIndex >= 0 ? urlIndex : 0);
  const project = PROJECTS[index];
  const [code, setCode] = useState(() => loadCode(project.id, project.starter));
  const [openHint, setOpenHint] = useState<string | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
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
      setConfirmingReset(false);
      wasDone.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const selectProject = (i: number) => {
    setIndex(i);
    setCode(loadCode(PROJECTS[i].id, PROJECTS[i].starter));
    setOpenHint(null);
    setConfirmingReset(false);
    wasDone.current = false;
    navigate(`/html/website/solve/project/${PROJECTS[i].id}`);
  };

  useEffect(() => {
    try {
      localStorage.setItem(PROJECT_STORAGE_PREFIX + project.id, code);
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
        {TIERS.map((t) => {
          const tProjects = PROJECTS.filter((p) => p.difficulty === t.id);
          const tDone = tProjects.filter((p) => {
            const i = PROJECTS.indexOf(p);
            const pCode = i === index ? code : loadCode(p.id, p.starter);
            return p.requirements.every((r) => r.check(pCode));
          }).length;
          return (
            <div
              key={t.id}
              className="tier-section"
              style={{ '--tier-accent': DIFFICULTY_VAR[t.id] } as CSSProperties}
            >
              <div className="tier-section-label">
                <span className="tier-section-dot" />
                {t.label}
                <span className="tier-section-count">
                  {tProjects.length > 0 ? `${tDone}/${tProjects.length}` : '0/0'}
                </span>
              </div>

              {tProjects.length === 0 ? (
                <p className="puzzle-tier-empty">
                  Coming soon — {TIERS[0].label} is fully stocked, start there.
                </p>
              ) : (
                tProjects.map((p) => {
                  const i = PROJECTS.indexOf(p);
                  const pCode = i === index ? code : loadCode(p.id, p.starter);
                  const pDone = p.requirements.filter((r) => r.check(pCode)).length;
                  const allDone = pDone === p.requirements.length;
                  return (
                    <button
                      key={p.id}
                      className={`tier-card ${i === index ? 'active' : ''} ${allDone ? 'solved' : ''}`}
                      onClick={() => selectProject(i)}
                    >
                      <span className={`tier-card-check ${allDone ? '' : 'wide'}`} aria-hidden="true">
                        {allDone ? '✓' : `${pDone}/${p.requirements.length}`}
                      </span>
                      <span className="tier-card-body">
                        <span className="tier-card-title">{p.title}</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
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
            confirmingReset ? (
              <div className="sandbox-inline-form">
                <span className="sandbox-inline-warn">Reset to starter? Can't be undone.</span>
                <button
                  className="btn btn-destructive btn-sm"
                  onClick={() => {
                    setCode(project.starter);
                    setConfirmingReset(false);
                  }}
                >
                  yes, reset
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setConfirmingReset(false)}>
                  cancel
                </button>
              </div>
            ) : (
              <button className="btn btn-destructive btn-sm" onClick={() => setConfirmingReset(true)}>
                reset to starter
              </button>
            )
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
