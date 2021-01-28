<template>
  <div id="successTip">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="success_logo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%88%90%E5%8A%9F@2x%20(1).png"
          alt=""
        />
      </div>
      <div class="title">提交成功</div>
      <div class="btn_jump" @click="jump_orderList">查看详情</div>
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
      title: "提交成功",
      rightIcon: "",
    };
  },
  methods: {
    handleTool() {},
    jump_orderList() {
      this.$router.replace({
        name: "orderList",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  position: absolute;
  top: 0.84rem;
  left: 0;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .success_logo {
    width: 1.42rem;
    height: 1.42rem;
    margin-top: 2.92rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    color: #222;
    font-size: 0.32rem;
    margin-top: 0.68rem;
    font-weight: 500;
  }
  .btn_jump {
    width: 2rem;
    margin-top: 1.7rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    border: 0.02rem solid #b2b2b2;
    border-radius: 0.34rem;
    font-size: 0.28rem;
    color: #333;
  }
}
</style>