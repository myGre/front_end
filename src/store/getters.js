const getters = {
  roles: state => state.user.user.roles,
  NavRoutes: state => state.permission.routes
}
export default getters