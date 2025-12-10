<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <div class="page flex flex-col items-center">
    <Navigation />
    <slot></slot>
  </div>
</template>
