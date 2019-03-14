import index from '@/page/index/index.vue'
export default [
  {
    path: '/',
    name: 'login',
    component: () => import('@/page/login.vue')
  },
  {
    path: '/forgetPassStep1',
    name: 'forgetPassStep1',
    component: () => import('@/page/forgetPassStep1.vue'),
  },
  {
    path: '/forgetPassStep2',
    name: 'forgetPassStep2',
    component: () => import('@/page/forgetPassStep2.vue'),
  },
  {
    path:'/index',
    name: 'index',
    component: index,
    children: [{
      path: '/',
      name: 'main',
      component: () => import('@/page/main/main.vue'),
    },
    {
      path: 'teamApplication',
      name: 'teamApplication',
      component: () => import('@/page/Team/teamApplication.vue'),
    },
    {
      path: 'worksApplication',
      name: 'worksApplication',
      component: () => import('@/page/Works/worksApplication.vue'),
    },
    {
      path: 'worksManage',
      name: 'worksManage',
      component: () => import('@/page/Works/worksManage.vue'),
    },
    {
      path: 'worksAdd',
      name: 'worksAdd',
      component: () => import('@/page/Works/worksAdd.vue'),
    },
    {
      path: 'worksModify',
      name: 'worksModify',
      component: () => import('@/page/Works/worksModify.vue'),
    },
    {
      path: 'teamManage',
      name: 'teamManage',
      component: () => import('@/page/Team/teamManage.vue'),
    },
    {
      path: 'teamInfo',
      name: 'teamInfo',
      component: () => import('@/page/Team/teamInfo.vue'),
    },
    {
      path: 'teamAccount',
      name: 'teamAccount',
      component: () => import('@/page/Team/teamAccount.vue'),
    },
    {
      path: '/worksApplicationDetail:pkId',
      name: 'worksApplicationDetail',
      component: () => import('@/page/Works/worksApplicationDetail.vue'),
    }
  ], redirect: "index"
  }
]