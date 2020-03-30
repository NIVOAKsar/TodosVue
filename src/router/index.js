import Vue from 'vue'
import VueRouter from 'vue-router'
import /* webpackChunkName: "home" */ home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: home
  },
  {
    path: '/todos',
    props: true,
    // name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/todos.vue')
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

export default router
