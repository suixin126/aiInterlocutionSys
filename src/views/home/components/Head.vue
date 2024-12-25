<template>
  <div class="head-contain">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect" router>
      <el-menu-item index="0">
        <img style="width: 100px" src="@/assets/imgs/1.jpg" alt="Element logo" />
      </el-menu-item>
      <el-menu-item index="/"> 学习模块 </el-menu-item>
      <el-menu-item index="/exam"> 考核模块 </el-menu-item>
      <el-sub-menu index="3">
        <template #title>个人信息</template>
        <el-menu-item index="/resetPassword">修改密码</el-menu-item>
        <el-menu-item @click="exit">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
const exit = () => {
  localStorage.removeItem("token");
  router.push({ path: "/login" });
};
</script>

<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

.head-contain {
  margin-top: 20px;
}
</style>