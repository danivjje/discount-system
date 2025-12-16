<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import EmptyPageTemplate from '@/components/ui/EmptyPageTemplate.vue';
</script>

<template>
  <EmptyPageTemplate class="justify-center">
    <h4 class="mb-5 text-xl font-normal">Авторизация</h4>
    <LoginForm />
  </EmptyPageTemplate>
</template>
