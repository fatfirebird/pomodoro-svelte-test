<script lang="ts">
  import Input from '../components/input.svelte';
  import { timerStore } from '../../domain/timer';
  import { useSettingsForm } from '../../application/useSettingsForm';

  const { form, handleSettingChange, handleSubmit } = useSettingsForm();

  function handleReset() {
    timerStore.resetTimer();
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Input
    label="Помидоры"
    name="pomodoros"
    value={$form.pomodoros}
    handleChange={handleSettingChange}
  />
  <Input
    label="Рабочее время"
    name="workTime"
    value={$form.workTime}
    handleChange={handleSettingChange}
  />
  <Input
    label="Пауза"
    name="pauseTime"
    value={$form.pauseTime}
    handleChange={handleSettingChange}
  />
  <Input
    label="Длинная пауза"
    name="longPauseTime"
    value={$form.longPauseTime}
    handleChange={handleSettingChange}
  />
  <button type="submit">Запомнить настройки</button>
  <button type="button" on:click|preventDefault={handleReset}
    >Сбросить таймер</button
  >
</form>
