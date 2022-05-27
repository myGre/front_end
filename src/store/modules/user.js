import {
  getUserInfo
} from "../../api/user"

const state = {
  user: {}
}
const mutations = {
  INFO(state, userInfo) {
    state.user = userInfo
  }
}
const actions = {
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            commit('INFO', res.data.user[0])
            resolve(res.data)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
