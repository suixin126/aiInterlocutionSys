<template>
  <div class="home-contain">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <div class="home-contain-main">
        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import Head from './components/Head.vue';

</script>

<style lang="scss" scoped>
.el-header{
  height: auto;
}
</style>