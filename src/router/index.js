import Vue from 'vue'
import VueRouter from 'vue-router'
// import /* webpackChunkName: "home" */ home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: home
  // },
  {
    path: '/auth',
    props: true,
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth.vue')
  },
  {
    path: '/',
    props: true,
    component: () => import(/* webpackChunkName: "todos" */ '../views/todos.vue')
  },
  {
    path: '/account',
    props: true,
    component: () => import(/* webpackChunkName: "account" */ '../views/account.vue')
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path === '/') {
  //   next('/auth')
  // }
  next()
})

export default router
