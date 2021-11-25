<template>
  <div class="container">
    <h1>{{profileName}}님 안녕하세요!</h1>
    <a href="" v-if="profileId!=user_pk" v-show="following" @click="follow">
      <i id="heart" style="color:crimson; font-size:45px; margin-top:70px; margin-left:20px;" class="fas fa-heart"></i>
    </a>
    <a href=""  v-if="profileId!=user_pk" v-show="!following" @click="follow">
      <i id="heart" style="font-size:45px; margin-top:70px; margin-left:20px;" class="far fa-heart"></i>
    </a>
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
      profileId: null,
      profileName: '',
      following: null,
      user_followings: [],
      followers: [],
      reviews: [],
      username:  '',
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
    follow: function(event){
      event.preventDefault()
      axios({
        method: 'POST',
        url: `http://127.0.0.1:8000/accounts/${this.profileId}/follow/`,
        headers: this.setToken(),
      }).then(()=>{
        this.getUser()
      })

    },
    getProfile: function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/profile/${this.user}/`,
        headers: this.setToken(),
      }).then((res)=>{
        this.profileId = res.data.id
        this.profileName = res.data.username
        this.followings = res.data.followings
        this.followers = res.data.followers
        this.reviews = res.data.review_set
      })
    },
    getUser: function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/userinfo/`,
        headers: this.setToken(),
      }).then((res) => {
        this.user_pk = res.data.id
        this.username = res.data.username
        this.user_followings = res.data.followings
        if (this.user_followings.includes(this.profileId)){
          this.following = true
        } else {
          this.following = false
        }  

      })
    },

  },
  created: function(){
    if (localStorage.getItem('jwt')){
      this.getProfile()
      this.getUser()
    } else {
      this.$router.push({name:'Login'})
    }

  }



}
</script>

<style>
.left { 
  margin-left: 20px;
  text-align: left; }
</style>