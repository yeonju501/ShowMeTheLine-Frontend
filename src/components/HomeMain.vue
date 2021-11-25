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



</style>