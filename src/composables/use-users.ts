import type { ToRefs } from 'vue';
import type { GetUsersResponse } from '@/types/api';
import type { WidgetState }
  from '@/components/whos-out-widget/whos-out-widget.vue';

import { computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { buildQueryParams } from '@/helpers/build-query-params';

// composable that gets some params and returns users based on the params
export const useUsers = ({
  skip,
  searchStr,
  activeTab
}: ToRefs<WidgetState>) => {

  // users state
  const users = ref<GetUsersResponse['data'] | null>(null);

  // composable that fetches new users based on query params
  const { isFetching, error, onFetchResponse } = useFetch<GetUsersResponse>(

    // dynamic url param
    computed(() => `/api/users?${buildQueryParams({
      str: searchStr.value,
      onHolidays: activeTab.value === 'On Holidays',
      onVacation: activeTab.value === 'On Vacation',
      skip: skip.value,
      limit: 20
    })}`),

    // refetch when url is changing
    { refetch: true }
  );

  // set up users
  onFetchResponse(async (response) => {
    const { data } = await response.json();

    // if scrolling then adding new users to existing users
    if (skip.value > 0 && users.value) {
      users.value = {
        ...data,
        users: [
          ...users.value.users,
          ...data.users
        ]
      };
    }

    // just rewrite the users
    if (skip.value === 0) {
      users.value = data;
    }
  });

  return {
    users: computed(() => users.value?.users),

    allUsersCount: computed(() => users.value?.usersCount),
    usersOnHolidaysCount: computed(() => users.value?.usersOnHolidays),
    usersOnVacationCount: computed(() => users.value?.usersOnVacation),

    isFetching,
    error,
  };
};
