<script>
  export let label;
  export let name;
  export let value;
  export let handleChange;
</script>

<label>
  <span>{label}</span>
  <input
    type="number"
    name={name}
    min="1"
    bind:value
    on:change={handleChange}
  />
</label>

<style>
  span {
    display: block;
    margin-bottom: 4px;
  }
</style>
