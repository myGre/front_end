import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index.vue'
import discipline from '@/router/discipline'
Vue.use(Router)

// 解决路由跳转报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
return originalPush.call(this, location).catch(err => err)
}
// 公共路由
export const constantRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/components/NotFound'),
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home/index',
    component: layout,
    children: [{
      path: '/home/index',
      name: 'index',
      component: () => import('@/views/home'),
      meta: {
        title: '可视化',
        icon: 'el-icon-location',
      }
    }],
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
    }
  },
]

// 动态权限路由
export const asyncRoutes = [
  // 首页
  {
    path: '/',
    name: 'home',
    redirect: '/home/index',
    component: layout,
    children: [{
      path: '/home/index',
      name: 'index',
      component: () => import('@/views/home'),
    }],
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
      roles: ['student', 'admmin']
    },
    children: [{
        path: '/students/list',
        name: 'studentlist',
        component: () => import('@/views/students/studentsList.vue'),
        meta: {
          title: '学生列表',
          icon: 'el-icon-s-custom',
          roles: ['student', 'admmin']
        }
      },
      {
        path: '/students/wordList',
        name: 'wordList',
        component: () => import('@/views/students/wordList.vue'),
        meta: {
          title: '学生作业布置',
          icon: 'el-icon-picture-outline-round',
          roles: ['admmin']
        }
      },
    ],
  },
  // 学科管理
  discipline,
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes,
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465 清除路由组件
export function resetRouter() {
  const newRouter = createRouter() 
  router.matcher = newRouter.matcher // 重置路由
}

export default router