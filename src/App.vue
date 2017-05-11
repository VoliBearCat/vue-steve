<template>
  <div id="app">
    <Steve skinUrl="./static/technologist.png"></Steve>
  </div>
</template>

<script>
import Steve from './components/Steve'

export default {
  name: 'app',
  components: {
    Steve
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  background: #666;
  text-align: center;
}
</style>