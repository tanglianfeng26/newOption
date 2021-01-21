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
          label: "彩妆",
          ID: 0,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
              title: "补水保湿面膜",
              inventory: 3564,
              price: "323.50",
              ID: 100
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E9%9D%A2%E8%86%9C@2x.png",
              title: "补水保湿面膜",
              inventory: 3564,
              price: "323.50",
              ID: 101

            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
              title: "补水保湿面膜",
              inventory: 3564,
              price: "323.50",
              ID: 102

            },
          ],
        },
        {
          label: "护肤",
          ID: 1,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
              title: "补水保湿洗面奶",
              inventory: 264,
              price: "103.50",
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E9%9D%A2%E8%86%9C@2x.png",
              title: "祛痘面膜",
              inventory: 384,
              price: "83.00",
            },
          ],
        },
        {
          label: "洗护",
          ID: 2,
          goods: [
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E9%9D%A2%E8%86%9C@2x.png",
              title: "补水保湿面膜",
              inventory: 3564,
              price: "323.50",
            },
            {
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/%E4%BA%A7%E5%93%811@2x.png",
              title: "补水保湿面膜",
              inventory: 3564,
              price: "323.50",
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
      option.inventory--;
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
    ul > li {
      text-align: center;
      height: 0.86rem;
      line-height: 0.86rem;
      color: #333;
      font-size: 0.26rem;
    }
  }
  .right {
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