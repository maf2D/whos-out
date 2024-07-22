<template>
  <div
    class='badge'
    data-testid='badge'
    :class='{ dark: isDark }'
  >
    {{ label }}
  </div>
</template>

<script lang='ts' setup>

  // props
  withDefaults(defineProps<{

    // badge number
    label: number | string;

    // is badge active
    isDark?: boolean;
  }>(), {

    // default values
    label: '',
    isDark: true
  });
</script>

<style lang='scss' scoped>
  @import 'badge';
</style>
