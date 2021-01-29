<template>
  <!-- 我的 -->
  <div id="mine">
    <div class="big_box_mine">
      <div class="big_bg">
        <div class="nav_list">
          <div class="nav_listImg">
            <img
              src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png"
              alt=""
            />
          </div>
          <div class="nav_listTile">
            <div class="nav_listText">
              <div class="nav_listText_header">{{ phoneTabel.name }}</div>
              <div class="nav_listText_p">{{ phoneTabel.level }}</div>
            </div>
            <div class="nav_listJt" @click="changePersonalData"></div>
          </div>
        </div>
      </div>
      <container />
    </div>
    <tab-ber :activeIndex="3" />
  </div>
</template>

<script>
import tabBer from "../../components/tabber/tabber";
import container from "../pageA/mineList/container";
export default {
  components: {
    tabBer,
    container,
  },
  data() {
    return {
      phoneTabel: {},
    };
  },
  created() {
    this.initChange();
  },
  methods: {
    initChange() {
      if (localStorage["phone"] === "tourists") {
        console.log(123);
        this.phoneTabel = {
          name: "游客",
          level: "无代理权限",
        };
      } else {
        this.phoneTabel = {
          name: "卢老爷",
          level: "总代理（A001）",
        };
      }
    },
    changePersonalData() {
      this.$router.push({
        name: "personalData",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.big_box_mine {
  background-color: #f5f5f5;
  height: 100vh;
  .big_bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 4rem;
    background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/xinkongjiaH5/self/bg@2x%20(3).png")
      no-repeat center;
    background-size: 100% 4rem;
    .nav_list {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0rem 0.5rem;
      box-sizing: border-box;
      color: #fff;
      .nav_listImg {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav_listTile {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        .nav_listText {
          display: flex;
          flex-direction: column;
          .nav_listText_header {
            margin-bottom: 0.35rem;
            font-size: 0.36rem;
            font-weight: 400;
          }
          .nav_listText_p {
            font-size: 0.24rem;
            font-weight: 500;
          }
        }
        .nav_listJt {
          width: 0.15rem;
          height: 0.15rem;
          border: 0.02rem solid #fff;
          transform: rotate(45deg);
          border-left: none;
          border-bottom: none;
        }
      }
    }
  }
}
</style>