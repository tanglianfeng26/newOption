<template>
  <div id="accountingRecords">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="no_list" v-if="accountList.length === 0">
        <van-empty description="暂无记录" />
      </div>
      <div
        class="list"
        v-else
        v-for="(item, index) in accountList"
        :key="index"
      >
        <div
          class="header"
          :style="item.status === 1 ? 'color:#FF0202' : 'color:#0CBA3A'"
        >
          ￥{{ item.price }}
        </div>
        <div class="listOrder">
          <div>订单号：{{ item.ID }}</div>
          <div class="speak">
            状态：{{ item.status === 1 ? "充帐" : "减帐" }}
          </div>
          <div class="speak">时间：{{ item.newDate }}</div>
          <div class="speak" v-if="item.note.length !== 0">
            说明：{{ item.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty } from "vant";
export default {
  components: {
    navTitle,
    [Empty.name]: Empty,
  },
  data() {
    return {
      title: "我的记账",
      rightIcon: "",
      accountList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleTool() {},
    init() {
      if (localStorage["recordsList"] === undefined) {
      } else {
        this.accountList = JSON.parse(localStorage["recordsList"]);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  .no_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    .imgLogo {
      width: 2.5rem;
      height: 2.5rem;
      background-color: skyblue;
      margin-bottom: 0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .list {
    padding-left: 0.32rem;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 0.22rem;
    font-size: 0.28rem;
    .header {
      font-size: 0.32rem;
      height: 0.78rem;
      line-height: 0.78rem;
      border-bottom: 0.02rem solid #f2f2f2;
    }
    .listOrder {
      padding: 0.1rem 0rem 0.2rem;
      color: #666;
      .speak {
        margin-top: 0.08rem;
      }
    }
  }
}
</style>