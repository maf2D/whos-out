<template>
  <widget-container text="Who's out widget">
    <div class='top-panel'>
      <search
        class='search'
        v-model='widgetParams.searchStr'
      />

      <tabs-list
        :tabs='tabs'
        :active-tab='widgetParams.activeTab'
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
  import type { Tab as UsersListTab } from '@/lib/tabs-list/tabs-list.vue';
  import type { UserRef} from '@/lib/users-list/users-list.vue';

  import { computed, reactive } from 'vue';
  import { useUsers } from '@/composables/use-users';

  import WidgetContainer from '@/lib/widget-container/widget-container.vue';
  import Search from '@/lib/search/search.vue';
  import TabsList from '@/lib/tabs-list/tabs-list.vue';
  import UsersList from '@/lib/users-list/users-list.vue';

  export type Tab = 'All' | 'On Vacation' | 'On Holidays';

  export type WidgetParams = {
    searchStr: string;
    activeTab: Tab;
    lastUser: UserRef;
  };

  // widget params that are tracked by the composable
  const widgetParams = reactive<WidgetParams>({
    searchStr: '',
    activeTab: 'All',
    lastUser: null
  });

  const setActiveTab = (tab: Tab) => {
    widgetParams.activeTab = tab;
  };

  const setLastUser = (userRef: UserRef) => {
    widgetParams.lastUser = userRef;
  };

  // up-to-date users
  const { users } = useUsers(widgetParams);

  // users list tabs
  const tabs = computed<UsersListTab<Tab>[]>(() => [
    { label: 'All', badge: users.total },
    { label: 'On Vacation', badge: users.onVacation },
    { label: 'On Holidays', badge: users.onHolidays }
  ]);
</script>

<style lang='scss' scoped>
  @import 'whos-out-widget';
</style>
