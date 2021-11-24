<template>
  <swiper-slide>
    <div class="container">
    <v-hover >
      <template v-slot:default="{ hover }">
        <v-card @click="getMovieDetail()">
          <v-img style="overflow-y: hidden; height:450px;" :src="getImage"></v-img>
          <div class="card-body" style="padding:0rem">
          <!-- <h class="card-title " v-for="(item,idx) in getTitle" :key="idx"><b>{{ item }}</b></h> -->
          <!-- <h5 class="card-title"><b>{{ title }}</b></h5> -->
          </div>
          
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              color="rgb(0, 0, 0, 1)"
            >
              <div class="m-1 font-center h4" > 
                <v-card 
                class="mx-auto"
                color="#323232"
                dark
                
                >
                <v-card-text class=" font-weight-bold" style="line-height: 1.5; font-size:0.89em">{{line}}</v-card-text>
                </v-card>
              </div>
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

      <!-- <div id="app">
    <v-app v-app id="inspire">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Dialog
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5"></span>
          </v-card-title>
          <v-card-text>
            <MovieDetail
          :movie_pk="this.movie.id"
        />
          </v-card-text>

        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</div> -->




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
      dialog:false,
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
