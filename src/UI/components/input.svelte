<script>
  export let label;
  export let name;
  export let value;
  export let handleChange;
</script>

<label class="input-wrapper">
  <div class="input-label">{label}</div>
  <input
    class="input"
    type="number"
    name={name}
    min="1"
    bind:value
    on:change={handleChange}
  />
</label>

<style>
  .input-wrapper {
    position: relative;
  }

  .input {
    border: 1px solid var(--grey-11);
    background: var(--white);
    border-radius: 4px;
    padding: 8px 16px;
    color: var(--grey-1);
    font: var(--small);
    outline: none;
    transition: 0.2s;
  }

  .input:focus-within {
    border-color: var(--blue-3);
  }

  .input::placeholder {
    color: var(--grey-8);
    font: var(--small);
  }

  .input-label {
    margin-bottom: 4px;
    color: var(--grey-8);
    font: var(--small);
  }
</style>
