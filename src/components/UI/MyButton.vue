<template>
  <button class="btn-add">
    <slot />
  </button>
</template>
<script>
export default {
    name: 'my-button',
};
</script>
<style scoped>
.btn-add {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}
.btn-add:hover {
  transition: 100ms;
  background: teal;
  color: whitesmoke;
}
</style>