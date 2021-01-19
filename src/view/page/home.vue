<template>
  <!-- 首页 -->
  <div id="home">
    home
    <tab-ber :activeIndex="0"/>
  </div>
</template>

<script>
import tabBer from "../../components/tabber/tabber";
export default {
  components: {
    tabBer,
  },
};
</script>

<style lang="less" scoped>
</style>