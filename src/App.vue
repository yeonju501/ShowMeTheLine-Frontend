<template>
  <div id="app" class = 'text-white bgblack'>
    <b-navbar class="sticky-top bl" toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isLogin">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'Home'}">
                <b>Home</b>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'Movies'}">
                <b>영화</b>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'LikedMovies'}">
                <b>내가 찜한 콘텐츠</b> 
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Profile', params: { user: getName}}">
                <b>프로필</b> 
              </router-link>
            </li>
          </ul>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="isLogin">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" @click.native="logout" to="#">로그아웃</router-link>
              </li>
            </ul>
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name:'Signup'}">회원가입</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name:'Login'}">로그인</router-link>
              </li>
            </ul>
          </b-navbar-nav>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <p></p>
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
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
      this.getUser()
      
    }
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: 'GowunDodum-Regular';
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
