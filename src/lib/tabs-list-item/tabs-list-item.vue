<template>
  <div
    class='tabs-list-item'
    :class='{ "active": isActive }'
    data-testid='tabs-list-item'
  >
    <span class='label'>
      {{ label }}
    </span>

    <badge
      v-if='badge'
      :label='badge'
      :is-dark='!isActive'
      class='badge'
    />
  </div>
</template>

<script lang='ts' setup>
  import Badge from '@/lib/badge/badge.vue';

  withDefaults(defineProps<{

    // tab label
    label: string;

    // tab type (active or not)
    isActive: boolean;

    // tab badge number
    badge?: number | string;
  }>(), {

    // default values
    label: '',
    isActive: false,
    badge: ''
  });
</script>

<style lang='scss' scoped>
  @import 'tabs-list-item';
</style>
