<template>
  <div>
    <h4>{{follower.username}}</h4>
  </div>
</template>

<script>
export default {
  name: 'ProfileFollow', 
  props: {
    follower:Object
  }

}
</script>

<style>

</style>