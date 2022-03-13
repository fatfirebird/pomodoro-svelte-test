import { settingsStore } from '../domain/settings';
import { timerStore } from '../domain/timer';
import { useBrowserStorage } from '../service/browserStorage';

export const getInitialData = async () => {
  const { getSettingsData, getTimerData } = useBrowserStorage();
  const setting = await getSettingsData();
  const timer = await getTimerData();

  if (timer) {
    timerStore.set(timer);
  }

  if (setting) {
    settingsStore.set(setting);
  }

  console.log(timer, setting);
};
