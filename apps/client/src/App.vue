<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toast } from 'primevue';
</script>

<template>
  <RouterView />
  <Toast
    :pt="{ messageContent: { class: 'flex justify-between items-center p-3! sm:p-4!' } }"
    class="w-[90%]! max-w-100 text-sm sm:text-base"
  >
    <template #message="{ message }">
      <strong class="font-medium">{{ message.summary }}</strong>
    </template>
  </Toast>
</template>
