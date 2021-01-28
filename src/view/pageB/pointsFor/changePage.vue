<template>
  <div id="changePage">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="nav_LogoBox">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%A0%87%E9%A2%98@2x3.png"
          alt=""
        />
      </div>
      <div class="title_jf">当前记账：{{ query_price }}</div>
      <div class="orderSlist" v-for="(item, index) in pointsList" :key="index">
        <div class="goodsImg">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="goodsInfo">
          <h4>{{ item.title }}</h4>
          <p class="note">{{ item.note }}</p>
          <p class="jfPrice">{{ item.price }}积分</p>
          <div class="btn_newGet" @click="jump_get(item)"></div>
        </div>
      </div>
      <div class="jump_orderList" @click="orderListAll">查看兑换记录</div>
      <div class="title"></div>
      <div class="fwText">兑换需要扣除记账余额<br />如余额不足，请前往充帐</div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
export default {
  components: {
    navTitle,
  },
  data() {
    return {
      title: "积分兑换",
      rightIcon: "",
      query_price: 0,
      pointsList: [
        {
          ID: 1,
          price: 5000,
          title: "iPhone 12",
          note: "256G",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E4%BA%A7%E5%93%811@2x.png",
        },
        {
          ID: 2,
          price: 2500,
          title: "摩托车",
          note: "125CC",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E4%BA%A7%E5%93%812@2x.png",
        },
      ],
    };
  },
  mounted() {
    this.query_price = Number(localStorage["price"]);
  },
  methods: {
    handleTool() {},
    jump_get(v) {
      this.$router.push({
        name: "acceptPotions",
        query: {
          option: JSON.stringify(v),
        },
      });
    },
    orderListAll() {
      this.$router.push({
        name: "orderList"
      })
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/bg@2x3.png")
    no-repeat center;
  background-size: cover;
  width: 100%;
  min-height: 94.7vh;
  overflow: auto;
  .nav_LogoBox {
    width: 5.9rem;
    height: 2.42rem;
    margin-top: 0.9rem;
    img {
      width: 100%;
      height: 90%;
    }
  }
  .title_jf {
    width: 4.06rem;
    height: 0.68rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E5%BD%93%E5%89%8D%E7%A7%AF%E5%88%86@2x.png")
      no-repeat center;
    background-size: 4.06rem 0.68rem;
    margin-top: 0.2rem;
    margin-bottom: 1.44rem;
    line-height: 0.6rem;
    text-align: center;
    color: #231716;
    font-size: 0.32rem;
  }
  .jump_orderList {
    margin-bottom: 0.3rem;
    color: #333;
    font-weight: 500;
    font-size: 0.28rem;
    width: 3rem;
    border-radius: 0.34rem;
    text-align: center;
    padding: 0.1rem 0rem;
    opacity: 0.8;
    background: linear-gradient(316deg, #e7c043 0%, #fdee86 42%, #9f6c1c 100%);
    box-shadow: 0.01rem 0.01rem 0.1rem 0.02rem rgba(231, 192, 67, 0.5);
  }
  .orderSlist {
    width: 6.22rem;
    height: 2.4rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E5%BA%95@2x.png")
      no-repeat center;
    background-size: 6.22rem 2.4rem;
    padding: 0.2rem 0.42rem 0.28rem;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    margin-bottom: 0.7rem;
    .goodsImg {
      width: 1.92rem;
      height: 1.92rem;
      margin-right: 0.66rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goodsInfo {
      h4 {
        font-size: 0.34rem;
        font-weight: 500;
      }
      .note {
        margin: 0.08rem 0rem 0.04rem;
        font-size: 0.24rem;
      }
      .jfPrice {
        font-size: 0.3rem;
        margin-bottom: 0.04rem;
      }
      .btn_newGet {
        width: 1.86rem;
        height: 0.64rem;
        background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%AB%8B%E5%8D%B3%E5%85%91%E6%8D%A2@2x.png")
          no-repeat center;
        background-size: 1.86rem 0.64rem;
      }
    }
  }
  .title {
    width: 6.22rem;
    height: 0.84rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9@2x.png")
      no-repeat center;
    background-size: 6.22rem 0.36rem;
  }
  .fwText {
    width: 6.1rem;
    padding: 0.4rem;
    box-sizing: border-box;
    background: linear-gradient(135deg, #031630 0%, #011666 100%);
    border-radius: 0.16rem;
    margin-bottom: 0.6rem;
    color: #fcffb3;
    font-size: 0.24rem;
    opacity: 0.8;
    line-height: 0.4rem;
  }
}
</style>