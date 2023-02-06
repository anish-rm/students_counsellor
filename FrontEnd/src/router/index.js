import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GetMarksView from '../views/GetMarksView.vue'
import ResultView from '../views/ResultView.vue'
import ContactView from '../views/ContactView.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/getmarks',
    name: 'getmarks',
    component: GetMarksView
  },
  {
    path: '/result/:rank',
    name: 'result',
    component: ResultView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
