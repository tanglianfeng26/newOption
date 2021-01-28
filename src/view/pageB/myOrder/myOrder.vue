<template>
  <div id="myOrder">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <header-tab
      :listActive="activeIndex"
      @getActiveListIndex="getNavActiveIndex"
    />
    <content-list :content="activeIndex" />
  </div>
</template>

<script>
import headerTab from "../../../components/tabber/headerTab";
import navTitle from "../../../components/navTitle/navtitle";
import contentList from "./contentList";
export default {
  components: {
    navTitle,
    headerTab,
    contentList,
  },
  data() {
    return {
      title: "我的订单",
      rightIcon: "",
      activeIndex: 0,
    };
  },
  watch: {
    // activeIndex(val) {
    // this.init()
    // },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.activeIndex = this.$route.query.activeIndex;
      console.log("activeIndex", this.activeIndex);
    },
    handleTool() {},
    getNavActiveIndex(v) {
      this.activeIndex = v;
    },
  },
};
</script>

<style lang="less" scoped>
</style>