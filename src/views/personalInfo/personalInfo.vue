<template>
  <div class="personalInfo-contain">
    <div class="card">
      <h1>个人信息</h1>
      <div class="item">
        <i class="iconfont icon-xingming"></i>
        <span class="item1">姓名：</span>
        <span class="item2">{{ userInfo.name }}</span>
      </div>
      <div class="item">
        <i class="iconfont icon-a-44tubiao-102"></i>
        <span class="item1">年龄：</span>
        <span class="item2">{{ userInfo.age }}</span>
      </div>
      <div class="item">
        <i class="iconfont icon-xingbie"></i>
        <span class="item1">性别：</span>
        <span class="item2">{{ userInfo.sex }}</span>
      </div>
      <div class="item">
        <i class="iconfont icon-xuexijindu"></i>
        <span class="item1">学习进度：</span>
        <span class="item2">{{ userInfo.progress }}%</span>
      </div>
      <div class="item">
        <i class="iconfont icon-xuexijindu"></i>
        <span class="item1">完成模块：</span>
        <span class="item2"
          >{{ userInfo.module1 }}{{ userInfo.module2 }}{{ userInfo.module3
          }}{{ userInfo.module4 }}</span
        >
      </div>
      <div class="item">
        <i class="iconfont icon-dianhua"></i>
        <span class="item1">手机号：</span>
        <input
          style="height: 22px; padding-left: 10px"
          v-model="userInfo.phone"
          type="tel"
        />
      </div>
      <div class="btn">
        <el-button @click="update_phone" style="width: 146px" type="danger"
          >更新</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getUserInfo, changePhone } from "../../api/api";
import { ElMessage, ElMessageBox } from "element-plus";
import "@/icon/iconfont.css";
const userInfo = ref({
  phone: 12345678900,
  name: "",
  age: 0,
  sex: "",
  progress: 0,
  module1: "",
  module2: "",
  module3: "",
  module4: "",
});
const update_phone = () => {
  // 提醒
  ElMessageBox.confirm("确定要更新手机号吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    changePhone(
      {
        newPhone: userInfo.value.phone,
      },
      {
        "Content-Type": "application/json",
      }
    ).then((res) => {
      console.log(res.data);
      if (res.data.status == 200) {
        ElMessage.success("更新成功");
      } else {
        ElMessage.error("更新失败");
      }
    });
  });
};
onMounted(() => {
  getUserInfo({
    "Content-Type": "application/json",
  }).then((res) => {
    console.log(res.data.data);
    userInfo.value.name = res.data.data.name;
    userInfo.value.age = res.data.data.age;
    // 性别如果是0则是女，如果是1则是男
    if (res.data.data.gender == 0) {
      userInfo.value.sex = "女";
    } else {
      userInfo.value.sex = "男";
    }
    userInfo.value.phone = res.data.data.phone;
    // 计算进度
    if (res.data.data.module1 == 1) {
      userInfo.value.module1 = "工地施工安全,";
      userInfo.value.progress += 25;
    }
    if (res.data.data.module2 == 1) {
      userInfo.value.module2 = "施工现场安全防护用品,";
      userInfo.value.progress += 25;
    }
    if (res.data.data.module3 == 1) {
      userInfo.value.module3 = "工地消防安全,";
      userInfo.value.progress += 25;
    }
    if (res.data.data.module4 == 1) {
      userInfo.value.module4 = "工地用电安全,";
      userInfo.value.progress += 25;
    }
  });
});
</script>

<style lang="scss" scoped>
.personalInfo-contain {
  margin-top: 20px;
  .card {
    width: 80%;
    margin: 0 auto;
    .item {
      margin: 10px 0;
      font-size: larger;
      padding: 10px;
      border-bottom: 1px solid gray;
      .item1 {
        display: inline-block;
        width: 100px;
        color: gray;
        margin-right: 10px;
        text-align: right;
      }
    }
    .btn {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>