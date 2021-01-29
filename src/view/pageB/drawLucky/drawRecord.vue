<template>
  <div id="drawRecord">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="margin_box">
        <div class="img_logo">
          <img
            src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E6%A0%87%E9%A2%98@2x.png"
            alt=""
          />
        </div>
        <div class="winningRecord_Box">
          <div class="has_list" v-if="list.length > 0">
            <div class="title">我的中奖记录</div>
            <div
              class="winningGoods"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="winningGoods_img">
                <img :src="item.imgUrl" alt="" />
              </div>
              <div class="winningText_box">
                <h4>{{ item.title }}</h4>
                <p>{{ item.time }}</p>
                <div class="status">
                  <div class="text" v-if="item.isStatus">
                    {{ item.tableContent ? "已领取" : "待领取" }}
                  </div>
                  <div class="text" v-else>未中奖</div>
                  <div
                    class="btn"
                    v-if="item.isStatus"
                    @click="
                      item.tableContent
                        ? checkDetails(item.wordID)
                        : accPrize(item.wordID)
                    "
                  >
                    {{ item.tableContent ? "查看详情" : "立即领奖" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <van-empty description="暂无中奖记录">
              <van-button
                round
                type="danger"
                class="bottom-button"
                @click="jump_shop"
                >前往抽奖</van-button
              >
            </van-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty, Button } from "vant";
export default {
  components: { navTitle, [Empty.name]: Empty, [Button.name]: Button },
  data() {
    return {
      title: "中奖记录",
      rightIcon: "",
      list: [],
    };
  },
  mounted() {
    if (localStorage["luckyOrder"] !== undefined) {
      this.list = JSON.parse(localStorage["luckyOrder"]);
    }
    console.log(this.list);
  },
  methods: {
    handleTool() {},
    //查看详情
    checkDetails(v) {
      this.$router.push({
        name: "checkDetails",
        query: {
          code: v,
        },
      });
    },
    //领取奖品
    accPrize(v) {
      this.$router.push({
        name: "accept",
        query: {
          code: v,
        },
      });
    },
    jump_shop() {
      this.$router.push({
        name: "homePage",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-button {
  width: 160px;
  height: 40px;
  background-color: #1e87fe;
  border: none;
  letter-spacing: 0.03rem;
}
.big_box {
  position: absolute;
  top: 0.84rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/bg@2x.png")
    no-repeat center;
  background-size: cover;
  overflow: auto;
  .margin_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    .img_logo {
      width: 6.02rem;
      height: 2.62rem;
      margin: 0.76rem 0rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .winningRecord_Box {
      font-size: 0.32rem;
      font-weight: 600;
      color: #000;
      width: 6.3rem;
      border-radius: 0.16rem;
      background-color: #fff;
      padding: 0.2rem 0rem;
      box-sizing: border-box;
      margin-bottom: 2rem;
      .has_list {
        .title {
          text-align: center;
          margin: 0.3rem 0rem;
        }
        .winningGoods {
          margin: 0.25rem 0rem;
          padding: 0rem 0.3rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .winningGoods_img {
            margin-right: 0.2rem;
            width: 1.2rem;
            height: 1.2rem;
            background-color: skyblue;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .winningText_box {
            flex: 1;
            h4 {
              font-weight: 500;
              font-size: 0.28rem;
              margin-bottom: 0.13rem;
            }
            p {
              font-size: 0.24rem;
              color: #999;
              margin-bottom: 0.13rem;
              font-weight: 500;
            }
            .status {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 0.24rem;
              font-weight: 500;
              color: #1451a0;
              .btn {
                width: 1.4rem;
                height: 0.44rem;
                line-height: 0.44rem;
                text-align: center;
                border-radius: 0.22rem;
                background-color: #1451a0;
                font-size: 0.24rem;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>