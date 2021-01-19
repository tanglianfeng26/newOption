<template>
  <!-- 我的 -->
  <div id="mine">
    mine
    <tab-ber :activeIndex="3" />
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