<template>
  <div class="practice-contain">
    <div class="header">
      练习
    </div>
    <div class="container">
      <div class="subject">
        全面推进依法治国
      </div>
      <div class="question_area">
        <div class="inner_container">
          <div class="question_number">
            第{{ index + 1 }}题/共5题(简答)
          </div>
          <div class="question_text">
            {{ current_question }}
          </div>
          <div class="answer_area">
            <el-input v-model="textarea" maxlength="100" placeholder="请输入你的答案" show-word-limit type="textarea"
              @change="setAnswer()" />
          </div>
          <div class="next_question">
            <el-button type="info" plain v-show="index" class="info_button" @click="previous_question()">上一题</el-button>
            <el-button type="info" plain v-show="index < 4" class="info_button" @click="next_question()">下一题</el-button>
            <el-button type="info" plain v-show="index == 4" class="info_button" @click="submit()">提交</el-button>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const textarea = ref("");
const index = ref(0);
const questionList = ref(
  [{
    id: 1,
    text: "全面推进依法治国1",
    answer: ''
  },
  {
    id: 2,
    text: "全面推进依法治国2",
    answer: ''
  },
  {
    id: 3,
    text: "全面推进依法治国3",
    answer: ''
  },
  {
    id: 4,
    text: "全面推进依法治国4",
    answer: ''
  },
  {
    id: 5,
    text: "全面推进依法治国5",
    answer: ''
  }]);
const current_question = ref(questionList.value[0].text);
//点击上一题
const previous_question = () => {
  if (index.value == 1) {
    document.getElementsByClassName("next_question")[0].style.justifyContent = "right";
  }
  if (index.value <= 0) {
    return;
  }
  index.value -= 1;
  current_question.value = questionList.value[index.value].text;
  clearAnswer();
};
//点击下一题
const next_question = () => {
  if (index.value == 0) {
    document.getElementsByClassName("next_question")[0].style.justifyContent = "space-between";
  }
  if (index.value >= 5) {
    return;
  }
  index.value += 1;
  current_question.value = questionList.value[index.value].text;
  clearAnswer();
  console.log(questionList.value)
}

//设置答案
const setAnswer = () => {
  questionList.value[index.value].answer = textarea.value;
}
//没有答题就清空输入框，答题后保留答案
const clearAnswer = () => {
  if (questionList.value[index.value].answer != '') {
    textarea.value = questionList.value[index.value].answer;
  }
  else {
    textarea.value = '';
  }
}
//返回主题列表
const toHome = () => {
  router.push({ path: "/study_and_practice" })
}

//提交答案
const submit = () => {
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