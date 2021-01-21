<template>
  <div id="goods">
    <search-tab @searchContent="receive" :input_content="placeholder" />
    <classification-goods @addPrice="getAddPrice" />
    <foot-tabber :addNum="addPriceS" :numGoods="numGoods" @showTC="showT" />
    <van-action-sheet v-model="show" title="已选商品">
      <div class="content" v-for="(item, index) in goodsCarList" :key="index">
        <div class="left">
          <h4>{{ item.title }}</h4>
          <p>合计：￥{{ item.price }}</p>
        </div>
        <div class="right"><van-stepper v-model="numGoods" /></div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import searchTab from "../../../components/searchTab/searchTab";
import classificationGoods from "./classificationGoods";
import footTabber from "../../../components/footTabber/footTabber";
import { ActionSheet, Stepper } from "vant";

export default {
  components: {
    searchTab,
    classificationGoods,
    footTabber,
    [ActionSheet.name]: ActionSheet,
    [Stepper.name]: Stepper,
  },
  data() {
    return {
      placeholder: "输入商品名称搜索",
      addPriceS: 0,
      show: false,
      numGoods: 0,
      numIndex: 27,
      goodsCarList: [],
      list: [],
    };
  },
  methods: {
    showT() {
      this.show = true;
    },
    receive(option) {
      console.log(option);
    },
    getAddPrice(v) {
      var self = this;
      this.goodsCarList.push(v)
        var a = this.goodsCarList.filter((item,index) => {
            return item.ID == v.ID
        })
        console.log(a);

      this.addPriceS = this.addPriceS + parseFloat(v.price);
      this.numGoods++;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  padding-bottom: 1rem;
}
.content {
  padding: 0.3rem 0.28rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    h4 {
      margin-bottom: 0.08rem;
      font-size: 0.28rem;
      color: #333;
      font-weight: 500;
    }
    p {
      font-size: 0.24rem;
      color: #999;
    }
  }
}
</style>