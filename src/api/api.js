import http from "../http/http.js";

export function login(params, headers) {
    return http.post("/user/login", params, headers);
}
export function submitAnswer(params, headers) {
    return http.post("/question/answer", params, headers);
};
export function getPractice(query, headers) {
    return http.get(`/question/getPractice?moduleId=${query.moduleId}`, headers);
}
// 获取访问量
export function getVisit(headers) {
    return http.get("/module/lookViews", headers);
}
// 增加访问量
export function addVisit(params, headers) {
    return http.post("/module/studyAddViews", params, headers);
}

// 获取用户信息
export function getUserInfo(headers) {
    return http.get("/user/getInfo", headers);
}

// 更改手机号
export function changePhone(params, headers) {
    return http.post("/user/updatePhone", params, headers);
}
// 修改密码
export function changePassword(params, headers) {
    return http.post("/user/updatePassword", params, headers);
}
//获取试卷
export function getExam(headers) {
    return http.get("/exam/getExam", headers);
}
//提交试卷
export function answerExam(params, headers) {
    return http.post("/exam/answerExam", params, headers);
}
//查询分数
export function getScore(headers) {
    return http.get("/record/getPoints", headers);
}
//模块完成
export function updateUserModule(params, headers) {
    return http.post("/user/updateUserModule", params, headers);
}
//获取已学习人数
export function getStudyNum(query, headers) {
    return http.get(`/module/studiedNum?moduleId=${query.moduleId}`, headers);
}