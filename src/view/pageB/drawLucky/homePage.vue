<template>
  <div id="homePage">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="nav_logo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%A0%87%E9%A2%98@2x.png"
          alt=""
        />
      </div>
      <div class="new_inf">当前记账：{{ query_price }}</div>
      <div class="input_popple">
        <input type="text" placeholder="请输入抽奖码" v-model="Lottery" />
        <div
          class="btn_open"
          @click="action ? open_Lottery() : stabilization()"
        >
          开始抽奖
        </div>
      </div>
      <div class="draw_luckyLogo">
        <img
          class="draw_img"
          :class="animationS ? 'has_Status' : 'no_Status'"
          :style="{ transform: 'rotate(' + luckyChange.tranform + 'deg)' }"
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E8%BD%AC%E7%9B%98@2x.png"
          alt=""
        />
        <img
          class="zz_logo"
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%8C%87%E9%92%88@2x.png"
          alt=""
        />
      </div>
      <div class="jump_seeTheRecord" @click="jump_winning_Record">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%9F%A5%E7%9C%8B%E4%B8%AD%E5%A5%96%E8%AE%B0%E5%BD%95@2x.png"
          alt=""
        />
      </div>
      <!-- <div class="tle_ty">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%9F%A5%E7%9C%8B%E5%A5%96%E5%93%81@2x.png"
          alt=""
        />
      </div> -->
      <div class="tle_ty" @click="jump_points">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%A7%AF%E5%88%86%E5%85%91%E6%8D%A2@2x.png"
          alt=""
        />
      </div>
      <div class="activityRules">
        <div class="box_text">每次抽奖消耗100金额</div>
      </div>
    </div>
    <van-popup v-model="showBox">
      <div class="small_box">
        <div class="title">
          {{ luckyChange.isStatus ? "恭喜你中奖了" : "谢谢惠顾" }}
        </div>
        <div class="logo">
          <img :src="luckyChange.imgUrl" alt="" />
        </div>
        <div class="Commodity" v-if="luckyChange.isStatus">
          {{ luckyChange.title }}
        </div>
        <div class="address_text" v-if="luckyChange.isStatus">
          请尽快领取并填写收件地址
        </div>
        <div
          class="now_get"
          v-if="luckyChange.isStatus"
          @click="get_goods(luckyChange.wordID)"
        >
          立即领取
        </div>
        <div
          class="no_get"
          :class="luckyChange.isStatus ? '' : 'sta'"
          @click="showBox = false"
        >
          {{ luckyChange.isStatus ? "暂不领取" : "确定" }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Notify, Toast, Popup } from "vant";
export default {
  components: { navTitle, [Notify.name]: Notify, [Popup.name]: Popup },
  data() {
    return {
      title: "抽奖",
      rightIcon: "",
      Lottery: "",
      action: true,
      animationS: true,
      showBox: false,
      query_price: 0,
      luckyChange: {
        tranform: 0,
        title: "",
        isStatus: true,
        imgUrl: "",
      },
      prizeInformation: [
        {
          ID: 0,
          tranformAng: 720,
          isStatus: false,
          title: "谢谢参与",
          note: "无",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E8%B0%A2%E8%B0%A2%E5%8F%82%E4%B8%8E@2x.png",
        },
        {
          ID: 1,
          tranformAng: 1020,
          isStatus: true,
          title: "现金1000元",
          note: "1000元",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%BA%A2%E5%8C%85@2x.png",
        },
        {
          ID: 2,
          tranformAng: 960,
          isStatus: true,
          title: "气垫BB霜",
          note: "100ml",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%B2%89%E5%BA%95@2x.png",
        },
        {
          ID: 3,
          tranformAng: 900,
          isStatus: true,
          title: "网红口红",
          note: "MAC",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E5%8F%A3%E7%BA%A2@2x.png",
        },
        {
          ID: 4,
          tranformAng: 840,
          isStatus: true,
          title: "眼部精华",
          note: "50ml",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%B2%BE%E5%8D%8E@2x.png",
        },
        {
          ID: 5,
          tranformAng: 780,
          isStatus: true,
          title: "洗面奶",
          note: "100ml",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%B4%97%E9%9D%A2%E5%A5%B6@2x.png",
        },
      ],
      winningInf: {}, //中奖内容
    };
  },
  mounted() {
    this.query_price = Number(localStorage["price"]);
  },
  methods: {
    stabilization() {
      Toast.loading({
        message: "正在抽奖中  请勿重复点击",
        forbidClick: true,
      });
    },
    handleTool() {},
    // 开始抽奖
    async open_Lottery() {
      if (this.Lottery === "") {
        Notify({ type: "danger", message: "请输入抽奖码" });
        return;
      }
      if (Number(localStorage["price"]) < 100) {
        Notify({ type: "danger", message: "金额不足，请前往充帐" });
        return;
      }
      this.action = false;
      this.animationS = false;
      const transAnimations = await this.initLuckyDraw();
      this.animationS = true;
      localStorage["price"] = Number(localStorage["price"]) - 100;
      const lottery = await this.lotteryS();
      //   const mountedContent = await this.contentS();
      this.showBox = true;
      //扣除记账
    },
    // 中奖内容筛选
    contentS() {
      return new Promise((resolve, reject) => {});
    },
    // 抽奖程序开始操作
    lotteryS() {
      var self = this;
      return new Promise((resolve, reject) => {
        this.query_price = Number(localStorage["price"]);
        let activeIndex =
          Math.floor(Math.random() * this.prizeInformation.length + 1) - 1;
        this.winningInf = this.prizeInformation[activeIndex];
        this.winningInf.wordID = this.uuid();
        this.winningInf.time = this.newDetime();
        this.Logical();
        this.luckyChange = {
          tranform: this.winningInf.tranformAng,
          title: this.winningInf.title,
          imgUrl: this.winningInf.imgUrl,
          isStatus: this.winningInf.isStatus,
        };
        setTimeout(function () {
          self.action = true;
          resolve();
        }, 3200);
      });
    },
    // 中间逻辑处理层
    Logical() {
      if (localStorage["luckyOrder"] === undefined) {
        var obj = [];
        obj.push(this.winningInf);
        localStorage["luckyOrder"] = JSON.stringify(obj);
      } else {
        var objT = JSON.parse(localStorage["luckyOrder"]);
        objT.push(this.winningInf);
        localStorage["luckyOrder"] = JSON.stringify(objT);
      }
    },
    //重置转盘
    initLuckyDraw() {
      return new Promise((resolve, reject) => {
        this.luckyChange.tranform = 0;
        setTimeout(function () {
          resolve();
        }, 1);
      });
    },
    // 随机生成订单编号
    uuid() {
      //   return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
      //     var r = (Math.random() * 16) | 0,
      //       v = c == "x" ? r : (r & 0x3) | 0x8;
      //     return v.toString(16);
      //   });
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
    // 跳转中奖记录
    jump_winning_Record() {
      this.$router.push({
        name: "drawRecord",
      });
    },
    //跳转积分兑换
    jump_points(){
        this.$router.push({
            name: "changePage"
        })
    },
    // 领取奖品
    get_goods() {
      this.$router.push({
        name: "accept",
        query: {
          code: this.winningInf.wordID,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/bg@2x.png")
    no-repeat center;
  background-size: cover;
  width: 100%;
  overflow: auto;
  .new_inf {
    margin-top: 0.35rem;
    width: 4rem;
    height: 0.68rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E5%BD%93%E5%89%8D%E7%A7%AF%E5%88%86@2x.png")
      no-repeat center;
    background-size: 4rem 0.68rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.32rem;
    color: #231716;
    font-weight: 500;
  }
  .nav_logo {
    width: 6.02rem;
    margin-top: 0.76rem;
    height: 2.62rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .input_popple {
    margin-top: 0.36rem;
    border-radius: 0.16rem;
    height: 0.72rem;
    width: 5.8rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    input {
      flex: 1;
      height: 0.72rem;
      line-height: 0.72rem;
      border: none;
      outline: none;
      padding: 0rem 0.2rem;
    }
    .btn_open {
      height: 0.72rem;
      width: 1.8rem;
      line-height: 0.72rem;
      text-align: center;
      background: linear-gradient(
        316deg,
        #e7c043 0%,
        #fdee86 42%,
        #9f6c1c 100%
      );
    }
  }
  .draw_luckyLogo {
    width: 5.7rem;
    height: 5.7rem;
    margin-top: 0.66rem;
    position: relative;
    .draw_img {
      width: 100%;
      height: 100%;
    }
    .zz_logo {
      width: 1.5rem;
      height: 1.76rem;
      position: absolute;
      top: 32%;
      left: 36%;
    }
  }
  .jump_seeTheRecord {
    width: 4.94rem;
    height: 0.94rem;
    margin-top: 0.54rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tle_ty {
    width: 1.84rem;
    height: 0.36rem;
    margin-top: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .activityRules {
    margin-top: 0.76rem;
    width: 5.5rem;
    height: 3.4rem;
    position: relative;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%B4%BB%E5%8A%A8%E8%A7%84%E5%88%99@2x.png")
      no-repeat center;
    background-size: 5.5rem 3.4rem;
    margin-bottom: 1.9rem;
    .box_text {
      position: absolute;
      width: 4.74rem;
      height: 2.16rem;
      overflow: auto;
      bottom: 0.28rem;
      left: 0.34rem;
    }
  }
}
/deep/ .van-popup--center {
  border-radius: 0.16rem;
}
.small_box {
  width: 5.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-weight: 500;
    font-size: 0.4rem;
    margin-top: 0.4rem;
  }
  .logo {
    width: 2.4rem;
    height: 2.4rem;
    background-color: skyblue;
    margin-top: 0.12rem;
    margin-bottom: 0.4rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Commodity {
    font-size: 0.28rem;
    color: #333;
  }
  .address_text {
    color: #4a4a4a;
    font-size: 0.24rem;
    margin-top: 0.24rem;
    margin-bottom: 0.2rem;
  }
  .now_get {
    width: 4rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    background-color: #1451a0;
    color: #fff;
    border-radius: 0.34rem;
    font-size: 0.28rem;
    margin-bottom: 0.32rem;
  }
  .no_get {
    color: #4a4a4a;
    font-size: 0.28rem;
    margin-bottom: 0.44rem;
  }
  .sta {
    width: 4rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    background-color: #1451a0;
    color: #fff;
    border-radius: 0.34rem;
    font-size: 0.28rem;
    margin-bottom: 0.42rem;
    margin-top: 0.24rem;
  }
}
.has_Status {
  transition: all 3s;
}
</style>