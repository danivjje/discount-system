<script setup lang="ts"></script>

<template>
  <div class="page flex flex-col items-center">
    <RouterLink to="/" class="mb-10">Вернуться назад</RouterLink>
    <form @submit.prevent class="border-2 border-solid border-gray-300 p-3">
      <strong class="mr-2 font-normal">Процент бонуса</strong>
      <input type="number" placeholder="" class="mr-2 w-fit border border-solid border-gray-400 px-5 py-2" />
      <button class="px-5 py-2">Изменить</button>
    </form>
  </div>
</template>
