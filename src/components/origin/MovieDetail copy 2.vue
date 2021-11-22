<template>
  
  <div class="mb-3 my-4 bgblack text-white" style="width: auto;">
    <div class="row g-0 rounded" :style="{ 
        backgroundImage: `url('${'http://image.tmdb.org/t/p/w500'+backdrop_path}')`,
        backgroundSize: '840px 100%',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        height: '640px'}">

       <div class="col-5">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div class="card-title fw-bold fs-1">{{ title }}</div>
                </div>
              </div>
            </div>
      
       <div class="fw-bold mb-3">
              <span class="fs-4">{{ title }}</span>
              <span class="fs-7 ms-3">{{ release_date.slice(0, 4)}}년</span>
              <span class="fs-7 ms-2">{{ duration }}분</span>
            </div>

      <div class="fs-5 fw-bold pt-3 pb-2">줄거리</div>
            <p class="card-text ellipsis underline" id="ellipsis-overview">{{ overview }}</p>
            <div class="feature-box row">
              <div class="fw-bold col-2">감독: </div>
              <div class="col">
                <span class="underline"> 
                {{ director }}
                </span>
              </div>
            </div>
            <div class="feature-box row">
              <span class="fw-bold col-2">출연진: </span>
              <div class="col">
                <span>{{ actor }} </span>
              </div>
            </div>


    <div class="col-md-4" >
      <br>
      <img :src="getBackImage" alt=""  
      style = "margin-left: 80px;">
    </div>
    <hr>

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
  </div>
</template>

<script>
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

export default {
  components: {

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
      console.log(movie_pk)
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/`,
        headers: this.setToken(),

      }).then((res)=>{
      console.log(res.data)  
      this.id = res.data.id
      this.poster_path = res.data.poster_path
      this.backdrop_path = res.data.backdrop_path
      this.vote_average = res.data.vote_average
      this.overview = res.data.overview
      this.release_date = res.data.release_date
      }).catch((err)=>{
        console.error(err)
      })
    },
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w500'+this.poster_path
    },
    getBackImage: function() {
      return 'http://image.tmdb.org/t/p/w500'+this.backdrop_path
    },
  },
  
  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadDetails()
    } else {
      this.$router.push({name:'Login'})
    }
  },
  
 }

</script>


<style scopeed>
.ellipsis {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.card {
  background-color: inherit;
}
/* .card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
} */
.additional-info-card {
  /* border-radius: .3rem; */
  padding-bottom: 30px;
  margin-bottom: 50px;
}
.feature-box {
  display: flex;
}
.moreinfo-tag {
  background-color: #292828;
}
span.underline:hover {
  /* text-decoration: underline; */
  /* font-weight: bold; */
  color:#00cecb !important;
}
p.underline:hover {
  text-decoration: underline;
  /* font-weight: bold; */
  color:#00cecb !important;
}
.animate__animated {
    --animate-duration  : 1.2s;
    --animate-delay     : 0.5s;
}
</style>