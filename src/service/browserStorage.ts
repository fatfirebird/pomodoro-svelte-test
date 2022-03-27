import { browser } from 'webextension-polyfill-ts';
import { IBrowserStorageService } from '../application/ports';

export const BROWSER_STORAGE_KEYS = {
  SETTINGS: 'settings',
  TIMER: 'timer',
};

export const useBrowserStorage = (): IBrowserStorageService => {
  return {
    setSettingsData: (v) => {
      browser.storage.local.set({ settings: v });
    },
    setTimerData: (v) => {
      browser.storage.local.set({ timer: v });
    },
    getSettingsData: async () => {
      const { settings = null } = await browser.storage.local.get(
        BROWSER_STORAGE_KEYS.SETTINGS,
      );
      return settings;
    },
    getTimerData: async () => {
      const { timer = null } = await browser.storage.local.get(
        BROWSER_STORAGE_KEYS.TIMER,
      );
      return timer;
    },
  };
};
