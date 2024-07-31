<template>
  <div class='users-list'>
    <div
      v-if='users.length'
      class='virtual-list'
      v-bind='containerProps'
    >
      <div v-bind='wrapperProps'>
        <users-list-item
          v-for='item of list'
          :img='item.data.avatar || defaultAvatar'
          :title='`${item.data.firstName} ${item.data.lastName}`'
          :subtitle='item.data.position'
          aside-text='16 july'
          :ref='item.index === users.length - 1 ? "lastItem" : undefined'
          :key='item.data.id'
        />
      </div>
    </div>

    <loader v-if='loading' />

    <p
      v-if='error && !list.length && !loading'
      class='not-found'
    >
      {{ error || 'No users found' }}
    </p>
  </div>
</template>

<script lang='ts' setup>
  import type { User } from '@/types/api';

  import { computed, onUnmounted, ref } from 'vue';
  import { useIntersectionObserver, useVirtualList } from '@vueuse/core';

  import UsersListItem from '@/lib/users-list-item/users-list-item.vue';
  import Loader from '@/lib/loader/loader.vue';
  import defaultAvatar from '@/assets/user-stub.png';

  const props = withDefaults(defineProps<{

    // all the users
    users: User[];

    // loading status
    loading: boolean;

    // error
    error: string | null;
  }>(), {

    // default values
    users: () => [] as User[],
    loading: false,
    error: null
  });

  const emit = defineEmits<{
    (event: 'set-skip', value: number): void;
  }>();

  // last user in the list
  const lastItem = ref(null);

  // composable that shows only n list items in the view port
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    computed(() => props.users),
    { itemHeight: 44 }
  );

  // update skip value when intersecting last item
  const { stop } = useIntersectionObserver(

    // target
    lastItem,

    // intersection cb
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        emit('set-skip', props.users.length);
      }
    }
  );

  // disable observer when unmounted
  onUnmounted(() => stop());

  defineExpose({ scrollToTop: () => scrollTo(0) })
</script>

<style lang='scss' scoped>
  @import 'users-list';
</style>