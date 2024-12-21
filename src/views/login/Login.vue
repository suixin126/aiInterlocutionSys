<template>
  <div class="login-contain">
    <div class="login-bg"></div>
    <div class="login-box">
      <div class="login-box-left"></div>
      <div class="login-box-right">
        <div class="login-logo">LOGO</div>
        <div class="login-user_name">
          <el-input v-model="userName" style="width: 300px" placeholder="请输入用户名" size="large" :prefix-icon="User" />
        </div>
        <div class="login-password">
          <el-input v-model="input" style="width: 300px" type="password" placeholder="请输入密码" size="large" show-password
            :prefix-icon="Lock" />
        </div>
        <div class="login-btn">
          <el-button type="primary" plain>登录</el-button>
        </div>
        <div class="login-text">
          <div class="remain-pwd">
            <el-checkbox v-model="checked" label="记住密码" size="large" />
          </div>
          <div class="forget-pwd" @click="toResetpassword()">
            <span>忘记密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 引入用户名图标
import { User } from "@element-plus/icons-vue";
// 引入密码图标
import { Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toResetpassword = () => {
  router.push("/resetpassword");
};
const userName = ref("");
const checked = ref(true);
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
      padding-top: 50px;
      font-size: 40px;
      font-weight: bold;
      font-family: "Microsoft YaHei";
    }

    .login-user_name {
      text-align: center;
      padding-top: 50px;
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

      .forget-pwd {
        font-size: 14px;
        line-height: 40px;

        &:hover {
          color: red;
          cursor: pointer;
        }
      }
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