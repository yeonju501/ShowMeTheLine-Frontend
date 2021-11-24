<template>

  <v-stepper v-model="e1">
    <!-- 헤더 -->
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 0"
        step="0"
      >
        시작
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        step 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        step 2
      </v-stepper-step>

      <v-divider></v-divider>

       <v-stepper-step
        :complete="e1 > 3"
        step="3"
      >
        step 3
      </v-stepper-step>

      <v-divider></v-divider>

       <v-stepper-step
        :complete="e1 > 4"
        step="4"
      >
        step 4
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="5">
        결과화면
      </v-stepper-step>
    </v-stepper-header>

    <!-- 바디, 각 단계별로 내용 넣어주기 -->
    <!-- 무비리스트를 불러와서 네개씩 슬라이싱해서 각 단계별로 네번 넣어주고 
    마지막 결과화면에 결과카드 불러온거 띄어주기 -->
    <!-- 1 -->
    <v-stepper-items>
      <v-stepper-content step="0" class="container">
        <v-card
          color="grey lighten-1"
          class="row"
        >
       <p>추천을 받으세요</p>
        </v-card>

        <v-btn
          color="dark"
          @click="e1 = 1"
        >
          추천받기
        </v-btn>

      </v-stepper-content>
      <v-stepper-content step="1" class="container">
        <v-card
          color="grey lighten-1"
          class="row"
        >
        <recommend-line-card
        v-for="movieCard in movieCards1"
        :key="movieCard.id"
        :movieCard="movieCard"
        :cardNum="1"
        class="col-md-3 col-sm-6 py-3"
        @selectMovie="selectMovie"
      >
      </recommend-line-card>
        </v-card>
      <!-- 
        <v-btn
        @click="e1 = 0">
          다시하기
        </v-btn> -->

        <v-btn
          color="dark"
          @click="e1 = 2"
        >
          NEXT
        </v-btn>

        
      </v-stepper-content>

      <!-- 2 -->
      <v-stepper-content step="2" class="container">
        <v-card
          color="grey lighten-1"
          class="row"
        >
        <recommend-line-card
        v-for="movieCard in movieCards2"
        :key="movieCard.id"
        :movieCard="movieCard"
        :cardNum="2"
        class="col-md-3 col-sm-6 py-3"
        @selectMovie="selectMovie"
      >
      </recommend-line-card>
        </v-card>

        <v-btn
        @click="e1 = 1">
          PREVIEW
        </v-btn>

        <v-btn
          color="dark"
          @click="e1 = 3"
        >
          NEXT
        </v-btn>
      </v-stepper-content>

      <!-- 3 -->
      <v-stepper-content step="3" class="container">
        <v-card
          color="grey lighten-1"
          class="row"
        >
        <recommend-line-card
        v-for="movieCard in movieCards3"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-md-3 col-sm-6 py-3"
        @selectMovie="selectMovie"
        :cardNum="3"
      >
      </recommend-line-card>
        </v-card>
        <v-btn
        @click="e1 = 2">
          PREVIEW
        </v-btn>

        <v-btn
          color="dark"
          @click="e1 = 4"
        >
          NEXT
        </v-btn>
      </v-stepper-content>

      <!-- 4 -->
      <v-stepper-content step="4" class="container">
        <v-card
          color="grey lighten-1"
          class="row"
        >
        <recommend-line-card
        v-for="movieCard in movieCards4"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-md-3 col-sm-6 py-3"
        @selectMovie="selectMovie"
        :cardNum="4"
      >
      </recommend-line-card>
        </v-card>

        <v-btn
        @click="e1 = 3">
          PREVIEW
        </v-btn>

        <v-btn
          color="dark"
          @click="e1 = 5"
        >
          결과확인
        </v-btn>
      </v-stepper-content>

      <!-- 5 -->
      <v-stepper-content step="5">
        <v-card
          color="grey lighten-1"
          class="row"
        >
        <movie-card
        v-for="movieCard in result"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-md-3 col-sm-6 py-3"
      >
      </movie-card>
        </v-card>

       <!-- <v-btn
        @click="e1 = 4">
          PREVIEW
        </v-btn> -->

        <!-- <v-btn
          color="dark"
          @click="e1 = 0"
        >
          RESET
        </v-btn> -->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from 'axios'
import RecommendLineCard from '@/components/RecommendLineCard.vue'
import MovieCard from './MovieCard.vue'

export default {
  name: 'RecommendSteps',
  components: {
    RecommendLineCard,
    MovieCard,
  },
  data () {
    return {
      e1: 0,
      movieCards1: null,
      movieCards2: null,
      movieCards3: null,
      movieCards4: null,
      result: null,
      selectIds : [],

    }
  },
  methods:{
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
  loadMovieCards: function(){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/recommend/line/',
      headers: this.setToken(),

    })
      .then((res) => {
        console.log(res.data)
        const result = []
        for(let i=0; i<res.data.length; i+=4){
          result.push(res.data.slice(i, i+4))
        }
        this.movieCards1 = result[0]
        this.movieCards2 = result[1]
        this.movieCards3 = result[2]
        this.movieCards4 = result[3]
      })
      .catch(err => console.log(err))
  },
  sendResult: function(){
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/movies/recommend/line/result/',
      data: this.selectIds,
      headers: this.setToken(),
    }).then((res)=>{
      this.result = res.data
    })
  },
  selectMovie: function(movie_id, card_num) {
    this.selectIds.push(movie_id)
    this.e1 = card_num + 1
    if (card_num === 4) {
      this.sendResult()
      

    }
  }
  }, 


  created: function() {
  if (localStorage.getItem('jwt')){
    this.loadMovieCards()
  } else {
    this.$router.push({name:'Login'})
  }
},
}
</script>