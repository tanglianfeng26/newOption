<template>
  <!-- 工具 -->
  <div id="tool">
    <div class="tool_Bigbox">
      <div class="small_box" v-for="(item, index) in toolList" :key="index">
        <div class="header_nav">{{ item.title }}</div>
        <div class="hr_100"></div>
        <div class="more_list">
          <div
            class="little_list"
            v-for="(t, i) in item.allList"
            :key="i"
            @click="jump_page(t.urlName)"
          >
            <div class="little_list_logo">
              <img :src="t.imgUrl" alt="" />
            </div>
            <div class="little_list_title">{{ t.nav_title }}</div>
          </div>
        </div>
      </div>
    </div>
    <tab-ber :activeIndex="1" />
  </div>
</template>

<script>
import tabBer from "../../components/tabber/tabber";
export default {
  components: {
    tabBer,
  },
  data() {
    return {
      toolList: [
        {
          title: "授权管理",
          allList: [
            // {
            //   nav_title: "我的授权",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E7%9A%84%E6%8E%88%E6%9D%83@2x.png",
            //   urlName: "",
            // },
            {
              nav_title: "邀请经销商",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%82%80%E8%AF%B7%E7%BB%8F%E9%94%80%E5%95%86@2x.png",
              urlName: "InviteAgentg",
            },
            // {
            //   nav_title: "审核管理",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%AE%A1%E6%A0%B8%E7%AE%A1%E7%90%86@2x.png",
            //   urlName: "",
            // },
            // {
            //   nav_title: "我的下级",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E7%9A%84%E4%B8%8B%E7%BA%A7@2x.png",
            //   urlName: "",
            // },
            // {
            //   nav_title: "我要升级",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E8%A6%81%E5%8D%87%E7%BA%A7@2x.png",
            //   urlName: "",
            // },
            // {
            //   nav_title: "下级升级审核",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%8D%87%E7%BA%A7%E5%AE%A1%E6%A0%B8@2x.png",
            //   urlName: "",
            // },
          ],
        },
        {
          title: "交易管理",
          allList: [
            {
              nav_title: "扫码发货",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%89%AB%E7%A0%81%E5%8F%91%E8%B4%A7@2x.png",
              urlName: "sweepCodeDelivery",
            },
            {
              nav_title: "我要订货",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E8%A6%81%E8%AE%A2%E8%B4%A7@2x.png",
              urlName: "goods",
            },
            {
              nav_title: "订单管理",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%86@2x.png",
              urlName: "myOrder",
            },
            // {
            //   nav_title: "零售管理",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%9B%B6%E5%94%AE%E7%AE%A1%E7%90%86@2x.png",
            // },
            // {
            //   nav_title: "退货申请",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%80%80%E8%B4%A7%E7%94%B3%E8%AF%B7@2x.png",
            // },
            {
              nav_title: "订单审核",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%80%80%E8%B4%A7%E5%88%97%E8%A1%A8@2x.png",
              urlName: "orderPage",
            },
          ],
        },
        {
          title: "财务管理",
          allList: [
            {
              nav_title: "我的资产",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E7%9A%84%E8%B5%84%E4%BA%A7@2x.png",
              urlName: "myAssets",
            },
            // {
            //   nav_title: "奖励管理",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%A5%96%E5%8A%B1%E7%AE%A1%E7%90%86@2x.png",
            // },
          ],
        },
        {
          title: "营销工具",
          allList: [
            {
              nav_title: "幸运大转盘",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%BE%AE%E5%B0%8F%E5%BA%97@2x.png",
              urlName: "homePage",
            },
            {
              nav_title: "积分兑换商城",
              imgUrl:
                "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%97%A8%E5%BA%97%E7%AE%A1%E7%90%86@2x.png",
              urlName: "changePage",
            },
            // {
            //   nav_title: "引流神器",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%BC%95%E6%B5%81%E7%A5%9E%E5%99%A8@2x.png",
            // },
            // {
            //   nav_title: "商学院",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%95%86%E5%AD%A6%E9%99%A2@2x.png",
            // },
            // {
            //   nav_title: "报表",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%8A%A5%E8%A1%A8@2x.png",
            // },
            // {
            //   nav_title: "营业执照",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E8%90%A5%E4%B8%9A%E6%89%A7%E7%85%A7@2x.png",
            // },
            // {
            //   nav_title: "会员管理",
            //   imgUrl:
            //     "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E4%BC%9A%E5%91%98%E7%AE%A1%E7%90%86@2x.png",
            // },
          ],
        },
        // {
        //   title: "其他工具",
        //   allList: [
        //     {
        //       nav_title: "子账号管理",
        //       imgUrl:
        //         "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E5%AD%90%E8%B4%A6%E5%8F%B7%E7%AE%A1%E7%90%86@2x.png",
        //     },
        //     {
        //       nav_title: "提醒管理",
        //       imgUrl:
        //         "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%8F%90%E9%86%92%E7%AE%A1%E7%90%86@2x.png",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    jump_page(urlName) {
      this.$router.push({
        name: urlName,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tool_Bigbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding-bottom: 1.2rem;
  .small_box {
    border-radius: 0.16rem;
    box-shadow: 0rem 0.04rem 0.12rem 0rem rgba(0, 0, 0, 0.04);
    margin-top: 0.24rem;
    padding: 0.24rem 0.28rem 0.4rem;
    width: 7rem;
    box-sizing: border-box;
    background-color: #fff;
    .header_nav {
      font-size: 0.32rem;
      color: #333;
      font-weight: bold;
      margin-bottom: 0.26rem;
    }
    .hr_100 {
      width: 100%;
      height: 0.02rem;
      background-color: #eee;
    }
    .more_list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .little_list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.44rem;
        width: 25%;
        .little_list_logo {
          width: 0.6rem;
          height: 0.6rem;
          margin-bottom: 0.16rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .little_list_title {
          color: #333;
          font-size: 0.22rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>