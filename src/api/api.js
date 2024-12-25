import http from "../http/http.js";

export function login(params, headers) {
    return http.post("/user/login", params, headers);
}