import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
      hidden: true
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      redirect: '/home/index',
      component: layout,
      location: 'el-icon-location',
      children: [
        {
          path:'/home/index',
          name: 'index',
          component: () => import('@/views/home'),
          location: 'el-icon-location'
        }
      ],
      meta: {
        title: '首页'
      }
    },
    // 学生管理页面
    {
      path: '/students',
      name: 'students',
      component: layout,
      location: 'el-icon-location',
      children: [
        {
          path: '/students/list',
          name: 'studentlist',
          location: 'el-icon-location',
          component: () => import('@/views/students/studentsList.vue')
        },
        {
          path: '/students/wordList',
          name: 'wordList',
          location: 'el-icon-location',
          component: () => import('@/views/students/wordList.vue')
        },
      ],
      meta: {
        title: '学生管理页面'
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/components/NotFound'),
      hidden: true
    }
  ]
})
