<template>
  <div id="acceptPotions">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="goods_box">
        <div class="goods_logo">
          <img :src="goodsA.imgUrl" alt="x" />
        </div>
        <div class="goods_text">{{ goodsA.title + " " + goodsA.note }}</div>
        <div class="goods_price">{{ goodsA.price }}积分</div>
      </div>
      <div class="nav_title">填写收货信息</div>
      <ul class="listUl">
        <li>
          <span>姓名</span>
          <input
            type="text"
            placeholder="收货人姓名"
            v-model="tableContent.name"
          />
        </li>
        <li>
          <span>电话</span>
          <input
            type="text"
            placeholder="收货人手机号"
            v-model="tableContent.tel"
          />
        </li>
        <li @click="showPopple = true">
          <span>地区</span>
          <div class="flex-1">
            {{
              tableContent.address === "" ? "省/市/区" : tableContent.address
            }}
          </div>
          <i></i>
        </li>
        <li>
          <span>详细地址</span>
          <input
            type="text"
            placeholder="街道门牌，楼层房间号等信息"
            v-model="tableContent.detailed"
          />
        </li>
      </ul>
      <div class="btn_result" @click="submit">提交</div>
    </div>
    <van-popup
      v-model="showPopple"
      round
      position="bottom"
    >
      <van-area
        title="标题"
        :area-list="areaList"
        @confirm="result"
        @cancel="showPopple = false"
    /></van-popup>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Popup, Area, Notify, Toast } from "vant";
import area from "../../../../static/area";
export default {
  components: { navTitle, [Popup.name]: Popup, [Area.name]: Area },
  data() {
    return {
      title: "兑换产品",
      rightIcon: "",
      showPopple: false,
      areaList: area,
      tableContent: {
        name: "",
        tel: "",
        address: "",
        detailed: "",
      },
      goodsA: {},
      checkPhone: /^1[3|4|5|7|8][0-9]{9}$/,
    };
  },
  created() {
    this.goodsA = JSON.parse(this.$route.query.option);
    console.log(this.goodsA);
  },
  methods: {
    handleTool() {},
    result(datas) {
      var addressList = "";
      datas.forEach((item, index) => {
        addressList += item.name;
      });
      this.tableContent.address = addressList;
      this.showPopple = false;
    },
    async submit() {
      console.log(this.tableContent);
      if (this.tableContent.name.length === 0) {
        Notify({ type: "danger", message: "请输入收货人姓名" });
        return;
      }
      if (!this.checkPhone.test(this.tableContent.tel)) {
        Notify({ type: "danger", message: "请输入收货人手机号" });
        return;
      }
      if (this.tableContent.address.length === 0) {
        Notify({ type: "danger", message: "请选择地区" });
        return;
      }
      if (this.tableContent.detailed.length === 0) {
        Notify({ type: "danger", message: "请输入详细地址" });
        return;
      }
      const submitS = await this.resetTabel();
      localStorage["price"] =
        Number(localStorage["price"]) - Number(this.goodsA.price);
      Toast.success("领取成功");
      console.log(this.goodsA);
      this.$router.replace({
        name: "successTip",
      });
    },
    resetTabel() {
      return new Promise((resolve, reject) => {
        if (localStorage["price"] < this.goodsA.price) {
          Notify({ type: "danger", message: "记帐不足，请前往充帐" });
          return;
        }
        if (localStorage["pointsList"] === undefined) {
          var obj = [];
          this.goodsA.time = this.newDetime();
          this.goodsA.wordID = this.uuid();
          this.goodsA.tableContent = this.tableContent;
          obj.push(this.goodsA);
          localStorage["pointsList"] = JSON.stringify(obj);
          resolve();
        } else {
          var objs = JSON.parse(localStorage["pointsList"]);
          this.goodsA.time = this.newDetime();
          this.goodsA.wordID = this.uuid();
          this.goodsA.tableContent = this.tableContent;
          objs.push(this.goodsA);
          localStorage["pointsList"] = JSON.stringify(objs);
          resolve();
        }
      });
    },
    //随机订单号
    uuid() {
      var rnd = "";
      for (var i = 0; i < 16; i++) rnd += Math.floor(Math.random() * 10);
      return rnd;
    },
    // 当前时间
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
  },
};
</script>

<style lang="less" scoped>
.goods_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  .goods_logo {
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods_text {
    margin: 0.4rem 0rem 0.1rem;
  }
  .goods_price {
    color: #1451a0;
    margin-bottom: 0.4rem;
  }
}
.listUl {
  padding: 0rem 0.34rem;
  box-sizing: border-box;
  background-color: #fff;
  li {
    height: 0.88rem;
    display: flex;
    align-items: center;
    border-bottom: 0.02rem solid #ebedf0;
    font-size: 0.28rem;
    span {
      color: #323233;
      width: 1.12rem;
    }
    input {
      flex: 1;
      padding-left: 0.2rem;
      outline: none;
      border: none;
    }
    .flex-1 {
      flex: 1;
      padding-left: 0.2rem;
      color: rgb(48, 47, 47);
    }
    i {
      width: 0.16rem;
      height: 0.16rem;
      border: 0.02rem solid #969799;
      transform: rotate(45deg);
      border-left: none;
      border-bottom: none;
    }
  }
  li:last-child {
    border-bottom: none;
  }
}
.btn_result {
  border-radius: 0.44rem;
  width: 4.8rem;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  background-color: #1451a0;
  margin: 1.2rem auto 0rem;
  color: #fff;
}
.nav_title {
  margin: 0.44rem 0.32rem 0.2rem;
}
</style>