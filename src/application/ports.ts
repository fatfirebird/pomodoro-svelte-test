import { TSettingsStoreValues } from '../domain/settings';
import { TTimerStoreValues } from '../domain/timer';

export interface IBrowserStorageService {
  setSettingsData: (value: TSettingsStoreValues) => void;
  setTimerData: (value: TTimerStoreValues) => void;
  getTimerData: () => Promise<TTimerStoreValues | null>;
  getSettingsData: () => Promise<TSettingsStoreValues | null>;

  clearTimestamp: () => void;
  setTimestamp: () => void;
  getTimestamp: () => Promise<number | null>;
}

export interface IBrowserAlarmsService {
  createWorkTimer: (time: number) => void;
  cancelWorkTimer: () => void;
  createChillTimer: (time: number) => void;
  cancelChillTimer: () => void;
}

export interface IBrowserNotificationsService {
  showWorkNotification: () => void;
  showChillNotification: () => void;
}
