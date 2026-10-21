// One switch for every synthesized sound on the site (success chime, copy
// tick). Lives in localStorage like every other preference, under the same
// tagsmiths- prefix so "start over" wipes it with the rest.
const SOUND_KEY = 'tagsmiths-sound';

export function isSoundOn(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean): void {
  try {
    if (on) localStorage.removeItem(SOUND_KEY);
    else localStorage.setItem(SOUND_KEY, 'off');
  } catch {
    // storage unavailable — the setting lasts for this page only
  }
}

// Every piece of saved state uses this prefix (route position, code,
// solved puzzles, projects, sandbox, theme, sound, quickfire bests...).
// Clearing by prefix is what "start over as a new user" means, and it
// stays correct when a new key is added as long as the prefix is kept.
export const STORAGE_PREFIX = 'tagsmiths-';

export function clearAllSavedState(): void {
  try {
    const doomed: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) doomed.push(k);
    }
    for (const k of doomed) localStorage.removeItem(k);
  } catch {
    // storage unavailable — nothing was saved in the first place
  }
}
