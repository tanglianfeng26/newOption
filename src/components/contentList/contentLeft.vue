<template>
  <div id="contentLeft">
    <el-menu
    v-for="(item, k) in navList" :key="k"
      :default-active="path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="changeActive"
      background-color="#282a37"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
        <el-submenu v-if="item.scope === 'moreList'" :index="item.numIndex">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="(items, indexs) in item.mList"
              :key="indexs"
              :index="items.url"
              >{{ items.label }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      navList: [
        {
          label: "抽奖活动",
          numIndex: "1",
          icon: "el-icon-s-shop",
          scope: "moreList",
          title: "抽奖模块",
          mList: [
            {
              label: "抽奖活动",
              numIndex: "1 - 1",
              url: "/draw/drawLucky",
            },
            // {
            //   label: "抽奖设置",
            //   numIndex: "1 - 2",
            //   url: "/LotteryIsSet",
            // },
            // {
            //   label: "新增奖项",
            //   numIndex: "1 - 3",
            //   url: "/editingAwards",
            // },
            {
              label: "抽奖记录",
              numIndex: "1 - 4",
              url: "/draw/lotteryRecord",
            },
            {
              label: "奖品发货",
              numIndex: "1 - 5",
              url: "/draw/awardingOperation",
            },
            {
              label: "发货记录",
              numIndex: "1 - 6",
              url: "/draw/awardRecord",
            },
          ],
        },
        {
          label: "积分商城",
          numIndex: "2",
          icon: "el-icon-s-ticket",
          scope: "moreList",
          title: "积分兑换",
          mList: [
            {
              label: "积分订单",
              numIndex: "2 - 1",
              url: "/integral/integralOrder",
            },
            {
              label: "批量发货",
              numIndex: "2 - 2",
              url: "/integral/bulkShipment",
            },
            {
              label: "积分用户",
              numIndex: "2 - 3",
              url: "/integral/integratingUser",
            },
            {
              label: "积分商品列表",
              numIndex: "2 - 4",
              url: "/integral/listCredits",
            },
          ],
        },
        {
          label: "未编辑",
          numIndex: "3",
          icon: "el-icon-s-order",
          url: "/login",
        },
      ],
    };
  },
  created() {
    this.onRouteChanged();
  },
  watch: {
    $route: "onRouteChanged",
  },

  methods: {
    onRouteChanged() {
      this.path = this.$route.path;
    },
    changeActive(v) {
      this.path = v;
      console.log(v);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>