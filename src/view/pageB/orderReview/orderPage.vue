<template>
  <div id="orderPage">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box" v-if="NowOrderList.length > 0">
      <div class="orderList" v-for="(item, index) in NowOrderList" :key="index">
        <div class="headerTitle ty">
          <div class="up">
            <div>下单人：{{ item.address.name }}</div>
            <div class="bt">{{ item.status }}</div>
          </div>
          <div class="down">{{ item.createTime }}</div>
        </div>
        <div
          class="AgoodsContainer ty"
          v-for="(i, k) in item.datas"
          :key="k"
          @click="jump_page"
        >
          <div class="goodsLogoImg">
            <img :src="i.imgUrl" alt="" />
          </div>
          <div class="goodsText">
            <h4>{{ i.title }}</h4>
            <!-- <p>{{ i.note }}</p> -->
            <div class="priceAndNum">
              <div class="price">￥{{ i.price }}</div>
              <div class="Num">X {{ i.goodsIndex }}</div>
            </div>
          </div>
        </div>
        <div class="footerGoods">
          <div class="allPrice">
            共{{ item.goodsNum }}件商品 合计：<span
              >￥{{ item.goodsPrice }}</span
            >
          </div>
          <div class="btn">
            <div class="btn_clear" @click="cancel_order(item.wordid)">
              审核通过
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no_list" v-else>
      <van-empty description="暂无订单"> </van-empty>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty, Toast } from "vant";

export default {
  components: {
    navTitle,
    [Empty.name]: Empty,
  },
  data() {
    return {
      title: "订单审核",
      rightIcon: "",
      NowOrderList: [],
    };
  },
  created() {
    this.initList();
  },
  methods: {
    //初始化订单
    initList() {
      if (localStorage["order"] !== undefined) {
        var obj = JSON.parse(localStorage["order"]);
        this.NowOrderList = obj.filter((item, index) => {
          return item.isStatus === 1;
        });
      }
    },
    async cancel_order(data) {
      var obj = JSON.parse(localStorage["order"]);
      obj.forEach((item) => {
        if (String(item.wordid) === String(data)) {
          item.isStatus = 2;
          item.status = "待发货";
          item.successTime = this.newDetime();
        }
      });
      localStorage["order"] = JSON.stringify(obj);
      const aw = await this.animat();
      this.initList();
    },
    jump_page() {},
    handleTool() {},
    newDetime() {
      var myDate = new Date();
      var newTime =
        myDate.getFullYear() +
        "-" +
        myDate.getMonth() +
        1 +
        "-" +
        myDate.getDate() +
        " " +
        myDate.getHours() +
        ":" +
        myDate.getMinutes() +
        ":" +
        myDate.getSeconds();
      return newTime;
    },
    animat() {
      return new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "通过中",
        });
        setTimeout(() => {
          Toast.clear();
          Toast.success("审核通过");
          resolve();
        }, 500);
      });
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
#orderPage {
  //   position: absolute;
  //   top: 0.84rem;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  overflow: auto;
  overflow-y: scroll;
  .big_box {
    padding-bottom: 0.2rem;
    .orderList {
      margin-top: 0.2rem;
      .headerTitle {
        .up {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.16rem;
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
        .btn {
          background-color: #fff;
          box-sizing: border-box;
          padding: 0.12rem 0.24rem 0.24rem;
          display: flex;
          justify-content: flex-end;
          .btn_clear {
            height: 0.5rem;
            border: 0.02rem solid #999;
            font-size: 0.24rem;
            width: 1.4rem;
            line-height: 0.5rem;
            text-align: center;
            border-radius: 0.04rem;
          }
        }
      }
    }
  }
}
.ty {
  padding: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #eee;
  background-color: #fff;
}
</style>