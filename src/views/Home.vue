<template>
  <div class="container">
    <HomeMain/>
    <!-- <div class="container">
      <div class="row"> -->
      <br>
      <br>
      <Sliders
      :movies="movieCards"
      :title="recommendTitle"
      />
      <Sliders
      :movies="popularmovieCards"
      :title="popularTitle"
      />
      <!-- <movie-card
        v-for="movieCard in movieCards"
        :key="movieCard.id"
        :movieCard="movieCard"
      >
      </movie-card> -->
      <!-- </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMain from '@/components/HomeMain.vue'
// import MovieCard from '@/components/MovieCard.vue'
import Sliders from '../components/Sliders.vue'
// import { mapState } from 'vuex'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    Sliders,
    // MovieCard,
    HomeMain,
  },
  data: function() {
    return {
      buttonOn : true,
      movieCards: null,
      popularmovieCards: null,
      recommendTitle:'평점이 높은 영화',
      popularTitle:'인기가 많은 영화',

      //스와이퍼
      swiperOptions: {
        slidesPerView: 'auto',
        
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: {
          nextEl: '#button-next-relacionados',
          prevEl: '#button-prev-relacionados'
        },
      }
    }
  },
  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
    loadMovieCards: function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/bestFive/',
        headers: this.setToken(),

      })
        .then((res) => {
          this.movieCards = res.data
        })
        .catch(err => console.log(err))
    },
    loadPopularMovieCards: function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/popularFive/',
        headers: this.setToken(),

      })
        .then((res) => {
          this.popularmovieCards = res.data
        })
        .catch(err => console.log(err))
    },
    btnOn(){
      this.buttonOn = true
    },
    btnOff(){
      this.buttonOn = false
    },
    Recprev(){
      for (let i = 0; i < 5; i++){
        this.$refs.rec.$swiper.slidePrev()
      }
      this.$refs.rec.$swiper.slidePrev()
    },
    Recnext(){
      for (let i = 0; i < 5; i++){
        this.$refs.rec.$swiper.slideNext()
      }
      this.$refs.rec.$swiper.slideNext()
    },

  },
  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadMovieCards(),
      this.loadPopularMovieCards()
    } else {
      this.$router.push({name:'Login'})
    }
  },
  computed: {
  }
 }

</script>