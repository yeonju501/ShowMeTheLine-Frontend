<template>
  <div>
    <p>{{follower.username}}</p>
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