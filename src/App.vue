<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/rem";
export default {
  name: "App",
};
</script>

<style lang="less">
@import "./assets/style/initPage.less";
#app {
  font-family: PingFang-SC-Medium, PingFang-SC;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
