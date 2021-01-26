<template>
  <div id="contentList">
    <div class="big_box" v-if="NowOrderList.length > 0">
      <div
        class="orderList"
        v-for="(item, index) in NowOrderList"
        :key="index"
        @click="jump_page(item)"
      >
        <div class="headerTitle ty">
          <div class="up">
            <div>下单人：{{ item.user }}</div>
            <div class="bt">{{ item.status }}</div>
          </div>
          <div class="down">{{ item.title }}</div>
        </div>
        <div
          class="AgoodsContainer ty"
          v-for="(i, k) in item.goodsOrder"
          :key="k"
        >
          <div class="goodsLogoImg">
            <img :src="i.imgUrl" alt="" />
          </div>
          <div class="goodsText">
            <h4>{{ i.goodsName }}</h4>
            <p>{{ i.note }}</p>
            <div class="priceAndNum">
              <div class="price">￥{{ i.price }}</div>
              <div class="Num">X {{ i.goodsNum }}</div>
            </div>
          </div>
        </div>
        <div class="footerGoods">
          <div class="allPrice">
            共{{ item.goodsNumS }}件商品 合计：<span
              >￥{{ item.goodsPriceS }}</span
            >(含邮费 ￥{{ item.feeEms }})
          </div>
          <div class="btn">
            <div class="btn_clear" @click="cancel_order">取消订单</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no_list" v-else>
      <van-empty description="暂无订单">
        <van-button round type="danger" class="bottom-button" @click="jump_shop"
          >去下单</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
import { Empty, Button, Toast } from "vant";
export default {
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
  props: ["content"],
  data() {
    return {
      conData: this.content,
      //模拟订单数据
      orderListS: [
        {
          user: "平行线",
          shopName: "唐氏",
          workID: 78451256238594578,
          tel: "13602712680",
          address: "广东省广州市天河区伍仙桥",
          isStatus: 1,
          status: "待审核",
          title: "2020-5-20 12:30:31",
          goodsNumS: 2,
          feeEms: 8,
          goodsPriceS: 48 * 2,
          goodsOrder: [
            {
              goodsName: "火山洗面奶",
              note: "100ml",
              price: 48,
              goodsNum: 2,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/492b3d072456fc2c398094f5dc7d8c85.jpeg",
            },
          ],
        },
        {
          user: "陈冠溪",
          tel: "13712346541",
          shopName: "唐氏",
          workID: 4523568978451245,
          address: "广东省广州市天河区伍仙桥",
          isStatus: 2,
          status: "待发货",
          title: "2020-4-10 17:30:31",
          goodsNumS: 3,
          feeEms: 8,
          goodsPriceS: 88 * 3,
          goodsOrder: [
            {
              goodsName: "百威啤酒",
              note: "250ml",
              price: 88,
              goodsNum: 3,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/a4dc2c293091b8b285a4c28781278c32.jpeg",
            },
          ],
        },
        {
          user: "彭于晏",
          tel: "13602712680",
          shopName: "唐氏",
          workID: 1626451626351656,
          address: "广东省广州市天河区伍仙桥",
          isStatus: 2,
          status: "待发货",
          title: "2020-4-10 17:30:31",
          goodsNumS: 3,
          feeEms: 8,
          goodsPriceS: 2.5 * 3,
          goodsOrder: [
            {
              goodsName: "旺仔牛奶",
              note: "150ml",
              price: 2.5,
              goodsNum: 3,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/3d440afc3fbfc15880c702f0e4cf864c.jpeg",
            },
          ],
        },
        {
          user: "郭德纲",
          tel: "13602712680",
          shopName: "唐氏",
          workID: 3265986598875416,
          address: "广东省广州市天河区伍仙桥",
          isStatus: 2,
          status: "待发货",
          title: "2020-4-10 17:30:31",
          goodsNumS: 12,
          feeEms: 8,
          goodsPriceS: 3.5 * 12,
          goodsOrder: [
            {
              goodsName: "啤酒",
              note: "250ml",
              price: 3.5,
              goodsNum: 12,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/3407608e7c5ff3d7929dac2d6b833148.jpeg",
            },
          ],
        },
        {
          user: "吴彦祖",
          tel: "13602712680",
          shopName: "唐氏",
          workID: 6152154815264895,
          address: "广东省广州市天河区伍仙桥",
          isStatus: 2,
          status: "待发货",
          title: "2020-5-20 12:30:31",
          goodsNumS: 1,
          feeEms: 8,
          goodsPriceS: 288 * 1,
          goodsOrder: [
            {
              goodsName: "电竞游戏耳机",
              note: "",
              price: 288,
              goodsNum: 1,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/13f75131a569b8366c21b1178553e98e.jpeg",
            },
          ],
        },
        {
          user: "股份陈",
          tel: "13888888888",
          shopName: "唐氏",
          workID: 8854652365236985,
          address: "广东省广州市天河区伍仙桥",
          isStatus: 2,
          status: "待发货",
          title: "2020-4-10 17:30:31",
          goodsNumS: 3,
          feeEms: 8,
          goodsPriceS: 5599 * 3,
          goodsOrder: [
            {
              goodsName: "iPhone 12",
              note: "256G",
              price: 5599.0,
              goodsNum: 3,
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
            },
          ],
        },
      ],
      NowOrderList: [], //当前所选商品列表
    };
  },
  watch: {
    content(val) {
      this.conData = val;
      if (val === 0) {
        this.initAllList();
      } else {
        this.initList();
      }
    },
    //   conData(val){
    //       console.log('conData',val);
    //       this.$emit('content',val)
    //   }
  },
  mounted() {
    if (this.conData === 0) {
      this.initAllList();
    } else {
      this.initList();
    }
  },
  methods: {
    jump_page(option) {
      console.log(JSON.stringify(option));
      this.$router.push({
        name: "detailsPage",
        query: {
          datas: JSON.stringify(option),
        },
      });
    },
    initAllList() {
      this.NowOrderList = this.orderListS;
    },
    initList() {
      var self = this;
      this.NowOrderList = this.orderListS.filter((item) => {
        return item.isStatus == this.conData;
      });
    },
    jump_shop() {
      this.$router.push({
        name: "goods",
      });
    },
    cancel_order() {
      Toast.fail("模拟数据");
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.bottom-button {
  width: 160px;
  height: 40px;
  background-color: #1e87fe;
  border: none;
  letter-spacing: 0.03rem;
}
#contentList {
  position: absolute;
  top: 1.72rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: auto;
  overflow-y: scroll;
  .big_box {
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