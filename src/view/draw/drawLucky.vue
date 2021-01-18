<template>
  <!-- 活动列表 -->
  <div id="drawLucky">
    <!-- 新增活动按钮 -->
    <el-button type="primary" class="primary_btn" @click="Visible"
      >+ 新增活动</el-button
    >
    <!-- 活动列表 -->
    <div class="bigbox_lottery">
      <div
        class="lottery_smallbox"
        v-for="(item, index) in lotteryList"
        :key="index"
      >
        <div class="smallbox_img">
          <img :src="item.ActivityRotateImage" alt="" />
        </div>
        <div class="smallbox_text">
          <h4>
            {{ item.Name
            }}<i :class="item.State ? '' : 'No_state'"
              >● {{ item.State ? "进行中" : "未开启" }}</i
            >
          </h4>
          <div class="smalltext_fz">
            <p>
              活动链接：<input :id="'link' + index" v-model="item.LotteryUrl" />
            </p>
            <i @click="copyurl(index)">复制</i>
          </div>
          <el-button type="primary" @click="go_lotterySetting(item.ID)"
            >进入活动</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog title="新增活动" :visible.sync="dialogFormVisible" width="27%">
      <!-- 新增活动弹窗 -->
      <el-form :model="lotteryText" :ref="lotteryText" :rules="rules">
        <el-form-item
          v-for="(item, index) in LotteryBD"
          :key="index"
          :label="item.label"
          :label-width="formLabelWidth"
          :prop="item.prop"
        >
          <div v-if="item.scope == 'event'">
            <el-input
              v-model="lotteryText[item.prop]"
              autocomplete="off"
              :placeholder="item.placeholder"
            ></el-input>
            <p style="color: #bfbfbf; font-size: 12px">
              {{ item.instructions }}
            </p>
          </div>
          <el-input
            v-else
            v-model="lotteryText[item.prop]"
            autocomplete="off"
            :placeholder="item.placeholder"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="result_lottery">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "drawLucky",
  data() {
    return {
      // 模拟数据
      lotteryList: [
        {
          ActivityRotateImage:
            "http://kjpc.aicomingsys.com//file/160920853643e9d65ffde04f6abefbaca000aae9c9.png",
          CreateUser: null,
          CreateaDate: "2021-01-06 16:59:08",
          EffectiveDay: 99999,
          ID: 1,
          IsDelete: false,
          LotteryActivityKeyHtml: "抽奖说明",
          Name: "幸运大转盘",
          NoWinWords: "谢谢惠顾",
          Remark: "冲鸭！！！",
          State: 1,
        },
      ],
      //新增活动信息表
      lotteryText: {},
      //表单验证
      rules: {
        LotteryName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        LotteryNote: [
          { required: false, message: "请输入活动备注", trigger: "blur" },
        ],
      },
      //表单信息列表
      LotteryBD: [
        {
          label: "活动名称",
          prop: "LotteryName",
          scope: "event",
          placeholder: "请输入活动名称",
          instructions: "(说明：活动名称设置后不能修改)",
        },
        {
          label: "活动备注",
          prop: "LotteryNote",
          placeholder: "请输入活动备注",
        },
      ],
      formLabelWidth: "80px",
      // 弹窗状态
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.initLotteryList();
  },
  activated() {
    this.initLotteryList();
  },
  methods: {
    // 获取活动列表
    initLotteryList() {
      var datas = {
        PageIndex: 1,
        PageSize: 999,
      };
      // this.$http.draw
      //   .PCGetPagedListLotteryDrawActivityCtl(datas)
      //   .then((res) => {
      //     this.lotteryList = res.Data;
      //   });
    },
    //打开新增活动弹窗
    Visible() {
      this.lotteryText = {};
      this.dialogFormVisible = true;
    },
    // 确认新增活动
    result_lottery() {
      this.$refs[this.lotteryText].validate((valid) => {
        if (valid) {
          var datas = JSON.stringify({
            Name: this.lotteryText.LotteryName,
            Remark: this.lotteryText.LotteryNote,
          });
          // this.$http.draw.LotteryDrawActivityAddCtl(datas).then((res) => {
          //   if (res) {
          //     this.$message.success("新增成功");
          //     this.dialogFormVisible = false;
          //     this.go_lotterySetting(res)
          //   } else {
          //     this.$message.error("新增失败");
          //   }
          // });
        }
      });
      // this.dialogFormVisible = false
    },
    go_lotterySetting(id) {
      this.$router.push({
        name: "LotteryIsSet",
        query: {
          id: id,
        },
      });
    },
    //复制按钮
    copyurl(index) {
      var text = document.getElementById("link" + index);
      text.select();
      document.execCommand("Copy");
      this.$message.success("复制成功");
    },
  },
};
</script>
<style lang="less" scoped>
h4 {
  margin: 0px;
}
#drawLucky {
  padding: 20px;
  .primary_btn {
    margin: 10px 0px;
  }
  .bigbox_lottery {
    display: flex;
    flex-wrap: wrap;
    .lottery_smallbox {
      margin: 10px 40px 10px 0px;
      width: 400px;
      height: 143px;
      padding: 32px 20px 25px;
      box-sizing: border-box;
      border: 1px solid #f2f2f2;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      display: flex;
      align-items: center;
      .smallbox_img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .smallbox_text {
        h4 {
          font-size: 12px;
          margin-bottom: 10px;
          i {
            font-style: normal;
            margin-left: 8px;
            padding: 0px 8px;
            background-color: #eef7ff;
            color: #409eff;
            font-size: 11px;
            font-weight: 400;
            border-radius: 4px;
          }
        }
        .smalltext_fz {
          display: flex;
          p {
            font-size: 12px;
            margin-bottom: 10px;
            width: 240px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            input {
              border: none;
              outline: none;
            }
          }
          i {
            font-size: 12px;
            color: #ff7843;
            font-style: normal;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.No_state {
  background-color: #eeeeee !important;
  color: #666 !important;
}
</style>

