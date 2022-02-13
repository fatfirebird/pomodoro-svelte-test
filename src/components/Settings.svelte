<script lang="ts">
  import { pomodoroStore } from '../store';
  import { browser } from 'webextension-polyfill-ts';
  import { BACKGROUND_ACTION } from '../types';

  function handleReset(e: MouseEvent) {
    e.preventDefault();
    pomodoroStore.reset();
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    browser.runtime.sendMessage({
      action: BACKGROUND_ACTION.SET_SETTINGS,
      data: $pomodoroStore,
    });
  }

  function handleSettingChange(e: Event, cb: (v: number) => void) {
    const target = e.target as HTMLInputElement;
    const newValue = Number(target.value);
    cb(newValue > 0 ? newValue : 1);

    pomodoroStore.pause();
    pomodoroStore.resetTimer();
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    <span>Помидоры</span>
    <input
      type="number"
      value={$pomodoroStore.pomodoros}
      on:input={(e) => handleSettingChange(e, pomodoroStore.changePomodoros)}
    />
  </label>
  <label>
    <span>Рабочее время</span>
    <input
      type="number"
      value={$pomodoroStore.workTime}
      on:input={(e) => handleSettingChange(e, pomodoroStore.changeWorkTime)}
    />
  </label>
  <label>
    <span>Пауза</span>
    <input
      type="number"
      value={$pomodoroStore.pauseTime}
      on:input={(e) => handleSettingChange(e, pomodoroStore.changePauseTime)}
    />
  </label>
  <label>
    <span>Длинная пауза</span>
    <input
      type="number"
      value={$pomodoroStore.longPauseTime}
      on:input={(e) =>
        handleSettingChange(e, pomodoroStore.changeLongPauseTime)}
    />
  </label>
  <button type="submit">Сохранить</button>
  <button type="button" on:click={handleReset}>Сбросить</button>
</form>
