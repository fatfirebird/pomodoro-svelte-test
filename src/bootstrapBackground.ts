import { browser } from 'webextension-polyfill-ts';
import { setInstallationData } from './application/setInstallationData';

browser.runtime.onInstalled.addListener(() => {
  setInstallationData();
});
