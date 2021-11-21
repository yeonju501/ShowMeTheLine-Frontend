<template>
  <div id="app" class = 'text-white bgblack'>
    <b-navbar class="sticky-top bl" toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isLogin">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <b>Home</b>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/movies">
                <b>영화</b>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="liked-movies">

                <b>내가 찜한 콘텐츠</b> 
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
                <router-link class="nav-link" to="/accounts/signup">회원가입</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/accounts/login">로그인</router-link>
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
export default {
  name: 'App',
  data: function() {
    return {
      isLogin: false,
    }
  },
  methods: {

    logout: function() {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Login' })
    }

  },
  created: function () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
