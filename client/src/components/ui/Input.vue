<script setup lang="ts">
const { type, placeholder } = defineProps<{
  type: string;
  placeholder: string;
}>();
</script>

<template>
  <input :type="type" :placeholder="placeholder" class="px-5 py-2" />
</template>
