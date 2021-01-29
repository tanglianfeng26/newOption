<template>
  <div id="myAssets">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="top_box">
        <div class="title">记账余额</div>
        <div class="price">￥{{ price }}</div>
      </div>
      <div class="content_box">
        <div class="btn_addPrice">
          <div @click="jump_addPrice"><i class="icon">+</i> 充帐</div>
          <div @click="jump_reducePrice"><i class="icon">-</i> 减帐</div>
        </div>
        <div class="my_account tpey" @click="my_accounting">
          <div>记账记录</div>
          <div class="i_w"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Toast } from "vant";
export default {
  components: {
    navTitle,
  },
  data() {
    return {
      title: "我的资产",
      rightIcon: "",
      price: localStorage["price"],
    };
  },
  methods: {
    jump_addPrice() {
      this.$router.push({
        name: "addPrice",
      });
    },
    jump_reducePrice() {
      this.$router.push({
        name: "reducePrice",
      });
    },
    handleTool() {},
    my_accounting() {
      this.$router.push({
        name: "accountingRecords",
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__content {
  background-color: #1e87fe;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
/deep/.van-nav-bar__text {
  color: #fff;
}
/deep/.van-nav-bar__title {
  color: #cde5ff;
}
#myAssets {
  background-color: #fff;
  height: 100vh;
}
.big_box {
  .top_box {
    height: 3rem;
    background: #1e87fe;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 0.4rem;
    color: #fff;
    .title {
      font-size: 0.24rem;
      color: #cde5ff;
      margin-bottom: 0.16rem;
    }
    .price {
      font-size: 0.48rem;
    }
  }
  .content_box {
    margin-top: -0.86rem;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.42rem 0.24rem 0rem;
    border-radius: 0.16rem 0.16rem 0rem 0rem;
    .btn_addPrice {
      height: 0.88rem;
      display: flex;
      align-items: center;
      background-color: #f9f9f9;
      justify-content: space-around;
      font-size: 0.28rem;
      color: #333;
      margin-bottom: 0.4rem;
    }
  }
}
.tpey {
  height: 1rem;
  padding: 0rem 0.2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 0.01rem solid #f2f2f2;
  color: #333;
  font-size: 0.3rem;
  justify-content: space-between;

  .i_w {
    width: 0.13rem;
    height: 0.13rem;
    border: 0.02rem solid #9b9b9b;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg);
  }
}
.icon {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.26rem;
  text-align: center;
  border-radius: 50%;
  font-style: normal;
  background: linear-gradient(180deg, #feba5a 0%, #ff6c6e 100%);
  color: #fff;
  font-weight: 500;
  font-size: 0.3rem;
}
</style>