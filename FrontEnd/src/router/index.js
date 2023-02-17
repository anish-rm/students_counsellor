import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GetMarksView from '../views/GetMarksView.vue'
import ResultView from '../views/ResultView.vue'
import ContactView from '../views/ContactView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import CreateCollegeView from '../views/CreateCollege.vue'
import AddRankView from '../views/AddRankView.vue'
import AllCollegeView from '../views/AllCollegesView.vue'

import store from "../store/index";





Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
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
    path: '/result/:category/:rank',
    name: 'result',
    component: ResultView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/allColleges',
    name: 'contact',
    component: AllCollegeView
  },
  {
    path: "/addCollege",
    component: CreateCollegeView,
    beforeEnter(to, from, next) {
      console.log(localStorage.getItem("userId"))
      if (localStorage.getItem("userRole") == 'admin') {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/addRank",
    component: AddRankView,
    beforeEnter(to, from, next) {
      console.log(localStorage.getItem("userId"))
      if (localStorage.getItem("userRole") == 'admin') {
        next();
      } else {
        next("/");
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
