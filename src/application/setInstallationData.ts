import { defaultValues as settingsInitialData } from '../domain/settings';
import { defaultValues as timerInitialData } from '../domain/timer';
import { useBrowserStorage } from '../service/browserStorage';

export const setInstallationData = () => {
  const { setSettingsData, setTimerData } = useBrowserStorage();

  setSettingsData(settingsInitialData);
  setTimerData({
    ...timerInitialData,
    timer: settingsInitialData.workTime * 60,
  });
};
