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
