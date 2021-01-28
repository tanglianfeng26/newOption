<template>
  <div id="orderList">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div v-if="orderList.length === undefined">
        <van-empty description="暂无兑换记录" />
      </div>
      <div
        class="orderBox"
        v-else
        v-for="(item, index) in orderList"
        :key="index"
      >
        <div class="nav">
          <div class="code">订单号：{{ item.wordID }}</div>
          <div class="status">待发货</div>
        </div>
        <div class="center" @click="jump_order(item.wordID)">
          <div class="goodsImg">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="goodsText">
            <h4>{{ item.title }}</h4>
            <p>{{ item.note }}</p>
            <div class="footer">
              <div>{{ item.price }}积分</div>
              <div>x1</div>
            </div>
          </div>
        </div>
        <div class="allPrice">
          共1件，合计：<span style="color: #333; font-weight: 600"
            >{{ item.price }}积分</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty } from "vant";
export default {
  components: {
    navTitle,
    [Empty.name]: Empty,
  },
  data() {
    return {
      title: "积分兑换记录",
      rightIcon: "",
      orderList: {},
    };
  },
  created() {
    if (localStorage["pointsList"] !== undefined) {
      this.orderList = JSON.parse(localStorage["pointsList"]);
    }
  },
  methods: {
    handleTool() {},
    jump_order(v) {
      this.$router.push({
        name: "detailsPages",
        query: {
          code: v,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  padding: 0rem 0.24rem 0.24rem;
  box-sizing: border-box;
  .orderBox {
    background-color: #fff;
    border-radius: 0.16rem;
    margin-top: 0.2rem;
    .nav {
      display: flex;
      align-items: center;
      padding: 0rem 0.24rem;
      box-sizing: border-box;
      height: 0.88rem;
      border-bottom: 0.01rem solid #eee;
      justify-content: space-between;
      font-size: 0.26rem;
      color: #333;
      .status {
        color: #1451a0;
        font-weight: bold;
      }
    }
    .center {
      padding: 0.3rem 0.24rem;
      box-sizing: border-box;
      border-bottom: 0.01rem solid #eee;
      display: flex;
      .goodsImg {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsText {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        h4 {
          font-weight: 500;
          font-size: 0.28rem;
          color: #000;
          //   margin-bottom: 0.12rem;
        }
        p {
          font-size: 0.24rem;
          //   margin-bottom: 0.2rem;
          color: #333;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.28rem;
        }
      }
    }
    .allPrice {
      height: 0.92rem;
      color: #999;
      font-size: 0.26rem;
      padding: 0rem 0.24rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 500;
    }
  }
}
</style>