<template>
  <div id="login">
      <div class="nav_logoImg">
          <img src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png" alt="">
      </div>
    <div class="nav_logo">登入系统</div>
    <div class="input_form">
      <span>账号</span>
      <input type="text" v-model="formS.ems" placeholder="请输入账号" />
    </div>
    <div class="input_form">
      <span>密码</span>
      <input type="password" v-model="formS.pass" placeholder="请输入密码" />
    </div>
    <div class="d-right"><i @click="forget">忘记密码</i></div>
    <div class="d-login" @click="get_login">登录</div>
    <div class="banding_login">已绑定微信可直接登录</div>
    <div class="img_wx">
      <img
      @click="jump_wx"
        src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E5%BE%AE%E4%BF%A1%E7%99%BB%E5%BD%95@2x.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      formS: {},
    };
  },
  methods: {
    get_login() {
      if (!this.formS.ems) {
        Notify({ type: "danger", message: "请输入账号" });
        return;
      }
      if (!this.formS.pass) {
        Notify({ type: "danger", message: "请输入密码" });
        return;
      }
      Toast.fail("维护中");
    },
    forget(){
      Toast.fail("功能未开启");
    },
    jump_wx(){
      Toast.fail("功能未开启");
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes showT {
    0%{
        opacity: 0;
        transform: translateY(2rem);
    }
    100%{
        opacity: 1;
        transform: translateY(0rem);
    }
}
#login {
  font-family: PingFang-SC-Medium, PingFang-SC;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: showT 0.5s;
  .nav_logoImg{
    margin-top: 1.8rem;
    margin-bottom: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
  }
  .nav_logo {
    margin-top: 0.4rem;
    font-size: 0.48rem;
    margin-bottom: 0.5rem;
  }
  .input_form {
    margin-top: 0.4rem;
    width: 6rem;
    border-bottom: 0.01rem solid #e5e5e5;
    height: 0.8rem;
    line-height: 0.8rem;
    span {
      color: #999;
    }
    input {
      border: none;
      outline: none;
      padding-left: 0.1rem;
    }
    input:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
    }
  }
  .d-right {
    margin-top: 0.4rem;
    width: 6rem;
    display: flex;
    justify-content: flex-end;
    i {
      font-style: normal;
      color: #666;
      font-weight: 500;
    }
  }
  .d-login {
    width: 6rem;
    margin-top: 0.4rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #0c7cfd 0%, #499dfd 100%);
    color: #fff;
    border-radius: 0.08rem;
    line-height: 0.88rem;
    text-align: center;
    font-family: PingFang-SC-Medium, PingFang-SC;
  }
  .banding_login {
    color: #999;
    margin-top: 2rem;
    font-size: 0.28rem;
  }
  .img_wx {
    margin-top: 0.48rem;
    width: 0.84rem;
    height: 0.84rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>