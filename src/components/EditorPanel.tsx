import type { ReactNode } from 'react';

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
};

// A labeled panel with the label in its own row, never overlaid on top of
// the content — an earlier version absolutely-positioned the label over the
// editor and padded the editor to compensate, which drifted out of sync with
// CodeMirror's own gutter math and misaligned line numbers.
export function EditorPanel({ label, children, className, actions }: Props) {
  return (
    <div className={`editor-panel ${className ?? ''}`}>
      <div className="editor-panel-bar">
        <span>{label}</span>
        {actions}
      </div>
      <div className="editor-panel-body">{children}</div>
    </div>
  );
}
