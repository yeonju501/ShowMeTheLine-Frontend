<template>
  <form @submit="sendUpdate">
    <star-rating 
      v-bind:increment="0.5"
      v-bind:max-rating="5"
      v-bind:rating="getRating"
      v-bind:show-rating="false"
      inactive-color="#000"
      active-color="#ff0"
      border-color="#ff0"
      v-bind:padding="8"
      v-bind:border-width="2"
      v-bind:star-size="10"
      @rating-selected="setRating">
    </star-rating>
      <div class="form-group">
        <textarea class="form-control" id="content" rows="10" v-model="review.content"></textarea>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
  name: 'CommentUpdate',
  components: {
    StarRating,
  },
  props:{
    review:Object,
    movie_pk:Number,

  },
  data(){
    return{
      myrating:0,
    }
  },
  methods:{
    setRating(rating) {
      console.log(rating)
      this.myrating = rating * 2
    },
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },
    sendUpdate: function(event) {
      event.preventDefault()
      const commentItem = {
        content: this.review.content,
        rank: this.myrating,
      }
      if (commentItem.content) {
      const review_pk = this.review.id
      const movie_pk = this.movie_pk
      axios({
        method: 'PUT',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/review/${review_pk}/`,
        data: commentItem,
        headers: this.setToken(),
      }).then(()=>{
        this.$emit('sendUpdate')
      }).catch((err)=>{
        console.error(err)
      })
    } else {
      alert("댓글을 입력하세요.")
    }

    },
  },
  computed: {
    getComment() {
      return this.review.content
    },
    getRating() {
      return this.review.rank / 2
    },
  },
}
</script>

<style>

</style>