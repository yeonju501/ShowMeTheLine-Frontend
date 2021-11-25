<template>
  <!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button> -->

<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <MovieDetail
          :movie_pk="this.movie.id"
        />
      </div>

    </div>
  </div>
</div>
</template>

<script>
import MovieDetail from '../components/MovieDetail.vue'
export default {
  name: 'Modal',
  components: {
    MovieDetail
  },

}

</script>

<style>

</style>