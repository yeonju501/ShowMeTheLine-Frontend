<template>
<div class='text-light'> 
  <div class="mb-3 my-5">
    <div class="row g-1 rounded" :style="{ 
        backgroundImage: `linear-gradient(to right, #141414, rgba(20, 20, 20, 0) 70%), linear-gradient(to left, #141414, rgba(20, 20, 20, 0) 20%), url('http://image.tmdb.org/t/p/w500${backdrop_path}')`,
        backgroundSize: '700px 100%',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        height: '640px'}">
        
        <div class="col">
          <div class="fw-bold mb-3">
              <span class="fs-3">{{ title }}</span>
              <span class="fs-7 ms-3">({{ release_date.slice(0, 4)}})</span>
              <span class="fs-7 ms-2">{{ duration }}분</span>
            </div>

          <div class="fs-5 fw-bold pt-3 pb-2">명대사자리</div>
          <p class="card-text ellipsis underline" id="ellipsis-overview">{{ line }}</p>


          <div class="fs-5 fw-bold pt-3 pb-2">줄거리</div>
          <p class="card-text ellipsis underline" id="ellipsis-overview">{{ overview }}</p>

          <div class="feature-box row">
            <span>감독: {{ director }}</span>
          </div>
          
          <div class="feature-box row">
            <span>출연진: {{ actor }}</span>
          </div>
          
          <form @submit="commentSubmit">
          <div class="form-group">
            <label for="star"></label>
            <star-rating
              id="star" 
              v-bind:increment="0.5"
              v-bind:max-rating="5"
              v-bind:show-rating="false"
              inactive-color="#000"
              active-color="#ff0"
              border-color="#ff0"
              v-bind:padding="8"
              v-bind:border-width="2"
              v-bind:star-size="30"
              @rating-selected="setRating">
            </star-rating>
            <hr>
            <label for="comment">리뷰</label>
            <textarea class="form-control" id="comment" rows="2" v-model="mycomment" @keypress.enter="commentSubmit"></textarea>
            </div>
            <br>
            <button class="btn btn-dark">제출</button>
          </form>

          <hr>
          <MovieComment 
          />
          
          <!-- <div class="btn-cover">
          <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
            이전
          </button>
          <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
          <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
            다음
          </button>
          </div> -->
          
        </div> 

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import MovieComment from '../components/MovieComment.vue'
import StarRating from 'vue-star-rating'

export default {
  components: {
    MovieComment,
    StarRating
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
      comments:[],
      mycomment:'',
      myrating:0,
      pageNum: 0,
      pageSize: 5,
      
    }
  },
  props: {
    movie_pk: Number,
     
  },
  methods: {
    setRating(rating) {
      // console.log(rating)
      this.myrating = rating * 2
    },

    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    
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
      this.duration = res.data.duration
      this.director = res.data.director
      this.title = res.data.title
      this.actor = res.data.actor

      }).catch((err)=>{
        console.error(err)
      })
    },

    loadComments: function(){
      const movie_pk = this.movie_pk
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/review/`,
        headers: this.setToken(),
      }).then((res)=> {
        const temp = []
        res.data.forEach(element => {
          temp.push(element)  
        })
        this.comments = temp
      }).catch((err)=>{
      console.error(err)
    })
    }
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w500'+this.poster_path
    },
    pageCount () {
      let listLeng = this.comments.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      

      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      // const sortedComments = _.sortBy(this.comments, 'id').reverse()
      return this.comments.slice(start, end);
    },
  },
  
  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadDetails()
      // this.loadComments()
    } else {
      this.$router.push({name:'Login'})
    }
  },
  
 }

</script>


<style scopeed>
.ellipsis {
  width: 400px;
  text-overflow: ellipsis;
}
.card {
  background-color: inherit;
}
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