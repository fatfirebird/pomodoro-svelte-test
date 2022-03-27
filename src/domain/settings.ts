import { writable } from 'svelte/store';

export type TSettingsStoreValues = {
  pomodoros: number;
  workTime: number;
  pauseTime: number;
  longPauseTime: number;
};

export const defaultValues: TSettingsStoreValues = {
  pomodoros: 1,
  workTime: 0.1,
  pauseTime: 0.1,
  longPauseTime: 0.2,
};

function createSettingsStore() {
  const { set, update, subscribe } =
    writable<TSettingsStoreValues>(defaultValues);

  const setPomodoros = (v: number) =>
    update((store) => ({ ...store, pomodoros: v }));

  const setWorkTime = (v: number) =>
    update((store) => ({ ...store, workTime: v }));

  const setPauseTime = (v: number) =>
    update((store) => ({ ...store, pauseTime: v }));

  const setLongPauseTime = (v: number) =>
    update((store) => ({ ...store, longPauseTime: v }));

  const setDefaultSettings = () => set(defaultValues);

  return {
    subscribe,
    update,
    set,
    setPomodoros,
    setDefaultSettings,
    setLongPauseTime,
    setPauseTime,
    setWorkTime,
  };
}

export const settingsStore = createSettingsStore();
