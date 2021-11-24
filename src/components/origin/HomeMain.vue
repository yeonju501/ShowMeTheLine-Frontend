<template>
  <div class="home-main" >
    여기에 명대사 이미지랑 버튼 

  <!-- Button trigger modal -->
  <b-modal 
      ref="detail" 
      size="xl" 
      hide-header
      hide-footer
      
      :header-bg-variant="black"
      :body-bg-variant="black"
      :body-text-variant="black"
      :footer-bg-variant="black"
      >
        <line-recommend
          :movie_pk="this.movie.id"
        />
      </b-modal>


  <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
    골라골라
  </button>

  <!-- Modal -->

    
    
  </div>
</template>

<script>
import LineRecommend from '../components/LineRecommend.vue'
export default {
  components: { LineRecommend },
  name: 'HomeMain',
    data: function () {
      return {}
    },
  methods: {

  }
}

</script>

<style>
  .home-main {
        margin-top: 0px; 
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgb(129, 129, 129);
    }
</style>