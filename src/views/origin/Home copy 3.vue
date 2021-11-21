<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> -->

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
         <HomeMain/>
        <v-row>
          <template>
            <!-- <v-col> -->
            <movie-card 

              v-for="movieCard in movieCards"
              :key="movieCard.id"
              :movieCard="movieCard"
            >
            
            
            </movie-card>
              <!-- <strong>Category {{ n }}</strong> -->
            <!-- </v-col> -->

            <!-- <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
            
            > -->
            <!-- <movie-card
              v-for="movieCard in movieCards"
              :key="`${n}${movieCard.id}`"
              :movieCard="movieCard"
            >
            </movie-card> -->
              <!-- <v-sheet height="150"></v-sheet>
            </v-col> -->
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HomeMain from '@/components/HomeMain.vue'
// import MovieCardCopy from '@/components/MovieCardCopy.vue'
// import { mapState } from 'vuex'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'

// import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    MovieCard,
    HomeMain,
  },
  data: function
    MovieCard() {
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
  computed: {
  }
 }

</script>