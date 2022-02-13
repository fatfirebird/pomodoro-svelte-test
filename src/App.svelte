<script lang="ts">
  import { browser } from 'webextension-polyfill-ts';
  import Main from './components/Main.svelte';
  import Settings from './components/Settings.svelte';
  import { pomodoroStore } from './store';
  import { BACKGROUND_ACTION } from './types';

  let showSettings = false;

  function toggleSettings() {
    showSettings = !showSettings;
  }

  async function getInitialData() {
    try {
      const { pomodoro } = await browser.runtime.sendMessage({
        action: BACKGROUND_ACTION.GET_SETTINGS,
      });

      if (pomodoro) {
        pomodoroStore.set(pomodoro);
      }
    } catch (error) {}
  }
</script>

{#await getInitialData()}
  <p>loading...</p>
{:then}
  <main>
    <button on:click={toggleSettings}>Настройки</button>
    {#if showSettings}
      <Settings />
    {/if}
    <Main />
  </main>
{/await}

<style>
  main {
    width: 200px;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
