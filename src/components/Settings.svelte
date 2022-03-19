<script lang="ts">
  import { timerStore } from '../domain/timer';

  import { useSettingsForm } from '../application/useSettingsForm';

  const { form, handleSettingChange, handleSubmit } = useSettingsForm();

  function handleReset() {
    timerStore.resetTimer();
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    <span>Помидоры</span>
    <input
      type="text"
      name="pomodoros"
      bind:value={$form.pomodoros}
      on:change={handleSettingChange}
    />
  </label>
  <label>
    <span>Рабочее время</span>
    <input
      type="text"
      name="workTime"
      bind:value={$form.workTime}
      on:change={handleSettingChange}
    />
  </label>
  <label>
    <span>Пауза</span>
    <input
      type="text"
      name="pauseTime"
      bind:value={$form.pauseTime}
      on:change={handleSettingChange}
    />
  </label>
  <label>
    <span>Длинная пауза</span>
    <input
      type="text"
      name="longPauseTime"
      bind:value={$form.longPauseTime}
      on:change={handleSettingChange}
    />
  </label>
  <button type="submit">Запомнить настройки</button>
  <button type="button" on:click|preventDefault={handleReset}
    >Сбросить таймер</button
  >
</form>
