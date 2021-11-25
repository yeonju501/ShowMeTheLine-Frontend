<template>
  <div id="app" class = 'text-white bg-black'>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav style="margin-right:auto;" v-if="isLogin">
            <b-nav-item id="logo" style="margin-left:10px;" :to="{name:'Home'}"> ShowMeTheLine </b-nav-item>
            <b-nav-item  :to="{name:'Movies'}"> 영화 </b-nav-item>
            <b-nav-item  :to="{name:'LikedMovies'}"> 내가 찜한 영화 </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav style="margin-right:auto;" v-else>
            <b-nav-item id="logo" style="margin-left:10px;" :to="{name:'Home'}"> ShowMeTheLine </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav style="margin-left:auto; padding-right:10px;" v-if="isLogin">
            <b-nav-item  :to="{ name: 'Profile', params: { user: getName}}"> 프로필 </b-nav-item>
            <b-nav-item  @click="logout" to="#"> 로그아웃 </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav style="margin-left:auto; padding-right:10px;" v-else>
          <b-nav-item :to="{ name:'Signup'}"> 회원가입 </b-nav-item>
          <b-nav-item :to="{name:'Login'}"> 로그인 </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view @login="isLogin = true" />
  </div>
  
</template>


<script>
import axios from 'axios'
export default {
  name: 'App',
  data: function() {
    return {
      isLogin: false,
      userName: '',
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
    getUser: function(){
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/userinfo/`,
        headers: this.setToken(),
      }).then((res) => {
        this.userName = res.data.username 
      })
    },
    logout: function() {
      console.log('bb')
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Login' })
    }

  },
  computed:{
    getName: function () {
      return this.userName
    },
  },
  created: function () {
    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.getUser()
    } else {
      this.$router.push({name:'Login'})
    }
    // const token = localStorage.getItem('jwt')

    // if (token) {
    //   this.isLogin = true
    //   this.getUser()
      
    // }
  }
}
</script>

<style>
@font-face {
    font-family: 'GowunDodum-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#logo {
  margin-top: 1px;
  letter-spacing :-1.2px;
  margin-left: 10px;
  font-family: moon;
  color: #bd2020;
  text-decoration-color: #ff0000;
  text-emphasis-color: red;
  font-size: 1.1vw;
  line-height: 1.2vw;
  text-shadow: 0 0 1vw #ff0000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:black;
  /* color: #2c3e50; */
}

* {
  font-family:'GowunDodum-Regular' ;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #f9fcfb;
}

.navbar-dark .navbar-nav .nav-link{
  color: white !important;
}


</style>
