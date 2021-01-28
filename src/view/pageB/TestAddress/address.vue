<template>
  <div id="address">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="mar_box" v-if="addressListS.length > 0">
        <div
          class="addressList"
          v-for="(item, index) in addressListS"
          :key="index"
        >
          <div class="left">
            <div class="nav_header">
              <div>{{ item.name }}</div>
              <div class="tel">{{ item.tel }}</div>
              <div class="activeIcon" v-if="item.status">默认</div>
            </div>
            <p v-if="item.address[2]">
              {{
                item.address[0].name +
                item.address[1].name +
                item.address[2].name +
                item.detailsAddress
              }}
            </p>
            <p v-else>
              {{
                item.address[0].name +
                item.address[1].name +
                item.detailsAddress
              }}
            </p>
          </div>
          <div class="right_icon">
            <img
              src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%BC%96%E8%BE%91@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty description="未添加收货地址" />
      </div>
      <div class="btn"><div class="btn_add">+新增收货地址</div></div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty } from "vant";
export default {
  components: {
    navTitle,
    [Empty.name]: Empty,
  },
  data() {
    return {
      title: "地址管理",
      rightIcon: "",
      addressListS: [],
    };
  },
  created() {
    if (localStorage["addressList"] !== undefined) {
      this.addressListS = JSON.parse(localStorage["addressList"]);
    }
  },
  methods: {
    handleTool() {},
  },
};
</script>

<style lang="less" scoped>
.big_box {
  padding: 0rem 0.2rem 1.4rem;
  box-sizing: border-box;
}
.mar_box {
  .addressList {
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.16rem;
    .left {
      flex: 1;
      .nav_header {
        display: flex;
        align-items: center;
        color: #000;
        font-weight: bold;
        font-size: 0.32rem;
        .tel {
          margin: 0rem 0.2rem;
        }
        .activeIcon {
          color: #fff;
          background-color: #ff9200;
          border-radius: 0.16rem;
          width: 0.8rem;
          height: 0.32rem;
          line-height: 0.32rem;
          font-size: 0.2rem;
          text-align: center;
          font-weight: 500;
        }
      }
      p {
        font-weight: 400;
        color: #333;
        font-size: 0.24rem;
        margin-top: 0.22rem;
        font-weight: 500;
      }
    }
    .right_icon {
      width: 0.44rem;
      height: 0.44rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.28rem;
  background-color: #fff;
  .btn_add {
    width: 7rem;
    height: 0.88rem;
    background-color: #1e87fe;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.08rem;
    color: #fff;
  }
}
</style>