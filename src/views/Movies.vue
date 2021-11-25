<template>
<div>
      <div class="container">
      <form @submit="searchMovie">
        <div class="row align-items-center">
         <!-- class="form-inline ml-auto mr-2" -->
        <div class="col"></div>
        <!-- <div class="ml-5 col-1"><i class="fas fa-search"></i></div> -->
        <div class="px-3 col-4"><input class="form-control mr-sm-2" v-model="search" type="text" placeholder="영화를 검색하세요" aria-label="Search"></div>
        <div class="col-1"><button class="btn-1"  type="submit">SEARCH</button></div>
        <div class="col-1"><button class="btn-1"  @click="reset">RESET</button></div>
        <!-- <div><button class="btn btn-outline-light ml-auto mr-4" onClick="history.go(0)">새로고침</button></div> -->
        </div>
       
      </form>

    <br>
    <span v-show="searched" style="font-size:20px;">{{keyword}}의 검색 결과</span>
    <span style="display: flex; margin-left:20px; font-size:20px">{{movies.length}}건의 영화</span>
    <!-- <div class="container"> -->
      <div class="row">
      <movie-card
        v-for="movieCard in paginatedData"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-md-3 col-sm-6 py-3"
      >
      </movie-card>
      </div>
    </div>

    <div class="ml-4 btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn btn-2">
        이전
      </button>
      <span class="page-count"> <b>&nbsp;&nbsp; {{ pageNum + 1 }} / {{ pageCount }} &nbsp;&nbsp;</b></span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn btn-2">
        다음
      </button>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  data: function() {
    return {
      movieCards: null,
      movies: [],
      pageNum: 0,
      pageSize: 12,
      search: '',
      keyword: '',
      searched: false,
    }
  },
  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
    loadMovieCards: function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
        headers: this.setToken(),

      })
        .then((res) => {
          const temp = []
          res.data.forEach(function(element){
            temp.push(element)
          })
          this.movies = temp
        })
        .catch(err => console.log(err))
    }, 

    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },

    searchMovie(event) {
      event.preventDefault()
      this.keyword = this.search
      const temp = []
      this.movies.forEach((element)=>{
        const title = element.title
        if (title.indexOf(this.keyword) !== -1) {
          temp.push(element)   
        }
        this.movies = temp
        this.searched = true 

      })
       
      this.search = ''
    },

    reset: function(event){
      event.preventDefault()
      this.searched = false
      history.go(0)
      
    }

  },

  computed: {
    pageCount () {
      let listLeng = this.movies.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      const sortedMovies = this.movies
      return sortedMovies.slice(start, end);
    }
  },

  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadMovieCards()
    } else {
      this.$router.push({name:'Login'})
    }
  },
 }


</script>

<style>
.btn-1 {
  width:80px;
  height: 44px;
  border-radius: 3px;
  color: black;
  font-weight: bold;
  text-align: center;
  background: rgb(220, 206, 206);
}
.btn-2 {
  margin-bottom: 20px;
  width:45px;
  height: 30px;
  border-radius: 23px;
  color: black;
  font-weight: bold;
  text-align: center;
  background: rgb(220, 206, 206);
}
  
</style>