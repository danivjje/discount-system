<script setup lang="ts">
import { Message } from 'primevue';

const { errors } = defineProps<{
  errors: string[] | undefined;
}>();
</script>

<template>
  <ul v-if="errors && errors.length" class="mt-0.5">
    <li v-for="(error, index) in errors" :key="index">
      <Message severity="error" variant="simple" size="small" class="mt-0.5">
        {{ error }}
      </Message>
    </li>
  </ul>
</template>
