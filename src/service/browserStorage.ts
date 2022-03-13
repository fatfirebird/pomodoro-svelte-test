import { browser } from 'webextension-polyfill-ts';
import { IBrowserStorageService } from '../application/ports';

export const useBrowserStorage = (): IBrowserStorageService => {
  return {
    setSettingsData: (v) => {
      browser.storage.sync.set({ settings: v });
    },
    setTimerData: (v) => {
      browser.storage.sync.set({ timer: v });
    },
    getSettingsData: async () => {
      const { settings = null } = await browser.storage.sync.get('settings');
      return settings;
    },
    getTimerData: async () => {
      const { timer = null } = await browser.storage.sync.get('timer');
      return timer;
    },
  };
};
