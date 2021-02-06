<template>
  <div id="shopList">
    <van-checkbox-group
      class="checkboxB"
      v-model="result"
      direction="horizontal"
      ref="checkboxGroup"
      @change="picker_d"
    >
      <div class="test" v-for="(item, index) in orderList" :key="index">
        <div class="checkbox">
          <van-checkbox :name="index"></van-checkbox>
        </div>
        <div class="imgLogo">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="goodsText">
          <h4>{{ item.title }}</h4>
          <p>{{ item.note_color }} {{ item.note_memory }}</p>
          <div class="dis-f">
            <div class="price">￥{{ item.price }}</div>
            <div>
              <van-stepper v-model="item.goodsIndex" @change="changeIndex" />
            </div>
          </div>
        </div>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Stepper, Toast, Dialog } from "vant";
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper,
    [Dialog.name]: Dialog
  },
  props: ["checkAll"],
  data() {
    return {
      result: [],
      checkActive: this.checkAll,
      orderList: [],
      allPrice: 0
    };
  },
  watch: {
    checkAll: "checkoutS",
    allPrice: "changePrice"
  },
  created() {
    if (localStorage["shopCarList"] !== undefined) {
      this.orderList = JSON.parse(localStorage["shopCarList"]);
    }
  },
  methods: {
    //   价格变动
    changePrice() {
      this.$emit("beafPrice", this.allPrice);
    },
    del_Order() {
      if (this.result.length === 0) {
        Toast.fail('请选中商品');
        return;
      } else {
        Dialog.confirm({
          title: "删除",
          message: "此操作将删除选中的商品，是否确认删除？"
        })
          .then(() => {
            this.checkOrder();
            this.$emit("changeIndex")
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    checkOrder() {
      var obj = [];
      for (var k in this.result) {
        obj.push(this.orderList[this.result[k]].code);
      }
      obj.forEach(item => {
        this.orderList = this.orderList.filter((items, index) => {
          return items.code !== item;
        });
      });
      localStorage["shopCarList"] = JSON.stringify(this.orderList);
      this.getWXZ();
      this.initOrder();
      // if(this.result.length === 0){
      //   this.checkActive = false
      // }
    },
    submit() {
      var obj = [];
      for (var k in this.result) {
        obj.push(this.orderList[this.result[k]]);
      }
      console.log(obj);
      this.$router.push({
        name: "settleMentGs",
        query: {
          status: 1,
          data: JSON.stringify(obj)
        }
      });
    },
    initOrder() {
      if (this.result.length === 0) {
        this.allPrice = 0;
      } else {
        this.allPrice = 0;
        this.result.forEach(item => {
          this.allPrice +=
            Number(this.orderList[item].price) *
            this.orderList[item].goodsIndex;
        });
        // console.log(this.allPrice);
      }
    },
    checkoutS() {
      this.checkActive = this.checkAll;
      if (this.checkActive) {
        this.getXH();
      } else {
        // this.getWXZ();
      }
    },
    changeIndex() {
      this.initOrder();
    },
    getXH() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    getWXZ() {
      this.$refs.checkboxGroup.toggleAll(false);
    },
    picker_d() {
      this.initOrder();
      if (this.orderList.length === 0) {
        this.$emit("checkAll", false);
      } else {
        if (this.result.length === this.orderList.length) {
          this.$emit("checkAll", true);
        } else {
          this.$emit("checkAll", false);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#shopList {
  width: 100%;
  height: 100%;
  overflow: auto;
  .checkboxB {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.02rem;
    .test {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 0.2rem 0.42rem;
      box-sizing: border-box;
      display: flex;
      .checkbox {
        margin-right: 0.24rem;
        display: flex;
        align-items: center;
      }
      .imgLogo {
        width: 1.6rem;
        background-color: skyblue;
        height: 1.6rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsText {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        h4 {
          color: #333;
          font-size: 0.28rem;
          font-weight: 500;
        }
        p {
          font-size: 0.28rem;
          color: #666;
        }
        .dis-f {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            color: #f23030;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>
