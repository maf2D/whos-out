<template>
  <div class='users-list-item'>
    <div class='users-list-item__left'>
      <div class='avatar'>
        <img :src='img || defaultImg' :alt='title' />
      </div>

      <div class='user-info'>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <div class='users-list-item__right'>
      <p>{{ `Till ${asideText}` || 'No date' }}</p>

      <span>
        <icon-plane />
      </span>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import IconPlane from '@/lib/icons/plane/plane.vue';
  import defaultImg from '@/assets/user-stub.png';

  withDefaults(defineProps<{

    // user full name
    title: string;

    // user image
    img: string;

    // profession
    subtitle: string;

    // away until some date
    asideText: string;
  }>(), {

    // default values
    title: '',
    img: '',
    subtitle: '',
    asideText: ''
  });
</script>

<style lang='scss' scoped>
  @import 'users-list-item';
</style>