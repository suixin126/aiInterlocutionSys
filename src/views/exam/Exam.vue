<template>
    <div class="exam-contain">
        <div class="header">
            综合评价
        </div>
        <div class="container">
            <h3>工龄三年 综合评价</h3>
            <el-descriptions title="基础信息" direction="vertical" border style="margin-top: 20px">
                <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
                    <el-image style="width: 100px; height: 100px"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </el-descriptions-item>
                <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
                <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                <el-descriptions-item label="Remarks">
                    <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Address">
                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </el-descriptions-item>
            </el-descriptions>
            <div class="answer_number">
                <div>剩余答题次数：<span style="color: red;">{{ 5 - count }}次 </span></div>
                <el-button type="primary" plain @click.prevent="answerQuestion()">开始答题</el-button>
            </div>

            <div class="record_area" id="record_area">
                <div class="card" v-for="index in count">
                    <div class="card_header">
                        <img src="../exam/image/img_01.png" alt="">
                        <div>第{{ index }}次评价</div>
                    </div>
                    <div class="card_body">
                        <el-form-item label="考核时间" prop="pass">
                        </el-form-item>
                        <el-form-item label="考核用时" prop="pass">
                        </el-form-item>
                        <el-form-item label="考核结果" prop="pass">
                        </el-form-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
const count = ref(0);
const router = useRouter();
const answerQuestion = () => {
    if (count.value == 5) {
        alert("答题次数已用完");
        return;
    }
    count.value++;
};
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

    h3 {
        margin-top: 20px;
    }

    .el-descriptions {
        margin-top: 20px;
        width: 80%;
        margin: 0 auto;
    }

    .answer_number {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 20px auto;
        height: 50px;
        line-height: 50px;
        font-weight: lighter;
    }

    .el-button {
        margin-top: 10px;
        background-color: #409eff;
        width: 120px;
        color: #fff;
        padding: 15px;
    }

    .record_area {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        width: 85%;
        margin: 10px auto;


        .card {
            width: 20%;
            margin: 25px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

            .card_header {
                background-color: #df0a0b;
                height: 40px;
                line-height: 40px;
                width: 100%;
                font-weight: lighter;
                color: #fff;
                font-size: small;
                display: flex;

                img {
                    width: 20px;
                    height: 20px;
                    margin: 10px 10px 0px 20px;
                }

            }

            .card_body {
                width: 80%;
                margin: 10px auto;
                font-size: small;
            }
        }

    }
}
</style>