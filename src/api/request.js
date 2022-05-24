import axios from "axios";
// import { getToken} from '@/usrts/token.js'
// console.log(getToken('TOKEN'));
const request = axios.create({
    // 全局请求根地址
    baseURL: 'http://localhost:3000',
    // baseURL: '/api',
    // 指定请求超时时间
    timeout: 5000,
    // 请求头
    headers: {
        'Content-type': 'application/json; charset=utf-8, Authorization',
    }
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    return config
}, (err) =>{
    return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use((res) =>{
    return res
}, (err) =>{
    return Promise.reject(err)
})

export default request