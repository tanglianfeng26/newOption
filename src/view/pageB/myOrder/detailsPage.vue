<template>
  <div id="detailsPage">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="detailBox">
      <div class="topNav">
        <div class="topNav_img">
          <img
            src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/%E5%BE%85%E5%8F%91%E8%B4%A7@2x.png"
            alt=""
          />
        </div>
        <div>{{queryDatas.status}}</div>
      </div>
      <div class="addressText dy">
        <div class="addressLogo">
          <van-icon name="location-o" />
        </div>
        <div class="addressAndTa">
          <h4>{{queryDatas.address.name}}<i>{{queryDatas.address.tel}}</i></h4>
          <p>{{queryDatas.address.address}}</p>
        </div>
      </div>
      <div class="orderList">
        <div class="headerTitle ty">
          <div class="up">
            <div>下单店铺：{{queryDatas.shopName}}</div>
          </div>
        </div>
        <div v-for="(item,index) in queryDatas.datas" :key="index" class="AgoodsContainer ty">
          <div class="goodsLogoImg">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="goodsText">
            <h4>{{item.title}}</h4>
            <!-- <p>{{item.note}}</p> -->
            <div class="priceAndNum">
              <div class="price">￥{{item.price}}</div>
              <div class="Num">X {{item.goodsIndex}}</div>
            </div>
          </div>
        </div>
        <div class="footerGoods">
          <div class="allPrice">
            共{{queryDatas.goodsNum}}件商品 合计：<span>￥{{queryDatas.goodsPrice}}</span>
          </div>
        </div>
      </div>
      <div class="orderText ty">
          <div class="dis-f">
              <div class="left">订单编号：</div>
              <div class="right">{{queryDatas.wordid}}</div>
          </div>
          <div class="dis-f">
              <div class="left">下单时间：</div>
              <div class="right">{{queryDatas.createTime}}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Icon } from "vant";
export default {
  components: {
    navTitle,
    [Icon.name]: Icon,
  },
  data() {
    return {
      title: "订单详情",
      rightIcon: "",
      queryDatas: JSON.parse(this.$route.query.datas),
      list:[]
    };
  },
  mounted(){
      this.list = this.queryDatas.goodsOrder
  },
  methods: {
    handleTool() {},
  },
};
</script>

<style lang="less" scoped>
.detailBox {
  .topNav {
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0rem 0.3rem;
    box-sizing: border-box;
    background-color: #1e87fe;
    color: #fff;
    margin-bottom: 0.2rem;
    font-size: 0.36rem;
    .topNav_img {
      width: 0.48rem;
      height: 0.48rem;
      margin-right: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .addressText {
    height: 1.6rem;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    .addressLogo {
      margin-right: 0.2rem;
      font-size: 0.42rem;
    }
    .addressAndTa {
      flex: 1;
      font-size: 0.28rem;
      color: #333;
      h4 {
        font-weight: 500;
        margin-bottom: 0.12rem;
        i {
          margin-left: 0.2rem;
          font-style: normal;
        }
      }
    }
  }
  .orderList {
    margin-bottom: 0.2rem;
    .headerTitle {
      .up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.24rem;
        color: #000;
        .bt {
          color: #1e87fe;
          font-size: 0.28rem;
        }
      }
      .down {
        font-size: 0.24rem;
        color: #999;
      }
    }
    .AgoodsContainer {
      display: flex;
      align-items: center;
      .goodsLogoImg {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 0.08rem;
        margin-right: 0.24rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsText {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1.6rem;
        flex: 1;
        h4 {
          font-size: 0.28rem;
          color: #000;
          font-weight: bold;
        }
        p {
          color: #999;
          font-weight: 500;
          font-size: 0.28rem;
        }
        .priceAndNum {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            font-size: 0.28rem;
            color: #000;
          }
          .Num {
            font-size: 0.32rem;
            color: #999;
          }
        }
      }
    }
    .footerGoods {
      .allPrice {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.28rem;
        color: #333;
        box-sizing: border-box;
        padding: 0.24rem;
        background-color: #fff;
        span {
          margin-right: 0.2rem;
          color: #ff2c43;
        }
      }
    }
  }
  .orderText{
      .dis-f{
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #333;
          margin-bottom: 0.1rem;
      }
      .dis-f:last-child{
          margin-bottom: 0rem;
      }
  }
}
.dy {
  box-sizing: border-box;
  padding: 0.3rem;
  background: #fff;
}
.ty {
  padding: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #eee;
  background-color: #fff;
}
</style>