# Component: Search

## Description

The `Search` component displays a search input that is shown on the top of the widget

## Props

| Prop Name     | Type     | Default     | Description      |
|---------------|----------|-------------|------------------|
| `modelValue`  | `string` | `''`        | Model value      |
| `placeholder` | `string` | `Search...` | Placeholder text |


## Emits

| Event Name           | Payload Type   | Description                                 |
|----------------------|----------------|---------------------------------------------|
| `update:modelValue`  | `void`         | Emitted when the "search input" is changed. |

## Usage

Here's how to use the `Search` component in your Vue 3 project:

```vue
<template>
  <search v-model='searchModel' />
</template>

<script lang="ts" setup>
  import Search from '@/components/search/search.vue';
  
  const searchModel = ref('');
</script>
```
