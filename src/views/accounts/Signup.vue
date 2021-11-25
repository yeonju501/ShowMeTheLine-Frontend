<template>
  <div class="bg-main">
    <div class="container signupdiv ">
      <br><br><br>
    <h1 class="text-left"><b>회원가입</b></h1>
    <br>
    <br>
    <div class="form-group">
      <!-- <label for="username">사용자 이름</label> -->
      <input class="form-control" type="text"  style = "width:350px;" 
        id="username" v-model="credentials.username"
        placeholder="아이디">
    </div>
    <br>
    <div class="form-group">
      <!-- <label for="password">비밀번호</label> -->
      <input class="form-control" type="password" style = "width:350px;" 
        id="password" v-model="credentials.password"
        placeholder="비밀번호">
    </div>
    <br>
    <div class="form-group">
      <!-- <label for="passwordConfirmation">비밀번호 확인</label> -->
      <input
        style = "width:350px;"
        class="form-control" 
        type="password" 
        id="passwordConfirmation" 
        v-model="credentials.passwordConfirmation"
        @keyup.enter="signup"
        placeholder="비밀번호 확인"
      >
    </div>
    <br>
    <button class="btn" @click="signup">회원가입</button>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
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

.signupdiv {
  position: absolute;
  top: 52%;
  right: 0%;
  transform: translate(-50% ,-65%);
  border-radius: 20px;
  background-color: rgba(157, 157, 157, 0);
  width: 400px;
  height: 450px;
}
</style>