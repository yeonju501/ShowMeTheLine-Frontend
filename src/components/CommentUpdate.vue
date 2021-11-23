<template>
  <form @submit="가제">
      <div class="form-group">
        <label for="content">내용수정</label>
        <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
export default {
  name: 'CommentUpdate',
}
</script>

<style>

</style>