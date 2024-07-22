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
  import { TABS_LIST_LABELS } from '@/constants/tabs-list-labels';
  import TabsListItem from '@/lib/tabs-list-item/tabs-list-item.vue';

  export type Tab = {
    label: TABS_LIST_LABELS;
    badge: number;
  };

  withDefaults(defineProps<{

    // tabs
    tabs: Tab[];

    // active tab
    activeTab: TABS_LIST_LABELS;
  }>(), {

    // default values
    tabs: () => [],
    activeTab: TABS_LIST_LABELS.all
  });

  defineEmits<{
    (event: 'set-active-tab', tab: TABS_LIST_LABELS): void;
  }>();
</script>

<style lang='scss' scoped>
  @import 'tabs-list';
</style>