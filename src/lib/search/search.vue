<template>
  <div class='search-container' :class='{ focused }'>
    <icon-search class='mr-2' />

    <input
      data-testid='search-input'
      class='search-input'
      type='text'
      :placeholder='placeholder'
      :value='modelValue'
      @input='onInput'
      @focus='focused = true'
      @blur='focused = false'
      ref='input'
    />
  </div>
</template>

<script lang='ts' setup>
  import { ref } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import IconSearch from '@/lib/icons/search/search.vue';

  withDefaults(defineProps<{

    // model value
    modelValue: string;

    // input placeholder
    placeholder?: string;
  }>(), {

    // default values
    modelValue: '',
    placeholder: 'Search...'
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
  }>();

  // refs
  const input = ref<HTMLElement | null>(null);
  const focused = ref(false)

  // input handler
  const onInput = useDebounceFn((event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }, 500);

  defineExpose({ focusSearch: () => input.value?.focus() });
</script>

<style lang='scss' scoped>
  @import 'search';
</style>
