<template>
  <swiper-slide>
    <div class="container">
    <v-hover style="margin-bottom:10px">
      <template v-slot:default="{ hover }">
        <v-card @click="getMovieDetail()">
          <v-img style="overflow-y: hidden; height:500px;" :src="getImage"></v-img>
          <div class="card-body">
          <!-- <h class="card-title " v-for="(item,idx) in getTitle" :key="idx"><b>{{ item }}</b></h> -->
          <h5 class="card-title"><b>{{ title }}</b></h5>
          </div>
          
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              color="#000000"
            >
              <div class="m-3 font-center h4" > 
                {{line}} 
                명대사띄우기명대사띄우기명대사띄우기명대사띄우기</div>
            </v-overlay>
          </v-fade-transition>
          <!-- <p class="content-font" style="font-weight: bold;">{{ movie.title }}</p> -->
        </v-card>  
      </template>
    </v-hover>

      <b-modal 
      ref="detail" 
      size="xl" 
      hide-header
      hide-footer
      
      :header-bg-variant="black"
      :body-bg-variant="black"
      :body-text-variant="black"
      :footer-bg-variant="black"
      >
        <MovieDetail
          :movie_pk="this.movie.id"
        />
      </b-modal>
    </div>
  </swiper-slide>
  
</template>

<script>
import MovieDetail from '../components/MovieDetail.vue'
export default {
  props: {
    movie:Object
  },
  components: {
    MovieDetail
  },
  data(){
    return {
      black : 'black',
      movie_pk : this.movie.id,
      title: this.movie.title,
      liking: '',
      line: this.movie.line
    }
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.movie.poster_path
    },
    
  },
  methods: {

    getMovieDetail() {
      this.$refs['detail'].show()
      // console.log(this.movie)
      // this.$router.push({name: 'MovieDetail', params: {movie_pk: this.movie.movie_id}})
    },
  },
}
</script>

<style>
.bgblack {
  background-color: rgba(20, 20, 20, 0);
}
.modal_content
.modal_header
.modal_body {
  background-color: rgb(192, 68, 68);
}
</style>
