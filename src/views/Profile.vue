<template>
  <div>
    <h1>열심히 살자</h1> 
    <p>{{userName}}</p>
    <p>{{followers}}</p>
    <p>{{followings}}</p>
    <p>{{reviews}}</p>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  name:'Profile',
  data(){
    return{
      userName: '',
      followings: [],
      followers: [],
      reviews: [],
    }
  },
  props:{
    user: String,
  },
  methods:{
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
    },
    getProfile: function(){
      console.log(this.user)
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/profile/${this.user}/`,
        headers: this.setToken(),
      }).then((res)=>{
        console.log(res.data)
        this.userName = res.data.username
        this.followings = res.data.followings
        this.followers = res.data.followers
        this.reviews = res.data.review_set
      })
    }


  },
  created: function(){
    this.getProfile()

  }



}
</script>

<style>

</style>