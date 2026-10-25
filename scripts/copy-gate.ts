// The writing standard in docs/WRITING.md, as a check.
//   npx tsx scripts/copy-gate.ts   -> report, exit 1 on any failure
// Everything is gated: routes, chapters, both Nests, puzzles. (--report-only
// prints without failing, for a quick look while drafting.)

import { STEPS, type Step } from '../src/data/steps';
import { CSS_STEPS } from '../src/data/cssSteps';
import { EMAIL_STEPS } from '../src/data/emailSteps';
import { CHAPTERS, type Chapter } from '../src/data/chapters';
import { CSS_CHAPTERS } from '../src/data/cssChapters';
import { EMAIL_CHAPTERS } from '../src/data/emailChapters';
import { NEST } from '../src/data/nest';
import { CSS_NEST } from '../src/data/cssNest';
import { PUZZLES } from '../src/data/puzzles';
import { CSS_PUZZLES } from '../src/data/cssPuzzles';

const gateAll = !process.argv.includes('--report-only');

// ---------------------------------------------------------------- readability
function syllables(w: string): number {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}
// Code is not prose: tags, selectors and attributes are replaced by a
// one-syllable placeholder before measuring, so <!DOCTYPE html> does not
// count as a four-syllable word.
function prose(text: string): string {
  return text
    .replace(/<[^>]+>/g, ' tag ')
    .replace(/[a-z-]+="[^"]*"/gi, ' attr ')
    .replace(/[.#]?[a-z-]+\s*\{[^}]*\}/gi, ' rule ')
    .replace(/[{}();:]/g, ' ');
}
function sentencesOf(text: string): string[] {
  // a period inside closing quotes (`...30." colspan`) still ends a sentence
  return prose(text).split(/(?<=[.!?]["')\]]?)\s+|\n+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 2);
}
function grade(text: string): number {
  const sents = sentencesOf(text);
  const words = prose(text).split(/\s+/).filter((w) => /[a-z]/i.test(w));
  const syl = words.reduce((a, w) => a + syllables(w), 0);
  const ns = Math.max(1, sents.length);
  return 0.39 * (words.length / ns) + 11.8 * (syl / Math.max(1, words.length)) - 15.59;
}
function longestSentence(text: string): { n: number; s: string } {
  let best = { n: 0, s: '' };
  for (const s of sentencesOf(text)) { const n = s.split(/\s+/).length; if (n > best.n) best = { n, s }; }
  return best;
}

// ---------------------------------------------------------------- vocabulary
// Words a route may use only once taught. The number is the step index
// (1-based) that teaches it; 0 means the first chapter blurb teaches it.
// Only words that are technical here. Everyday words that are also tag
// names (title, body, main, link, list) are not listed: "the main title"
// is English, and gating it would push the copy toward stranger words.
const HTML_TAUGHT: Record<string, number> = {
  tag: 0, browser: 0, render: 0, 'opening tag': 1, 'closing tag': 1, heading: 1, doctype: 2, paragraph: 6,
  attribute: 11, block: 12, inline: 12, class: 13, id: 13,
};
const CSS_TAUGHT: Record<string, number> = {
  rule: 0, selector: 0, property: 2, value: 2, padding: 6, margin: 7, border: 8, 'media query': 16,
};
// Never on a route, in any track.
const BANNED_ON_ROUTES = ['element', 'root', 'sibling', 'container', 'wrapper', 'skeleton', 'semantic', 'declaration', 'descendant', 'pseudo-class', 'pseudo class', 'boilerplate', 'markup', 'void', 'cross-axis', 'main axis', 'inherit'];

// The step card is narrow. Anything longer than this reads as a wall.
// Detail belongs in the hints, which show one at a time on a miss.
const MAX_STEP_WORDS = 30;
const MAX_BLURB_WORDS = 30;
const wordCount = (t: string) => t.split(/\s+/).filter(Boolean).length;

type Finding = { where: string; what: string; detail: string; gated: boolean };
const findings: Finding[] = [];
const ok: string[] = [];

function checkText(where: string, text: string, maxGrade: number, gated: boolean) {
  const g = grade(text);
  const L = longestSentence(text);
  if (g > maxGrade) findings.push({ where, what: `reading grade ${g.toFixed(1)} > ${maxGrade}`, detail: '', gated });
  if (L.n > 25) findings.push({ where, what: `sentence of ${L.n} words (max 25)`, detail: `"${L.s.slice(0, 110)}"`, gated });
  const dashes = (text.match(/—/g) || []).length;
  const paragraphs = Math.max(1, text.split(/\n\s*\n/).length);
  if (dashes > paragraphs) findings.push({ where, what: `${dashes} em-dashes (max 1 per paragraph)`, detail: '', gated });
  if (g <= maxGrade && L.n <= 25 && dashes <= paragraphs) ok.push(where);
}

function routeVocabulary(name: string, chapters: Chapter[], steps: Step[], taught: Record<string, number>) {
  const wordRe = (w: string) => new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(s|es)?\\b`, 'i');
  const items = [
    { idx: 0, label: `${name} chapter "${chapters[0]?.title}"`, text: chapters[0]?.blurb ?? '' },
    ...steps.map((s, i) => ({ idx: i + 1, label: `${name} step ${i + 1} ${s.tag}`, text: s.why + ' ' + s.hints.join(' ') })),
  ];
  for (const it of items) {
    const text = it.text.replace(/<[^>]+>/g, ' ').replace(/[a-z-]+="[^"]*"/gi, ' ');
    for (const [w, at] of Object.entries(taught)) if (it.idx < at && wordRe(w).test(text)) findings.push({ where: it.label, what: `uses "${w}" before step ${at} teaches it`, detail: '', gated: true });
    for (const w of BANNED_ON_ROUTES) if (wordRe(w).test(text)) findings.push({ where: it.label, what: `uses "${w}" (never on a route)`, detail: '', gated: true });
  }
}

// ---------------------------------------------------------------- run
for (const [name, ch, st, taught] of [['html', CHAPTERS, STEPS, HTML_TAUGHT], ['css', CSS_CHAPTERS, CSS_STEPS, CSS_TAUGHT], ['email', EMAIL_CHAPTERS, EMAIL_STEPS, {}]] as const) {
  for (const c of ch) {
    checkText(`${name} chapter "${c.title}"`, c.blurb, 7, true);
    const n = wordCount(c.blurb);
    if (n > MAX_BLURB_WORDS) findings.push({ where: `${name} chapter "${c.title}"`, what: `blurb is ${n} words (max ${MAX_BLURB_WORDS})`, detail: '', gated: true });
  }
  st.forEach((s, i) => {
    checkText(`${name} step ${i + 1} ${s.tag}`, [s.why, ...s.hints].join('\n\n'), 7, true);
    const n = wordCount(s.why);
    if (n > MAX_STEP_WORDS) findings.push({ where: `${name} step ${i + 1} ${s.tag}`, what: `step text is ${n} words (max ${MAX_STEP_WORDS})`, detail: '', gated: true });
  });
  routeVocabulary(name, ch, st, taught);
}
for (const [name, nest] of [['html nest', NEST], ['css nest', CSS_NEST]] as const)
  for (const e of nest) checkText(`${name} ${e.tag}`, [e.whatItDoes, e.whereItGoes, ...e.mistakes].join('\n\n'), 9, gateAll);
for (const [name, pz] of [['html puzzles', PUZZLES], ['css puzzles', CSS_PUZZLES]] as const)
  for (const p of pz) checkText(`${name} ${p.title}`, [p.prompt, ...p.hints].join('\n\n'), 7, gateAll);

const gatedFails = findings.filter((f) => f.gated);
const reported = findings.filter((f) => !f.gated);
console.log(`copy gate: ${ok.length} items clean, ${gatedFails.length} gated failures, ${reported.length} reported (not gated yet)\n`);
for (const f of gatedFails) console.log(`FAIL  ${f.where}: ${f.what}${f.detail ? '\n        ' + f.detail : ''}`);
if (reported.length) {
  const byArea = new Map<string, number>();
  for (const f of reported) byArea.set(f.where.split(' ')[0] + ' ' + f.where.split(' ')[1], (byArea.get(f.where.split(' ')[0] + ' ' + f.where.split(' ')[1]) ?? 0) + 1);
  console.log(`\nreported only: ${[...byArea].map(([k, v]) => `${k}: ${v}`).join(', ')}`);
}
process.exit(gatedFails.length ? 1 : 0);
