<template>
  <div class="home-main" >
    여기에 명대사 이미지랑 버튼 

  <!-- Button trigger modal -->
  <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
    골라골라
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

    
    
  </div>
</template>

<script>
export default {
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