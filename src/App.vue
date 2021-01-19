<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/rem'
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./assets/style/initPage.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
