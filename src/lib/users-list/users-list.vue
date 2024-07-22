<template>
  <div
    class='users-list'
    v-bind='containerProps'
  >
    <div v-bind='wrapperProps'>
      <div
        v-for='item of list'
        :ref='setLastUser.bind(null, item.index)'
        :key='item.data.id'
      >

        <users-list-item
          :img='item.data.avatar'
          :title='`${item.data.firstName} ${item.data.lastName}`'
          :subtitle='item.data.position'
          aside-text='16 july'
        />

      </div>
    </div>

    <p
      v-if='!users.length'
      class='not-found'
    >
      No users found
    </p>
  </div>
</template>

<script lang='ts' setup>
  /* eslint-disable  @typescript-eslint/no-explicit-any */

  import type { MaybeElement } from '@vueuse/core';
  import type { User } from '@/types/api';

  import { computed } from 'vue';
  import { useVirtualList } from '@vueuse/core';
  import UsersListItem from '@/lib/users-list-item/users-list-item.vue';

  const props = withDefaults(defineProps<{

    // all the users
    users: User[];
  }>(), {

    // default values
    users: () => []
  });

  const emit = defineEmits<{
    (event: 'set-last-user', el: MaybeElement): void;
  }>();

  // composable that show only n list items in the view port
  const { list, containerProps, wrapperProps } = useVirtualList(
    computed(() => props.users),
    { itemHeight: 44 }
  );

  // set last user emit fn
  const setLastUser = (...args: any) => {

    // emit last user if it's a last one
    if (args[0] === props.users.length - 1) {
      emit('set-last-user', args[1]);
    }
  };
</script>

<style lang='scss' scoped>
  @import 'users-list';
</style>