<template>
  <div class="practice-contain">
    <div class="header">
      练习
    </div>
    <div class="container">
      <div class="subject">
        {{ modules[id] }}
      </div>
      <div class="question_area">
        <div class="inner_container">
          <div class="question_number">
            第{{ index + 1 }}题/共5题(简答)
          </div>
          <div class="question_text">
            {{ current_question }}
          </div>
          <div class="loadingContainer" v-loading="loading" element-loading-text="Loading..."
            :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="rgba(255, 255, 255, 0.8)">
            <div class="answer_area">
              <el-input v-model="textarea" maxlength="200" placeholder="请输入你的答案" show-word-limit type="textarea" />
            </div>
            <div class="right_answer_area">
              <el-input v-model="right_answer_area" show-word-limit type="textarea" />
            </div>
            <div class="next_question">
              <el-button type="info" plain v-show="index" class="info_button"
                @click="previous_question()">上一题</el-button>
              <el-button type="info" plain v-show="index <= 4 && IsSubmit[index] == 0" class="info_button"
                @click="submit_answer()">
                提交答案
              </el-button>
              <el-button type="info" plain v-show="index < 4 && IsSubmit[index] == 1" class="info_button"
                @click="next_question()">
                下一题
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttom_container">
      <div class="back" @click="toHome()">返回主题列表</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { submitAnswer } from "@/api/api.js";
import { getPractice } from "@/api/api.js";
import { updateUserModule } from "@/api/api.js";
import { ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute();
const textarea = ref("");
const loading = ref(false);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const index = ref(0);
const questionList = ref([])//问题列表
const answerList = ref([])//答案列表
const MyAnswer = ref([]);//我的答案
const current_question = ref("");
const right_answer_area = ref("");
const IsSubmit = ref([0, 0, 0, 0, 0])
const modules = ["工地施工安全", "施工现场安全防护用品", "工地消防安全", "工地用电安全"]
const id = parseInt(route.query.id);//获取模块id
// 初始化问题列表
onMounted(() => {
  getPractice({
    moduleId: id + 1
  }, {
    "Content-Type": "application/json",
  }).then((res) => {
    questionList.value = res.data.data;
    current_question.value = questionList.value[index.value].question;
  }).catch((err) => {
    console.log(err);
  })
});
//点击上一题
const previous_question = () => {
  if (index.value == 1) {
    document.getElementsByClassName("next_question")[0].style.justifyContent = "right";
  }
  index.value -= 1;
  setAnswer();
};
//点击提交答案
async function submit_answer() {
  if (textarea.value == "") {
    alert("答案不能为空！");
    return;
  }
  MyAnswer.value.push(textarea.value);
  loading.value = true;
  await submitAnswer({
    "questionId": questionList.value[index.value].id,
    "answer": textarea.value
  }, {
    "Content-Type": "application/json",
  }).then((res) => {
    answerList.value.push(res.data.data);
  }).catch((err) => {
    console.log(err);
  })
  setAnswer();
  IsSubmit.value[index.value] = 1;
  //模块完成
  if (index.value == 4) {
    updateUserModule({
      "moduleId": id + 1
    }, {
      "Content-Type": "application/json",
    }).then((res) => {
      console.log(res);
      ElMessage.success("恭喜你完成该模块！");
    }).catch((err) => {
      console.log(err);
    })
  }
}
//点击下一题
const next_question = () => {
  if (index.value == 0) {
    document.getElementsByClassName("next_question")[0].style.justifyContent = "space-between";
  }
  index.value += 1;
  clearAnswer();
}
//清除答案
const clearAnswer = () => {
  if (MyAnswer.value[index.value] != null) {
    setAnswer();
  }
  else {
    current_question.value = questionList.value[index.value].question;
    textarea.value = "";
    right_answer_area.value = "";
    document.getElementsByClassName("right_answer_area")[0].style = "display:none";
  }
}

//设置答案
const setAnswer = () => {
  current_question.value = questionList.value[index.value].question;
  textarea.value = MyAnswer.value[index.value];
  if (answerList.value[index.value].rightOrNot == false) {
    right_answer_area.value += "回答错误！";
  }
  else {
    right_answer_area.value += "回答正确！";
  }
  right_answer_area.value += answerList.value[index.value].analyze;
  let answer = document.getElementsByClassName("right_answer_area")[0]
  answer.style = "display:block";
  loading.value = false;
}

//返回主题列表
const toHome = () => {
  router.push({ path: "/study_and_practice" })
}


</script>

<style lang="scss" scoped>
.header {
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

.container {
  text-align: center;
  width: 80%;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 10px 0px 50px 0px;
  border-radius: 10px;
}

.subject {
  margin-bottom: 10px;
  color: #df0a0b;
  font-weight: bold;
}

.question_area {
  text-align: left;
  width: 98%;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 30px;
}

.inner_container {
  width: 90%;
  margin: 0 auto;
  font-size: small;
  padding-bottom: 10px;
}

.inner_container div {
  margin-bottom: 20px;
}

.answer_area {
  height: 50px;
}

.right_answer_area {
  display: none;
  height: fit-content;
}

.next_question {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 20px;
}

.info_button {
  width: 100px;
}

.buttom_container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.back {
  width: 200px;
  height: 50px;
  background-color: #df0a0b;
  border-radius: 30px;
  text-align: center;
  line-height: 50px;
  color: #fff;
}
</style>