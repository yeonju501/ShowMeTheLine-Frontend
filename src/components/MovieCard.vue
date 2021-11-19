<template>
<div class="col-12 col-sm-4 py-3">
<div class="card h-100 m-3">
  <div class="h-100">
    <!-- <img style='width: 100%; height: 100%; object-fit: cover' class="img-fluid" :src="'http://image.tmdb.org/t/p/w500/' + movieCard.poster_path" alt="movie_poster"> -->
  </div>
  <div class="card-body">
    <h5 class="card-title fw-bolder">
      {{ movieCard.title }}
    </h5>
    <p class="card-text">{{ movieCard.overview.substr(0,100)+ '...' }}</p>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movieCard: Object
  }
}
</script>

<style>

</style>