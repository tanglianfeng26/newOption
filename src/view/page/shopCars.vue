<template>
  <div id="shopCars">
    <div class="big_box">
      <div class="nav_btn">
        <van-checkbox v-model="checked" @click="changeActive"
          >全选</van-checkbox
        >
        <van-icon class="font-s" name="delete-o" @click="del_order" />
      </div>
      <div class="shopList">
        <shop-list
          v-if="orderList"
          :checkAll="checked"
          @beafPrice="getPrice"
          @checkAll="checkAll"
          @changeIndex="changeIndex"
          ref="change"
        />
        <van-empty v-else description="购物车为空" />
      </div>
      <div class="footer_submit">
        <div class="price">
          合计：<i>￥</i> <span>{{ allPrice }}</span>
        </div>
        <div class="btn" @click="submit_tj">提交订单</div>
      </div>
    </div>
    <tab-bar :activeIndex="3" ref="newIndex"/>
  </div>
</template>

<script>
import shopList from "../pageA/shopCars/shopList";
import tabBar from "../../components/tabber/tabber";
import { Checkbox, CheckboxGroup, Icon, Empty, Toast } from "vant";
export default {
  components: {
    tabBar,
    shopList,
    [Checkbox.name]: Checkbox,
    [Empty.name]: Empty,
    [CheckboxGroup.name]: CheckboxGroup,
    [Icon.name]: Icon
  },
  data() {
    return {
      checked: false,
      allPrice: 0,
      orderList: false
    };
  },
  created() {
    if (localStorage["shopCarList"] !== undefined && JSON.parse(localStorage["shopCarList"]).length > 0) {
      this.orderList = true;
    }
  },
  watch: {},
  methods: {
    getPrice(v) {
      this.allPrice = v;
    },
    checkAll(v) {
      this.checked = v;
    },
    changeActive() {
      console.log(this.checked);
      if (this.orderList) {
        if (!this.checked) {
          this.$refs.change.getWXZ();
        }
      } else {
        Toast.fail("无订单");
      }
    },
    del_order() {
      if (this.orderList) {
        this.$refs.change.del_Order();
      } else {
        Toast.fail("无订单");
      }
    },
    changeIndex(){
      this.$refs.newIndex.getIndexS();
    },
    submit_tj() {
      if (this.orderList) {
        this.$refs.change.submit();
      }else{
        Toast.fail("无订单");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.big_box {
  padding-top: 1rem;
  box-sizing: border-box;
  .nav_btn {
    height: 0.88rem;
    background: #fff;
    color: #333;
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    padding: 0rem 0.44rem 0rem 0.22rem;
    box-sizing: border-box;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    .font-s {
      font-size: 0.34rem;
    }
  }
  .shopList {
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    bottom: 2rem;
  }
  .footer_submit {
    display: flex;
    align-items: center;
    height: 1rem;
    background-color: #fff;
    padding: 0rem 0.22rem;
    justify-content: flex-end;
    position: fixed;
    bottom: 1.01rem;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    .price {
      color: #666;
      font-size: 0.28rem;
      i {
        font-size: 0.24rem;
        color: #f23030;
        font-style: normal;
      }
      span {
        color: #f23030;
        font-size: 0.4rem;
      }
    }
    .btn {
      margin-left: 0.2rem;
      background-color: #f23030;
      color: #fff;
      height: 0.8rem;
      width: 2.2rem;
      border-radius: 0.44rem;
      font-size: 0.32rem;
      line-height: 0.8rem;
      text-align: center;
    }
  }
}
</style>
