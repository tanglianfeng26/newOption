<template>
  <div id="inviteDealers">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="inviteList">
        <div class="title">邀请级别</div>
        <div class="serve_list">
          <div class="left">经销商级别</div>
          <div class="right" @click="popple_out">
            <div class="text" v-if="levelChange.length == 0">
              选择级别<i></i>
            </div>
            <div v-else>{{ levelChange }}</div>
          </div>
        </div>
      </div>
      <div class="inviteList">
        <div class="title">邀请方式</div>
        <div class="serve_listS">
          <div
            class="small_list"
            v-for="(item, index) in listDealers"
            :key="index"
          >
            <div class="left">{{ item }}</div>
            <div class="right">
              <van-radio-group v-model="radio">
                <van-radio :name="item"></van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nextTo">
      <div class="cli" @click="submit_table">下一步</div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import navTitle from "../../../../components/navTitle/navtitle";
import { RadioGroup, Radio, Picker, Popup, Toast, Notify } from "vant";
export default {
  components: {
    navTitle,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      columns: ["总经销商", "一级经销商", "二级经销商", "特约经销商", "分销"],
      title: "邀请经销商",
      rightIcon: "",
      radio: "",
      listDealers: ["页面链接", "关注公众号"],
      show: false,
      levelChange: "",
    };
  },
  methods: {
    popple_out() {
      this.show = true;
    },
    handleTool() {},
    onConfirm(value, index) {
      this.levelChange = value;
      this.show = false;
    },
    onChange(picker, value, index) {},
    onCancel() {
      Toast("取消");
    },
    uuid(){
         return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    submit_table() {
      var data = {
        level: this.levelChange,
        radio: this.radio,
      };
      console.log(data);
      if (data.level === "") {
        Notify({ type: "danger", message: "请选择邀请级别" });
        return;
      }
      if (data.level === "") {
        Notify({ type: "danger", message: "请选择邀请方式" });
        return;
      }
      this.uuid()
      this.$router.push({
          name: "share",
          query:{
              level: data.level,
              code: this.uuid()
          }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  .inviteList {
    margin: 0.4rem 0.24rem 0rem;
    .title {
      margin-bottom: 0.2rem;
      color: #666;
      font-size: 0.28rem;
    }
    .serve_list {
      background-color: #fff;
      padding: 0.4rem 0.3rem;
      box-sizing: border-box;
      border-radius: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        font-size: 0.28rem;
        color: #333;
        font-weight: 500;
      }
      .right {
        font-size: 0.28rem;
        color: #999;

        .text {
          display: flex;
          align-items: center;
          i {
            display: block;
            width: 0.12rem;
            height: 0.12rem;
            border: 0.02rem solid #999;
            transform: rotate(45deg);
            border-left: none;
            border-bottom: none;
            margin-left: 0.1rem;
          }
        }
      }
    }
    .serve_listS {
      border-radius: 0.16rem;
      background-color: #fff;
      padding: 0.2rem 0rem;

      .small_list {
        padding: 0.2rem 0.3rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-size: 0.28rem;
          color: #333;
        }
      }
    }
  }
}
.nextTo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.28rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.24rem;
  box-sizing: border-box;
  .cli {
    width: 100%;
    height: 0.88rem;
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.88rem;
    color: #fff;
    font-size: 0.32rem;
    background-color: #1e87fe;
    font-weight: 500;
  }
}
</style>