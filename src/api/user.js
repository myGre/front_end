import request from "./request";

// 获取用户初始化信息
export const getUserInfo = () => request.post('/users/info')
