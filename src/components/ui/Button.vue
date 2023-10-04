<template>
  <div>
    <button :class="props.title == 'login' ? 'btn-primary btn btn-lg ' : 'btn-success btn btn-lg'">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
</style>
