import { browser } from 'webextension-polyfill-ts';
import { setInstallationData } from './application/setInstallationData';
import { ALARMS } from './service/browserAlarms';
import { useBrowserNotifications } from './service/browserNotifications';

browser.runtime.onInstalled.addListener(() => {
  setInstallationData();
});

browser.alarms.onAlarm.addListener((alarm) => {
  const { showChillNotification, showWorkNotification } =
    useBrowserNotifications();

  switch (alarm.name) {
    case ALARMS.CHILL:
      showChillNotification();
      break;

    case ALARMS.WORK:
      showWorkNotification();
      break;

    default:
      break;
  }
});
