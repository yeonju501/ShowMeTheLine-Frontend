<template>
  <div class="bg-main">
    <div class="container logindiv">
      <br><br><br>
      <h1 class = "text-left"><b>LOGIN</b></h1>
      <br>
      <div class="form-group">
        <!-- <label for="username">사용자 이름</label> -->
        <input class="form-control" type="text" style = "width:350px;"
        id="username" placeholder = "ID" v-model="credentials.username">
      </div>
      <br>
      <div class="form-group">
        <!-- <label for="password">비밀번호</label> -->
        <input style = "width:350px;"
          placeholder="PASSWORD"
          class="form-control" 
          type="password" 
          id="password" 
          v-model="credentials.password"
          @keypress.enter="login"
        >
      </div>
      
      <br>
      <button class="btn " @click="login">LOGIN</button>
      
     
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
       .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.$store
          .dispatch("login", {
            username: this.username,
          })
        this.$emit('Login')
        this.$router.push({ name: 'Home' })        
       })
       .catch(err => {
         console.log(err)
       })
    }
  }
}
</script>
<style scoped>
.bg-main {
  width: 100%;
  height: 1000px;
  position: relative;
  margin-bottom: 250px;
  z-index: 1;
  
  
}
.bg-main::after {
  width: 100%;
  height: 1029px;
  content: "";
  background-image: url('https://cdn.discordapp.com/attachments/867763766396321846/913125158464675911/5.jpg');
  background-size: 1800px;
  background-repeat: no-repeat;
  position: absolute;
  top: 1;
  left: 0;
  z-index: -2;
  opacity: 0.9;
}

.logindiv {
  position: absolute;
  top: 57%;
  right: 0%;
  transform: translate(-50% ,-65%);
  border-radius: 20px;
  background-color: rgba(157, 157, 157, 0);
  width: 400px;
  height: 450px;
}
</style>