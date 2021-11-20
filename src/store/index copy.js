import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import jwt_decode from "jwt-decode"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    jwtToken: '',
    API_ENDPOINT: 'http://127.0.0.1:8000/',
    movieCards: [],
    movieList: [],
    genreList: [],
    nowMovie: null,
    recommendedMovies: null,
  },
  mutations: {
    LOAD_MOVIE_CARDS: function(state, results) {
      state.movieCards = results
    },
    TOKEN: function (state, jwtToken) {
      if (jwtToken) {
        state.jwtToken = jwtToken;
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    LOGIN: function (state, data) {
      state.jwtToken = data.token;
      localStorage.setItem('jwt-token', data.token);
      state.isLogin = true;
    },
    LOGOUT: function (state) {
      state.isLogin = false;
      state.jwtToken = '';
    },
    SET_MOVIE_LIST (state, data) {
      state.movieList = data;
    },
    SET_GENRE_LIST (state, data) {
      state.genreList = data;
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
        headers: this.setToken()
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
