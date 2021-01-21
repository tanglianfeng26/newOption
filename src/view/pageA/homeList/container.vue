<template>
  <div id="container">
    <div class="ty container_firstBox">
      <div class="tool_list" v-for="(item, index) in PNlist" :key="index">
        <div class="tool_list_num">{{ item.num }}</div>
        <div class="tool_list_pn">{{ item.label }}</div>
      </div>
    </div>
    <div class="ty dis-f container_secordBox">
      <div class="team_list" v-for="(item, index) in teamList" :key="index" @click="jump_fun(item.urlName)">
        <div class="team_listImg">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="team_listLabel">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="ty dis-f container_threeBox">
      <div class="left_logo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E7%9A%84%E5%BE%85%E5%8A%9E@2x.png"
          alt=""
        />
      </div>
      <div class="w2"></div>
      <div class="dis-f teamTolist">
        <div
          class="teamTo_childrenBox"
          v-for="(item, index) in dbList"
          :key="index"
        >
          <div class="childrenLogoImg">
            <img :src="item.imgUrl" alt="" />
            <div class="numTs" v-if="item.num > 0">
              {{ item.num > 99 ? "99+" : item.num }}
            </div>
          </div>
          <div class="childrenLabel">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="ty mr_b">
      <ve-line :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      PNlist: [
        {
          num: 2,
          label: "团队人数",
        },
        {
          num: 1,
          label: "新增人数",
        },
        {
          num: 0,
          label: "我的本月出货",
        },
        {
          num: 0,
          label: "下级本月出货",
        },
      ],
      teamList: [
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%89%AB%E7%A0%81%E5%8F%91%E8%B4%A7@2x.png",
          label: "扫码发货",
          urlName: "sweepCodeDelivery"
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E6%88%91%E8%A6%81%E8%AE%A2%E8%B4%A7@2x.png",
          label: "我要订货",
          urlName: "goods"
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%86@2x.png",
          label: "订单管理",
        },
        {
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E9%82%80%E8%AF%B7%E7%BB%8F%E9%94%80%E5%95%86@2x.png",
          label: "邀请代理",
        },
      ],
      dbList: [
        {
          num: 991,
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E4%B8%8B%E7%BA%A7%E8%AE%A2%E5%8D%95%E5%AE%A1%E6%A0%B8@2x.png",
          label: "下级订单审核",
        },
        {
          num: 2,
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E4%B8%8B%E7%BA%A7%E5%8D%87%E7%BA%A7%E5%AE%A1%E6%A0%B8@2x.png",
          label: "下级升级审核",
        },
        {
          num: 0,
          imgUrl:
            "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/%E4%B8%8B%E7%BA%A7%E7%94%B3%E8%AF%B7%E5%AE%A1%E6%A0%B8@2x.png",
          label: "下级申请审核",
        },
      ],
    };
  },
  methods:{
    jump_fun(option){
      this.$router.push({
        name: option
      })
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.76rem;
  .mr_b {
    margin-bottom: 1.3rem;
  }
  .container_firstBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .tool_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0rem 0.2;
      width: 1.7rem;
      .tool_list_num {
        color: #333;
        font-size: 0.32rem;
        margin-bottom: 0.12rem;
      }
      .tool_list_pn {
        font-size: 0.22rem;
        color: #666;
      }
    }
  }
  .container_secordBox {
    justify-content: space-around;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    .team_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      .team_listImg {
        width: 0.55rem;
        height: 0.55rem;
        margin-bottom: 0.22rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .team_listLabel {
        font-size: 0.22rem;
        color: #333;
      }
    }
  }
  .container_threeBox {
    .left_logo {
      width: 0.8rem;
      height: 0.8rem;
      margin: 0rem 0.26rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .w2 {
      width: 0.04rem;
      height: 0.76rem;
      background-color: #e5e5e5;
    }
    .teamTolist {
      justify-content: space-around;
      flex: 1;
      padding: 0rem 0.2rem;
      box-sizing: border-box;
      .teamTo_childrenBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .childrenLogoImg {
          width: 0.48rem;
          height: 0.48rem;
          margin-bottom: 0.15rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .numTs {
            position: absolute;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            top: -0.15rem;
            left: 50%;
            font-size: 0.2rem;
            border-radius: 0.16rem;
            border: 0.02rem solid #ff0202;
            color: #ff0202;
            background-color: #fff;
            padding: 0rem 0.08rem;
            height: 0.32rem;
            min-width: 0.32rem;
            box-sizing: border-box;
          }
        }
        .childrenLabel {
          color: #333;
          font-size: 0.22rem;
        }
      }
    }
  }
}
.ty {
  width: 7rem;
  border-radius: 0.16rem;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04);
  padding: 0.32rem 0rem;
  box-sizing: border-box;
  margin-bottom: 0.24rem;
}
.dis-f {
  display: flex;
  align-items: center;
}
</style>