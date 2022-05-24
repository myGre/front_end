// 设置token
export const setToken = (val) => {
  return localStorage.setItem('TOKEN', val)
}
// 获取token
export const getToken = (TOKEN) => {
  return localStorage.getItem(TOKEN)
}
// 移除token
export const removeToken = (TOKEN) => {
  return localStorage.removeItem(TOKEN)
}