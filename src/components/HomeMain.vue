<template>
<RecommendSteps/>
 
</template>

<script>
import RecommendSteps from '../components/RecommendSteps'

export default {
  name: 'HomeMain',
  components: {
    RecommendSteps
  },
  methods: {

    
  },
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