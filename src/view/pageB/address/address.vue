<template>
  <div id="address">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="changeActive"
      />
    </div>
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import { AddressList, Toast } from "vant";
export default {
  components: {
    navTitle,
    [AddressList.name]: AddressList,
  },
  data() {
    return {
      title: "地址管理",
      rightIcon: "",
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "唐先生",
          tel: "13602712680",
          address: "广东省广州市天河区伍仙桥五仙花园BX栋XXXX房",
          isDefault: true,
        },
        {
          id: "2",
          name: "彭于晏",
          tel: "13812341234",
          address: "浙江省杭州市拱墅区莫干山路XX号",
        },
      ],
    };
  },
  methods: {
    changeActive(v) {
      var query = this.$route.query;
      if (query.id === 9999) {
        localStorage.setItem("addressText", JSON.stringify(v));
        this.$router.go(-1);
      }else{
      Toast.success("选中" + v.name);
      }
    },
    handleTool() {},
    onAdd() {
      //   Toast('新增地址');
      this.$router.push({
        name: "nextAddress",
      });
    },
    onEdit(item, index) {
      console.log(item, index);
      this.$router.push({
        name: "nextAddress",
        query: {
          id: item.id,
          name: item.name,
          tel: item.tel,
          isDefault: item.isDefault,
          address: item.address,
        },
      });
      //   Toast('编辑地址:' + index);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-address-item .van-radio__icon--checked .van-icon {
  border-color: #1989fa;
  background-color: #1989fa;
}
/deep/ .van-button--danger {
  border-color: #1989fa;
  background-color: #1989fa;
}
</style>