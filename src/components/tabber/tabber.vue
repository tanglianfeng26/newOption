<template>
  <div id="tabber">
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/tool" icon="search">工具</van-tabbar-item>
      <van-tabbar-item replace to="/team" icon="friends-o"
        >团队</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine" icon="setting-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from "vant";
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  props: ["activeIndex"],
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
      this.active = this.activeIndex
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>