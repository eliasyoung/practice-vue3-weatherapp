import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("@/views/HomeView.vue");
const CityView = () => import("@/views/CityView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "主页",
      },
    },
    {
      path: "/weather/:province/:city",
      name: "cityView",
      component: CityView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "home") document.title = `${to.meta.title} | 天气`;
  if (to.name === "cityView") document.title = `${to.params.city} | 天气`;
  next();
});

export default router;
