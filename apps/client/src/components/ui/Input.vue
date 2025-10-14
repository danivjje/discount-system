<script setup lang="ts">
import type { InputError } from '@/types';

const { type, placeholder } = defineProps<{
  type: string;
  placeholder: string;
  errors?: InputError[];
}>();

const model = defineModel();
</script>

<template>
  <div>
    <ul v-if="errors && errors.length" class="mt-2">
      <li v-for="error in errors" class="not-last:mb-2 text-red-500">{{ error.message }}</li>
    </ul>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="border-2 border-solid border-gray-300 px-5 py-2"
    />
  </div>
</template>
