<template>
  <div class="bg-main">
    <div class="container signupdiv ">
      <br><br><br>
    <h1 class="text-left"><b>회원가입</b></h1>
    <br>
    <br>
    <div class="form-group">
      <!-- <label for="username">사용자 이름</label> -->
      <input class="form-control" type="text"  style = "width:500px;" 
        id="username" v-model="credentials.username"
        placeholder="아이디">
    </div>
    <br>
    <div class="form-group">
      <!-- <label for="password">비밀번호</label> -->
      <input class="form-control" type="password" style = "width:500px;" 
        id="password" v-model="credentials.password"
        placeholder="비밀번호">
    </div>
    <br>
    <div class="form-group">
      <!-- <label for="passwordConfirmation">비밀번호 확인</label> -->
      <input
        style = "width:500px;"
        class="form-control" 
        type="password" 
        id="passwordConfirmation" 
        v-model="credentials.passwordConfirmation"
        @keyup.enter="signup"
        placeholder="비밀번호 확인"
      >
    </div>
    <br>
    <button class="btn btn-dark" @click="signup">회원가입</button>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'Singup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials
        })
        .then(() => {
          // console.log(res)
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => {
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
  height: 1200px;
  content: "";
  background-image: url('https://media.discordapp.net/attachments/867763766396321846/912878610115858432/IMG_9812.jpg?width=833&height=590');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

.signupdiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-65%);
  border-radius: 20px;
  background-color: rgba(157, 157, 157, 0.75);
  width: 550px;
  height: 500px;
}
</style>