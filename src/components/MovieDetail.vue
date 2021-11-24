<template>
<div class='text-light'> 
  <div >
    <div class="row rounded" :style="{ 
        backgroundImage: `linear-gradient(to right, #141414, rgba(20, 20, 20, 0.5) 5%), linear-gradient(to left, #141414, rgba(20, 20, 20, 0) 10%), url('http://image.tmdb.org/t/p/w500${backdrop_path}')`,
        backgroundSize: '700px 100%',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        height: '1000px'}">
        
        <div class="col">
          <div class="fw-bold mb-3">
              <span class="fs-1">{{ title }}</span>
              
              <span class="fs-5 ms-3">({{ release_date.slice(0, 4)}})</span>
              <span class="fs-5 ms-2">{{ duration }}분</span>
              <i id="heart" v-if="isLiking" @click="like" style="color:crimson; font-size:45px; margin-top:70px; margin-left:20px;" class="fas fa-heart"></i>
              <i id="heart" v-else @click="like" style="font-size:45px; margin-top:70px; margin-left:20px;" class="far fa-heart"></i>
              
              <!-- <font-awesome-icon :icon="['fas','heart']"/> -->
              
              
            </div>

          <p class="fs-4 fw-bold pt-3 pb-2 ellipsis underline">"{{ line }}"</p>

          <div class="fs-5 fw-bold pt-3 pb-2">줄거리</div>
          <p class="card-text ellipsis" id="ellipsis-overview">{{ overview }}</p>

          <div class="feature-box row">
            <span>감독: {{ director }}</span>
          </div>
          
          <div class="feature-box row">
            <span>출연진: {{ actor }}</span>
          </div>
          <br>

          <form @submit="commentSubmit">
          <div class="form-group  ">
            <label for="star">별점</label>
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
            </div>
            <hr>

            <div>
            <label for="comment">리뷰</label>
            <textarea class="form-control " id="comment" rows="2" v-model.trim="comment" @keypress.enter="commentSubmit"></textarea>
            <br>
            <button class="btn btn-dark">제출</button>
            </div>
            </form>
            <hr>
            <MovieComment 
            v-for="(content, id) in comments"
              :key="id"
              :comment="content"
              :movie_pk="movie_pk"
              @loadComments="loadComments"
            />
            
 
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
      comment: null,
      content: null,
      myrating:0,
      pageNum: 0,
      pageSize: 5,
      liking: '',
      
      
    }
  },
  props: {
    movie_pk: Number,
     
  },
  methods: {
    
    setRating(rating) {
      this.myrating = rating * 2
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
      this.line = res.data.line

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
    },

    like: function () {
      const movie_pk = this.movie_pk
      const item = {
        myId: this.user.id,
        movieId: this.movie.id,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/like/`,
        data: item,
        headers: this.setToken(),
      }).then(()=>{
        this.getMyName()
      })
    },

    commentSubmit(event) {
      event.preventDefault()
      
      const commentItem = {
        content: this.comment,
        rank: this.myrating,
      }
      if (commentItem.content) {
        const movie_pk = this.movie_pk
        console.log(commentItem)
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/${movie_pk}/review/`,
          data: commentItem,
          headers: this.setToken(),
        }).then(()=>{
          this.loadComments()
        }).catch((err)=>{
          console.error(err)
        })
        this.comment = ''
      } else {
        alert("댓글을 입력하세요.")
      }
    },

  },
  computed: {
    isLiking: function () {
      return this.liking
    },
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w500'+this.poster_path
    },
  
  },
  
  created: function() {
    if (localStorage.getItem('jwt')){
      this.loadDetails()
      this.loadComments()
    } else {
      this.$router.push({name:'Login'})
    }
  },
  
 }

</script>


<style scopeed>
#heart {
  display: inline;
  margin: 0px auto;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
#heart:hover {
  color: crimson;
}
.bg-black {
  background-color: black;
}
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
  color:#f7fa66 !important;
}
.animate__animated {
    --animate-duration  : 1.2s;
    --animate-delay     : 0.5s;
}

</style>