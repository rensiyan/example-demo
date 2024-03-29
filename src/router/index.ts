import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Demo',
    name: 'DemoView',
    component: () => import('../views/DemoView.vue')
  },
  {
    path: '/importDrawer',
    name: 'importDrawer',
    component: () => import('../views/drawer/importDrawer.vue')
  },
  {
    path: '/responseLayout',
    name: 'responseLayout',
    component: () => import('../views/responseLayout.vue')
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: () => import('../views/swiper.vue')
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('../views/carousel.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach((to,form,next)=>{

  // if(to.path=='/login'){
  //   return next()
  // }
// })s

export default router
