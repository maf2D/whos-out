import type { GetUsersParams, User } from '@/types/api';
import type { WidgetParams }
  from '@/components/whos-out-widget/whos-out-widget.vue';

import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { MaybeElement, useIntersectionObserver } from '@vueuse/core';
import { api } from '@/api/api';

type UsersState = {
  data: User[];
  total: number;
  onHolidays: number;
  onVacation: number;
  allFetched: boolean;
};

const initialState: UsersState = {
  data: [],
  total: 0,
  onHolidays: 0,
  onVacation: 0,
  allFetched: false
};

// composable that gets some params and returns users based on the params
export const useUsers = (widgetParams: WidgetParams) => {

  // users state
  const users = reactive({ ...initialState });

  // composable that updates users when intersecting a last user
  const { stop } = useIntersectionObserver(

    // target
    computed(() => widgetParams.lastUser as MaybeElement),

    // intersection cb
    async ([{ isIntersecting }]) => {

      // if intersecting and not all users are fetched
      if (isIntersecting && !users.allFetched) {
        await getUsers({
          skip: users.data.length,
          str: widgetParams.searchStr,
          onHolidays: widgetParams.activeTab === 'On Holidays',
          onVacation: widgetParams.activeTab === 'On Vacation'
        });
      }
    }
  );

  // get default users when mounted
  onMounted(() => getUsers({ skip: 0 }));

  // stop intersection when unmounted
  onUnmounted(() => stop());

  // watcher that updates users when search str or tab was changed
  watch(
    [() => widgetParams.searchStr, () => widgetParams.activeTab],
    async ([updatedStr, updatedTab]) => {

      // fetch users
      await getUsers({
        str: updatedStr,
        onHolidays: updatedTab === 'On Holidays',
        onVacation: updatedTab === 'On Vacation'
      });
    }
  );

  // get users fn
  const getUsers = async (params: GetUsersParams) => {
    try {

      // default params
      params.limit = params.limit || 20;

      // fetch users
      const response = await api.getUsers(params);

      // if there are no more users in the api
      users.allFetched = response.users.length === 0;

      // based on the skip param set users
      users.data = params.skip && params.skip > 0
        ? [...users.data, ...response.users]
        : response.users;

      // default values
      users.total = response.usersCount;
      users.onVacation = response.usersOnVacation;
      users.onHolidays = response.usersOnHolidays;
    } catch (err) {
      console.log(err);
    }
  };

  return { users };
};