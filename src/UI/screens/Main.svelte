<script lang="ts">
  import { onDestroy } from 'svelte';

  import { useTimerObserver } from '../../application/useTimerObserver';
  import { TTimerStoreValues } from '../../domain/timer';
  import { formatTimer } from '../../lib/formatTimer';

  let timerData: TTimerStoreValues;

  const { togglePause, timerInterval } = useTimerObserver(
    (values) => (timerData = values),
  );

  onDestroy(() => clearInterval(timerInterval));
</script>

<div
  class="timer-container"
  class:work={timerData.status === 'work'}
  class:chill={timerData.status === 'chill'}
  class:long-chill={timerData.status === 'long'}
>
  <button class="timer-button" on:click={togglePause}>
    {#if timerData?.timer === 0}
      Start timer!
    {:else}
      {formatTimer(timerData.timer)}
    {/if}
  </button>
</div>

<style>
  .timer-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }

  .work {
    background-color: var(--red-6);
  }

  .chill {
    background-color: var(--green-7);
  }

  .long-chill {
    background-color: var(--yellow);
  }

  .timer-button {
    padding: 0;
    margin: 0;
    background-color: transparent;
    font: var(--title);
    color: var(--white);
    cursor: pointer;
    border: none;
  }
</style>
