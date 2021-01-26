<template>
  <div id="footTabber">
    <div class="w_box">
      <div class="shopCar" @click="show_sheet">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E8%B4%AD%E7%89%A9%E8%BD%A6@2x.png"
          alt=""
        />
        <div class="i_small" v-if="numgoodst > 0">
          {{ numgoodst > 99 ? "99+" : numgoodst }}
        </div>
      </div>
      <div class="goodsAllPrice">￥{{ price }}</div>
    </div>

    <div class="btn_settlement" @click="Topay">去结算</div>
    
  </div>
</template>

<script>
export default {
  props: ["addNum", "numGoods"],
  data() {
    return {
      price: 0,
      numgoodst: 0,
    };
  },

  watch: {
    addNum(val, newval) {
      this.initPrice();
    },
    numGoods(val, newval) {
      this.initGoodsNum();
    },
  },
  methods: {
    initPrice() {
      this.price = this.addNum;
    },
    initGoodsNum() {
      this.numgoodst = this.numGoods;
    },
    show_sheet() {
        this.$emit("showTC")
    },
    Topay(){
      this.$emit("toPay")
    },
  },
};
</script>

<style lang="less" scoped>
#footTabber {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0rem 0.2rem 0rem 0.34rem;
  box-sizing: border-box;
  justify-content: space-between;
  z-index: 3000;
  .w_box {
    display: flex;
    align-items: center;
    .shopCar {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 0.04rem solid #fff;
      background-color: #1e87fe;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -0.4rem;
      margin-right: 0.26rem;
      position: relative;
      .i_small {
        position: absolute;
        top: -3%;
        left: 70%;
        height: 0.32rem;
        padding: 0rem 0.08rem;
        font-size: 0.2rem;
        border-radius: 0.16rem;
        background-color: #fff;
        border: 0.02rem solid #ff0202;
        color: #ff0202;
        line-height: 0.32rem;
        text-align: center;
      }
      img {
        width: 0.52rem;
        height: 0.52rem;
      }
    }
    .goodsAllPrice {
      color: #ff0202;
      font-weight: 500;
      font-size: 0.32rem;
    }
  }

  .btn_settlement {
    width: 1.4rem;
    height: 0.72rem;
    line-height: 0.72rem;
    text-align: center;
    background-color: #1e87fe;
    color: #fff;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    font-weight: 500;
  }
}

</style>