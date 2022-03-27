<script lang="ts">
  import { getInitialData } from './application/getInitialData';
  import Button from './UI/components/button.svelte';

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
    <Button handleClick={toggleSettings}>
      {#if showSettings}
        Таймер
      {:else}
        Настройки
      {/if}
    </Button>

    {#if showSettings}
      <Settings />
    {:else}
      <Main />
    {/if}
  </main>
{/await}

<style>
  main {
    position: relative;
    width: 500px;
    height: 320px;
  }

  main > :global(.button) {
    top: 8px;
    left: 8px;
    position: absolute;
  }
</style>
