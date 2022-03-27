<script lang="ts">
  export let type: HTMLButtonElement['type'] = 'button';
  export let handleClick: HTMLButtonElement['onclick'] = null;
  export let color: 'green' | 'red' | null = null;
</script>

<button
  class="button"
  class:green={color === 'green'}
  class:red={color === 'red'}
  type={type}
  on:click|preventDefault={handleClick}
>
  <slot />
</button>

<style>
  .button {
    margin: 0;
    border: none;
    min-width: 63px;
    min-height: 32px;
    padding: 8px;
    border-radius: 12px;
    font: var(--button-small);
    color: var(--white);
    background-color: var(--blue-3);
    transition: 0.2s;
    cursor: pointer;
  }

  .button:hover {
    background-color: var(--blue-6);
  }

  .green {
    background-color: var(--green-3);
  }

  .green:hover {
    background-color: var(--green-1);
  }

  .red {
    background-color: var(--red-3);
  }

  .red:hover {
    background-color: var(--red-1);
  }
</style>
