<template>
  <widget-container text="Who's out widget">
    <div class='top-panel'>
      <search
        class='search'
        v-model='widgetParams.searchStr'
        :focused='widgetParams.focused'
        @set-focused='setFocused'
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
      :scroll-to-top='widgetParams.scrollToTop'
      @set-last-user='setLastUser'
      @set-scroll-to-top='setScrollToTop'
    />
  </widget-container>
</template>

<script lang='ts' setup>
  import type { Tab as UsersListTab } from '@/lib/tabs-list/tabs-list.vue';
  import type { UserRef } from '@/lib/users-list/users-list.vue';

  import { computed, reactive } from 'vue';
  import { useUsers } from '@/composables/use-users';

  import WidgetContainer from '@/lib/widget-container/widget-container.vue';
  import Search from '@/lib/search/search.vue';
  import TabsList from '@/lib/tabs-list/tabs-list.vue';
  import UsersList from '@/lib/users-list/users-list.vue';

  export type Tab = 'All' | 'On Vacation' | 'On Holidays';

  export type WidgetParams = {

    // input search str
    searchStr: string;

    // active tab
    activeTab: Tab;

    // last user in the users list
    lastUser: UserRef;

    // scroll to top in the tab
    scrollToTop: boolean;

    // is input focused
    focused: boolean;
  };

  // widget params that are tracked by the composable
  const widgetParams = reactive<WidgetParams>({

    // watchable params
    searchStr: '',
    activeTab: 'All',
    lastUser: null,

    // additional params
    scrollToTop: false,
    focused: false
  });

  // composable that returns up-to-date users based on passed params
  const { users } = useUsers(widgetParams);

  // users list tabs
  const tabs = computed<UsersListTab<Tab>[]>(() => [
    { label: 'All', badge: users.total },
    { label: 'On Vacation', badge: users.onVacation },
    { label: 'On Holidays', badge: users.onHolidays }
  ]);

  const setActiveTab = (tab: Tab) => {
    widgetParams.activeTab = tab;
  };

  const setLastUser = (userRef: UserRef) => {
    widgetParams.lastUser = userRef;
  };

  const setScrollToTop = (scrollToTop: boolean) => {
    widgetParams.scrollToTop = scrollToTop;
  };

  const setFocused = (focused: boolean) => {
    widgetParams.focused = focused;
  };
</script>

<style lang='scss' scoped>
  @import 'whos-out-widget';
</style>
