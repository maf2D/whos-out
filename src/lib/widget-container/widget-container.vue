<template>
  <div class='widget-container'>
    <div class='header'>
      <div class='logo-container'>
        <div class='logo'>
          <icon-logo />
        </div>

        <h1>{{ text }}</h1>
      </div>

      <x
        class='close-btn'
        @click="$emit('close')"
      />
    </div>

    <div class='slot'>
      <slot />
    </div>
  </div>
</template>

<script lang='ts' setup>
  import X from '@/lib/icons/x/x.vue';
  import IconLogo from '@/lib/icons/logo/logo.vue';

  defineEmits<{
    (event: 'close'): void;
  }>();

  withDefaults(defineProps<{

    // widget text
    text: string;
  }>(), {

    // default values
    text: ''
  });
</script>

<style lang='scss' scoped>
  @import './widget-container';
</style>
