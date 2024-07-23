<template>
  <div class='search-container' :class='{ focused }'>
    <icon-search class='mr-2' />

    <input
      autofocus
      data-testid='search-input'
      class='search-input'
      type='text'
      :placeholder='placeholder'
      :value='modelValue'
      @input='onInput'
      @focus='focused = true'
      @blur='focused = false'
    />
  </div>
</template>

<script lang='ts' setup>
  import { ref } from 'vue';
  import { debounce } from '@/helpers/debounce';
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
    (event: 'set-focused', value: boolean): void;
  }>();

  // if search is focused
  const focused = ref(true);

  // input handler with a debounce fn
  const onInput = debounce((event: Event) => {

    // update model value
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }, 500);
</script>

<style lang='scss' scoped>
  @import 'search';
</style>
