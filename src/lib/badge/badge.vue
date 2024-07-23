<template>
  <div
    class='badge'
    data-testid='badge'
    :class='{ dark: type === "dark" }'
  >
    {{ label }}
  </div>
</template>

<script lang='ts' setup>
  withDefaults(defineProps<{

    // badge label
    label: number | string;

    // is badge active
    type: 'dark' | 'light';
  }>(), {

    // default values
    label: '',
    type: 'light'
  });
</script>

<style lang='scss' scoped>
  @import 'badge';
</style>
