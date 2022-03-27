import { get, writable } from 'svelte/store';
import { settingsStore } from '../domain/settings';
import { timerStore } from '../domain/timer';
import { useBrowserAlarms } from '../service/browserAlarms';
import { saveAppSettings } from './saveAppSettings';

export const useSettingsForm = () => {
  const { cancelChillTimer, cancelWorkTimer } = useBrowserAlarms();

  const form = writable(get(settingsStore));

  function handleSubmit() {
    timerStore.resetTimer();
    timerStore.pauseTimer();
    saveAppSettings(get(form));
    cancelChillTimer();
    cancelWorkTimer();
  }

  function handleSettingChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    form.update((values) => ({ ...values, [name]: target.value }));
    timerStore.resetTimer();
  }

  return {
    form,
    handleSettingChange,
    handleSubmit,
  };
};
