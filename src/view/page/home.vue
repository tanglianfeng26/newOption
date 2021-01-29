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
import container from "../pageA/homeList/container";
import tabBer from "../../components/tabber/tabber";
import { Dialog } from "vant";
export default {
  components: {
    tabBer,
    navList,
    container,
    [Dialog.name]: Dialog,
  },
  created() {
    this.firstPD();
  },
  methods: {
    firstPD() {
      if (localStorage["first"] === "yes") {
        Dialog.alert({
          title: "首次登入提示",
          message: `<br/>此项目为纯前端开发，独立完成。使用缓存模拟后端交互，商品信息为固定数据，开发框架为Vue框架，以及vantUI辅助开发。本系统围绕真实商城进行开发，如有疑问或漏洞，可联系微信号TLF1626，感谢您的浏览<br/>作者姓名：唐连锋<br/>手机号：13602712680<br/>开发时间：2021-1-19 17:39:00。<br/>完成时间：2021-1-29 16:55:00。<br/>github地址:<br/>https://github.com/tanglianfeng26/newOption/tree/h5dev`,
          theme: "round-button",
        }).then(() => {
          localStorage["first"] = "no";
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.myHomePage {
  width: 100vw;
  background-color: #f5f5f5;
}
</style>