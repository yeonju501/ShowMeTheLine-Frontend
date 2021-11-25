<template>
  <v-card 
    class="mx-auto m-3 col-12 col-sm-4 py-3"
    max-width="300"
  >

    <div class="container align-item-center">
    <div class="d-flex justify-content-center center"  style="font-size:19px;">
      <b>{{ review.movie.line }}</b>
    </div>
    <div class="d-flex justify-content-end center">
      <b>- {{ review.movie.title }}</b>
    </div>
    </div>

  </v-card>
</template>

<script>

  export default {
    name: 'ProfileReview',
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

<style>
  .center {
    vertical-align: middle;
    text-align: center;
  }
</style>