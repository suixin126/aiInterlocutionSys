import http from "../http/http.js";

export function login(params, headers) {
    return http.post("/user/login", params, headers);
};
export function submitAnswer(params, headers) {
    return http.post("/question/answer", params, headers);
};
export function getPractice(query, headers) {
    return http.get(`/question/getPractice?moduleId=${query.moduleId}`, headers);
}