<template>
  <div id="share">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="bg">
        <div class="header">上级邀请人：唐先生</div>
        <div class="header_">邀请您成为：{{ level }}</div>
        <div class="header_id">订单ID：{{ code }}</div>
        <div class="wx_img">
          <img
            src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/qinrenxuan/Mall/self/mychat.cffeba9.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="time">
        链接剩余有效时间：{{ isNumber ? timeSet + "秒" : timeSet }}
      </div>
      <div class="btnBox">
        <div class="btn_fx" @click="fx">分享</div>
      </div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="active_change"
    />
  </div>
</template>

<script>
import navTitle from "../../../../components/navTitle/navtitle";
import { ShareSheet, Toast } from "vant";
export default {
  components: {
    navTitle,
    [ShareSheet.name]: ShareSheet,
  },
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      level: this.$route.query.level,
      code: this.$route.query.code,
      title: "邀请经销商",
      rightIcon: "",
      timeSet: 360,
      isNumber: true,
    };
  },
  mounted() {
    this.setIn();
  },
  methods: {
    fx() {
      this.showShare = true;
    },
    setIn() {
      var self = this;
      const ds = setInterval(function () {
        if (self.timeSet <= 1) {
          clearInterval(ds);
          self.isNumber = false;
          self.timeSet = "已过期";
        } else {
          self.timeSet--;
        }
      }, 1000);
    },
    handleTool() {},
    active_change(Option) {
      if (Option.name === "复制链接") {
          var url = window.location.href
          const inputs = document.createElement('input')
          document.body.appendChild(inputs)
          inputs.setAttribute('value',url) 
          inputs.select()
          document.execCommand('copy')
        this.showShare = false;
        Toast.success('复制成功');
      } else {
        this.showShare = false;
        Toast(Option.name + "分享未开发");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#share {
  height: 100vh;
  background-color: #fff;
}
.big_box {
  .bg {
    width: 100%;
    height: 9.29rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .wx_img {
      width: 5rem;
      height: 5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header {
      margin: 0.8rem 0rem 0.2rem;
    }
    .header_ {
      margin-bottom: 0.2rem;
    }
    .header_id {
      margin-bottom: 0.4rem;
    }
  }

  .time {
    width: 100%;
    text-align: center;
    margin: 0.6rem 0rem 0.2rem;
    color: #ff0202;
  }
  .btnBox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.2rem 0.24rem;
    box-sizing: border-box;
    height: 1.28rem;
    .btn_fx {
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      background-color: #1e87fe;
      border-radius: 0.08rem;
      color: #fff;
    }
  }
}
</style>