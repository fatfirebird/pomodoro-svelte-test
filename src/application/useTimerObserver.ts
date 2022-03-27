import { timerStore, TTimerStoreValues } from '../domain/timer';
import { useBrowserAlarms } from '../service/browserAlarms';
import { useBrowserStorage } from '../service/browserStorage';

export const useTimerObserver = (cb: (v: TTimerStoreValues) => void) => {
  const { setTimerData } = useBrowserStorage();
  const {
    createWorkTimer,
    createChillTimer,
    cancelChillTimer,
    cancelWorkTimer,
  } = useBrowserAlarms();

  let timerData: TTimerStoreValues;
  let timerInMs: number;

  const unsubscribeTimerStore = timerStore.subscribe((values) => {
    timerData = values;
    timerInMs = values.timer * 1000;
    cb(values);
    setTimerData(values);
  });

  const startTimer = () => {
    timerStore.startTimer();

    if (timerData.status === 'work') {
      createWorkTimer(timerInMs);
    } else {
      createChillTimer(timerInMs);
    }
  };

  const pauseTimer = () => {
    timerStore.pauseTimer();
    cancelChillTimer();
    cancelWorkTimer();
  };

  const togglePause = () => {
    if (timerData.timer <= 0) {
      timerStore.countPomodoro();
    }

    if (timerData.isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
  };

  const timerInterval = setInterval(async () => {
    if (timerData) {
      if (timerData.timer <= 0) {
        timerStore.pauseTimer();
      }

      if (!timerData.isPaused) {
        timerStore.set({ ...timerData, timer: timerData!.timer - 1 });
      }
    }
  }, 1000);

  return {
    togglePause,
    unsubscribeTimerStore,
    timerInterval,
  };
};
