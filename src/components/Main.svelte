<script lang="ts">
  import { onMount } from 'svelte';

  import { pomodoroStore } from '../store';

  function togglePause() {
    if ($pomodoroStore.pause) {
      pomodoroStore.start();
    } else {
      pomodoroStore.pause();
    }
  }

  $: if ($pomodoroStore.timer <= 0) {
    pomodoroStore.countTimer();
  }

  onMount(() => {
    const interval = setInterval(() => {
      if (!$pomodoroStore.pause) {
        pomodoroStore.changeTimer($pomodoroStore.timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  on:click={togglePause}
  class:work={$pomodoroStore.status === 'work'}
  class:chill={$pomodoroStore.status === 'chill'}
  class:long-chill={$pomodoroStore.status === 'long'}
>
  {$pomodoroStore.status}
  {$pomodoroStore.timer}
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
