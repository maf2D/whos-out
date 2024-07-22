<template>
  <widget-container text="Who's out widget">
    <div class='top-panel'>
      <search
        class='search'
        v-model='searchStr'
      />

      <tabs-list
        :tabs='tabs'
        :active-tab='activeTab'
        @set-active-tab='setActiveTab'
      />
    </div>

    <users-list
      class='users-list'
      :users='users.data'
      @set-last-user='setLastUser'
      ref='usersListRef'
    />
  </widget-container>
</template>

<script lang='ts' setup>
  import type { MaybeElement } from '@vueuse/core';
  import type { Tab } from '@/lib/tabs-list/tabs-list.vue';

  import { computed, ref } from 'vue';
  import { useUsers } from '@/composables/use-users';
  import { TABS_LIST_LABELS } from '@/constants/tabs-list-labels';

  import WidgetContainer from '@/lib/widget-container/widget-container.vue';
  import Search from '@/lib/search/search.vue';
  import TabsList from '@/lib/tabs-list/tabs-list.vue';
  import UsersList from '@/lib/users-list/users-list.vue';

  const searchStr = ref('');
  const activeTab = ref(TABS_LIST_LABELS.all);
  const lastUser = ref<MaybeElement>(null);

  const { users } = useUsers({ searchStr, activeTab, lastUser });

  const setActiveTab = (tab: TABS_LIST_LABELS) => {
    activeTab.value = tab;
  };

  const setLastUser = (user: MaybeElement) => {
    lastUser.value = user;
  };

  const tabs = computed<Tab[]>(() => [
    { label: TABS_LIST_LABELS.all, badge: users.total },
    { label: TABS_LIST_LABELS.onVacation, badge: users.onVacation },
    { label: TABS_LIST_LABELS.onHolidays, badge: users.onHolidays },
  ]);
</script>

<style lang='scss' scoped>
  @import 'whos-out-widget';
</style>
