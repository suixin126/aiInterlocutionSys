<template>
  <div class="container" id="container">
    <div class="left_container"></div>
    <div class="right_container">
      <h2 style="margin-bottom: 50px">更改密码</h2>
      <div class="input_container">
        <el-form-item label="新密码" prop="pass">
          <el-input
            v-model="new_password"
            type="password"
            class="password_input"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
      </div>
      <div class="input_container">
        <el-form-item label="确认密码" prop="pass">
          <el-input
            v-model="ac_password"
            type="password"
            class="password_input"
            placeholder="请再次确认密码"
            show-password
          />
        </el-form-item>
      </div>
      <div class="btn">
        <el-button color="#626aef" @click="changePwd" plain
          >更改密码</el-button
        >
        <el-button color="#626aef" plain @click="router.go(-1)"
          >取消修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { changePassword } from "../../api/api";
import { ElMessage } from "element-plus";
const router = useRouter();
const new_password = ref("");
const ac_password = ref("");
const changePwd = () => {
  if (new_password.value == "" || ac_password.value == "") {
    alert("请输入完整信息");
    return;
  }
  if (new_password.value != ac_password.value) {
    alert("两次输入的密码不一致");
    return;
  }
  changePassword(
    {
      newPassword: new_password.value,
    },
    {
      "Content-Type": "application/json",
    }
  ).then((res) => {
    console.log(res.data);
    if (res.data.status == 200) {
      ElMessage.success("密码更改成功");
      router.push("/");
    } else {
      ElMessage.error("密码更改失败");
    }
  });
};
</script>

<style scoped lang="scss">
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
  margin-right: calc(50% - 130px);
}

.password_input {
  width: 200px;
  size: large;
}


.sucess {
  display: flex;
  margin: 10px calc(50% - 60px) 0px auto;
  font-size: small;
  .el-link {
    font-size: small;
  }
}
</style>