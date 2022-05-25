import axios from "axios";
import { getToken} from '../usrts/toke'
import { MessageBox, Message } from "element-ui";
const request = axios.create({
    // 全局请求根地址
    baseURL: 'http://localhost:3000',
    // baseURL: '/api',
    // 指定请求超时时间
    timeout: 5000,
    // 请求头
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    }
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    if (getToken('TOKEN')) {
        // console.log(getToken('TOKEN'));
        // console.log(config);
        config.headers['token'] = getToken('TOKEN')
    }
    return config
}, (err) =>{
    return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use((res) =>{
    // console.log(res);
    if (res.data.code != 200) {
        Message({
            message: res.data.msg || 'Error',
            type: 'error',
            duration: 5000,
        })
        return Promise.reject(new Error(res.data.msg  || 'Error' ))
    } else {
        return res
    }
}, (err) =>{
    Message({
        message: error.message,
        type:'error'
    })
    return Promise.reject(err)
})

export default request