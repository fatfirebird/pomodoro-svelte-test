import { timerStore, TTimerStoreValues } from '../domain/timer';
import { useBrowserAlarms } from '../service/browserAlarms';
import { useBrowserStorage } from '../service/browserStorage';

export const useTimerObserver = (cb: (v: TTimerStoreValues) => void) => {
  const { setTimerData, setTimestamp, clearTimestamp, getTimestamp } =
    useBrowserStorage();
  const {
    createWorkTimer,
    createChillTimer,
    cancelChillTimer,
    cancelWorkTimer,
  } = useBrowserAlarms();

  let timerData: TTimerStoreValues;
  let timerInMs: number;

  getTimestamp().then((timestamp) => {
    if (timestamp && !timerData?.isPaused) {
      const currentTime = Date.now();
      const dif = Math.round((currentTime - timestamp) / 1000);
      const newTimer = timerData.timer - dif;
      setTimestamp();

      if (newTimer > 0) {
        timerStore.setTimer(newTimer);
      } else {
        timerStore.setTimer(0);
      }
    }
  });

  const unsubscribeTimerStore = timerStore.subscribe((values) => {
    timerData = values;
    timerInMs = values.timer * 1000;
    cb(values);
    setTimerData(values);
  });

  const startTimer = () => {
    setTimestamp();
    timerStore.startTimer();

    if (timerData.status === 'work') {
      createWorkTimer(timerInMs);
    } else {
      createChillTimer(timerInMs);
    }
  };

  const pauseTimer = () => {
    clearTimestamp();
    cancelChillTimer();
    cancelWorkTimer();
    timerStore.pauseTimer();
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
    if (timerData?.timer <= 0) {
      timerStore.pauseTimer();
    }

    if (!timerData?.isPaused) {
      timerStore.set({ ...timerData, timer: timerData.timer - 1 });
    }
  }, 1000);

  return {
    togglePause,
    unsubscribeTimerStore,
    timerInterval,
  };
};
