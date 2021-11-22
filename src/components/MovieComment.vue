<template>
  <span>
   
    <div class="row">
      <div class="col-2"><p><b>{{ comment.content }}</b></p></div>
      <div class="col-8"><p>{{ comment.user.username }}</p></div>
      <div class="col-2"> <b><a href="" v-if="getName == currentName" @click="deleteComment">삭제</a></b></div>
    </div>
    <hr style="background-color:white"> 
    
  </span>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },

  data() {
    return {
      getName: '',
      currentName: '',
    }
  },

  props: {
    comment: Object,
    movie_pk: Number
  },

  methods: {
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },

  // loadComments: function(){
  //   const movie_pk = this.movie_pk
  //   axios({
  //     method: 'get',
  //     url: `http://127.0.0.1:8000/movies/${movie_pk}/review/`,
  //     headers: this.setToken(),
  //   })
  //   .then((res)=> {
  //     this.user = res.data.user
  //     this.content = res.data.content
  //     this.content = res.data.rank
  //   })
  // },

  // loadComments: function(){
  //     const movie_pk = this.movie_pk
  //     axios({
  //       method: 'get',
  //       url: `http://127.0.0.1:8000/movies/${movie_pk}/review/`,
  //       headers: this.setToken(),
  //     }).then((res)=> {
  //       const temp = []
  //       res.data.forEach(element => {
  //         temp.push(element)  
  //       })
  //       this.comments = temp
        
  //     }).catch((err)=>{
  //     console.error(err)
  //   })
  //   },

  computed: {
    computed: {
    getComment: function() {
      return this.review.content
    }
  },
  },

  created: function() {
    if (localStorage.getItem('jwt')){
      // this.loadComments()
    } else {
      this.$router.push({name:'Login'})
    }
  },

  }


}
</script>

<style>

</style>