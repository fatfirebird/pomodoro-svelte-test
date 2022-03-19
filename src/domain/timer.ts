import { get, writable } from 'svelte/store';
import { settingsStore } from './settings';

export type TTimerStoreValues = {
  isPaused: boolean;
  timer: number;
  status: 'chill' | 'long' | 'work';
  chills: number;
};

export const defaultValues: Omit<TTimerStoreValues, 'timer'> = {
  isPaused: true,
  status: 'work',
  chills: 0,
};

function createTimerStore() {
  const getSettingsData = () => {
    const data = get(settingsStore);
    const timerWithSettings = data.workTime ? data.workTime * 60 : 25 * 60;
    return { timerWithSettings, ...data };
  };

  const { update, subscribe, set } = writable<TTimerStoreValues>({
    ...defaultValues,
    timer: getSettingsData().timerWithSettings,
  });

  const setTimer = (v: number) => update((store) => ({ ...store, timer: v }));

  const startTimer = () => update((store) => ({ ...store, isPaused: false }));

  const pauseTimer = () => update((store) => ({ ...store, isPaused: true }));

  const resetTimer = () =>
    update((store) => ({
      ...store,
      timer: getSettingsData().timerWithSettings,
      status: 'work',
    }));

  const countPomodoro = () =>
    update((store) => {
      const { pomodoros, longPauseTime, pauseTime, timerWithSettings } =
        getSettingsData();

      const isLong = store.chills === pomodoros;
      const newChills = isLong ? 0 : store.chills + 1;

      if (store.status !== 'work') {
        return {
          ...store,
          status: 'work',
          timer: timerWithSettings,
          chills: newChills,
        };
      }

      return {
        ...store,
        status: isLong ? 'long' : 'chill',
        timer: (isLong ? longPauseTime : pauseTime) * 60,
        chills: newChills,
      };
    });

  return {
    setTimer,
    set,
    startTimer,
    pauseTimer,
    resetTimer,
    countPomodoro,
    subscribe,
  };
}

export const timerStore = createTimerStore();
