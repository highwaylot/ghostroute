import type { Project } from '../data/projects';

export const PROJECT_STORAGE_PREFIX = 'tagsmiths-project-';

export function loadProjectCode(id: string, starter: string): string {
  try {
    return localStorage.getItem(PROJECT_STORAGE_PREFIX + id) ?? starter;
  } catch {
    return starter;
  }
}

export function countCompletedProjects(projects: Project[]): { done: number; total: number } {
  let done = 0;
  for (const p of projects) {
    const code = loadProjectCode(p.id, p.starter);
    if (p.requirements.every((r) => r.check(code))) done++;
  }
  return { done, total: projects.length };
}
