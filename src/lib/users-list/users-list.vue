<template>
  <div class='users-list'>
    <div
      class='virtual-list'
      v-bind='containerProps'
    >
      <div v-bind='wrapperProps'>
        <users-list-item
          v-for='item of list'
          :img='item.data.avatar'
          :title='`${item.data.firstName} ${item.data.lastName}`'
          :subtitle='item.data.position'
          aside-text='16 july'
          :ref='item.index === users.length - 1 ? setLastUser : undefined'
          :key='item.data.id'
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
  import type { ComponentPublicInstance } from 'vue';
  import type { User } from '@/types/api';

  import { computed } from 'vue';
  import { useVirtualList } from '@vueuse/core';
  import { debounce } from '@/helpers/debounce';
  import UsersListItem from '@/lib/users-list-item/users-list-item.vue';

  export type UserRef = ComponentPublicInstance | Element | null;

  const props = withDefaults(defineProps<{

    // all the users
    users: User[];
  }>(), {

    // default values
    users: () => []
  });

  const emit = defineEmits<{
    (event: 'set-last-user', userRef: UserRef): void;
  }>();

  // composable that shows only n list items in the view port
  const { list, containerProps, wrapperProps } = useVirtualList(
    computed(() => props.users),
    { itemHeight: 44, }
  );

  // set last user fn
  const setLastUser = debounce((userRef: UserRef) => {
    emit('set-last-user', userRef);
  }, 100);
</script>

<style lang='scss' scoped>
  @import 'users-list';
</style>