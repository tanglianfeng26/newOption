<template>
  <!-- 个人资料 -->
  <div id="personalData">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="ty clt">
      <div class="clt_dis-f" v-for="(item, index) in DataList" :key="index">
        <div>{{ item.label }}</div>
        <div class="clt_dis-f_children" v-if="item.scoped === 'headImg'">
          <div class="headImg" @click="changePopple(item)">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="iwt"></div>
        </div>
        <div class="color_999" v-else>
          {{ item.datas }}
        </div>
      </div>
    </div>
    <div class="center_header">授权品牌</div>
    <div class="ty inputList">
      <van-collapse
        v-model="activeName"
        accordion
        v-for="(item, index) in itemList"
        :key="index"
      >
        <van-collapse-item :title="item.title" :name="index">{{
          item.text
        }}</van-collapse-item>
      </van-collapse>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onChangeT"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Collapse, CollapseItem, ActionSheet, ImagePreview, Toast } from "vant";
export default {
  components: {
    navTitle,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [ActionSheet.name]: ActionSheet,
    [ImagePreview.name]: ImagePreview,
    [Toast.name]: Toast,
  },
  data() {
    return {
      title: "我的信息",
      rightIcon: "",
      show: false,
      actions: [
        { name: "查看大图", index: 0 },
        { name: "更换头像", index: 1 },
      ],
      activeName: 0,
      DataList: [
        {
          label: "头像",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png",
          scoped: "headImg",
        },
        {
          label: "手机号",
          datas: "1360271268x",
        },
        {
          label: "微信号",
          datas: "XXX1626",
        },
        {
          label: "地址",
          datas: "广东省广州市天河区伍仙桥",
        },
      ],
      itemList: [
        {
          title: "唐氏面膜",
          text: "代码是写出来给人看的，附带能在机器上运行",
        },
        {
          title: "唐氏护肤",
          text: "代码是写出来给人看的，附带能在机器上运行",
        },
        {
          title: "唐氏洗护",
          text: "代码是写出来给人看的，附带能在机器上运行",
        },
        {
          title: "唐氏大健康",
          text: "代码是写出来给人看的，附带能在机器上运行",
        },
        {
          title: "唐氏新能源",
          text: "代码是写出来给人看的，附带能在机器上运行",
        },
      ],
    };
  },
  methods: {
    handleTool() {},
    changePopple() {
      this.show = true;
    },
    onChangeT(v, a, item) {
      if (v.index == 0) {
        ImagePreview([
          "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png",
        ]);
      }
      if (v.index == 1) {
        Toast.fail("暂无此功能");
      }
    },
    onCancel() {},
  },
};
</script>

<style lang="less" scoped>
#personalData {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0rem 0.3rem;
  font-size: 0.28rem;
  .clt {
    padding: 0rem 0.3rem;
    .clt_dis-f {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0rem;
      box-sizing: border-box;
      border-bottom: 0.01rem solid #eee;
      .color_999 {
        color: #999;
      }
      .clt_dis-f_children {
        display: flex;
        align-items: center;
        .headImg {
          margin-right: 0.2rem;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .clt_dis-f:last-child {
    border: none;
  }
  .center_header {
    width: 100%;
    margin: 0.24rem 0rem;
    padding: 0rem 0.3rem;
    box-sizing: border-box;
    color: #999;
    font-weight: 500;
  }
  .inputList {
    padding: 0rem 0.1rem;
    margin-top: 0rem;
  }
}
.ty {
  margin-top: 0.24rem;
  border-radius: 0.16rem;
  padding: 0.3rem;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
}
.iwt {
  width: 0.15rem;
  height: 0.15rem;
  border: 0.02rem solid #979797;
  transform: rotate(45deg);
  border-left: none;
  border-bottom: none;
}
/deep/ .van-collapse {
  width: 100%;
}
</style>