<template>
  <div id="message">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool"/>
    <div class="message_list" v-for="(item, index) in messageList" :key="index">
      <div class="message_logo">
        <img :src="item.imgUrl" alt="" />
      </div>
      <div class="message_content">
        <div class="dis_f">
          <div class="header">{{ item.title }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
        <div class="message_p">{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Icon,Toast } from "vant";
export default {
  components: {
    navTitle,
    [Icon.name]: Icon,
  },
  data() {
    return {
      title: "消息",
      rightIcon: "replay",
      messageList: [
        {
          imgUrl: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E7%9A%84%E6%8E%88%E6%9D%83@2x.png",
          title: "公司总部",
          time: "2019-03-22",
          message: "消息内容暂无编辑",
        },
        {
          imgUrl: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%BC%95%E6%B5%81%E7%A5%9E%E5%99%A8@2x.png",
          title: "艾佛森",
          time: "2016-05-20",
          message: "打打球透透气",
        },
        {
          imgUrl: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%AE%A1%E6%A0%B8%E7%AE%A1%E7%90%86@2x.png",
          title: "刘德華",
          time: "2010-01-22",
          message: "第一次打卡消息栏第一次打卡消息栏第一次打卡消息栏",
        },
      ],
    };
  },
  methods:{
      handleTool(){
          Toast.loading({
        message: "刷新中",
        forbidClick: true,
      });
      }
  }
};
</script>

<style lang="less" scoped>
#message{
  box-sizing: border-box;
  padding-top: 0.22rem;
  height: 100vh;
}
.message_list {
  box-sizing: border-box;
  padding: 0.36rem 0.32rem;
  background-color: #fff;
  height: 1.6rem;
  display: flex;
  align-items: center;
  border-bottom: 0.01rem solid #eee;
  .message_logo {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 0.16rem;
    margin-right: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .message_content {
    flex: 1;
    .dis_f {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header {
        color: #333;
        font-size: 0.32rem;
        margin-bottom: 0.04rem;
      }
      .time {
        font-size: 0.24rem;
        color: #666;
      }
    }
    .message_p {
      color: #666;
      font-size: 0.28rem;
      width: 5.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
}
.message_list:last-child{
  border-bottom: none;
}
</style>