<template>
  <!-- 首页 -->
  <div id="home">
    <div class="myHomePage">
      <nav-list />
      <container />
    </div>
    <tab-ber :activeIndex="0" />
  </div>
</template>

<script>
import navList from "../pageA/homeList/nav";
import container from "../pageA/homeList/container"
import tabBer from "../../components/tabber/tabber";
export default {
  components: {
    tabBer,navList,container,
  },
};
</script>

<style lang="less" scoped>
.myHomePage {
  width: 100vw;
  background-color: #f5f5f5;
}
</style>