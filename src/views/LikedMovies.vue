<template>
  <div class="container">
  <h1>내가 찜한 영화</h1>
  <hr>
  <span style="display: flex; margin-left:20px; font-size:20px">{{movies.length}}건의 영화</span>
    <div class="container">
      <div class="row">
        <movie-card
          v-for="movieCard in movies"
          :key="movieCard.id"
          :movieCard="movieCard"
          @updateLikedMovies="getLikedMovies"
          class="col-md-3 col-sm-6 py-3">
        </movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'
export default {
  name: 'MyList',
  data(){
    return{
      movies : [],
      

    }
  },
  components:{
    MovieCard,
  },
  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },
    getLikedMovies: function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/like/`,
        headers: this.setToken(),
      }).then((res)=>{
        this.movies = res.data
      })
    }

  },
  created: function(){
    this.getLikedMovies()
  }

}
</script>

<style>

</style>