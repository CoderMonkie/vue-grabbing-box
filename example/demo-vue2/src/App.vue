<template>
  <div id="app">
    <grabbing-box
      :maxScale="300"
      :minScale="10"
      :scaleStep="10"
      scaleButtonsPosition="bottom right"
      :scrollSpeed="1"
      :throttleSpan="20"
    >
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </grabbing-box>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  border: 1px solid gray;
}
</style>
