import { get, writable } from 'svelte/store';
import { settingsStore } from '../domain/settings';
import { timerStore } from '../domain/timer';
import { saveAppSettings } from './saveAppSettings';

export const useSettingsForm = () => {
  const form = writable(get(settingsStore));

  function handleSubmit() {
    saveAppSettings(get(form));
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
