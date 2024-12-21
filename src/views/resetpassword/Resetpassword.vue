<template>
  <div class="container" id="container">
    <div class="left_container">
    </div>
    <div class="right_container">
      <h3 style="margin-bottom: 20px;">更改密码</h3>
      <div class="input_container">
        <el-form-item label="用户名" prop="pass">
          <el-input v-model="input" class="password_input" placeholder="请输入用户名" show-password />
        </el-form-item>
      </div>
      <div class="input_container">
        <el-form-item label="原密码" prop="pass">
          <el-input v-model="input" type="password" class="password_input" placeholder="请输入原密码" show-password />
        </el-form-item>
      </div>
      <div class="input_container">
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="input" type="password" class="password_input" placeholder="请输入新密码" show-password />
        </el-form-item>
      </div>
      <div class="input_container">
        <el-form-item label="确认密码" prop="pass">
          <el-input v-model="input" type="password" class="password_input" placeholder="请再次确认密码" show-password />
        </el-form-item>
      </div>
      <el-button color="#626aef" :dark="isDark" class="button" plain>更改密码</el-button>
      <div class="remeberpassword">
        <el-form-item label="想起密码？" prop="pass">
          <el-link type="primary" @click="toLogin()">去登录</el-link>
        </el-form-item>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () => {
  router.push('/login')
}
const input = ref('')
</script>

<style scoped>
.container {
  width: 50%;
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 15vh auto;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.left_container {
  width: 40%;
  background-image: url(../resetpassword/image/img_1.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 10px 0px 0px 10px;
}


.right_container {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  justify-content: center;
  border-color: #cdcdcd;
}

.input_container {
  margin-left: auto;
  margin-right: calc(50% - 100px);
}

.password_input {
  width: 200px;
  size: large;
}

.button {
  width: calc(60% - 20px);
  margin-top: 5px;
  margin-left: auto;
  margin-right: calc(50% - 100px);
  background-color: #409eff;
  color: #fff;
}

.remeberpassword {
  display: flex;
  margin-left: auto;
  margin-right: calc(50% - 20px);
}
</style>