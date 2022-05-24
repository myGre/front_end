import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index.vue'
import discipline from '@/router/discipline'
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
      children: [
        {
          path:'/home/index',
          name: 'index',
          component: () => import('@/views/home'),
          meta: {
            title: '可视化',
            icon: 'el-icon-location',
          }
        }
      ],
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
      }
    },
    // 学生管理页面
    {
      path: '/students',
      name: 'students',
      component: layout,
      meta: {
        title: '学生管理页面',
        icon: 'el-icon-s-custom',
      },
      children: [
        {
          path: '/students/list',
          name: 'studentlist',
          component: () => import('@/views/students/studentsList.vue'),
          meta: {
            title: '学生列表',
            icon: 'el-icon-s-custom',
          }
        },
        {
          path: '/students/wordList',
          name: 'wordList',
          component: () => import('@/views/students/wordList.vue'),
          meta: {
            title: '学生作业布置',
            icon: 'el-icon-picture-outline-round',
          }
        },
      ],
    },
    // 学科管理
    discipline,
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/components/NotFound'),
      hidden: true
    }
  ]
})
