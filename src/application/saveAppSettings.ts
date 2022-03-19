import { timerStore } from '../domain/timer';
import { TSettingsStoreValues } from '../domain/settings';
import { get } from 'svelte/store';
import { useBrowserStorage } from '../service/browserStorage';

export const saveAppSettings = (settingsData: TSettingsStoreValues) => {
  const { setSettingsData, setTimerData } = useBrowserStorage();

  const timerData = get(timerStore);

  timerStore.set({
    ...timerData,
    timer: settingsData.workTime * 60,
  });
  setSettingsData(settingsData);
  setTimerData({
    ...timerData,
    timer: settingsData.workTime * 60,
  });
};
