<template>
  <div>
    <HomeMain/>
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
import HomeMain from '@/components/HomeMain.vue'
import MovieCard from '@/components/MovieCard.vue'
import { mapState } from 'vuex'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    MovieCard,
    HomeMain,
  },
  data() {
    return {
      movieCards: [],
    }
  },

  methods: {
    SetToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },

  created: function() {
    this.$store.dispatch('LoadMovieCards')
  },
  computed: {
    ...mapState(['movieCards'])
  }
 }
}

</script>