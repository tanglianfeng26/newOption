<template>
  <div id="goods">
    <search-tab @searchContent="receive" :input_content="placeholder" />
    <classification-goods @addPrice="getAddPrice" />
    <foot-tabber :addNum="addPriceS" :numGoods="numGoods" @showTC="showT"  @toPay="ToPay" />
    <van-action-sheet v-model="show" title="已选商品">
      <div class="content" v-for="(item, index) in goodsCarList" :key="index">
        <div class="left_logo">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="left">
          <h4>{{ item.title }}</h4>
          <p>合计：￥{{ item.price * item.goodsIndex }}</p>
        </div>
        <div class="right">
          <van-stepper
            v-model="item.goodsIndex"
            :max="item.inventory"
            @change="onChange(item)"
            integer
          />
          <van-icon class="del" name="delete-o" @click="del_goods(item.ID)" />
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import searchTab from "../../../components/searchTab/searchTab";
import classificationGoods from "./classificationGoods";
import footTabber from "../../../components/footTabber/footTabber";
import { ActionSheet, Stepper, Toast, Icon } from "vant";

export default {
  components: {
    searchTab,
    classificationGoods,
    footTabber,
    [ActionSheet.name]: ActionSheet,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
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
    ToPay(){
      if(this.goodsCarList.length == 0) {
        Toast("请添加商品");
        return;
      }
      this.$router.push({
        name: "settlement",
        query:{
          details: JSON.stringify(this.goodsCarList)
        }
      })
    },
    async del_goods(option) {
      const waitMe = await this.witeME();
      this.goodsCarList = this.goodsCarList.filter((item) => {
        return item.ID !== option;
      });
      this.onChange();
      if (this.goodsCarList.length == 0) {
        this.show = false;
      }
    },
    async onChange(v) {
      //   this.goodsCarList.some((item) => {
      //     if (item.ID == v.ID) {
      //       return item.goodsIndex == v.goodsIndex;
      //     }
      //   });
      const waitMe = await this.witeME();
      this.numGoods = 0;
      this.addPriceS = 0;
      this.goodsCarList.forEach((item) => {
        this.numGoods += item.goodsIndex;
        this.addPriceS += parseFloat(item.price) * item.goodsIndex;
      });
    },
    showT() {
      if (this.goodsCarList.length == 0) {
        Toast("请添加商品");
        return;
      }
      this.show = true;
    },
    receive(option) {
      if (option.length === 0) {
        Toast("请输入商品名称搜索");
        return;
      }
      Toast.fail("功能未开启");
      return;
    },
    async getAddPrice(v) {
      const waitMe = await this.witeME();
      var self = this;
      var result = this.goodsCarList.some((item) => {
        if (item.ID == v.ID) {
          return item.goodsIndex++;
        }
      });
      if (!result) {
        v.goodsIndex = 1;
        this.goodsCarList.push(v);
      }
      this.numGoods = 0;
      this.goodsCarList.forEach((item) => {
        this.numGoods += item.goodsIndex;
      });
      console.log(result);
      console.log(this.goodsCarList);
      this.addPriceS = this.addPriceS + parseFloat(v.price);
    },
    witeME() {
      return new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中",
        });
        setTimeout(() => {
          Toast.clear();
          resolve();
        }, 300);
      });
      //   const toast = Toast.loading({
      //     duration: 0, // 持续展示 toast
      //     forbidClick: true,
      //     message: "加载中",
      //   });
      //   setTimeout(() => {
      //       Toast.clear();
      //       resolve()
      //   }, 300);
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
  .left_logo {
    width: 1rem;
    height: 1rem;
    border-radius: 0.08rem;
    margin-right: 0.24rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
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
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    .del {
      margin-left: 0.3rem;
      color: #fff;
      font-size: 0.34rem;
      background-color: #1e87fe;
      border: 0.01rem solid #1e87fe;
      padding: 0.1rem;
      border-radius: 50%;
    }
  }
}
</style>