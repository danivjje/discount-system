<script setup lang="ts"></script>

<template>
  <div class="page flex flex-col items-center justify-center">
    <form @submit.prevent>
      <Input type="text" placeholder="Имя пользователя" class="mb-2" />
      <Input type="password" placeholder="Пароль" class="mb-2" />
      <Button type="submit">Войти</Button>
    </form>
  </div>
</template>
