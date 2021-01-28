<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/rem";
export default {
  name: "App",
  watch: {
    $route: "routerChange",
  },
  mounted(){
    if(localStorage["price"] === undefined){
    localStorage["price"]= 5000;
    }
  },
  methods: {
    routerChange(to, from) {
      if (to.name === "share") {
        return;
      } else {
        if (localStorage.getItem("phone") == null) {
          this.$router.push({
            name: "login",
          });
        } else {
          return;
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "./assets/style/initPage.less";
::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: PingFang-SC-Medium, PingFang-SC;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
