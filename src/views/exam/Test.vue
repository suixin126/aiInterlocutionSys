<template>
    <div class="practice-contain">
        <div class="header">
            综合评价
        </div>
        <div class="container">
            <div class="subject">
                综合评价
            </div>
            <div class="question_area">
                <div class="inner_container">
                    <div class="question_number">
                        第{{ index + 1 }}题/共25题(简答)
                    </div>
                    <div class="question_text">
                        {{ current_question }}
                    </div>
                    <div class="answer_area">
                        <el-input v-model="textarea" maxlength="200" placeholder="请输入你的答案" show-word-limit
                            type="textarea" @change="changeAnswer()" />
                    </div>
                    <div class="next_question">
                        <el-button type="info" plain v-show="index" class="info_button"
                            @click="previous_question()">上一题</el-button>
                        <el-button type="info" plain v-show="index < 24" class="info_button" @click="next_question()">
                            下一题
                        </el-button>
                        <el-button type="info" plain v-show="index == 24 && flag == false" class="info_button"
                            @click="submit_answer()">
                            提交答案
                        </el-button>
                    </div>

                </div>
            </div>
        </div>
        <div class="buttom_container">
            <div class="back" @click="toExam()">返回考核页面</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getExam } from "../../api/api";
import { answerExam } from "../../api/api";
import { ElMessage } from "element-plus";
const router = useRouter();
const index = ref(0);//当前问题索引
const questionList = ref([]);//问题列表
const current_question = ref("");//当前问题
const answerList = ref([])//答案列表
const textarea = ref("");//当前答案
const dataList = ref([]);//返回给后端的数据
const examId = ref(0);//考试id
const flag = ref(false);//是否提交
//初始化
onMounted(() => {
    getExam({
    }, {
        "Content-Type": "application/json",
    }).then((res) => {
        console.log(res);
        questionList.value = res.data.data.questions;
        examId.value = res.data.data.examId;
        setAnswer();
    }).catch((err) => {
        console.log(err);
    })
})
//点击上一题
const previous_question = () => {
    if (index.value == 1) {
        document.getElementsByClassName("next_question")[0].style.justifyContent = "right";
    }
    index.value -= 1;
    setAnswer();
};
//点击下一题
const next_question = () => {
    if (index.value == 0) {
        document.getElementsByClassName("next_question")[0].style.justifyContent = "space-between";
    }
    index.value += 1;
    setAnswer();
}
//设置答案
const setAnswer = () => {
    current_question.value = questionList.value[index.value].question;
    //如果答案列表有数据则渲染进页面
    if (answerList.value[index.value] != "") {
        textarea.value = answerList.value[index.value];
    }
    else {
        textarea.value = "";
    }
}
//修改答案
const changeAnswer = () => {
    answerList.value[index.value] = textarea.value;
}

//提交答案
const submit_answer = () => {
    if (Object.keys(answerList.value).length < 25) {
        alert("存在未完成题目");
        return;
    }
    flag.value = true;
    for (let i = 0; i < 25; i++) {
        let data = {
            "questionId": questionList.value[i].id,
            "answer": answerList.value[i]
        }
        dataList.value.push(data);
    }
    answerExam({
        "examId": examId.value,
        "answers": dataList.value
    }
        , {
            "Content-Type": "application/json",
        }).then((res) => {
            console.log(res);
            ElMessage.success("提交成功,请返回考核页面查看考核结果");
        }).catch((err) => {
            console.log(err);
        })
};

//返回考核页面
const toExam = () => {
    if (Object.keys(answerList.value).length < 25 || flag.value) {
        alert("存在未完成题目或未提交题目！");
        return;
    }
    router.push({ path: "/exam" });
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