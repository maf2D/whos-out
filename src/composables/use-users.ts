import type { Ref } from 'vue';
import type { MaybeElement } from '@vueuse/core';
import type { GetUsersParams, User } from '@/types/api';

import { onMounted, onUnmounted, reactive, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { api } from '@/api/api';
import { TABS_LIST_LABELS } from '@/constants/tabs-list-labels';

type Users = {
  data: User[];
  total: number;
  onHolidays: number;
  onVacation: number;
  allFetched: boolean;
};

type UseUsersParams = {
  searchStr: Ref<string>;
  activeTab: Ref<TABS_LIST_LABELS>;
  lastUser: Ref<MaybeElement>;
};

const initialState: Users = {
  data: [],
  total: 0,
  onHolidays: 0,
  onVacation: 0,
  allFetched: false
};

// composable that gets some params and returns users based on the params
export const useUsers = ({
  searchStr,
  activeTab,
  lastUser
}: UseUsersParams) => {

  // users state
  const users = reactive<Users>({ ...initialState });

  // composable that updates users when intersecting a last user
  const { stop } = useIntersectionObserver(

    // target
    lastUser,

    // intersection cb
    async ([{ isIntersecting }]) => {

      // if intersecting and not all users are fetched
      if (isIntersecting && !users.allFetched) {
        await getUsers({
          skip: users.data.length,
          str: searchStr.value,
          onHolidays: activeTab.value === TABS_LIST_LABELS.onHolidays,
          onVacation: activeTab.value === TABS_LIST_LABELS.onVacation
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
    [searchStr, activeTab],
    async ([updatedStr, updatedTab]) => {

      // fetch users
      await getUsers({
        str: updatedStr,
        onHolidays: updatedTab === TABS_LIST_LABELS.onHolidays,
        onVacation: updatedTab === TABS_LIST_LABELS.onVacation
      });
    }
  );

  // get users fn
  const getUsers = async (params: GetUsersParams) => {
    try {

      // set default params
      params.limit = params.limit || 20;

      // fetch users
      const response = await api.getUsers(params);

      // check if all the users are fetched
      users.allFetched = response.users.length === 0;

      // check if we need to add users to the existing list or fully update them
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