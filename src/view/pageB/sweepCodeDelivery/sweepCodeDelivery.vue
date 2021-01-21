<template>
  <div id="sweepCodeDelivery">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="box_big">
      <img
        src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_1611198018226.png"
        alt=""
      />
    </div>
    <div class="ty bg_skyblue" @click="open_camcorder">
      <div class="imgLogo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%BF%AB%E9%80%9F%E6%89%AB%E7%A0%81@2x.png"
          alt=""
        />
      </div>
      <div class="text">
        <h3>扫码快递</h3>
        <p>扫码快递单号作为订单号</p>
      </div>
    </div>
    <div class="ty" @click="open_camcorder">
      <div class="imgLogo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E9%9B%B6%E5%94%AE%E8%AE%B0%E5%BD%95@2x.png"
          alt=""
        />
      </div>
      <div class="text">
        <h3>自动生成</h3>
        <p>系统自动生成单号作为订单号</p>
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
      title: "扫码发货",
      rightIcon: "",
    };
  },
  methods: {
    handleTool() {
      console.log(1);
    },
    open_camcorder() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中",
      });

      let second = 2;
      const timer = setInterval(() => {
        second--;
        if (second) {
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Toast.clear();
          this.toastJump()
        }
      }, 1000);
    },
    toastJump() {
      setTimeout(function () {
        Toast.fail("未编辑");
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
#sweepCodeDelivery {
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .box_big {
    margin: 0.4rem 0rem;
    width: 6.94rem;
    height: 2.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ty {
    width: 6.94rem;
    height: 2.2rem;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    margin-bottom: 0.2rem;
    padding: 0.66rem 0.44rem;
    background-color: #fafbff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .imgLogo {
      width: 0.96rem;
      height: 0.96rem;
      margin-right: 0.46rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      flex: 1;

      h3 {
        font-size: 0.32rem;
        color: #333;
        font-weight: 500;
        margin-bottom: 0.16rem;
      }
      p {
        font-weight: 500;
        color: #666;
        font-size: 0.22rem;
      }
    }
  }
}
.bg_skyblue {
  background: #f8feff !important;
}
</style>