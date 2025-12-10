import 'vue-router';

type NavMeta =
  | {
      showInNav: true;
      navTitle: string;
    }
  | {
      showInNav?: false;
      navTitle?: undefined;
    };

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    nav?: NavMeta;
  }
}
