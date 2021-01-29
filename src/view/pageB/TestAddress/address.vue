<template>
  <div id="address">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div class="big_box">
      <div class="mar_box" v-if="addressListS.length > 0">
        <van-swipe-cell
          :before-close="beforeClose"
          v-for="(item, index) in addressListS"
          :key="index"
        >
          <template #left>
            <van-button square type="primary" text="默认" @click="left(item)" />
          </template>
          <div class="addressList" @click="activeAdd(item)">
            <div class="left">
              <div class="nav_header">
                <div>{{ item.name }}</div>
                <div class="tel">{{ item.tel }}</div>
                <div class="activeIcon" v-if="item.status">默认</div>
              </div>
              <p v-if="item.address[2]">
                {{
                  item.address[0].name +
                  item.address[1].name +
                  item.address[2].name +
                  item.detailsAddress
                }}
              </p>
              <p v-else>
                {{
                  item.address[0].name +
                  item.address[1].name +
                  item.detailsAddress
                }}
              </p>
            </div>
            <div class="right_icon" @click="change_address(item)">
              <img
                src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%BC%96%E8%BE%91@2x.png"
                alt=""
              />
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="delAddress(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <!-- <div class="mar_box" v-if="addressListS.length > 0">
        <div
          class="addressList"
          v-for="(item, index) in addressListS"
          :key="index"
        >
          <div class="left">
            <div class="nav_header">
              <div>{{ item.name }}</div>
              <div class="tel">{{ item.tel }}</div>
              <div class="activeIcon" v-if="item.status">默认</div>
            </div>
            <p v-if="item.address[2]">
              {{
                item.address[0].name +
                item.address[1].name +
                item.address[2].name +
                item.detailsAddress
              }}
            </p>
            <p v-else>
              {{
                item.address[0].name +
                item.address[1].name +
                item.detailsAddress
              }}
            </p>
          </div>
          <div class="right_icon">
            <img
              src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/klf/%E7%BC%96%E8%BE%91@2x.png"
              alt=""
            />
          </div>
        </div>
      </div> -->
      <div v-else>
        <van-empty description="未添加收货地址" />
      </div>
      <div class="btn">
        <div class="btn_add" @click="add_address">+新增收货地址</div>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { Empty, SwipeCell, Dialog, Button, Cell, Toast } from "vant";
export default {
  components: {
    navTitle,
    [Empty.name]: Empty,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Cell.name]: Cell,
  },
  data() {
    return {
      title: "地址管理",
      rightIcon: "",
      addressListS: [],
      delAdd: {}, //当前点击的删除对象
      changeText: "加载",
    };
  },
  created() {
    this.init();
    this.routerQuery();
  },
  methods: {
    routerQuery() {},
    activeAdd(data) {
      if (this.$route.query.id === 9999) {
        localStorage["addressActive"] = JSON.stringify(data);
        this.$router.go(-1);
      }
    },
    init() {
      if (localStorage["addressList"] !== undefined) {
        this.addressListS = JSON.parse(localStorage["addressList"]);
      }
    },
    change_address(res) {
      this.$router.push({
        name: "addressChild",
        query: {
          cont: JSON.stringify(res),
        },
      });
    },
    // 切换为默认地址
    async left(datas) {
      const changeList = await this.forE(datas);
      this.changeText = "切换";
      const awmy = await this.animat();
      localStorage["addressList"] = JSON.stringify(changeList);
      this.init();
    },
    //选中默认
    forE(v) {
      return new Promise((resolve, reject) => {
        var objList = JSON.parse(localStorage["addressList"]);
        objList.forEach((item) => {
          if (item.id === v.id) {
            item.status = true;
          } else {
            item.status = false;
          }
        });
        resolve(objList);
      });
    },
    handleTool() {},
    add_address() {
      this.$router.push({
        name: "addressChild",
      });
    },
    delAddress(res) {
      this.delAdd = res;
    },
    async result_del() {
      var obj = JSON.parse(localStorage["addressList"]);
      var objList = [];
      obj.forEach((item, index) => {
        if (item.id !== this.delAdd.id) {
          objList.push(item);
        }
      });
      localStorage["addressList"] = JSON.stringify(objList);
      this.changeText = "删除";
      const tMe = await this.animat();
      this.init();
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          })
            .then(() => {
              this.result_del();
              instance.close();
            })
            .catch(() => {
              // on cancel
            });
          break;
      }
    },
    animat() {
      return new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: this.changeText + "中",
        });
        setTimeout(() => {
          Toast.clear();
          Toast.success(this.changeText + "成功");
          resolve();
        }, 500);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.big_box {
  padding: 0rem 0.2rem 1.4rem;
  box-sizing: border-box;
}
.mar_box {
  .addressList {
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 1;
      .nav_header {
        display: flex;
        align-items: center;
        color: #000;
        font-weight: bold;
        font-size: 0.32rem;
        .tel {
          margin: 0rem 0.2rem;
        }
        .activeIcon {
          color: #fff;
          background-color: #ff9200;
          border-radius: 0.16rem;
          width: 0.8rem;
          height: 0.32rem;
          line-height: 0.32rem;
          font-size: 0.2rem;
          text-align: center;
          font-weight: 500;
        }
      }
      p {
        font-weight: 400;
        color: #333;
        font-size: 0.24rem;
        margin-top: 0.22rem;
        font-weight: 500;
      }
    }
    .right_icon {
      width: 0.44rem;
      height: 0.44rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.28rem;
  background-color: #fff;
  .btn_add {
    width: 7rem;
    height: 0.88rem;
    background-color: #1e87fe;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.08rem;
    color: #fff;
  }
}
/deep/ .van-button {
  height: 100%;
}
</style>