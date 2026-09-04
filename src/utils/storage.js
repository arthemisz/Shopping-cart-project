/**
 * Safe localStorage wrapper with JSON parsing and SSR safeguard
 */

export const storageGet = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch (error) {
    console.warn(`[storage] Failed to read key "${key}":`, error);
    return defaultValue;
  }
};

export const storageSet = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] Failed to write key "${key}":`, error);
  }
};

export const storageRemove = (key) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[storage] Failed to remove key "${key}":`, error);
  }
};
