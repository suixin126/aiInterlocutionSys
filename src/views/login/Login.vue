<template>
  <div class="login-contain">
    <div class="login-bg"></div>
    <div class="login-box">
      <div class="login-box-left"></div>
      <div class="login-box-right">
        <div class="login-logo">
          <img src="../../assets/imgs/logo.png" alt="">
        </div>
        <div class="login-user_name">
          <el-input v-model="userName" style="width: 300px" placeholder="请输入用户名" size="large" :prefix-icon="User" />
        </div>
        <div class="login-password">
          <el-input v-model="password" style="width: 300px" type="password" placeholder="请输入密码" size="large"
            show-password :prefix-icon="Lock" />
        </div>
        <div class="login-btn">
          <el-button type="primary" plain @click="userLogin">登录</el-button>
        </div>
        <div class="login-text">
          <div class="remain-pwd">
            <el-checkbox v-model="checked" label="记住密码" size="large" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// 引入用户名图标
import { User } from "@element-plus/icons-vue";
// 引入密码图标
import { Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { login } from "@/api/api.js";
import { ElMessage } from "element-plus";
const router = useRouter();

const userName = ref("");
const checked = ref(true);
const password = ref("");
const userLogin = () => {
  if (userName.value == "") {
    alert("用户名不能为空");
    return;
  }
  if (password.value == "") {
    alert("密码不能为空");
    return;
  }
  login({
    name: userName.value,
    password: password.value,
  }, {
    "Content-Type": "application/json",
  }).then((res) => {
    console.log(res);
    if (res.data.status === 200) {
      ElMessage.success("登录成功");
      // 记住密码功能
      if (checked.value) {
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("password", password.value);
      } else {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
      }
      // 存储token
      localStorage.setItem("token", res.data.data.token);
      router.push("/study_and_practice");
    } else {
      ElMessage.error("登录失败");
    }
  }).catch((err) => {
    console.log(err);
  });
}
onMounted(()=>{
  // 从localStorage中获取用户名和密码
  if(localStorage.getItem("userName") != null){
    userName.value = localStorage.getItem("userName");
  }
  if(localStorage.getItem("password")!= null){
    password.value = localStorage.getItem("password");
  }
})
</script>

<style lang="scss" scoped>
.login-contain {

  .login-box {
    width: 50%;
    height: 500px;
    margin: 15vh auto;
    display: flex;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow-y: hidden;

    .login-box-left {
      width: 40%;
      height: 100%;
      background-image: url(../../assets/imgs/2.jpg);
      background-size: cover;
      background-position: center;
      border-radius: 20px 0 0 20px;
      margin-right: 20px;
    }

    .login-box-right {
      flex: 1;
      text-align: center;
    }

    .login-logo {
      text-align: center;
      padding-top: 40px;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .login-user_name {
      text-align: center;
      padding-top: 40px;
    }

    .login-password {
      text-align: center;
      padding-top: 50px;
    }

    .login-btn {
      text-align: center;
      padding-top: 50px;
    }

    .login-text {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;

    }
  }
}

::v-deep .el-input__wrapper {
  border-radius: 100px;
}

.el-button {
  width: 300px;
  height: 50px;
  border-radius: 100px;
  color: #fff;
  background-color: #409eff;
  font-size: 20px;
  font-weight: bold;
}

.el-checkbox {
  font-size: 20px;
}
</style>