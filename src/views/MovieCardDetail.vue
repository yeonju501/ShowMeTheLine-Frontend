<template>
  
</template>

<script>
export default {
  name: 'MovieCardDetail',
  methods: {
    backMovieList: function () {
      this.$router.push({ name: 'Home' })
    },
  },
  computed: {
    nowMovie: function () {
      return this.$store.state.nowMovie
    },
    recommendedMovies: function () {
      return this.$store.state.recommendedMovies
    },
  },
}
</script>

<style>

</style>