<template>
  <div id="InviteAgentg">
    <nav-title :title="title" :navRight="rightIcon" @changeTool="handleTool" />
    <agents-list />
  </div>
</template>

<script>
import navTitle from "../../../components/navTitle/navtitle";
import agentsList from "./agentsList";
export default {
  components: { navTitle, agentsList },
  data() {
    return {
      title: "邀请经销商",
      rightIcon: "",
    };
  },
  methods: {
    handleTool() {},
  },
};
</script>

<style lang="less" scoped>
</style>