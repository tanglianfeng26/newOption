<template>
  <div id="nav">
    <div class="nav_LeftAndLogo">
      <span class="el-icon-cpu"></span>
      模块
    </div>
    <div class="nav_LeftAndLogo">
      <span class="el-icon-setting"></span>
      管理
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#nav {
  height: 60px;
  width: 100%;
  background-color: #282a37;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  font-size: 18px;
  box-sizing: border-box;
  color: #fff;
  .nav_LeftAndLogo {
    .el-icon-cpu{
      margin-right: 10px;
    }
  }
}
</style>