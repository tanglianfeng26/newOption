<template>
  <div id="goodsInfo">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="swipe_box">
        <van-swipe @change="onChange">
          <van-swipe-item
            v-for="(item, index) in goodsAllInfo.goodsInfoList"
            :key="index"
            @click="open_bigImg(index)"
          >
            <img :src="item.imgUrl" alt="" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ goodsAllInfo.goodsInfoList.length }}
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="goodsInfo_header">
        <div class="goodsPrice">
          <i>￥{{ newPrice || goodsAllInfo.price }}</i>
          <del>￥{{ goodsAllInfo.oldPrice }}</del>
        </div>
        <div class="title">
          {{ goodsAllInfo.title }}
        </div>
      </div>
      <div class="price_ems">
        <div>运费<i>免运费</i></div>
        <div>销量：{{ goodsAllInfo.sales }}</div>
      </div>
      <div class="specifications" @click="show = true">
        <div v-if="activeMemory === null">规格<i>未选择</i></div>
        <div v-else>
          规格<i
            >已选：{{ goodsAllInfo.goodsInfoList[activeColor].title }}-{{
              goodsAllInfo.goodsInfoList[activeColor].memory[activeMemory]
                .memorys
            }}-{{ value }}件</i
          >
        </div>
        <div class="icon"></div>
      </div>
      <div class="goodsInfo_TextImg">
        <div class="headerTitle">商品详情</div>
        <div class="big_bg">
          <img
            v-for="(item, index) in goodsAllInfo.goodsInfoList"
            :key="index"
            :src="item.imgUrl"
            alt=""
          />
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="go_shopCar" :badge="goodsCarIndexs === 0 ? '' : goodsCarIndexs" />
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="submit_join"
      />
      <van-goods-action-button
        color="#7232dd"
        type="danger"
        text="立即购买"
        @click="submit_form"
      />
    </van-goods-action>
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      :close-on-click-overlay="popple_false"
    >
      <div class="box_allSt">
        <div class="img" @click="open_smallImg">
          <img :src="imgGoods" alt="" />
        </div>
        <div class="text">
          <h4><i>￥</i>{{ newPrice || goodsAllInfo.price }}</h4>
          <p>库存：3845件</p>
        </div>
      </div>
      <div class="specifications_box">
        <div class="color_box">
          <h4>{{ goodsAllInfo.ggName }}</h4>
          <div class="color_flex-d">
            <div
              class="_btn"
              v-for="(item, index) in goodsAllInfo.goodsInfoList"
              :key="index"
              @click="changeActive(index)"
              :class="activeColor == index ? 'active' : ''"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="color_box" v-if="Memory !== null">
          <h4>{{ goodsAllInfo.ggName2 }}</h4>
          <div class="color_flex-d">
            <div
              class="_btn"
              v-for="(item, index) in goodsAllInfo.goodsInfoList[Memory].memory"
              :key="index"
              @click="changeActiveMemory(index, item)"
              :class="activeMemory == index ? 'active' : ''"
            >
              {{ item.memorys }}
            </div>
          </div>
        </div>
      </div>
      <div class="num_btn">
        <div class="num_text">数量</div>
        <div>
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
      <div class="btn_submit">
        <div class="btn_result" @click="submit_table">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Swipe,
  SwipeItem,
  ImagePreview,
  Popup,
  Stepper,
  Toast
} from "vant";
export default {
  components: {
    navTitle,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ImagePreview.name]: ImagePreview,
    [Popup.name]: Popup,
    [Stepper.name]: Stepper
  },
  data() {
    return {
      title: "商品详情",
      rightIcon: "",
      popple_false: false,
      sendGoodsLists: {},
      goodsAllInfo: {},
      current: 0,
      show: false,
      activeColor: null,
      Memory: null,
      activeMemory: null,
      newPrice: 0,
      value: 1,
      goodsCarIndexs: 0,
      imgGoods:
        "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/c5dc348d3f943324.jpg"
    };
  },
  created() {
    this.findList();
    this.getIndexS();
  },
  methods: {
    // 前往购物车页面
    go_shopCar() {
      this.$router.replace({
        name: "shopCars"
      });
    },
    // 购物车数量
    getIndexS() {
      if (localStorage["shopCarList"] !== undefined) {
        var obj = JSON.parse(localStorage["shopCarList"]);
        this.goodsCarIndexs = obj.length;
        console.log(this.goodsCarIndexs);
      }
    },
    //   立即购买
    submit_form() {
      if (this.activeMemory == null) {
        Toast.fail("请选择规格");
        return;
      }
      this.sendGoodsLists = {
        title: this.goodsAllInfo.title,
        imgUrl: this.imgGoods,
        goodsIndex: this.value,
        price: this.newPrice,
        note_color: this.goodsAllInfo.goodsInfoList[this.activeColor].title,
        note_memory: this.goodsAllInfo.goodsInfoList[this.activeColor].memory[
          this.activeMemory
        ].memorys
      };
      this.$router.push({
        name: "settlementG",
        query: {
          data: JSON.stringify(this.sendGoodsLists)
        }
      });
    },
    // 加入购物车成功
    submit_join() {
      if (this.activeMemory == null) {
        Toast.fail("请选择规格");
        return;
      }
      this.sendGoodsLists = {
        code: this.uuid(),
        title: this.goodsAllInfo.title,
        imgUrl: this.imgGoods,
        goodsIndex: this.value,
        price: this.newPrice,
        note_color: this.goodsAllInfo.goodsInfoList[this.activeColor].title,
        note_memory: this.goodsAllInfo.goodsInfoList[this.activeColor].memory[
          this.activeMemory
        ].memorys
      };
      if (localStorage["shopCarList"] === undefined) {
        var obj = [];
        obj.push(this.sendGoodsLists);
        localStorage["shopCarList"] = JSON.stringify(obj);
      } else {
        var obj = JSON.parse(localStorage["shopCarList"]);
        obj.push(this.sendGoodsLists);
        localStorage["shopCarList"] = JSON.stringify(obj);
      }
      Toast.success("加入购物车成功");
      this.getIndexS()
    },
    uuid() {
      var rnd = "";
      for (var i = 0; i < 16; i++) rnd += Math.floor(Math.random() * 10);
      return rnd;
    },
    findList() {
      if (localStorage["shopList"] !== undefined) {
        var obj = JSON.parse(localStorage["shopList"]);
        this.goodsAllInfo = obj.filter(item => {
          return Number(item.ID) === Number(this.$route.query.ID);
        });
        this.goodsAllInfo = this.goodsAllInfo[0];
      }
    },

    changeActiveMemory(v, option) {
      this.activeMemory = v;
      this.newPrice = option.price;
    },
    //   选择规格
    changeActive(v) {
      this.activeColor = v;
      this.Memory = v;
      this.imgGoods = this.goodsAllInfo.goodsInfoList[v].imgUrl;
      this.activeMemory = null;
    },
    // 确定
    submit_table() {
      if (this.activeColor === null) {
        Toast.fail("请选择颜色");
        return;
      }
      this.show = false;
    },
    // 预览图片
    open_smallImg() {
      ImagePreview({
        images: [this.imgGoods],
        showIndex: false
      });
    },

    handleTool() {},

    onChange(index) {
      this.current = index;
    },

    open_bigImg(v) {
      var obj = [];
      this.goodsAllInfo.goodsInfoList.forEach(item => {
        obj.push(item.imgUrl);
      });
      ImagePreview({
        images: obj,
        startPosition: v
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box_allSt {
  padding: 0.18rem 0.22rem 0.3rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  border-bottom: 0.01rem solid #eee;
  .img {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 0.08rem;
    margin-right: 0.24rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    h4 {
      margin-top: 0.48rem;
      margin-bottom: 0.2rem;
      font-weight: bold;
      font-size: 0.32rem;
      color: #ff2c43;
      i {
        font-size: 0.24rem;
      }
    }
    p {
      font-size: 0.26rem;
      color: #4a4a4a;
    }
    //   height: 100%;
  }
}
.specifications_box {
  padding: 0rem 0.3rem;
  box-sizing: border-box;
  .color_box {
    margin: 0.4rem 0rem 0.2rem;
    .color_flex-d {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      ._btn {
        margin-bottom: 0.2rem;
      }
    }
    h4 {
      font-weight: 500;
      color: #333333;
      margin-bottom: 0.24rem;
    }
  }
}
.big_box {
  padding-bottom: 0.9rem;
}
.swipe_box {
  width: 7.5rem;
  height: 7.5rem;
  .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe__track {
      width: 100%;
      height: 100%;
      .van-swipe-item {
        width: 100%;
        height: 100%;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.goodsInfo_header {
  background-color: #fff;
  padding: 0rem 0.3rem;
  box-sizing: border-box;
  .goodsPrice {
    height: 1rem;
    display: flex;
    align-items: center;

    i {
      font-weight: bold;
      color: #ff2c43;
      font-style: normal;
      font-size: 0.44rem;
    }
    del {
      color: #999;
      font-size: 0.28rem;
      margin-left: 0.2rem;
      margin-top: 0.07rem;
    }
  }
  .title {
    font-size: 0.32rem;
    color: #333;
    font-weight: bold;
    padding-bottom: 0.32rem;
  }
}
.price_ems {
  height: 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-top: 0.2rem;
  padding: 0rem 0.3rem;
  box-sizing: border-box;
  justify-content: space-between;
  color: #999;
  font-size: 0.28rem;
  i {
    margin-left: 0.3rem;
    color: #000;
  }
}
.specifications {
  height: 1rem;
  box-sizing: border-box;
  padding: 0rem 0.3rem;
  margin-top: 0.2rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9999;
  font-size: 0.28rem;
  i {
    margin-left: 0.3rem;
    color: #000;
  }
  .icon {
    width: 0.12rem;
    height: 0.12rem;
    border: 0.02rem solid #999;
    transform: rotate(45deg);
    border-left: none;
    border-bottom: none;
  }
}
.goodsInfo_TextImg {
  background: #fff;
  margin-top: 0.2rem;
  .headerTitle {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #000;
    font-weight: 500;
    border-bottom: 0.02rem solid #eee;
  }
}
.custom-indicator {
  position: absolute;
  right: 0.34rem;
  bottom: 0.2rem;
  padding: 0.02rem 0.2rem;
  box-sizing: border-box;
  height: 0.34rem;
  line-height: 0.3rem;
  font-size: 0.24rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.2rem;
  color: #fff;
  opacity: 0.49;
}
i {
  font-style: normal;
}
._btn {
  margin-right: 0.24rem;
  //   width: 1.2rem;
  padding: 0rem 0.32rem;
  border-radius: 0.08rem;
  text-align: center;
  line-height: 0.64rem;
  height: 0.64rem;
  color: #333;
  border: 0.02rem solid #dddddd;
}
.num_btn {
  padding: 0rem 0.3rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.6rem;
  .num_text {
    color: #333;
    font-size: 0.28rem;
  }
}
.active {
  border: 0.02rem solid #ff2c43 !important;
  color: #ff2c43 !important;
  background-color: #fff6f6 !important;
}
.btn_submit {
  height: 1.2rem;
  position: fixed;
  bottom: 0rem;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn_result {
    width: 7rem;
    height: 0.8rem;
    border-radius: 0.44rem;
    background-color: #ff2c43;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
  }
}
.big_bg {
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/.van-popup--bottom {
  padding-bottom: 1.5rem;
}
</style>
