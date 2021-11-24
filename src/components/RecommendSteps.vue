<template>
  <v-stepper v-model="e1">
    <!-- 헤더 -->
    <v-stepper-header>
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
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
        <recommend-line-card
        v-for="movieCard in movieCards"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="col-12 col-sm-4 py-3"
      >
      </recommend-line-card>
        </v-card>
        
        

        <v-btn
        @click="e1 = 1">
          PREVIEW
        </v-btn>

        <v-btn
          color="dark"
          @click="e1 = 2"
        >
          NEXT
        </v-btn>

        
      </v-stepper-content>

      <!-- 2 -->
      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

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
      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

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
      <v-stepper-content step="4">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

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
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

       <!-- <v-btn
        @click="e1 = 4">
          PREVIEW
        </v-btn> -->

        <v-btn
          color="dark"
          @click="e1 = 1"
        >
          RESET
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
// import axios from 'axios'
import RecommendLineCard from '@/components/RecommendLineCard.vue'

export default {
  name: 'RecommendSteps',
  components: {
    RecommendLineCard
  },
  data () {
    return {
      e1: 1,
      movieCards: null,
    }
  },
  methos:{
    setToken: function () {
    const token = localStorage.getItem('jwt')
    const config = {
      Authorization: `JWT ${token}`
    }
    return config
  },
  // loadMovieCards: function(){
  //   axios({
  //     method: 'get',
  //     url: 'http://127.0.0.1:8000/movies/recommend/line/',
  //     headers: this.setToken(),

  //   })
  //     .then((res) => {
  //       const temp = []
  //       res.data.forEach(function(element){
  //         temp.push(element)
  //       })
  //       this.movies = temp
  //     })
  //     .catch(err => console.log(err))
  // },
  }, 


  created: function() {
  if (localStorage.getItem('jwt')){
    // this.loadMovieCards()
  } else {
    this.$router.push({name:'Login'})
  }
},
}
</script>