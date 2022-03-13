<script lang="ts">
  import { timerStore } from '../domain/timer';
  import { settingsStore } from '../domain/settings';
  // import { browser } from 'webextension-polyfill-ts';
  import { BACKGROUND_ACTION } from '../types';

  function handleReset(e: MouseEvent) {
    e.preventDefault();
    timerStore.resetTimer();
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // browser.runtime.sendMessage({
    //   action: BACKGROUND_ACTION.SET_SETTINGS,
    //   data: $pomodoroStore,
    // });
  }

  function handleSettingChange(e: Event, cb: (v: number) => void) {
    const target = e.target as HTMLInputElement;
    const newValue = Number(target.value);
    cb(newValue > 0 ? newValue : 1);

    console.log($settingsStore);

    timerStore.pauseTimer();
    timerStore.resetTimer();
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    <span>Помидоры</span>
    <input
      type="number"
      value={$settingsStore.pomodoros}
      on:input={(e) => handleSettingChange(e, settingsStore.setPomodoros)}
    />
  </label>
  <label>
    <span>Рабочее время</span>
    <input
      type="number"
      value={$settingsStore.workTime}
      on:input={(e) => handleSettingChange(e, settingsStore.setWorkTime)}
    />
  </label>
  <label>
    <span>Пауза</span>
    <input
      type="number"
      value={$settingsStore.pauseTime}
      on:input={(e) => handleSettingChange(e, settingsStore.setPauseTime)}
    />
  </label>
  <label>
    <span>Длинная пауза</span>
    <input
      type="number"
      value={$settingsStore.longPauseTime}
      on:input={(e) => handleSettingChange(e, settingsStore.setLongPauseTime)}
    />
  </label>
  <button type="submit">Сохранить</button>
  <button type="button" on:click={handleReset}>Сбросить</button>
</form>
