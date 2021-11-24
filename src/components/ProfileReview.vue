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

    <h1 class="d-flex justify-content-center mt-4">
      {{ review.movie }}
    </h1>

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
      v-bind:star-size="15"
      @rating-selected="setRating">
      </star-rating>
      </div>
      <div><h4 class="mt-3"><b>{{ review.content }}</b></h4></div>
      <div><h7>{{ review.updated_at.slice(0,10)}}</h7></div>
      <div><h7>{{ review.updated_at.slice(11,19)}}</h7></div>
      
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