import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/providers",
    name: "providers",
    component: () => import("./components/ProvidersList")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddProvider")
  },
  {
    path: "/purposes",
    name: "purpose",
    component: () => import("./components/PurposesList")
  },
  {
    path: "/addpurposes",
    name: "addpurposes",
    component: () => import("./components/AddPurpose")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;