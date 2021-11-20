import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    
    movieCards: [],
    movieList: [],
    genreList: [],
  },

  mutations: {
    LOAD_MOVIE_CARDS: function(state, results) {
      state.movieCards = results
    },
  },

  actions: {
    // getToken: function (context) {
    //   const token = localStorage.getItem('jwt-token');
    //   context.commit('TOKEN', token);
    },

    LoadMovieCards: function({commit}, token){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
        headers: token
        // params: {
        //   api_key:  'de3308aff80fcad45743238dc9bd4d0d',
        //   language: 'ko-KR',
        // }
      })
        .then((res) => {
          console.log(res)
          commit('LOAD_MOVIE_CARDS', res.data)
        })
        .catch(err => console.log(err))
    },

  modules: {
  }
})
