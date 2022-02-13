<script lang="ts">
  import Main from './components/Main.svelte';
  import Settings from './components/Settings.svelte';

  let showSettings = false;

  function toggleSettings() {
    showSettings = !showSettings;
  }
</script>

<main>
  <button on:click={toggleSettings}>Настройки</button>
  {#if showSettings}
    <Settings />
  {/if}
  <Main />
</main>

<style>
  main {
    width: 200px;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
