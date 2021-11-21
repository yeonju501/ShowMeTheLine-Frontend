import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LikedMovies from '../views/LikedMovies.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Movies from '../views/Movies.vue'
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
    path: '/liked-movies',
    name: 'LikedMovies',
    component: LikedMovies,
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
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
  {
    path: '/moviedetail',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
