<template>
  <div>
    <div class="container">
      <div class="row">
      <movie-card
        v-for="movieCard in movieCards"
        :key="movieCard.id"
        :movieCard="movieCard"
      >
      </movie-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue'
// import { mapState } from 'vuex'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  data: function() {
    return {
      movieCards: null,
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
        url: 'http://127.0.0.1:8000/movies/',
        headers: this.setToken(),

      })
        .then((res) => {
          console.log(res)
          this.movieCards = res.data
        })
        .catch(err => console.log(err))
    }, 

  },
  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadMovieCards()
    } else {
      this.$router.push({name:'Login'})
    }
  },
 }


</script>
