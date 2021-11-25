<template>
  <div class="container">
    <h1 class="mt-5">{{profileName}}님 안녕하세요!</h1>
    <a href="" v-if="profileId!=user_pk" v-show="following" @click="follow">
      <i id="heart" style="color:crimson; font-size:45px; margin-top:7px;" class="fas fa-heart"></i></a>
    <a href=""  v-if="profileId!=user_pk" v-show="!following" @click="follow">
      <i id="heart" style="font-size:45px; margin-top:7px;" class="far fa-heart"></i></a>
    <div><b>FOLLOW</b></div>
    <hr>



    <div class="container"> 
    <div class="row">

    <div class='col-6 bg'>
    <h2 class="mt-2 brown"><b>팔로워</b></h2>
    <hr>
    <profile-follow
      v-for="(follower, idx) in followers"
      :key="idx"
      :follower="follower"
      >
      ></profile-follow>  
    </div> 

    <div class='col-6 bg'>
    <h2 class="mt-2 brown"><b>팔로우</b></h2>
    <hr>
    <profile-follow
      v-for="(follower, idx) in followings"
      :key="idx"
      :follower="follower"
      ></profile-follow> 
    </div>
    </div>  
    </div>


    <hr>
    <!-- 마이리뷰 -->
    <div class="bg container">  
    <h2 class="mt-2 brown"><b>나의 리뷰</b></h2>
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
    <hr>

    <!-- My Line -->
    <div class="bg container">  
    <h2 class="mt-2 brown"><b>나의 대사</b></h2>
    <hr>
    <div class="row">
    <profile-line
       v-for="review in reviews"
          :key="review.id"
          :review="review"
          class="col-12 col-sm-4 py-3">
    </profile-line>
    </div>
    </div>

  </div>  
</template>

<script>
import axios from 'axios'
import ProfileReview from '../components/ProfileReview'
import ProfileFollow from '../components/ProfileFollow.vue'
import ProfileLine from '../components/ProfileLine.vue'

export default {
  name:'Profile',
  components: {
    ProfileReview,
    ProfileFollow,
    ProfileLine
  },
  data(){
    return {
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


.bg {
  padding-top: 5px;
  background-color: wheat;
  color: black;
  border-radius: 10px;
} 
.brown {
  color: rgb(168, 91, 47);  
}
  
</style>