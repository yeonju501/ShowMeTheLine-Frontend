<template>
<div>
  <label :for="movieCard.id">
  <v-hover style="margin-bottom:10px">
      <template v-slot:default="{ hover }">
  <v-card class="card  m-3 text-black" @click="selectMovie">
      <v-img style='object-fit: cover' class="img-fluid" :src="'https://image.tmdb.org/t/p/w300/' + movieCard.poster_path" alt="movie_poster"></v-img>
    <!-- <div class="card-body ">
      <h5 class="card-title fw-bolder" >
        {{ movieCard.title }}
      </h5>
    </div> -->
    <v-fade-transition>
        <v-overlay
        class="v-card--reveal"
          v-if="hover"
          absolute
          color="#000000"
        >
          <p class="m-3 font-center h3 " > 
            {{movieCard.line}}
          </p>
        </v-overlay>
      </v-fade-transition>
    </v-card> 
    </template>
    </v-hover>
    </label>
  </div>

</template>

<script>
// import axios from 'axios'
export default {
  name: 'RecommendLineCard',
  data () {
    return {
      movies: [],
    }
  },
  props:{
    movieCard:Object,
    cardNum:Number,
  },
  methods:{
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
  
    selectMovie: function (){
      console.log(this.movieCard.id)
      this.$emit('selectMovie', this.movieCard.id, this.cardNum)
    }


  }, 
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.movie.poster_path
    },
  },


  created: function() {
  if (localStorage.getItem('jwt')){
    // this.loadRecommendMovieCards()
  } else {
    this.$router.push({name:'Login'})
  }
},
}
</script>

<style scoped>
label {
  display: block !important;
}
</style>