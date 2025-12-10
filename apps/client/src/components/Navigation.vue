<script setup lang="ts">
import { SelectButton } from 'primevue';
import { useRouter } from 'vue-router';
import type { NavigationOption } from '@/types';
import { useCommonStore } from '@/store';

const router = useRouter();
const commonStore = useCommonStore();

const handleChangeRoute = (option: NavigationOption): void => {
  router.push({ path: option.path });
};
</script>

<template>
  <SelectButton
    v-model="commonStore.activeNavOption"
    :options="commonStore.navOptions"
    option-label="title"
    class="mb-[100px]"
    size="small"
    @change="(value) => handleChangeRoute(value.value)"
  />
</template>
