import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import MovieList from '../views/MovieList.vue'
import MyList from '../views/MyList.vue'
import Signup from '../views/accounts/Signup'
import Login from '../views/accounts/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/my-list',
    name: 'MyList',
    component: MyList,
  },
  {
    path: '/movie-list',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path: '/accounts/signup',
    name: 'Singup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
