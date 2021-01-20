<template>
  <div id="navtab">
    <van-tabs
      v-model="active"
      swipeable
      background="#f5f5f5"
      title-active-color="#1e87fe"
      color="#1e87fe"
      :ellipsis="false"
    >
      <van-tab v-for="(item, index) in navTitle" :key="index" :title="item.title">
        <div class="big_box">
          <div class="ty">
            <ve-ring :data="item.chartData" height="7rem"></ve-ring>
          </div>
          <div class="ty" style="padding: 0rem 0.3rem">
            <div class="_level" v-for="(i,k) in item.chartData.rows" :key="k">
              <div class="color_header">{{i.级别}}</div>
              <div class="color_num">{{i.直属}}</div>
            </div>
          </div>
        </div>
      </van-tab>
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
  data() {
    return {
      active: 0,
      navTitle: [
        {
          title: "唐适面膜",
          chartData: {
            columns: ["级别", "直属"],
            rows: [
              { 级别: "总经销商", 直属: 8 },
              { 级别: "一级经销商", 直属: 18 },
              { 级别: "二级经销商", 直属: 31 },
              { 级别: "三级经销商", 直属: 48 },
              { 级别: "四级经销商", 直属: 64 },
            ],
          },
        },
        {
          title: "唐适护肤",
          chartData: {
            columns: ["级别", "直属"],
            rows: [
              { 级别: "总经销商", 直属: 7 },
              { 级别: "一级经销商", 直属: 15 },
              { 级别: "二级经销商", 直属: 21 },
              { 级别: "三级经销商", 直属: 22 },
              { 级别: "四级经销商", 直属: 33 },
            ],
          },
        },
        {
          title: "唐适洗护",
          chartData: {
            columns: ["级别", "直属"],
            rows: [
              { 级别: "总经销商", 直属: 5 },
              { 级别: "一级经销商", 直属: 12 },
              { 级别: "二级经销商", 直属: 20 },
              { 级别: "三级经销商", 直属: 24 },
              { 级别: "四级经销商", 直属: 34 },
            ],
          },
        },
        {
          title: "唐适大健康",
          chartData: {
            columns: ["级别", "直属"],
            rows: [
              { 级别: "总经销商", 直属: 2 },
              { 级别: "一级经销商", 直属: 12 },
              { 级别: "二级经销商", 直属: 16 },
              { 级别: "三级经销商", 直属: 19 },
              { 级别: "四级经销商", 直属: 30 },
            ],
          },
        },
        {
          title: "唐适新能源",
          chartData: {
            columns: ["级别", "直属"],
            rows: [
              { 级别: "总经销商", 直属: 15 },
              { 级别: "一级经销商", 直属: 18 },
              { 级别: "二级经销商", 直属: 36 },
              { 级别: "三级经销商", 直属: 49 },
              { 级别: "四级经销商", 直属: 80 },
            ],
          },
        },
      ],
    };
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tabs__wrap {
  margin-bottom: 0.06rem;
}
#navtab{
    min-height: 100vh;
    box-sizing: border-box;
    padding-bottom: 1.1rem;
}
.big_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
._level {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.98rem;
  border-bottom: 0.02rem solid #eee;
  .color_num {
    color: #999999;
    font-size: 0.28rem;
  }
  .color_header {
    font-size: 0.28rem;
    color: #333;
  }
}
.ty {
  margin-top: 0.24rem;
  background-color: #fff;
  border-radius: 0.16rem;
  width: 7rem;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  padding: 0.3rem;
}
</style>