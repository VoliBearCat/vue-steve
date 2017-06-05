<template>
  <div id="app">
    <Steve skinUrl="./static/technologist.png" followMouseMode="window-scope"></Steve>
    <Steve skinUrl="./static/KiritoGamer.png" followMouseMode="window-scope"></Steve>
    <Steve followMouseMode="window-scope" rotationX="-20"></Steve>
    <Steve skinUrl="./static/technologist.png" followMouse="false" scale="0.6"></Steve>
    <Steve skinUrl="./static/technologist.png" followMouseMode="window-scope" walkable="false" rotationX="45" rotationY="45"></Steve>
    <Steve skinUrl="./static/technologist.png" followMouseMode="window-scope" pace="0.3" speed="1"></Steve>
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
}
</style>