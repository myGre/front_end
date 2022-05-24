import layout from '@/layout/index.vue'
export default {
  path: '/discipline',
  name: 'discipline',
  component: layout,
  meta: {
    title: '学科管理',
    icon: 'el-icon-tickets'
  },
  children: [
    {
      path: '/discipline/disciplineIndex',
      name: 'disciplineIndex',
      component: () => import('@/views/discipline/discipline.vue'),
      meta: {
        title: '学科中心',
        icon: 'el-icon-tickets'
      },
    },
    {
      path: '/discipline/score',
      name: 'score',
      component: () => import('@/views/discipline/scores.vue'),
      meta: {
        title: '成绩',
        icon: 'el-icon-tickets'
      },
    },
    {
      path: '/discipline/echers',
      name: 'echers',
      component: () => import('@/views/discipline/echers.vue'),
      meta: {
        title: '数据中心',
        icon: 'el-icon-tickets'
      },
    },
    {
      path: '/discipline/correct',
      name: 'correct',
      component: () => import('@/views/discipline/correct.vue'),
      meta: {
        title: '批改',
        icon: 'el-icon-tickets'
      },
    },
  ]
}
