<template>
  <swiper-slide>
    <div class="container">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card @click="getMovieDetail()">
          <v-img style="overflow-y: hidden; height:450px;" :src="getImage"></v-img>
          <div class="card-body" style="padding:0rem">
          <!-- <h class="card-title " v-for="(item,idx) in getTitle" :key="idx"><b>{{ item }}</b></h> -->
          <!-- <h5 class="card-title"><b>{{ title }}</b></h5> -->
          </div>
          
          <v-fade-transition>
            <v-overlay
              class="v-card--reveal"
              v-if="hover"
              absolute
              color="rgb(0, 0, 0, 1)"
            >
              <!-- <p class="fw-bold m-2 font-center h5  ">{{line}}</p> -->
              <p class="fw-bold m-3 " style="line-height:1.4; font-size:1.7em">{{line}}</p>
               
              
            </v-overlay>
          </v-fade-transition>
          <!-- <p class="content-font" style="font-weight: bold;">{{ movie.title }}</p> -->
        </v-card>  
      </template>
    </v-hover>

      <!-- <Modal /> -->
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
// import Modal from '../components/Modal.vue'
export default {
  props: {
    movie:Object
  },
  components: {
    MovieDetail,
    // Modal,
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
@font-face {
    font-family: 'GowunDodum-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'RIDIBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.ridi-font{
  font-family: 'RIDIBatang';
}

.go-font{
  font-family:  'GowunDodum-Regular';
}

.v-card--reveal {
align-items: center;
bottom: 0;
justify-content: center;
opacity: .8;
position: absolute;
width: 100%;
}
.bgblack {
  background-color: rgba(20, 20, 20, 0);
}
.modal_content
.modal_header
.modal_body {
  background-color: rgb(192, 68, 68);
}
</style>
