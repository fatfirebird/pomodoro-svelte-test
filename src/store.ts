import { writable } from 'svelte/store';

type TPomodoroStore = {
  pomodoros: number;
  workTime: number;
  pauseTime: number;
  longPauseTime: number;
  pause: boolean;
  timer: number;
  status: 'chill' | 'long' | 'work';
  chillCount: number;
};

const defaultValues: TPomodoroStore = {
  pomodoros: 4,
  workTime: 25,
  pauseTime: 5,
  longPauseTime: 25,
  pause: true,
  timer: 25 * 60,
  status: 'work',
  chillCount: 0,
};

function createPomodoro() {
  const { subscribe, update, set } = writable<TPomodoroStore>(defaultValues);

  return {
    subscribe,
    changePomodoros: (v: number) =>
      update((store) => ({ ...store, pomodoros: v })),
    changeWorkTime: (v: number) =>
      update((store) => ({ ...store, workTime: v })),
    changePauseTime: (v: number) =>
      update((store) => ({ ...store, pauseTime: v })),
    changeLongPauseTime: (v: number) =>
      update((store) => ({ ...store, longPauseTime: v })),
    changeTimer: (v: number) => update((store) => ({ ...store, timer: v })),
    start: () => update((store) => ({ ...store, pause: false })),
    pause: () => update((store) => ({ ...store, pause: true })),
    resetTimer: () =>
      update((store) => ({
        ...store,
        timer: store.workTime * 60,
        status: 'work',
      })),
    countTimer: () =>
      update((store) => {
        let chills = store.chillCount;
        const isLong = store.chillCount === store.pomodoros;

        if (!isLong) {
          chills = chills + 1;
        } else {
          chills = 0;
        }

        if (store.status === 'work') {
          return {
            ...store,
            status: isLong ? 'long' : 'chill',
            timer: (isLong ? store.longPauseTime : store.pauseTime) * 60,
            chillCount: chills,
          };
        } else {
          return {
            ...store,
            status: 'work',
            timer: store.workTime * 60,
            chillCount: chills,
          };
        }
      }),

    reset: () => set(defaultValues),
  };
}

export const pomodoroStore = createPomodoro();
