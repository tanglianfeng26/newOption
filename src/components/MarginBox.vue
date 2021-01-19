<template>
  <div id="MarginBox">
    <nav-tabber />
    <page-centent />
  </div>
</template>

<script>
import navTabber from "./pageNav/nav";
import PageCentent from "./pageNav/content";
export default {
  name: "MarginBox",
  components: { navTabber, PageCentent },
};
</script>

<style lang="less" scoped>
#MarginBox{
  height: 100vh;
}
</style>