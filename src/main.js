// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 权限管理
import './permission'
// 引入全局样式
import '@/assets/css/reset.css'
// axios
import request from './api/request'
// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import * as echarts from "echarts";
// 基于准备好的dom，初始化echarts实例
Vue.prototype.$echarts = echarts // 挂载在原型上
Vue.prototype.request = request // 挂载在原型上

/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
