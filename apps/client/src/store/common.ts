import type { NavigationOption } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref, watchEffect, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useCommonStore = defineStore('common', () => {
  const route = useRoute();
  const router = useRouter();

  const navOptions = computed<NavigationOption[]>(() => {
    return router
      .getRoutes()
      .filter((item) => item.meta.nav?.showInNav)
      .map((item) => {
        return { title: item.meta.nav!.navTitle as string, path: item.path };
      });
  });
  const activeNavOption: Ref<NavigationOption | null> = ref(null);

  watchEffect(() => {
    if (route.meta.nav?.showInNav) {
      activeNavOption.value = { title: route.meta.nav.navTitle, path: route.path };
    }
  });

  return {
    activeNavOption,
    navOptions,
  };
});
