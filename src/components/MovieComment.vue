<template>
  <span>
    <star-rating 
      v-bind:increment="0.5"
      v-bind:max-rating="5"
      v-bind:rating="getRating"
      v-bind:show-rating="false"
      v-bind:read-only="true"
      inactive-color="black"
      active-color="#ffd400"
      border-color="#ffd400"
      v-bind:padding="-2"
      v-bind:border-width="0"
      v-bind:star-size="18"
      @rating-selected="setRating">
    </star-rating>

   <div class=" row">
      <div class="col-2"><a href="" class="icon-color text-decoration-none" @click="toProfile"><p><b>{{ comment.user.username }}</b></p></a></div>
      <div class="col-8"><p><b>{{ comment.content }}</b></p></div>
      <div class="col-1"><b><a href="" v-if="getName==getUsername" @click="deleteComment"><i class="fa fa-trash icon-color"  aria-hidden="true"></i></a></b></div>
      <div class="col-1"><b><a href="" v-if="getName==getUsername" @click="updateComment"><i class="fa fa-pen icon-color"  aria-hidden="true"></i></a></b></div>
      <component v-bind:is="updateForm" :review="review" @sendUpdate="sendUpdate" :movie_pk="movie_pk"></component>
    </div>
    <!-- <hr style="background-color:white">  -->
    
  </span>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import CommentUpdate from '../components/CommentUpdate.vue'

export default {
  components: {
    StarRating,
    // CommentUpdate
  },

  data() {
    return {
      updateForm: '',
      review:'',
    }
  },

  props: {
    comment: Object,
    movie_pk: Number,
    username:String,
  },

  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },
    deleteComment(event) {
      event.preventDefault()
      const movie_pk = this.movie_pk
      const review_pk = this.comment.id
      axios({
        url: `http://127.0.0.1:8000/movies/${movie_pk}/review/${review_pk}` ,
        method: 'delete',
        headers: this.setToken(),
      }).then(()=>{
        this.$emit('loadComments')
      }).catch((err)=>{
        console.error(err)
      })
    },
    updateComment(event){
      event.preventDefault()
      this.updateForm=CommentUpdate
      const movie_pk = this.movie_pk
      const review_pk = this.comment.id
      axios({
        url: `http://127.0.0.1:8000/movies/${movie_pk}/review/${review_pk}` ,
        method: 'get',
        headers: this.setToken(),
      }).then((res)=>{
        this.review = res.data
      }).catch((err)=>{
        console.error(err)
      })
    },
    toProfile: function(){
      this.$router.push({name:'Profile', params:{user:this.comment.user.username}})
      
    },
    sendUpdate(){
      this.updateForm=''
      this.$emit('loadComments')
    },
    
    
  },

  computed: {
    getComment() {
      return this.comment.content
    },
    getRating() {
      return this.comment.rank / 2
    },
    getName(){
      return this.comment.user.username
    },
    getUsername(){
      return this.username
    }
  },

  created: function() {
    if (localStorage.getItem('jwt')){
      // this.loadComments()
    } else {
      this.$router.push({name:'Login'})
    }
  },

  }



</script>

<style>
.bg-black {
  background-color: black;
}
.icon-color {
  color: white;
}
.go-right {
  margin-left: 5px;
}
</style>