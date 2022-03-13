<script lang="ts">
  import { onMount } from 'svelte';
  import { timerStore } from '../domain/timer';

  function togglePause() {
    console.log($timerStore);

    if ($timerStore.isPaused) {
      timerStore.startTimer();
    } else {
      timerStore.pauseTimer();
    }
  }

  $: if ($timerStore.timer <= 0) {
    timerStore.countPomodoro();
  }

  onMount(() => {
    const interval = setInterval(() => {
      if (!$timerStore.isPaused) {
        timerStore.setTimer($timerStore.timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  on:click={togglePause}
  class:work={$timerStore.status === 'work'}
  class:chill={$timerStore.status === 'chill'}
  class:long-chill={$timerStore.status === 'long'}
>
  {$timerStore.status}
  {$timerStore.timer}
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
