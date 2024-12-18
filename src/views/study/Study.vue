<template>
  <div class="study-contain">
    <div class="study-contain-head">学习</div>
    <div class="study-contain-body">
      <div class="title">工地手册第一部分</div>
      <div class="main-content">
        <div class="content">PPT内容</div>
        <div class="mulu">
          <div class="mulu-title">学习主题</div>
          <div class="mulu-sub-title">学习内容</div>
        </div>
      </div>
      <div class="foot">
        <div style="color:red;font-weight:bolder">工地手册第一部分</div>
        <div><el-button type="primary">练习</el-button></div>
        <div>已有
            <span style="color:red;font-weight:bolder">500</span>
            人参与学习</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.study-contain {
  margin-left: 10%;
  width: 80%;
  height: 100%;
  .study-contain-head {
    width: 300px;
    height: 60px;
    background-color: #df0a0b;
    font-size: 20px;
    font-weight: bolder;
    line-height: 60px;
    text-align: center;
    margin: 20px auto;
    color: white;
    border-radius: 10px;
  }
  .study-contain-body {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    border: 1px solid #f4f4f4;
    .title {
      width: 100%;
      height: 60px;
      font-size: 20px;
      font-weight: bolder;
      line-height: 60px;
      padding-left: 30px;
      color: #df0a0b;
    }
    .main-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      .content {
        width: 65%;
        height: 100%;
        background-color: white;
      }
      .mulu {
        background-color: white;
        text-align: center;
        width: 25%;
        height: 100%;
        .mulu-title {
          width: 100%;
          height: 60px;
          background-color: #df0a0b;
          font-size: 20px;
          font-weight: bolder;
          line-height: 60px;
          color: white;
        }
        .mulu-sub-title {
          width: 100%;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          text-align: left;
          padding-left: 30px;
        }
      }
    }
    .foot {
      margin-top: 30px;
      width: 100%;
      height: 60px;
      font-size: 20px;
      font-weight: lighter;
      line-height: 60px;
      text-align: center;
      display: flex;
      justify-content: space-around;
      .el-button{
        width: 100px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
    }
  }
}
</style>