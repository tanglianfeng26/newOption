<template>
  <div id="AddAddress">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="ReceivingInformation">
        <div class="list">
          <div class="title">姓名</div>
          <input
            type="text"
            placeholder="请输入姓名"
            v-model="formTabel.name"
          />
        </div>
        <div class="list">
          <div class="title">手机号</div>
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="formTabel.tel"
          />
        </div>
        <div class="list" @click="showPopple = true">
          <div class="title">地区</div>
          <div class="addressNoInput" v-if="formTabel.address">
            {{
              formTabel.address[2]
                ? formTabel.address[0].name +
                  formTabel.address[1].name +
                  formTabel.address[2].name
                : formTabel.address[0].name + formTabel.address[1].name
            }}
          </div>
          <div class="addressNoInput" v-else>省/市/区</div>
          <div class="icon"></div>
        </div>
        <div class="list">
          <div class="title">详细地址</div>
          <input
            type="text"
            placeholder="请输入详细地址"
            v-model="formTabel.detailsAddress"
          />
        </div>
      </div>
      <div class="isActiveBox">
        <div>设为默认地址</div>
        <div class="childrenBox">
          <van-switch v-model="checked" size="0.34rem" />
        </div>
      </div>
      <div class="isSubmit">
        <div class="btn_submit" @click="sumbit">保存</div>
      </div>
    </div>
    <van-popup
      v-model="showPopple"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-area
        title="标题"
        :area-list="areaList"
        @confirm="result"
        @cancel="showPopple = false"
    /></van-popup>
  </div>
</template>

<script>
import area from "../../../../static/area";
import navTitle from "../../../components/navTitle/navtitle";
import { Switch, Popup, Area, Toast } from "vant";
export default {
  components: {
    navTitle,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Area.name]: Area,
  },
  data() {
    return {
      title: "新增地址",
      rightIcon: "",
      areaList: area,
      checked: false,
      showPopple: false,
      formTabel: {},
    };
  },
  created() {},
  methods: {
    handleTool() {},
    result(v) {
      var obj = [];
      v.forEach((item, index) => {
        obj.push(item);
      });
      this.formTabel.address = obj;
      this.showPopple = false;
    },
    // 提交
    async sumbit() {
      this.formTabel.status = this.checked;
      console.log(this.formTabel);
      this.getList();
      const awa = await this.animat();
      this.$router.go(-1);
    },
    animat() {
      return new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "保存中",
        });
        setTimeout(() => {
          Toast.clear();
          Toast.success("保存成功");
          resolve();
        }, 1000);
      });
    },
    //保存到缓存
    getList() {
      if (localStorage["addressList"] === undefined) {
        var obj = [];
        obj.push(this.formTabel);
        localStorage["addressList"] = JSON.stringify(obj);
      } else {
        var objs = JSON.parse(localStorage["addressList"]);
        objs.push(this.formTabel);
        localStorage["addressList"] = JSON.stringify(objs);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  padding: 0rem 0.2rem;
  box-sizing: border-box;
  .ReceivingInformation {
    margin-top: 0.2rem;
    border-radius: 0.18rem;
    padding: 0rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    .list {
      height: 1rem;
      border-bottom: 0.01rem solid #eeeeee;
      display: flex;
      align-items: center;
      padding: 0rem 0.2rem;
      box-sizing: border-box;
      font-size: 0.28rem;
      color: #333;
      .addressNoInput {
        flex: 1;
      }
      .icon {
        width: 0.14rem;
        height: 0.14rem;
        border: 0.02rem solid #979797;
        border-left: none;
        border-bottom: none;
        transform: rotate(45deg);
      }
      .title {
        width: 1.4rem;
      }
      input {
        flex: 1;
        outline: none;
        border: none;
      }
    }
    .list:last-child {
      border-bottom: none;
    }
  }
  .isActiveBox {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 0.18rem;
    margin-top: 0.2rem;
    font-size: 0.28rem;
    padding: 0rem 0.4rem;
    .childrenBox {
      display: flex;
      align-items: center;
    }
  }
  .isSubmit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn_submit {
      width: 7rem;
      height: 0.88rem;
      background-color: #1e87fe;
      color: #fff;
      border-radius: 0.08rem;
      line-height: 0.88rem;
      text-align: center;
    }
  }
}
</style>