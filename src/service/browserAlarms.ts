import { IBrowserAlarmsService } from '../application/ports';
import { browser } from 'webextension-polyfill-ts';

export const ALARMS = {
  WORK: 'work',
  CHILL: 'chill',
};

export const useBrowserAlarms = (): IBrowserAlarmsService => ({
  createWorkTimer: (timer) => {
    browser.alarms.create(ALARMS.WORK, {
      when: Date.now() + timer,
    });
  },
  cancelWorkTimer: () => {
    browser.alarms.clear(ALARMS.WORK);
  },

  createChillTimer: (timer) => {
    browser.alarms.create(ALARMS.CHILL, {
      when: Date.now() + timer,
    });
  },
  cancelChillTimer: () => {
    browser.alarms.clear(ALARMS.CHILL);
  },
});
