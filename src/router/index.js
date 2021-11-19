import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import MovieList from '../views/MovieList.vue'
import MyList from '../views/MyList.vue'


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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
