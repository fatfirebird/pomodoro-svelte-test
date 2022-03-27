<script lang="ts">
  import { onDestroy } from 'svelte';

  import { useTimerObserver } from '../../application/useTimerObserver';
  import { TTimerStoreValues } from '../../domain/timer';

  let timerData: TTimerStoreValues;

  const { togglePause, timerInterval } = useTimerObserver(
    (values) => (timerData = values),
  );

  onDestroy(() => clearInterval(timerInterval));
</script>

<div
  on:click={togglePause}
  class:work={timerData.status === 'work'}
  class:chill={timerData.status === 'chill'}
  class:long-chill={timerData.status === 'long'}
>
  {#if timerData.timer === 0}
    Start timer!
  {:else}
    {timerData.status}
    {timerData.timer}
  {/if}
</div>

<style>
  .work {
    background-color: red;
  }

  .chill {
    background-color: green;
  }

  .long-chill {
    background-color: yellow;
  }
</style>
