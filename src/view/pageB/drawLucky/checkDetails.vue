<template>
  <div id="checkDetails">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="addressBox">
        <div class="addressLogo">
          <img
            src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E5%9C%B0%E5%9D%80@2x%20(1).png"
            alt=""
          />
        </div>
        <div class="addressText">
          <div class="header">
            <div class="name">{{ orderContent.tableContent.name }}</div>
            <div class="tel">{{ orderContent.tableContent.tel }}</div>
          </div>
          <p>
            {{
              orderContent.tableContent.address +
              orderContent.tableContent.detailed
            }}
          </p>
        </div>
      </div>
      <div class="goodsBox">
        <div class="goods_header">
          <div>奖品信息</div>
          <div>{{ orderContent.getTime ? "待收货" : "待领取" }}</div>
        </div>
        <div class="goods_content">
          <div class="goods_content_Logo">
            <img :src="orderContent.imgUrl" alt="" />
          </div>
          <div class="goods_content_text">
            <h4>{{ orderContent.title }}</h4>
            <div class="note">
              <div>{{ orderContent.note }}</div>
              <div>x1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="orderInformation">
        <div class="header_title">订单信息</div>
        <div class="order_All">
          <div class="orderList">
            <div class="left">订单编号</div>
            <p class="right">{{ orderContent.wordID }}</p>
          </div>
          <div class="orderList">
            <div class="left">中奖时间</div>
            <p class="right">{{ orderContent.time }}</p>
          </div>
          <div class="orderList">
            <div class="left">领奖时间</div>
            <p class="right">{{ orderContent.getTime }}</p>
          </div>
        </div>
      </div>
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
      title: "订单详情",
      rightIcon: "",
      orderContent: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var code = Number(this.$route.query.code);
      var obj = JSON.parse(localStorage["luckyOrder"]);
      obj.forEach((item) => {
        if (Number(item.wordID) === code) {
          this.orderContent = item;
        }
      });
      console.log(this.orderContent);
    },
    handleTool() {},
  },
};
</script>

<style lang="less" scoped>
.big_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0.28rem;
  box-sizing: border-box;
  .addressBox {
    background-color: #fff;
    padding: 0.28rem 0.32rem;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.08rem;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    .addressLogo {
      width: 0.38rem;
      height: 0.48rem;
      margin-right: 0.24rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .addressText {
      flex: 1;
      .header {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 0.32rem;
        color: #323233;
        margin-bottom: 0.12rem;
        .tel {
          margin-left: 0.2rem;
        }
      }
      p {
        font-size: 0.26rem;
        color: #666;
      }
    }
  }
  .goodsBox {
    width: 100%;
    background-color: #fff;
    margin-top: 0.24rem;
    border-radius: 0.08rem;
    .goods_header {
      display: flex;
      align-items: center;
      height: 0.88rem;
      color: #333;
      font-size: 0.28rem;
      justify-content: space-between;
      padding-left: 0.2rem;
      padding-right: 0.34rem;
      box-sizing: border-box;
      font-weight: 500;
      border-bottom: 0.02rem solid #f2f2f2;
    }
    .goods_content {
      display: flex;
      padding: 0.2rem;
      box-sizing: border-box;
      .goods_content_Logo {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods_content_text {
        flex: 1;
        h4 {
          font-size: 0.28rem;
          color: #333;
          margin-bottom: 0.04rem;
        }
        .note {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.24rem;
          color: #666;
        }
      }
    }
  }
  .orderInformation {
    width: 100%;
    border-radius: 0.08rem;
    background-color: #fff;
    margin-top: 0.24rem;
    .header_title {
      height: 0.88rem;
      border-bottom: 0.02rem solid #f2f2f2;
      padding-left: 0.2rem;
      box-sizing: border-box;
      line-height: 0.88rem;
      color: #333;
      font-weight: 500;
      font-size: 0.28rem;
    }
    .order_All {
      padding: 0.2rem;
      box-sizing: border-box;
      .orderList {
        margin-bottom: 0.2rem;
        display: flex;
        // align-items: center;
        font-size: 0.28rem;
        .left {
          width: 2rem;
          color: #666;
        }
        .right {
          color: #333;
          flex: 1;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>