<template>
  <!-- 团队 -->
  <div id="team">
    <nav-tab />
    <tab-ber :activeIndex="2" />
  </div>
</template>

<script>
import navTab from "../../components/tabber/navtab"
import tabBer from "../../components/tabber/tabber";
export default {
  components: {
    tabBer,navTab
  },
};
</script>

<style lang="less" scoped>
#team{
    background-color: #F5F5F5;
}
</style>