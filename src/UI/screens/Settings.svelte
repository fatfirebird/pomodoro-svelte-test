<script lang="ts">
  import Input from '../components/input.svelte';
  import { timerStore } from '../../domain/timer';
  import { useSettingsForm } from '../../application/useSettingsForm';
  import Button from '../components/button.svelte';

  const { form, handleSettingChange, handleSubmit } = useSettingsForm();

  function handleReset() {
    timerStore.resetTimer();
  }

  console.log($form);
</script>

<form class="settings-form">
  <div class="settings-container">
    <div class="settings-wrapper">
      <div class="input-wrapper">
        <Input
          label="Помидоры"
          name="pomodoros"
          value={$form.pomodoros}
          handleChange={handleSettingChange}
        />
      </div>
      <div class="input-wrapper">
        <Input
          label="Рабочее время"
          name="workTime"
          value={$form.workTime}
          handleChange={handleSettingChange}
        />
      </div>
    </div>
    <div class="settings-wrapper">
      <div class="input-wrapper">
        <Input
          label="Пауза"
          name="pauseTime"
          value={$form.pauseTime}
          handleChange={handleSettingChange}
        />
      </div>
      <div class="input-wrapper">
        <Input
          label="Длинная пауза"
          name="longPauseTime"
          value={$form.longPauseTime}
          handleChange={handleSettingChange}
        />
      </div>
    </div>
  </div>
  <div class="button-wrapper">
    <Button color="green" type="button" handleClick={handleSubmit}
      >Запомнить настройки</Button
    >
    <Button color="red" type="button" handleClick={handleReset}
      >Сбросить таймер</Button
    >
  </div>
</form>

<style>
  .settings-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 8px;
  }

  .settings-container {
    display: flex;
    margin-bottom: 16px;
  }

  .settings-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .settings-wrapper:first-child {
    margin-right: 16px;
  }

  .input-wrapper {
    margin-bottom: 8px;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-wrapper :global(.button:first-child) {
    margin-bottom: 8px;
  }

  .button-wrapper :global(.button) {
    width: 150px;
  }
</style>
