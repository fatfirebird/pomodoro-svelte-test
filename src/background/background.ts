import { browser } from 'webextension-polyfill-ts';
import type { TPomodoroStore } from '../store';
import { BACKGROUND_ACTION, TBackgroundRequest } from '../types';

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    pomodoro: {
      pomodoros: 4,
      workTime: 25,
      pauseTime: 5,
      longPauseTime: 25,
      pause: true,
      timer: 25 * 60,
      status: 'work',
      chillCount: 0,
    },
  });
});

browser.runtime.onMessage.addListener(
  ({ action, data }: TBackgroundRequest) => {
    switch (action) {
      case BACKGROUND_ACTION.SET_SETTINGS: {
        browser.storage.sync.set({ pomodoro: data });
        break;
      }

      case BACKGROUND_ACTION.GET_SETTINGS: {
        return browser.storage.sync.get('pomodoro') as Promise<{
          pomodoro: TPomodoroStore;
        }>;
      }

      default:
        break;
    }
  },
);
