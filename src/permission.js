// 权限管理
import router from './router'
import store from './store'
import { Message } from 'element-ui'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取token
import { getToken } from './usrts/toke'

nprogress.configure({ showSpinner: false} ) // 配置进度条
const whiteList = ['/login'] // 白名单

router.beforeEach( async(to, from, next) => {
  nprogress.start()
  let hasToken = getToken()
  // 如果有token则不能再返回登录页面
  if (hasToken) {
    if (to.path == '/login') {
      console.log(111);
      next({ path: '/'} )
      nprogress.done()
    }
    else {
      const hasRoles = store.getters.roles && store.getters.length > 0
      console.log(hasRoles);
      // 如果有权限则直接放通，否则重新获取权限
      if (hasRoles) {
        next()
      } else {
        try {
          const {user} = await store.dispatch('user/getInfo')
          console.log(user[0].roles);
          const accesseRoutes = await store.dispatch('permission/generateRoutes', user[0].roles)
          console.log(accesseRoutes);
          next({ ...to, replace: true})
        } catch (error) {
          next()
        }
      }

    }
    next()
  }
  next()
})

router.afterEach( () => {
  nprogress.done()
})