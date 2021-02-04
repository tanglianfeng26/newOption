<template>
  <div id="tabber">
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/tool" icon="cluster-o"
        >工具</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopGoods" icon="bag-o"
        >微商城</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopCars" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/team" icon="friends-o"
        >团队</van-tabbar-item
      >
      <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
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
    this.active = this.activeIndex;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
/deep/.van-tabbar{
  border-top: 0.01rem solid #eee;
height: 1rem;
}
</style>