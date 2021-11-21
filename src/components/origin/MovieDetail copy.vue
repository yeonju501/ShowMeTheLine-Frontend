<template>
  <div class="mb-3 bgblack text-white" style="width: auto;">
    <div class="col-md-4" >
      <br>
      <img :src="getImage" alt=""  
      style = "margin-left: 80px;">
    </div>
    <hr>
    <iframe v-if="videoURI" :src="videoURI" frameborder="0" style = "width: 700px; height: 350px"></iframe>
    <div class="row no-gutters" style="display: inline-block;">
      <div class="card-body">
        <br>
        <h1 class="card-title">{{ title }}</h1>
        <br>
        <h5>개봉일: {{ release_date }} / 평점: {{ vote_average }}</h5>
        <br>
        <p class="card-text">{{ overview }}</p>
        <br>
        <!-- <button @click="getYoutubeReview" class="btn btn-danger">Youtube Review</button> -->
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
// import StarRating from 'vue-star-rating'
// import _ from 'lodash'
// import MovieComment from '../components/MovieComment.vue'
export default {
  components: {
    // MovieComment,
    // StarRating
  },
  data() {
    return {
      id:'',
      title:'',
      duration:'',
      release_date:'',
      popularity:'',
      vote_average:'',
      poster_path:'',
      backdrop_path:'',
      director:'',
      actor:'',
      overview:'',
      line:'',

      // mycomment:'',
      // myrating:'',
      // comments:[],
      // videoURI:'',
      // pageNum: 0,
      // pageSize: 5,
    }
  },
  props: {
    movie_pk: Number,
     
  },
  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },

    loadDetails: function(){
      const movie_pk = this.movie_pk
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/`,
        headers: this.setToken(),

      }).then((res)=>{
      console.log(res.data)  
      this.id = res.data.id
      this.poster_path = res.data.poster_path
      this.title = res.data.title
      this.vote_average = res.data.vote_average
      this.overview = res.data.overview
      this.release_date = res.data.release_date
      }).catch((err)=>{
        console.error(err)
      })
    },
  },

  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadDetails()
    } else {
      this.$router.push({name:'Login'})
    }
  },
  computed: {
  }
 }

</script>


<style scoped>
</style>