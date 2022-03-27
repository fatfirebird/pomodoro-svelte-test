<script lang="ts">
  import { getInitialData } from './application/getInitialData';

  import Main from './UI/screens/Main.svelte';
  import Settings from './UI/screens/Settings.svelte';

  let showSettings = false;

  function toggleSettings() {
    showSettings = !showSettings;
  }
</script>

{#await getInitialData()}
  <p>loading...</p>
{:then}
  <main>
    <button on:click={toggleSettings}>
      {#if showSettings}
        Таймер
      {:else}
        Настройки
      {/if}
    </button>

    {#if showSettings}
      <Settings />
    {:else}
      <Main />
    {/if}
  </main>
{/await}

<style>
  main {
    width: 400px;
    height: 300px;
  }
</style>
