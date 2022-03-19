import { timerStore, TTimerStoreValues } from '../domain/timer';
import { useBrowserStorage } from '../service/browserStorage';

export const useTimerObserver = (cb: (v: TTimerStoreValues) => void) => {
  const { setTimerData } = useBrowserStorage();

  let timerData: TTimerStoreValues;

  const unsubscribeTimerStore = timerStore.subscribe((values) => {
    timerData = values;
    cb(values);
    setTimerData(values);
  });

  function togglePause() {
    if (timerData.isPaused) {
      timerStore.startTimer();
    } else {
      timerStore.pauseTimer();
    }
  }

  const pomodoroInterval = setInterval(() => {
    if (timerData.timer <= 0) {
      timerStore.countPomodoro();
    }

    if (!timerData.isPaused) {
      timerStore.setTimer(timerData.timer - 1);
    }
  }, 1000);

  return {
    pomodoroInterval,
    togglePause,
    unsubscribeTimerStore,
  };
};
