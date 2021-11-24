<template>
<div class="container">
  <v-hover style="margin-bottom:10px">
      <template v-slot:default="{ hover }">
  <v-card class="card  m-3 text-black">
      <v-img style='object-fit: cover' class="img-fluid" :src="'https://image.tmdb.org/t/p/w300/' + movieCard.poster_path" alt="movie_poster"></v-img>
    <div class="card-body ">
      <h5 class="card-title fw-bolder" >
        {{ movieCard.title }}
      </h5>
    </div>
    <v-fade-transition>
        <v-overlay
        class="v-card--reveal"
          v-if="hover"
          absolute
          color="#000000"
        >
          <p class="fw-bold m-3 font-center h3 " > 
            {{movieCard.line}}
          </p>
        </v-overlay>
      </v-fade-transition>
    </v-card> 
    </template>
    </v-hover>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'RecommendLineCard',
  data () {
    return {
      movies: [],
      movieCards: null,
    }
  },
  
  methos:{
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },

  loadRecommendMovieCards: function(){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/recommend/line/',
      headers: this.setToken(),

    })
      .then((res) => {
        const temp = []
        res.data.forEach(function(element){
          temp.push(element)
        })
        this.movies = temp
      })
      .catch(err => console.log(err))
  },
  }, 
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.movie.poster_path
    },
  },


  created: function() {
  if (localStorage.getItem('jwt')){
    this.loadRecommendMovieCards()
  } else {
    this.$router.push({name:'Login'})
  }
},
}
</script>

<style>

</style>