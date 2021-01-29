<template>
  <div id="container">
    <div class="ty navTop">
      <div class="navTop_top">
        <div>我的订单</div>
        <div class="dis_flex" @click="jump_allOrder">
          查看全部
          <div class="iLogo"></div>
        </div>
      </div>
      <div class="navTop_List">
        <div
          class="navTop_listSmall"
          v-for="(item, index) in NavList"
          :key="index"
          @click="jump_order(item.activeIndex)"
        >
          <div class="Logo">
            <img :src="item.imgUrl" alt="" />
            <div class="icons" v-if="item.numIndex > 0">
              {{ item.numIndex > 99 ? "99+" : item.numIndex }}
            </div>
          </div>
          <div class="Title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="ty listUl">
      <div
        class="dis_flex"
        v-for="(item, index) in ListMenu"
        :key="index"
        @click="differents(item.clickName)"
      >
        <div class="dis_flexBox">
          <div class="img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div>{{ item.title }}</div>
        </div>
        <div class="iLogo"></div>
      </div>
    </div>
    <div class="ty exit_login" @click="exit_login">退出登入</div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  components: {
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      NavList: [
        {
          title: "待审核",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitChack@2x.png",
          activeIndex: 1,
          numIndex: 0,
        },
        {
          title: "待发货",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitSent@2x.png",
          activeIndex: 2,
          numIndex: 0,
        },
        {
          title: "待收货",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitReceive@2x.png",
          activeIndex: 3,
          numIndex: 0,
        },
        {
          title: "已完成",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitSent@2x.png",
          activeIndex: 6,
          numIndex: 0,
        },
      ],
      ListMenu: [
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%BE%AE%E4%BF%A1%E7%BB%91%E5%AE%9A%E5%88%97%E8%A1%A8@2x.png",
          title: "微信绑定列表",
          pushTo: "",
          clickName: "bandtapWX",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%9C%B0%E5%9D%80%E7%AE%A1%E7%90%86@2x.png",
          title: "地址管理",
          pushTo: "",
          clickName: "addressONE",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81@2x.png",
          title: "修改密码",
          pushTo: "",
          clickName: "changeM",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%85%B3%E4%BA%8E%E7%B3%BB%E7%BB%9F@2x.png",
          title: "关于系统",
          pushTo: "",
          clickName: "aboutWindows",
        },
      ],
      orderlists: [],
    };
  },
  created() {
    this.newinit();
  },
  methods: {
    async newinit() {
      const aiw = await this.getOrder();
      this.initNum();
    },
    getOrder() {
      return new Promise((resolve, reject) => {
        if (localStorage["order"] !== undefined) {
          this.orderlists = JSON.parse(localStorage["order"]);
          resolve();
        }
      });
    },
    initNum() {
      if (this.orderlists.length > 0) {
        this.orderlists.forEach((item) => {
          this.NavList.forEach((i) => {
            if (i.activeIndex == item.isStatus) {
              i.numIndex++;
            }
          });
        });
      }
    },
    jump_order(index) {
      this.$router.push({
        name: "myOrder",
        query: {
          activeIndex: index,
        },
      });
    },
    jump_allOrder() {
      this.$router.push({
        name: "myOrder",
        query: {
          activeIndex: 0,
        },
      });
    },
    differents(options) {
      console.log(options);
      if (options === "aboutWindows") {
        Dialog.alert({
          title: "关于系统",
          message:
            "该系统为代理系统模板，未使用涉及后端技术，属于纯前端开发，Vue框架+VantUI开发，本系统使用模块化开发思路，多种模块可复用，后期维护简单，感谢您的浏览",
          theme: "round-button",
        }).then(() => {
          // on close
        });
      }
      if (options === "addressONE") {
        this.$router.push({
          name: "addressONE",
        });
      }
      if (options === "changeM") {
        Toast.fail("修改密码功能未开发");
      }
      if (options === "bandtapWX") {
        Toast.fail("微信绑定功能未开发");
      }
    },
    exit_login() {
      Dialog.confirm({
        title: "提示",
        message: "确定退出登入吗？",
      })
        .then(() => {
          localStorage.removeItem("phone");
          this.$router.replace({
            name: "login",
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.9rem;
  .navTop {
    .navTop_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.36rem;
      .dis_flex {
        display: flex;
        align-items: center;
        color: #999;
        .iLogo {
          margin-left: 0.1rem;
        }
      }
    }
    .navTop_List {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navTop_listSmall {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0rem 0.3rem;
        .Logo {
          width: 0.6rem;
          height: 0.6rem;
          margin-bottom: 0.1rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .icons {
            position: absolute;
            top: -15%;
            left: 55%;
            // min-width: 0.28rem;
            height: 0.28rem;
            border: 0.01rem solid #ff0202;
            border-radius: 0.16rem;
            box-shadow: 0rem 0.04rem 0.12rem 0rem rgba(0, 0, 0, 0.04);
            font-size: 0.2rem;
            color: #ff0202;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            padding: 0rem 0.08rem;
            background-color: #fff;
          }
        }
        .Title {
          color: #666;
          font-weight: 500;
          font-size: 0.24rem;
        }
      }
    }
  }
  .listUl {
    margin: 0.24rem 0rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    .dis_flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1rem;
      .dis_flexBox {
        display: flex;
        align-items: center;
        .img {
          width: 0.36rem;
          height: 0.36rem;
          margin-right: 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .exit_login {
    text-align: center;
  }
}
.ty {
  box-shadow: 0rem 0.04rem 0.12rem 0rem rgba(0, 0, 0, 0.04);
  border-radius: 0.16rem;
  width: 7rem;
  padding: 0.3rem;
  background-color: #fff;
  box-sizing: border-box;
}
.iLogo {
  width: 0.15rem;
  height: 0.15rem;
  border: 0.02rem solid #979797;
  transform: rotate(45deg);
  border-left: none;
  border-bottom: none;
}
</style>