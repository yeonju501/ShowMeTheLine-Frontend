<template>
<div div v-on:click="getMovieDetail()" class="col-12 col-sm-4 py-3">
  <div class="card h-100 m-3">
    <div class="h-100">
      <img style='object-fit: cover' class="img-fluid" :src="'https://image.tmdb.org/t/p/w300/' + movieCard.poster_path" alt="movie_poster">
    </div>
    <div class="card-body ">
      <h5 class="card-title fw-bolder">
        {{ movieCard.title }}
      <MovieDetail
      :movie_pk = "movie_pk"
      />
      </h5>
    </div>
  </div>
</div>

</template>

<script>
import MovieDetail from '@/components/MovieDetail.vue'
export default {
  name: 'MovieCard',
  components:{
    MovieDetail
  },
  data: function(){
    return {
    movie_pk : null,
    }
  },
  props: {
    movieCard: Object
  },
  methods:{
    getMovieDetail() {
      // console.log(this.movie.title)
      console.log(this.movie)
      // this.$bvModal.show('detail')
      this.$refs['detail'].show()
      // console.log(this.movie)
      // this.$router.push({name: 'MovieDetail', params: {movie_pk: this.movie.movie_id}})
    },
  }
}
</script>

<style>

</style>
