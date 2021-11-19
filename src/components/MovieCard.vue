<template>
<div class="col-12 col-sm-4 py-3">
  <div class="card h-100 m-3">
    <div class="h-100">
      <img style='object-fit: cover' class="img-fluid" :src="'https://image.tmdb.org/t/p/w300/' + movieCard.poster_path" alt="movie_poster">
    </div>
    <div class="card-body">
      <h5 class="card-title fw-bolder">
        {{ movieCard.title }}
      </h5>
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