<template>
  <div id="container">
    <div class="ty navTop">
      <div class="navTop_top">
        <div>我的订单</div>
        <div class="dis_flex">
          查看全部
          <div class="iLogo"></div>
        </div>
      </div>
      <div class="navTop_List">
        <div
          class="navTop_listSmall"
          v-for="(item, index) in NavList"
          :key="index"
        >
          <div class="Logo">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="Title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="ty listUl">
      <div class="dis_flex" v-for="(item, index) in ListMenu" :key="index">
        <div class="dis_flexBox">
          <div class="img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div>{{ item.title }}</div>
        </div>
        <div class="iLogo"></div>
      </div>
    </div>
    <div class="ty exit_login">退出登入</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NavList: [
        {
          title: "待审核",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitChack@2x.png",
        },
        {
          title: "待发货",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitSent@2x.png",
        },
        {
          title: "待收货",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitReceive@2x.png",
        },
        {
          title: "已完成",
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/waitSent@2x.png",
        },
      ],
      ListMenu: [
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%BE%AE%E4%BF%A1%E7%BB%91%E5%AE%9A%E5%88%97%E8%A1%A8@2x.png",
          title: "微信绑定列表",
          pushTo: "",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%9C%B0%E5%9D%80%E7%AE%A1%E7%90%86@2x.png",
          title: "地址管理",
          pushTo: "",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81@2x.png",
          title: "修改密码",
          pushTo: "",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/selfIMG/%E5%85%B3%E4%BA%8E%E7%B3%BB%E7%BB%9F@2x.png",
          title: "关于系统",
          pushTo: "",
        },
      ],
    };
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
      .dis_flex{
          display: flex;
          align-items: center;
          color: #999;
          .iLogo{
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
          img {
            width: 100%;
            height: 100%;
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