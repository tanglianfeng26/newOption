<template>
  <div id="shopGoods">
    <div class="big_box">
      <div class="nav_box">
        <van-icon name="aim" />
        <input
          v-model="searchText"
          class="nav_tabber"
          type="text"
          placeholder="请输入商品关键词"
        />
        <van-icon
          v-if="searchText.length > 0"
          name="clear"
          @click="clearSearch"
        />
      </div>
      <div class="swipe_box" v-if="goodsListT.length !== 0">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#F94545">
          <van-swipe-item v-for="(item, index) in swipeList" :key="index">
            <img :src="item.imgUrl" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="goodsList" v-if="goodsListT.length !== 0">
        <div class="title_header"><i></i><span>精选商品</span></div>
        <div class="box_goods">
          <div
            class="goods"
            v-for="(item, index) in goodsListT"
            :key="index"
            @click="jump_goodsText(item.ID)"
          >
            <div class="goods_img">
              <img :src="item.goodsInfoList[0].imgUrl" alt="" />
            </div>
            <div class="goods_title">{{ item.title }}</div>
            <div class="goods_price">￥{{ item.price }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty description="未搜索到商品" />
      </div>
    </div>
    <tab-bar :activeIndex="2" />
  </div>
</template>

<script>
import tabBar from "../../components/tabber/tabber";
import { Icon, Swipe, SwipeItem, Empty } from "vant";
export default {
  components: {
    tabBar,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Empty.name]: Empty,
  },
  data() {
    return {
      swipeList: [
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BA%BA%E7%89%A9%E6%8F%92%E7%94%BB@2x.png",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BA%BA%E7%89%A9%E6%8F%92%E7%94%BB@2x.png",
        },
      ],
      goodsListT: [],
      searchText: "",
    };
  },
  created() {
    this.initList();
  },
  watch: {
    searchText: "blurShop",
  },
  methods: {
    clearSearch() {
      this.searchText = "";
      this.initList();
    },
    blurShop() {
      if (this.searchText.length == 0) {
        this.initList();
      } else {
        var objs = JSON.parse(localStorage["shopList"]);
        this.goodsListT = objs.filter((item) => {
          return item.title.includes(this.searchText);
        });
      }
    },
    initList() {
      this.goodsListT = JSON.parse(localStorage["shopList"]);
    },
    jump_goodsText(v) {
      this.$router.push({
        name: "goodsInfo",
        query: {
          ID: v,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#shopGoods {
  background-color: #fff;
  min-height: 100vh;
}
.big_box {
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem; 
  .nav_box {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 0.34rem;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    .van-icon {
      font-size: 0.35rem;
      color: #999999;
      display: block;
      width: 0.32rem;
      height: 0.32rem;
    }
    input {
      flex: 1;
      border: none;
      background-color: transparent;
      padding: 0rem 0.2rem;
      box-sizing: border-box;
      height: 0.68rem;
    }
  }
  .swipe_box {
    margin-top: 0.3rem;
    border-radius: 0.16rem;
    overflow: hidden;
    width: 100%;
    height: 3.2rem;
  }
  .goodsList {
    width: 100%;
    .title_header {
      display: flex;
      align-items: center;
      height: 1rem;
      margin-top: 0.6rem;
      i {
        width: 0.08rem;
        height: 0.32rem;
        background-color: #ff2c43;
        border-radius: 0.04rem;
        margin-right: 0.14rem;
      }
      span {
        color: #333;
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    .box_goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods {
        margin: 0.2rem 1%;
        height: 4.56rem;
        width: 48%;
        .goods_img {
          width: 100%;
          height: 3.4rem;
          border-radius: 0.16rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goods_title {
          margin-top: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.28rem;
          white-space: nowrap;
          width: 3.2rem;
        }
        .goods_price {
          margin-top: 0.16rem;
          color: #ff2c43;
          font-weight: bold;
          font-size: 0.28rem;
        }
      }
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.2rem;
  line-height: 3.2rem;
  height: 3.2rem;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>