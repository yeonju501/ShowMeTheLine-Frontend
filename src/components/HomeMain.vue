<template>
<div>
  <div class=" bg-image">
    <div class="neon">Show me the line</div>
  </div>
<RecommendSteps/>
</div>
</template>

<script>
import RecommendSteps from '../components/RecommendSteps'

export default {
  name: 'HomeMain',
  components: {
    RecommendSteps
  },
  methods: {

    
  },
}
</script>

<style>
@import url('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css');

.neonText {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
}
body {
  width: 100%;
  height: 100%;
  
  background-color: black;
}

@font-face {
  font-family: moon;
  src: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/707108/moon.ttf);
}

.bg-image {
  
  width: 100%;
  margin: 30px;
  /* background-image: url('https://media.discordapp.net/attachments/867763766396321846/913174801902874624/bg3.png?width=1800&height=115'); */
}

.container {
  
  margin: 20px;
  text-align: center;
  vertical-align: center;
}

.neon {
  font-family: moon;
  color: #FB4264;
  font-size: 7vw;
  line-height: 7vw;
  text-shadow: 0 0 3vw #F40A35;
}

.flux {
  font-family: neon;
  color: #426DFB;
  font-size: 9vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #2356FF;
}

.neon {
  animation: neon 1s ease infinite;
  -moz-animation: neon 1s ease infinite;
  -webkit-animation: neon 1s ease infinite;
}

@keyframes neon {
  0%,
  100% {
    text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #FED128;
  }
  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
    color: #806914;
  }
}

.flux {
  animation: flux 2s linear infinite;
  -moz-animation: flux 2s linear infinite;
  -webkit-animation: flux 2s linear infinite;
  -o-animation: flux 2s linear infinite;
}

@keyframes flux {
  0%,
  100% {
    text-shadow: 0 0 1vw #1041FF, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280;
    color: #28D7FE;
  }
  50% {
    text-shadow: 0 0 .5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940;
    color: #146C80;
  }
}

</style>