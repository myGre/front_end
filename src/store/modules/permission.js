/* import { asyncRoutes, constantRoutes } from "../../router";
function hasPermission(roles, route) {
  // console.log(roles);
  // console.log(route);
  // console.log(route.meta.role );
  if (route.meta && route.meta.roles) {
    console.log(roles);
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  let tmp = {}
  // console.log(routes);
  routes.forEach(route => {
    tmp = { ...route }
    console.log(tmp); // admin
    const ssw = hasPermission(roles, tmp)
    console.log(ssw);
    if (hasPermission(roles, tmp)) {
      console.log(tmp);
      if (tmp.children) {
        // 过滤路由
        console.log(tmp);
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      console.log(tmp);
      res.push(tmp)
    }
  })
  console.log(res);
  return res
}


const state = {
  routes: [],
  addRouter: []
}

const mutations = {
  SET_ROUTES(state, routes){
    state.addRouter = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      let accesseRoutes = filterAsyncRoutes(asyncRoutes, roles)
      console.log(accesseRoutes);
      commit('SET_ROUTES', accesseRoutes)
      resolve(accesseRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

 */
import { asyncRoutes, constantRoutes } from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 通过meta.roles是否包含这个权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log(route);
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 通过权限判断是否能访问这个路径
export function filterAsyncRoutes(routes, roles) {
  const res = []
  let tmp = {}
  routes.forEach(route => {
    tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 过滤路径
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  console.log(res);
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // // 如果是admin权限，则包含所有路由页面
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      //   console.log(accessedRoutes);
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      console.log(accessedRoutes);
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
