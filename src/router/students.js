import layout from '@/layout/index.vue'
export default   
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
        roles: ['student', 'admin']
      }
    },
    {
      path: '/students/wordList',
      name: 'wordList',
      component: () => import('@/views/students/wordList.vue'),
      meta: {
        title: '学生作业布置',
        icon: 'el-icon-picture-outline-round',
        roles: ['admin']
      }
    },
  ],
}