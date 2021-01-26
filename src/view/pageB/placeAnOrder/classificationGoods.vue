<template>
  <div id="classificationGoods">
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in goodsClassList"
          :key="index"
          @click="activeGoods(index)"
          :class="index === activeGoodsNow ? 'active' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="right">
      <div
        class="goodsInformation"
        v-for="(item, index) in goodsClassList[activeGoodsNow].goods"
        :key="index"
      >
        <div class="goodsLogo">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="goodsText">
          <div class="top">
            <h3>{{ item.title }}</h3>
            <p>库存：{{ item.inventory }}</p>
          </div>
          <div class="foot">
            <div class="price">￥{{ item.price }}</div>
            <van-icon @click="addGoods(item)" class="addIcon" name="add" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      activeGoodsNow: 0,
      goodsClassList: [
        {
          label: "电子产品",
          ID: 0,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
              title: "iPhone 12",
              inventory: 50,
              price: "5599.00",
              ID: 100,
            },

            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/13f75131a569b8366c21b1178553e98e.jpeg",
              title: "电竞游戏耳机",
              inventory: 312,
              price: "288.00",
              ID: 102,
            },

            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/aa9ea372a766efa551f1fb273036e660.jpeg",
              title: "不锈钢锅",
              inventory: 105,
              price: "199.00",
              ID: 109,
            },
          ],
        },
        {
          label: "美食",
          ID: 1,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/3407608e7c5ff3d7929dac2d6b833148.jpeg",
              title: "啤酒",
              inventory: 780,
              price: "3.50",
              ID: 103,
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/3d440afc3fbfc15880c702f0e4cf864c.jpeg",
              title: "旺仔牛奶",
              inventory: 4672,
              price: "2.50",
              ID: 104,
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/976249decc06f85dcab2b4887c8b98a7.jpeg",
              title: "就很棒",
              inventory: 3564,
              price: "4.50",
              ID: 107,
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/a4dc2c293091b8b285a4c28781278c32.jpeg",
              title: "百威啤酒",
              inventory: 7610,
              price: "88.00",
              ID: 108,
            },
          ],
        },
        {
          label: "彩妆",
          ID: 2,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/41f52a7b475eed5d04e5264d83152b85.jpeg",
              title: "香水",
              inventory: 461,
              price: "199.00",
              ID: 105,
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/492b3d072456fc2c398094f5dc7d8c85.jpeg",
              title: "火山洗面奶",
              inventory: 543,
              price: "48.00",
              ID: 106,
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E9%9D%A2%E8%86%9C@2x.png",
              title: "补水保湿面膜",
              inventory: 6521,
              price: "79.90",
              ID: 101,
            },
          ],
        },
      ],
    };
  },
  methods: {
    activeGoods(k) {
      this.activeGoodsNow = k;
    },
    addGoods(option) {
      this.$emit("addPrice", option);
    },
  },
};
</script>

<style lang="less" scoped>
#classificationGoods {
  position: absolute;
  top: 1rem;
  left: 0;
  bottom: 1rem;
  display: flex;
  width: 100%;
  .left {
    width: 1.6rem;
    overflow: auto;
    ul > li {
      text-align: center;
      height: 0.86rem;
      line-height: 0.86rem;
      color: #333;
      font-size: 0.26rem;
    }
  }
  .right {
    overflow: auto;
    overflow-y: scroll;
    flex: 1;
    background-color: #fff;
    .goodsInformation {
      padding: 0.2rem 0.32rem 0.2rem 0.24rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .goodsLogo {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.2rem;
        border-radius: 0.08rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsText {
        flex: 1;
        .top {
          h3 {
            color: rgba(0, 0, 0, 0.85);
            font-size: 0.28rem;
            font-weight: bold;
            margin-bottom: 0.24rem;
          }
          p {
            color: #999;
            font-size: 0.24rem;
            font-weight: 500;
            margin-bottom: 0.44rem;
          }
        }
        .foot {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 0.28rem;
            color: #ff0202;
            font-weight: 500;
          }
          .addIcon {
            font-size: 0.4rem;
            color: #1e87fe;
          }
        }
      }
    }
  }
}
.active {
  background-color: #fff;
  color: #333;
  font-weight: bold;
}
</style>