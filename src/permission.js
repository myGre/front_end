// // 权限管理
import router from './router'
import store from './store'
import { Message } from 'element-ui'
// 进度条
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
// 获取token
import { getToken, removeToken } from './usrts/toke'

NProgress.configure({ showSpinner: false} ) // 配置进度条
const whiteList = ['/login'] // 白名单

// 设置路由拦截
router.beforeEach( (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          store.dispatch('user/getInfo').then(res => {
            // remove token and go to login page to re-login
            if (res.code == 200) {
              // generate accessible routes map based on roles
              store.dispatch('permission/generateRoutes', res.user[0].roles).then(res => {
                // console.log(res);
                // dynamically add accessible routes
                setTimeout(() => {
                  router.addRoutes(res)
                }, 100);
              })
              // hack method to ensure that addRoutes is complete
              // set the replace: true, so the navigation will not leave a history record
              next({ ...to, replace: true })
            }
          })
          .catch(err => {
            removeToken()
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          })
        } 
        next()
      }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      Message({
        message: 'token失效, 请重新登录！',
        type: 'error'
      })
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
