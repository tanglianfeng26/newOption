<template>
  <div id="settlement">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="mar_box">
      <div class="big_box" @click="addAddress">
        <div class="tj" v-if="!getAddress">
          <div class="add">+</div>
          添加地址
        </div>
        <div v-else class="addressTeXt">
          <h4>
            {{ arrAddress.name }} <i>{{ arrAddress.tel }}</i>
          </h4>
          <p v-if="arrAddress.address[2]">
            {{
              arrAddress.address[0].name +
              arrAddress.address[1].name +
              arrAddress.address[2].name +
              arrAddress.detailsAddress
            }}
          </p>
          <p v-else>
            {{
              arrAddress.address[0].name +
              arrAddress.address[1].name +
              arrAddress.detailsAddress
            }}
          </p>
        </div>
        <div class="dyh"></div>
      </div>
      <div class="orderList">
        <div
          v-for="(item, index) in datas"
          :key="index"
          class="AgoodsContainer ty"
        >
          <div class="goodsLogoImg">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="goodsText">
            <h4>{{ item.title }}</h4>
            <div class="priceAndNum">
              <div class="price">￥{{ item.price }}</div>
              <div class="Num">X {{ item.goodsIndex }}</div>
            </div>
          </div>
        </div>
        <div class="footerGoods">
          <div class="allPrice">
            共{{ numGoods }}件商品 商品金额：<span>￥{{ priceS }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_left">
        合计：<span>￥{{ priceS }}</span>
      </div>
      <div class="footer_right" @click="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Toast, Notify, Dialog } from "vant";
export default {
  components: {
    navTitle,
  },
  data() {
    return {
      title: "结算",
      rightIcon: "",
      datas: JSON.parse(this.$route.query.details),
      priceS: 0,
      numGoods: 0,
      arrAddress: [],
      getAddress: false,
      objList: [],
    };
  },
  created() {
    this.priceAll();
    this.initAddress();
  },
  methods: {
    initAddress() {
      if (localStorage["addressList"] === undefined) {
        this.getAddress = false;
      } else {
        this.initAddActive();
        // this.getAddress = true;
      }
    },
    addAddress() {
      this.$router.push({
        name: "addressONE",
        query: {
          id: 9999,
        },
      });
    },
    initAddActive() {
      if (localStorage["addressActive"] === undefined) {
        var objS = JSON.parse(localStorage["addressList"]);
        this.arrAddress = objS.filter((item) => {
          return item.status === true;
        });
        if (this.arrAddress.length > 0) {
          this.arrAddress = this.arrAddress[0];
        }
      } else {
        this.arrAddress = JSON.parse(localStorage["addressActive"]);
      }
      console.log("arrAddress", this.arrAddress);
      if (this.arrAddress.length !== 0) {
        this.getAddress = true;
      }
    },
    async priceAll() {
      const priceSt = await this.price();
    },
    price() {
      var self = this;
      return new Promise((resolve, reject) => {
        return this.datas.forEach((item, index) => {
          this.priceS += item.goodsIndex * Number(item.price);
          this.numGoods += item.goodsIndex;
          resolve();
        });
      });
    },
    handleTool() {},
    uuid() {
      return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
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
    submit() {
      var self = this;
      if (this.arrAddress === null) {
        Notify({ type: "danger", message: "请选择地址" });
        return;
      }
      if (localStorage["price"] < this.priceS) {
        Dialog.confirm({
          title: "金额不足",
          message: "当前余额：" + localStorage["price"],
          confirmButtonText: "充帐",
        })
          .then(() => {
            // on confirm
            self.$router.push({
              name: "myAssets",
            });
          })
          .catch(() => {
            // on cancel
          });
        return;
      } else {
        localStorage["price"] =
          Number(localStorage["price"]) - Number(this.priceS);
      }
      if (localStorage["order"] === undefined) {
        localStorage["order"] = [];
      } else {
        this.objList = JSON.parse(localStorage["order"]);
      }
      var obj = {};
      obj.shopName = "唐氏";
      obj.address = this.arrAddress;
      obj.datas = this.datas;
      obj.goodsNum = this.numGoods;
      obj.goodsPrice = this.priceS;
      obj.wordid = this.uuid();
      obj.createTime = this.newDetime();
      obj.status = "待审核";
      obj.isStatus = 1;

      this.objList.push(obj);
      localStorage["order"] = JSON.stringify(this.objList);

      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: "提交中",
      });
      setTimeout(() => {
        // 手动清除 Toast
        Toast.clear();
        self.chuan();
      }, 1500);
    },
    chuan() {
      var self = this;
      delete localStorage["shoppingCarList"];
      Toast.success("下单成功");
      setTimeout(function () {
        self.$router.replace({
          name: "myOrder",
          query: {
            activeIndex: 0,
          },
        });
      }, 1000);
    },
  },
  beforeDestroy(){
    delete localStorage["addressActive"];
  }
};
</script>

<style lang="less" scoped>
.mar_box {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0.84rem;
  bottom: 1rem;
  overflow: auto;
}
.big_box {
  margin-top: 0.02rem;
  height: 1.66rem;
  display: flex;
  align-items: center;
  padding: 0rem 0.3rem;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 0.2rem;
  font-size: 0.32rem;
  color: #666;
  justify-content: space-between;
  border-bottom: 0.02rem #f5f5f5 skyblue;
  .addressTeXt {
    font-size: 0.24rem;
    color: #333;
    h4 {
      font-weight: 500;
      margin-bottom: 0.2rem;
      i {
        font-style: normal;
        margin-left: 0.2rem;
      }
    }
  }
  .tj {
    display: flex;
    align-items: center;
    .add {
      width: 0.32rem;
      height: 0.32rem;
      border: 0.02rem solid #666;
      line-height: 0.32rem;
      text-align: center;
      border-radius: 0.06rem;
      margin-right: 0.2rem;
    }
  }
  .dyh {
    width: 0.12rem;
    height: 0.12rem;
    border: 0.02rem solid #333;
    transform: rotate(45deg);
    border-left: none;
    border-bottom: none;
  }
}
.goodsList {
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
.footer {
  height: 1rem;
  display: flex;
  align-items: center;
  padding: 0rem 0.18rem 0rem 0.24rem;
  background: #fff;
  font-size: 0.28rem;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .footer_left {
    span {
      font-size: 0.36rem;
      color: #ff2c43;
      font-weight: bold;
    }
  }
  .footer_right {
    width: 2rem;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    background-color: #1e87fe;
    color: #fff;
    border-radius: 0.08rem;
  }
}
.ty {
  padding: 0.3rem;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #eee;
  background-color: #fff;
}
</style>