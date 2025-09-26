<script setup lang="ts">
const { type, placeholder } = defineProps<{
  type: string;
  placeholder: string;
}>();

const model = defineModel();
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    class="border-2 border-solid border-gray-300 px-5 py-2"
  />
</template>
