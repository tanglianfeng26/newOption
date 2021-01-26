<template>
  <div id="AddAddress">
    <nav-title
      :title="conditions ? '修改地址' : '新增地址'"
      :navRight="rightIcon"
      @changeTool="handleTool"
    />
    <div>
      <van-address-edit
        :area-list="areaList"
        :show-delete="conditions"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        :address-info="addressInfo"
      />
    </div>
  </div>
</template>

<script>
import area from "../../../../static/area";
import navTitle from "../../../components/navTitle/navtitle";
import { AddressEdit, Toast } from "vant";
export default {
  components: {
    navTitle,
    [AddressEdit.name]: AddressEdit,
  },
  data() {
    return {
      title: "新增地址",
      rightIcon: "",
      areaList: {},
      searchResult: [],
      conditions: false,
      addressInfo: {},
    };
  },
  created() {
    var dete = this.$route.query;
    this.areaList = area;
    if (this.$route.query.id === undefined) {
      this.conditions = false;
    } else {
      this.conditions = true;
      this.addressInfo = {
        name: dete.name,
        tel: dete.tel,
        isDefault: dete.isDefault,
        addressDetail: dete.address,
        id: dete.id,
      };
    }
  },
  methods: {
    handleTool() {},
    onSave(v) {
      var self = this;
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "模拟保存中",
      });
      setTimeout(() => {
        // 手动清除 Toast
        Toast.clear();
        self.$router.go(-1);
        Toast({
          message: "维护中",
          icon: "cross",
        });
      }, 2000);
    },
    onDelete(v) {
      console.log(v);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #1989fa;
  border-color: #1989fa;
  outline: none;
}
</style>