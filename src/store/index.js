import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieCards: [],
  },
  mutations: {
    LOAD_MOVIE_CARDS: function(state, results) {
      state.movieCards = results
    
    },
    // CREATE_MOVIE: function(state, movieItem){
    //   state.movies.push(movieItem)    
    // },
    // UPDATE_MOVIE_STATUS: function(state, movieItem){
    //   state.movies = state.movies.map(movie => {
    //     if(movie === movieItem){
    //       return {
    //         ...movie,
    //         isCompleted: !movieItem.isCompleted,
    //       }
    //     }
    //     else {
    //       return movie
    //     }
    //   })
    // }
  },
  actions: {
    LoadMovieCards: function({commit}){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
        // params: {
        //   api_key:  'de3308aff80fcad45743238dc9bd4d0d',
        //   language: 'ko-KR',
        // }
      })
        .then((res) => {
          console.log(res)
          commit('LOAD_MOVIE_CARDS', res.data)
        })
    },
    // createMovie: function({commit}, movieItem){
    //   commit('CREATE_MOVIE', movieItem)
    // },
    // updateMovieStatus: function({commit}, movieItem){
    //   commit('UPDATE_MOVIE_STATUS', movieItem)
    // }
  },
  modules: {
  }
})
