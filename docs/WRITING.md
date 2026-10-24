# How tagsmiths explains things

Every route step, chapter blurb, Nest page, puzzle prompt and hint is
written to this standard. It exists because an expert's first draft is
written for someone who already knows the words (Pinker calls this the
curse of knowledge), and the person reading tagsmiths does not.

The rules are measurable on purpose. `npm run copy:gate` checks them.

## The seven rules

1. **Show the code first, then say what it does in everyday words, then
   give it its name.** A learner who has seen `h1 { color: teal; }` can
   be told the first part is "the selector". A learner who has not seen
   it cannot. (Worked-example effect: novices learn more from a finished
   example than from a definition followed by a task.)

2. **One idea per sentence, about 20 words, never more than 25.** At most
   one dash per paragraph. A dash is how three ideas sneak into one
   sentence.

3. **Every insider word is defined in the sentence where it first
   appears, in everyday words.** Each track keeps the list of words it
   has taught, in order (see `scripts/copy-gate.ts`). A step may use a
   word only after the step that teaches it. Some words are never used on
   a route at all: element (say "tag"), root, sibling, container,
   wrapper, skeleton, semantic, declaration, descendant, pseudo-class,
   boilerplate, markup, void.

4. **Talk to the learner.** "You", "your page", "your heading".
   Conversational, not cute. (Mayer's personalization principle: this
   wins on transfer tests in 14 of 17 experiments, and most for
   beginners.)

5. **Measured reading level.** Routes, chapters, puzzles: Flesch-Kincaid
   grade 7 or below. Nest pages: grade 9 or below. Measured by the gate,
   not guessed.

6. **Concrete over abstract.** "The big heading at the top", not "a
   block-level sectioning heading". One analogy at most, then drop it.

7. **If a sentence does not help the learner do the next thing, it goes
   last or it goes.** History, edge cases and "why it was designed this
   way" belong at the end of a Nest page, never in a route step.

## What a route step looks like

```
why:   What it is, in one or two sentences, with the code shown.
       What it does, in plain words. Where it goes. What to type now.
hint 1 What to add, in words (no code).
hint 2 The shape of it (the pattern, half the answer).
hint 3 The exact code to type.
```

## Sources

Mayer, *Multimedia Learning* (personalization, coherence, pre-training,
segmenting). Sweller, cognitive load theory and the worked-example
effect. Pinker, *The Sense of Style*, chapter 3. Plain-language standards
(grade 6 to 8, define terms where used). Duckett, *HTML & CSS*, and the
Head First series as working examples of the voice.
