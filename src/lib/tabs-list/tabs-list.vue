<template>
  <div class='tabs-list'>
    <tabs-list-item
      class='tabs-list-item'
      v-for='{ label, badge } of tabs'
      :is-active='activeTab === label'
      :label='label'
      :badge='badge'
      :key='label'
      @click="$emit('set-active-tab', label)"
    />
  </div>
</template>

<script lang='ts' setup>
  import TabsListItem from '@/lib/tabs-list-item/tabs-list-item.vue';

  export type Tab<T> = {
    label: T;
    badge: number;
  };

  withDefaults(defineProps<{

    // all the tabs
    tabs: Tab<string>[];

    // active tab
    activeTab: string;
  }>(), {

    // default values
    tabs: () => [],
    activeTab: ''
  });

  defineEmits<{
    <T>(event: 'set-active-tab', tab: T): void;
  }>();
</script>

<style lang='scss' scoped>
  @import 'tabs-list';
</style>