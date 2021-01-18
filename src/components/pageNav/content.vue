<template>
  <div id="content">
      <nav-menu />
      <nav-content />
  </div>
</template>

<script>
import navMenu from '../contentList/contentLeft'
import navContent from '../contentList/contentRight'
export default {
    components:{navMenu,navContent}

}
</script>

<style lang="less" scoped>
    #content{
        display: flex;
        height: calc(100%-60px);
        width: 100%;
    }
</style>