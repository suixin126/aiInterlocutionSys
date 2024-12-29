import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/study_and_practice",
    component: () => import("@/views/home/Home.vue"),
    children: [
      {
        path: "/study_and_practice",
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
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/exam/Test.vue"),
      },
      {
        path: "/personalInfo",
        name: "personalInfo",
        component: () => import("@/views/personalInfo/PersonalInfo.vue"),
      },
    ],
  },
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let token = localStorage.getItem("token");
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
