<template>
  <div id="addPrice">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="add_box">
        <p>充帐金额</p>
        <div class="priceInput">
          ￥<input
            type="text"
            placeholder="0.00"
            v-model="Addprice"
          />
        </div>
        <div class="beizu">充帐金额至少100元起</div>
      </div>
      <div class="add_SM">
        <h4>充帐备注</h4>
        <div class="input_text">
          <input type="text" placeholder="备注" v-model="cz_text" />
        </div>
      </div>
    </div>
    <div class="btn_result">
      <div class="btn" @click="btn_submit">确定</div>
    </div>
    <van-number-keyboard
      :show="show"
      v-model="Addprice"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { NumberKeyboard, Notify, Toast } from "vant";
export default {
  components: {
    navTitle,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data() {
    return {
      title: "充帐",
      rightIcon: "",
      show: false,
      Addprice: "",
      reg: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
      cz_text: "",
    };
  },
  methods: {
    handleTool() {},
    onInput(value) {
      console.log(value);
    },
    onDelete() {
      console.log("删除");
    },
    async btn_submit() {
      var self = this;
      if (this.reg.test(this.Addprice)) {
        if (this.Addprice < 100) {
          Notify({ type: "danger", message: "充帐金额不得小于100元" });
          return;
        }
        const priceSuccess = await this.priS();
        localStorage["price"] = priceSuccess;
        const newTime = await this.newDetime();
        this.local(newTime);
        Toast.success("充帐成功");
        setTimeout(function () {
          self.$router.go(-1);
        }, 1000);
      } else {
        Notify({ type: "danger", message: "请输入正确金额" });
      }
    },
    local(newTime) {
      if (localStorage["recordsList"] === undefined) {
        var recordsList = [];
      } else {
        var recordsList = JSON.parse(localStorage["recordsList"]);
      }
      let records = {
        ID: this.uuid(),
        status: 1,
        price: this.Addprice,
        newDate: newTime,
        note: this.cz_text,
      };
      recordsList.push(records);
      console.log(recordsList);
      localStorage["recordsList"] = JSON.stringify(recordsList);
    },
    uuid() {
      return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    newDetime() {
      return new Promise((resolve, reject) => {
        var myDate = new Date();
        var newTime =
          myDate.getFullYear() +
          "-" +
          myDate.getMonth() +
          1 +
          "-" +
          myDate.getDate() +
          " " +
          myDate.getHours() +
          ":" +
          myDate.getMinutes() +
          ":" +
          myDate.getSeconds();
        resolve(newTime);
      });
    },
    priS() {
      return new Promise((resolve, reject) => {
        let price = Number(localStorage["price"]) + Number(this.Addprice);
        resolve(price);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add_box {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.2rem 0.28rem 0.1rem;
  box-sizing: border-box;
  p {
    color: #1e87fe;
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }
  .priceInput {
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    padding-bottom: 0.66rem;
    border-bottom: 0.04rem solid #f2f2f2;
    input {
      flex: 1;
      margin: 0rem 0.2rem;
      width: 6rem;
      outline: none;
      border: none;
    }
  }
  .beizu {
    font-size: 0.26rem;
    color: #999;
    font-weight: 500;
    margin: 0.18rem 0rem 0.24rem 0.3rem;
  }
}
.add_SM {
  margin-top: 0.32rem;
  h4 {
    padding: 0rem 0.32rem;
    font-size: 0.28rem;
    color: #333;
    font-weight: 500;
    margin-bottom: 0.16rem;
  }
  .input_text {
    background-color: #fff;
    padding: 0.3rem 0.32rem;
    box-sizing: border-box;
    height: 1rem;
    font-size: 0.28rem;
    input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
    }
  }
}
.btn_result {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.2rem;
  .btn {
    width: 6.88rem;
    height: 0.88rem;
    background-color: #1e87fe;
    color: #fff;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.08rem;
  }
}
</style>