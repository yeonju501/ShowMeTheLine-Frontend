<template>
  <div class="bg-main">
    <div class="container logindiv">
      <br><br><br>
      <h1 class = "text-left"><b>로그인</b></h1>
      <br>
      <div class="form-group">
        <!-- <label for="username">사용자 이름</label> -->
        <input class="form-control" type="text" style = "width:500px;"
        id="username" placeholder = "아이디" v-model="credentials.username">
      </div>
      <br>
      <div class="form-group">
        <!-- <label for="password">비밀번호</label> -->
        <input style = "width:500px;"
          placeholder="비밀번호"
          class="form-control" 
          type="password" 
          id="password" 
          v-model="credentials.password"
          @keypress.enter="login"
        >
      </div>
      <br>
      <button class="btn btn-dark" @click="login">로그인</button>
      
     
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import axios from 'axios'

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
  height: 1000px;
  content: "";
  background-image: url('https://mblogthumb-phinf.pstatic.net/MjAxOTA4MTNfMyAg/MDAxNTY1NjIyNzg5NzA3.GJapz2neGaqR5EPF5T8Q7dz9eR4Nm5xlSeopExX4QDAg.3_nqIoXMxEX2_rW_8AEXkBHDXKj1HWx8lkQlL_pWI3Qg.JPEG.asforlove/inCollage_20190812_235741800.jpg?type=w800');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

.logindiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-65%);
  border-radius: 20px;
  background-color: rgba(157, 157, 157, 0.75);
  width: 550px;
  height: 400px;
}
</style>