import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/resetpassword/Resetpassword.vue"),
  },
  {
    path: "/",
    name: "home",
    redirect: "/study_and_practice",
    component: () => import("@/views/home/Home.vue"),
    children: [
      {
        path: "study_and_practice",
        name: "study_and_practice",
        component: () => import("@/views/study_and_practice/index.vue"),
      },
      {
        path: "/study",
        name: "study",
        component: () => import("@/views/study/Study.vue"),
      },
      {
        path: "/practice",
        name: "practice",
        component: () => import("@/views/study/Practice.vue"),
      },
      {
        path: "/exam",
        name: "exam",
        component: () => import("@/views/exam/Exam.vue"),
      }
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
