<template>
  <div class='users-list-item'>
    <div class='item-left'>
      <div class='avatar'>
        <img :src='img' :alt='title' />
      </div>

      <div class='info'>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <div class='item-right'>
      <p>{{ `Till ${asideText}` || 'No date' }}</p>

      <span>
        <icon-plane />
      </span>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import IconPlane from '@/lib/icons/plane/plane.vue';

  withDefaults(defineProps<{

    // item title
    title: string;

    // item image
    img: string;

    // item subtitle
    subtitle?: string;

    // away until some date
    asideText?: string;
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