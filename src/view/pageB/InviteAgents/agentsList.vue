<template>
  <div id="agentsList">
    <div class="agentList" v-for="(item,index) in agentsList" :key="index">
      <div class="left_box">
        <h4>{{item.title}}</h4>
        <p>授权号：{{item.license}}</p>
        <p>级别：{{item.level}}</p>
        <p>状态：{{item.status}}</p>
      </div>
      <div class="right_box">
        <div class="top" @click="jump_agentS">邀请经销商</div>
        <div class="bottom" @click="invitedToRecord">邀请记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant"
export default {
  data() {
    return {
      agentsList: [
        {
          title: "唐适面膜",
          license: "A0987",
          level: "总经销商",
          status: "正常",
          ID: 1,
        },
        {
          title: "唐适洗护",
          license: "A0988",
          level: "总经销商",
          status: "正常",
          ID: 2,
        },
      ],
    };
  },
  methods:{
      jump_agentS(){
          this.$router.push({
              name: "inviteDealers"
          })
      },
      invitedToRecord(){
        Toast.fail("未编译")
      }
  }
};
</script>

<style lang="less" scoped>
#agentsList {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0.24rem;
  .agentList {
    margin-top: 0.24rem;
    box-sizing: border-box;
    padding: 0.3rem;
    background-color: #fff;
    width: 100%;
    border-radius: 16px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.4rem;
    .left_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        font-size: 0.28rem;
        color: #333;
        margin-bottom: 0.14rem;
      }
      p {
        font-size: 0.24rem;
        color: #999;
      }
    }
    .right_box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .top {
        width: 1.6rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        background-color: #1e87fe;
        color: #fff;
        font-size: 0.24rem;
        border-radius: 0.08rem;
      }
      .bottom {
        width: 1.6rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        background-color: #fff;
        color: #1e87fe;
        font-size: 0.24rem;
        border-radius: 0.08rem;
        border: 0.02rem solid #1e87fe;
      }
    }
  }
}
</style>