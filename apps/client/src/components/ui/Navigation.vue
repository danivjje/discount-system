<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useCommonStore } from '@/store';

import { Tabs, TabList, Tab, Drawer, Button } from 'primevue';

const router = useRouter();
const commonStore = useCommonStore();

const { width } = useWindowSize();
const isDrawerVisible: Ref<boolean> = ref(false);

const handleChangeRoute = (route: string): void => {
  if (route !== commonStore.activeNavOption?.route) {
    router.push({ path: route });
  }
};

const handleDrawerChangeRoute = (route: string): void => {
  handleChangeRoute(route);
  isDrawerVisible.value = false;
};

const handleOpenDrawer = (): void => {
  isDrawerVisible.value = true;
};
</script>

<template>
  <Tabs
    v-if="width >= 640"
    :value="commonStore.activeNavOption?.route ?? '/'"
    class="mb-20"
    @update:value="(value) => handleChangeRoute(value as string)"
  >
    <TabList>
      <Tab v-for="tab in commonStore.navOptions" :key="tab.route" :value="tab.route">
        <strong class="font-medium">{{ tab.title }}</strong>
      </Tab>
    </TabList>
  </Tabs>

  <Button v-else class="mt-4 mb-8" @click="handleOpenDrawer">Меню</Button>
  <Drawer v-model:visible="isDrawerVisible" header="Меню">
    <ul class="flex flex-col gap-2">
      <li v-for="item in commonStore.navOptions" :key="item.route">
        <button
          class="font-medium"
          :class="{
            'text-primary-500': item.route === commonStore.activeNavOption?.route,
          }"
          @click="() => handleDrawerChangeRoute(item.route)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </Drawer>
</template>
