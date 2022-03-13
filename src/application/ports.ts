import { TSettingsStoreValues } from '../domain/settings';
import { TTimerStoreValues } from '../domain/timer';

export interface IBrowserStorageService {
  setSettingsData: (value: TSettingsStoreValues) => void;
  setTimerData: (value: TTimerStoreValues) => void;
  getTimerData: () => Promise<TTimerStoreValues | null>;
  getSettingsData: () => Promise<TSettingsStoreValues | null>;
}
