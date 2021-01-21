<template>
  <div id="searchTab">
    <div class="box">
      <div class="searchNav_left" @click="go_back"></div>
      <input class="search" v-model="searchContent" type="text" :placeholder="search_placeholder" />
      <div class="searchBtn" @click="search">搜索</div>
    </div>
  </div>
</template>

<script>
export default {
    props:["input_content"],
    data(){
        return {
            searchContent: "",
            search_placeholder: "",
        }
    },
    mounted(){
        this.search_placeholder = this.input_content
    },
    methods:{
        search(){
            this.$emit('searchContent',this.searchContent)
        },
        go_back(){
            this.$router.go(-1)
        }
    }
};
</script>

<style lang="less" scoped>
#searchTab {
    height: 1rem;
  .box {
    height: 1rem;
    background-color: #1e87fe;
    display: flex;
    align-items: center;
    padding: 0rem 0.3rem;
    box-sizing: border-box;
    justify-content: space-between;
    color: #fff;
    .searchNav_left {
      width: 0.14rem;
      height: 0.14rem;
      border: 0.04rem solid #fff;
      transform: rotate(45deg);
      border-top-color: transparent;
      border-right-color: transparent;
    }
    .search {
      width: 5.4rem;
      border: none;
      border-radius: 0.34rem;
      height: 0.64rem;
      padding: 0rem 0.28rem;
      box-sizing: border-box;
      color: #000;
      line-height: 0.64rem;
      font-size: 0.28rem;
      outline: none;
    }
    .searchBtn {
      font-size: 0.28rem;
    }
  }
}
</style>