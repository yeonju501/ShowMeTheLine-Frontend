<template>
  <v-card 
    class="mx-auto m-3 col-12 col-sm-4 py-3"
    max-width="300"
  >
    <!-- <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img> -->

    <h3 class="d-flex justify-content-center mt-4">
      <b>{{ review.movie.title }}</b>
    </h3>

    <v-card-text>
      <div class="d-flex justify-content-center">
      <star-rating 

      v-bind:increment="0.5"
      v-bind:max-rating="5"
      v-bind:rating="getRating"
      v-bind:show-rating="false"
      v-bind:read-only="true"
      inactive-color="#000"
      active-color="#ffd700"

      v-bind:padding="8"
      v-bind:border-width="2"
      v-bind:star-size="15">
      </star-rating>
      </div>
      <div><h5 class="mt-2"><b>{{ review.content }}</b></h5></div>
      <div><h6>{{ review.updated_at.slice(0,10)}}</h6></div>
      <div><h6>{{ review.updated_at.slice(11,19)}}</h6></div>
      
    </v-card-text>
  </v-card>
</template>

<script>
import StarRating from 'vue-star-rating'

  export default {
    name: 'ProfileReview',
    components: {
      StarRating
    },
    props : {
      review : Object,
    },
    computed: {
      getRating() {
      return this.review.rank / 2
    },
    },
  }
</script>