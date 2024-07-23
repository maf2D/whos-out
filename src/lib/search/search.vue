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
      @focus='$emit("set-focused", true)'
      @blur='$emit("set-focused", false)'
      ref='input'
    />
  </div>
</template>

<script lang='ts' setup>
  import { ref, watch } from 'vue';
  import { debounce } from '@/helpers/debounce';
  import IconSearch from '@/lib/icons/search/search.vue';

  const props = withDefaults(defineProps<{

    // model value
    modelValue: string;

    // input focus
    focused: boolean;

    // input placeholder
    placeholder?: string;
  }>(), {

    // default values
    modelValue: '',
    placeholder: 'Search...',
    focused: false
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'set-focused', value: boolean): void;
  }>();

  // input ref
  const input = ref<HTMLElement | null>(null);

  // focus input when focused is set to true
  watch(() => props.focused, (updatedFocused) => {
    if (updatedFocused) {
      input.value?.focus();
    }
  });

  // input handler
  const onInput = debounce((event: Event) => {

    // update model value
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }, 500);
</script>

<style lang='scss' scoped>
  @import 'search';
</style>
