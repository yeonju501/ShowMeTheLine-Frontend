<template>
  <div>
    <h1>{{userName}}님 안녕하세요!</h1>
    <hr>
    <!-- <p>{{followers}}</p>
    <p>{{followings}}</p> -->
    <!-- <p>{{reviews}}</p> -->

    <!-- 팔로워 -->
    <!-- <h2 class="left">Follower</h2> -->
    <!-- {{followers}} -->

    

    <!-- 마이리뷰 -->
    <h2 class="left">My Review</h2>
    <hr>
    <div class="row">
    <profile-review
       v-for="review in reviews"
          :key="review.id"
          :review="review"
          class="col-12 col-sm-4 py-3">
    </profile-review>
    </div>

  </div>  
</template>

<script>
import axios from 'axios'
import ProfileReview from '../components/ProfileReview'

export default {
  name:'Profile',
  components: {
    ProfileReview
  },
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
.left { 
  margin-left: 20px;
  text-align: left; }
</style>