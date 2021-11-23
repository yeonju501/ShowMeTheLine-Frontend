<template>
<div @click="getMovieDetail()" class="col-12 col-sm-4 py-3">
  <div class="card  m-3 text-black">
    <div class="h-100">
      <img style='object-fit: cover' class="img-fluid" :src="'https://image.tmdb.org/t/p/w300/' + movieCard.poster_path" alt="movie_poster">
    </div>
    <div class="card-body ">
      <h5 class="card-title fw-bolder" >
        {{ movieCard.title }}
      </h5>
    </div>
      <b-modal 
      ref="detail" 
      size="xl" 
      hide-header
      hide-footer
      :header-bg-variant="black"
      :body-bg-variant="black"
      :body-text-variant="ligth"
      :footer-bg-variant="black"
      >
        <MovieDetail
          :movie_pk="this.movieCard.id"
        />
      </b-modal>
  </div>
</div>

</template>

<script>
import MovieDetail from '../components/MovieDetail.vue'
export default {
  name: 'MovieCard',
  components:{
    MovieDetail,
  },
  data: function(){
    return {
      movie_pk : this.movieCard.id,
      black : 'black',
    }
  },
  props: {
    movieCard: Object
  },
  methods:{
    getMovieDetail() {
      // console.log(this.movie.title)
      // this.$bvModal.show('detail')
      this.$refs['detail'].show()
      // console.log(this.movie)
      // this.$router.push({name: 'MovieDetail', params: {movie_pk: this.movie.movie_id}})
    },
  },
  computed:{
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.movieCard.poster_path
    },
    getTitle: function() {
      const t = this.movieCard.title
      const temp = t.split(' ')
      let res = []
      let tp = ''
      for(let i = 0; i < temp.length; i++){
        if(tp.length + temp[i].length < 12 ){ 
          tp += ' ' + temp[i]
        }else{
          res.push(tp)
          tp = temp[i]
        }
      }
      res.push(tp)
      return res
    },
    getOverview: function() {
      return this.movieCard.overview
    },
  }
}
</script>

<style>

</style>
