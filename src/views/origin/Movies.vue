<template>
  <div class="container">
     <div class="row">
      <form @submit="searchSome" class="form-inline ml-auto mr-2">
        <input class="form-control mr-sm-2" v-model="search" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <form>
        <button class="btn btn-primary ml-auto mr-4" onClick="history.go(0)">Refresh</button>
      </form>
    </div>  

    <div>
    <!-- <div class="container"> -->
      <div class="row">
      <movie-card
        v-for="movieCard in movieCards"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-12 col-sm-4 py-3"
      >
      </movie-card>
      </div>
    </div>

    <div class="ml-4 btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
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
      pageSize: 9,
      search: '',
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
          console.log(res)
          this.movieCards = res.data
        })
        .catch(err => console.log(err))
    }, 

    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },

    searchSome(event) {
      event.preventDefault()
      const keyword = this.search
      const temp = []
      
      this.movies.forEach((element)=>{
        console.log(element.title)
        const title = element.title
        if (title.indexOf(keyword) !== -1) {
          temp.push(element)   
        }
        this.movies = temp  

      })
       
      this.search = ''
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
