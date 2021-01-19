<template>
  <div id="login">
    <div class="box_Login">
      <div class="login_logo">
        <img
          src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BA%BA%E7%89%A9%E6%8F%92%E7%94%BB@2x.png"
          alt=""
        />
      </div>
      <div class="login_form">
        <div class="login_txLogin">
          <img
            src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/200x200_01@2x.png"
            alt=""
          />
        </div>
        <h4>模板管理平台</h4>
        <!-- 注册 -->
        <div class="status_T" v-if="status">
          <el-steps :active="successNum" simple finish-status="success">
            <el-step title="邮箱验证"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div class="small_nb" v-if="!isSuccess">
            <el-input v-model="zcForm.tel" placeholder="请输入验证邮箱">
              <i slot="prefix" class="el-input__icon el-icon-monitor"></i
            ></el-input>
            <el-input
              v-model="zcForm.pas"
              placeholder="请输入密码"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-info"></i
            ></el-input>
            <el-input
              v-model="zcForm.pass"
              placeholder="请再次输入密码"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-info"></i
            ></el-input>
            <div class="haveTel">
              <span>已有账号?</span
              ><span class="bys" @click="changeStatus">登入</span>
            </div>
            <div class="btn_submit" @click="sumbit_form">提交</div>
          </div>
          <div class="success_TS" v-else>
            <h4>注册成功</h4>
            <p>{{ numPath }}S后自动登入</p>
          </div>
        </div>
        <!-- 登入 -->
        <div class="status_T" v-else>
          <el-steps :active="successNum" simple finish-status="success">
            <el-step title="邮箱验证"></el-step>
            <el-step title="登入成功"></el-step>
          </el-steps>
          <div class="small_nb" v-if="!isSuccess">
            <el-input v-model="loginForm.email" placeholder="请输入邮箱">
              <i slot="prefix" class="el-input__icon el-icon-monitor"></i
            ></el-input>
            <el-input
              v-model="loginForm.passwordQ"
              placeholder="请输入密码"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-info"></i
            ></el-input>
            <div class="haveTel">
              <span>没有账号?</span
              ><span class="bys" @click="changeStatus">注册</span>
            </div>
            <div class="btn_submit" @click="loginJume">登入</div>
          </div>
          <div class="success_TS" v-else>
            <h4>登入成功</h4>
            <div class="borRad">
              <div class="small_rad"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zcForm: {},
      loginForm: {},
      status: false,
      isSuccess: false,
      successNum: 1,
      numPath: 3, //跳转秒数
    };
  },
  mounted() {},
  methods: {
    MB_setinterval() {
      var self = this;
      var aaa = setInterval(function () {
        if (self.numPath > 1) {
          self.numPath--;
        } else {
          clearInterval(aaa);
          self.$router.push({
            name: "MarginBox",
          });
        }
      }, 1000);
    },
    changeStatus() {
      this.status = !this.status;
      this.zcForm = {};
      this.loginForm = {};
    },
    sumbit_form() {
      var self = this;
      var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (!reg.test(this.zcForm.tel) || this.zcForm.tel.length == 0) {
        this.$message.error("请输入邮箱");
        return;
      }
      if (this.zcForm.pas.length == 0 || this.zcForm.pass.length == 0) {
        this.$message.error("请输入密码");
        return;
      }
      if (this.zcForm.pas !== this.zcForm.pass) {
        this.$message.error("密码不一致!请重新输入");
        return;
      }
      this.$confirm("你是不是猪", "挨揍时刻", {
        confirmButtonText: "是",
        cancelButtonText: "不是",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注册成功!",
          });
          this.isSuccess = true;
          this.successNum = 2;
          this.MB_setinterval();
        })
        .catch(() => {
          this.$message.error("不是猪不给进");
        });
    },
    loginJume() {
      var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (!reg.test(this.loginForm.email)) {
        this.$message.error("请输入正确邮箱");
        return;
      }
      if (!this.loginForm.passwordQ) {
        this.$message.error("请输入密码");
        return;
      }
      this.requiredTabel();
    },
    requiredTabel() {
      var self = this;
      if (
        this.loginForm.email === "tanglianfeng@163.com" &&
        this.loginForm.passwordQ === "123456"
      ) {
        this.isSuccess = true;
        this.successNum = 2;
        setTimeout(function () {
          self.$router.push({
            name: "MarginBox",
          });
        }, 800);
      } else {
        this.$message.error("请检查登入邮箱及密码是否正确");
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url("http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/bg_01@2x.png")
    no-repeat center;
  background-size: cover;
  @keyframes showIn {
    0% {
      opacity: 0;
      transform: translateX(150px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  .box_Login {
    width: 1350px;
    height: 760px;
    background-color: rgba(190, 237, 254, 0.74);
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    animation: showIn 1s;

    .login_logo {
      margin: 96px 18px 0px;
      width: 609px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login_form {
      margin-top: 60px;
      margin-left: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 555px;
      .login_txLogin {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h4 {
        margin-top: 20px;
        color: rgba(48, 65, 86, 1);
        font-size: 28px;
        font-weight: 500;
        font-family: PingFangSC-Medium, PingFang SC;
      }
      .status_T {
        display: flex;
        flex-direction: column;
        align-items: center;
        .small_nb {
          .haveTel {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 400px;
            margin-top: 16px;
            padding-right: 20px;
            span {
              margin: 0px 6px;
              font-size: 14px;
            }
            .bys {
              color: #11bcf0;
              cursor: pointer;
            }
          }
          .btn_submit {
            cursor: pointer;
            margin-top: 40px;
            width: 400px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            border-radius: 28px;
            background: linear-gradient(137deg, #15c1ee 0%, #00a9f7 100%);
          }
        }
        .success_TS {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .borRad {
            margin: 20px auto 0px;
            width: 50px;
            height: 50px;
            border: 5px solid #fff;
            border-radius: 50%;
            border-top: 5px solid #409eff;
            border-bottom: 5px solid #409eff;
            animation: join 1s linear infinite;
            position: relative;
            .small_rad {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 30px;
              height: 30px;
              border: 5px solid #fff;
              border-top: 5px solid #409eff;
              border-bottom: 5px solid #409eff;
              border-radius: 50%;
              //   transform: translateX(-50%) translateY(-50%);
              animation: json 1s linear infinite;
            }
            @keyframes json {
              0% {
                transform: translateX(-50%) translateY(-50%) rotate(0deg);
              }
              50% {
                border-top: 5px solid #ce3655;
                border-bottom: 5px solid #ce3655;
              }
              100% {
                transform: translateX(-50%) translateY(-50%) rotate(-720deg);
              }
            }
          }
          @keyframes join {
            0% {
              transform: rotate(0deg);
            }
            50% {
              border-top: 5px solid #ce3655;
              border-bottom: 5px solid #ce3655;
            }
            100% {
              transform: rotate(360deg);
            }
          }

          h4 {
            font-size: 26px;
            color: rgb(10, 105, 53);
          }
          p {
            margin-top: 10px;
            font-size: 22px;
            color: rgb(10, 105, 53);
            letter-spacing: 2px;
          }
        }

        /deep/ .el-input {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 400px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
        }
        /deep/ .el-input__inner {
          border-radius: 28px;
          height: 50px;
          line-height: 50px;
          padding-left: 43px;
        }
        /deep/ .el-input__prefix {
          padding-left: 10px;
        }

        /deep/.el-steps {
          margin-top: 32px;
          width: 300px;
        }
        /deep/.el-steps--simple {
          background-color: transparent;
        }
      }
    }
  }
}
</style>