import { browser } from 'webextension-polyfill-ts';
import { IBrowserNotificationsService } from '../application/ports';

export const NOTIFICATIONS = {
  WORK: 'work',
  CHILL: 'chill',
};

export const useBrowserNotifications = (): IBrowserNotificationsService => ({
  showWorkNotification: () => {
    browser.notifications.create(NOTIFICATIONS.WORK, {
      title: 'Pomodoro is done!',
      message: 'Just chill, open an app and start chill timer!',
      type: 'basic',
      iconUrl: '/favicon.png',
    });
  },
  showChillNotification: () => {
    browser.notifications.create(NOTIFICATIONS.CHILL, {
      title: 'Go to work!',
      message: 'Hey, its time to work! Open an app and start work timer!',
      type: 'basic',
      iconUrl: '/favicon.png',
    });
  },
});
