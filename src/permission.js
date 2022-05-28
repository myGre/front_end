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

// router.beforeEach( async(to, from, next) => {
//   NProgress.start()
//   let hasToken = getToken()
//   // 如果有token则不能再返回登录页面
//   if (hasToken) {
//     if (to.path == '/login') {
//       // next({ path: '/'} )
//       // next()
//       // NProgress.done()
//     }
//     else {
//       const hasRoles = store.getters.roles && store.getters.length > 0
//       // 如果有权限则直接放通，否则重新获取权限
//       if (hasRoles) {
//         next()
//       } else {
//         try {
//           const {user} = await store.dispatch('user/getInfo')
//           console.log(user[0].roles);
//           const accesseRoutes = await store.dispatch('permission/generateRoutes', user[0].roles)
//           console.log(accesseRoutes);
//           // 添加路由
//           // console.log(router.addRoute());
//           router.addRoutes(accessesRoutes)
//           next({ ...to, replace: true})
//         } catch (error) {
//           // next('/login')
//           removeToken()
//           Message({
//             message: error || 'Has Error',
//             type: 'error'
//           })
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach( () => {
//   NProgress.done()
// })

router.beforeEach(async(to, from, next) => {
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
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { user } = await store.dispatch('user/getInfo')
          // console.log(user.role)
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', user[0].roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          
          Message({
            message: error || 'Has Error',
            type: 'error'
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      removeToken()
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
