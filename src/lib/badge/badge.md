# Component: Badge

## Description

The `Badge` component displays a badge with a number or string inside.

## Props

| Prop Name | Type      | Default | Description                                      |
|-----------|-----------|---------|--------------------------------------------------|
| `label`   | `string`  | `''`    | Text that displays inside the badge              |
| `isDark`  | `boolean` | `true`  | Activates light or dark version of the component |


## Usage

Here's how to use the `Badge` component in your Vue 3 project:

```vue
<template>
  <badge
    :label='badge'
    :is-dark='true'
  />
</template>

<script lang="ts" setup>
  import Badge from '@/components/badge/badge.vue';
</script>
```
