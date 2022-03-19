<script lang="ts">
  import { useTimerObserver } from '../../application/useTimerObserver';
  import { TTimerStoreValues } from '../../domain/timer';

  let timerData: TTimerStoreValues;

  const { togglePause } = useTimerObserver((values) => (timerData = values));
</script>

<div
  on:click={togglePause}
  class:work={timerData.status === 'work'}
  class:chill={timerData.status === 'chill'}
  class:long-chill={timerData.status === 'long'}
>
  {timerData.status}
  {timerData.timer}
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
