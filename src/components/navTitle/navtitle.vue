<template>
  <div id="navtitle">
    <van-nav-bar
      :title="navTitle"
      left-text="返回"
      left-arrow
      fixed
      @click-left="backUp"
      @click-right="navFun"
    >
      <van-icon v-if="rightTitle !== ''" :name="rightTitle" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon, } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  props: ["title", "navRight"],
  data() {
    return {
      navTitle: "标题",
      rightTitle: "",
    };
  },
  mounted() {
    this.navTitle = this.title;
    this.rightTitle = this.navRight;
  },
  methods: {
    backUp() {
      this.$router.go(-1);
    },
    navFun() {
      this.$emit("changeTool")
    },
  },
};
</script>

<style lang="less" scoped>
#navtitle {
  height: 0.84rem;
}
/deep/ .van-nav-bar__content {
  height: 0.84rem;
}
/deep/ .van-nav-bar__right {
  font-size: 0.4rem;
}
</style>