<template>
  <div id="headerTab">
    <van-tabs
      v-model="active"
      @click="change"
      title-active-color="#1E87FE"
      color="#1e87fe"
      swipeable
    >
      <van-tab
        v-for="(item, index) in navList"
        :key="index"
        :title="item"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: ["listActive"],
  data() {
    return {
      navList: [
        "全部",
        "待审核",
        "待发货",
        "待收货",
        "调货",
        "调货结束",
        "已完成",
        "审核失败",
      ],
      active: 0,
    };
  },
  watch: {
    listActive: "init",
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.active = this.listActive;
    },
    change(v) {
      this.active = v;
      this.$emit("getActiveListIndex", v);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabs--line .van-tabs__wrap {
  height: 0.88rem;
}
</style>