<template>
  <!-- 抽奖设置 -->
  <div id="LotteryIsSet">
    <el-button type="primary" @click="backHome">返回</el-button>
    <div class="divider"></div>
    <div class="LotterySet">
      <h4 class="LotterySetHeader">抽奖设置</h4>
      <el-form label-width="150px" label-position="left">
        <el-form-item
          v-for="(item, index) in formLists"
          :key="index"
          :label="item.label"
        >
          <div
            v-if="item.type == 'switch'"
            style="display: flex; align-items: center"
          >
            <el-switch
              v-model="headerListData[item.prop]"
              @change="changeSit(headerListData[item.prop])"
              :active-value="Number(1)"
              :inactive-value="Number(0)"
            ></el-switch>
            <span
              style="padding-left: 10px"
              :style="headerListData[item.prop] == 1 ? Lottyaction : ''"
              >{{ headerListData[item.prop] == 1 ? "已开启" : "已关闭" }}</span
            >
          </div>
          <el-select
            v-else-if="item.type == 'select'"
            v-model="headerListData[item.prop]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(item, index) in headerListData['PrizeList']"
              :key="index"
              :label="item.PrizeName"
              :value="item.PrizeID"
            ></el-option>
          </el-select>
          <el-radio-group
            v-else-if="item.type == 'radio'"
            v-model="headerListData[item.prop]"
          >
            <el-radio
              v-for="(blog, index) in item.options"
              :key="index"
              :label="blog.label"
              >{{ blog.value }}</el-radio
            >
          </el-radio-group>
          <el-input
            :placeholder="item.placeholder"
            v-else-if="item.type == 'inputDay'"
            v-model="headerListData[item.prop]"
          >
            <template slot="append">天</template>
          </el-input>
          <el-input
            :placeholder="item.placeholder"
            v-else
            v-model="headerListData[item.prop]"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="divider"></div>
    <!-- 奖品设置 -->
    <div class="prize_Set">
      <h4 class="LotterySetHeader">奖项设置</h4>
      <div class="clues">
        <p>
          说明：1:所有奖品概率总系数不能大于1，数值越小中奖机率越低；2:概率系数和剩余可抽数，点增加会马上生效，请谨慎操作；3:转盘图片为617宽、617高
        </p>
      </div>
      <div class="RotaryTablePicture">
        <div class="left">转盘图片<span style="color: red">*</span></div>
        <div class="right">
          <p>图片为：617宽、617高，png文件，且不超过500kb</p>
          <!-- <mt-uploader
            :limit="1"
            :imgList="ImageUrlsBigDraw"
            @uploadFile="changeSuccess"
            @imgChange="changeImg"
            @handleDelete="changeRemove"
            ref="imgUploader"
          ></mt-uploader> -->
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 奖品列表 -->
    <div class="The_prizeList">
      <el-button type="primary" @click="handleClick">+ 新增奖项</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin: 15px 0px"
        border
        :header-cell-style="{
          'background-color': '#F5F5F5',
          padding: '8px',
          color: '#333',
          'border-right': '1px solid #eee',
        }"
      >
        <el-table-column
          v-for="(item, index) in tableSet"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template slot-scope="scope">
            <!-------------------------------------------- 遍历商品 ------------------------------------------>
            <div v-if="item.scope == 'editor'">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                >编辑</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="del_list(scope.row)"
                >删除</el-button
              >
            </div>
            <div v-else-if="item.scope == 'img'">
              <img
                :src="scope.row[item.prop]"
                style="width: 38px; height: 38px"
                alt=""
              />
            </div>
            <div v-else-if="item.scope == 'addOrSub'">
              <el-select
                v-model="scope.row['option']"
                size="mini"
                style="width: 80px"
                placeholder="操作"
              >
                <el-option
                  v-for="item in tableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                v-model="scope.row[item.prop]"
                size="mini"
                style="width: 80px; padding: 0px 4px"
              ></el-input>
              <el-button
                type="primary"
                size="mini"
                @click="numberChange(scope.row)"
                >确定</el-button
              >
            </div>
            <div v-else-if="item.scope == 'TypeText'">
              {{ scope.row[item.prop] == 1 ? "实物" : "虚拟" }}
            </div>
            <div v-else-if="item.scope == 'IsAwards'">
              {{ scope.row[item.prop] ? "是" : "否" }}
            </div>
            <div v-else>
              {{ scope.row[item.prop] }}
            </div>
            <!--------------------------------------------- 遍历商品 ------------------------------------------>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //活动开启颜色
      Lottyaction: "color:#409EFF",
      //模拟抽奖设置数据
      headerListData: {
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
        IsMustWin: true,
        IsLimitBarCode: false,
        IsLimitCustomer: true,
        MustWinPrize_ID: "摩托车",
        PrizeList: [
          {
            Amount: 0,
            AngleRotate: 90,
            IsAwards: true,
            PrizeID: 2,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/16092229869047fb9e2a6a4e81b063aca000ed0fce.png",
            PrizeName: "IPad AIR",
            PrizeNum: 0,
            PrizeRemark: "奖品备注",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/16092229869047fb9e2a6a4e81b063aca000ed0fce.png",
            Probability: 0.2,
            Type: 1,
          },
          {
            Amount: 200,
            AngleRotate: 122,
            IsAwards: true,
            PrizeID: 3,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/160922321385a955c8e32149359381aca000ee19af.png",
            PrizeName: "积分",
            PrizeNum: 48,
            PrizeRemark: "获得200积分",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/160922321385a955c8e32149359381aca000ee19af.png",
            Probability: 0.4,
            Type: 2,
          },
          {
            Amount: 0,
            AngleRotate: 4,
            IsAwards: true,
            PrizeID: 4,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/160922776228d97b4264ee4f198cddaca00102ec21.png",
            PrizeName: "摩托车",
            PrizeNum: 1,
            PrizeRemark: "125cc",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/160922776228d97b4264ee4f198cddaca00102ec21.png",
            Probability: 0.1,
            Type: 1,
          },
        ],
        Remark: "冲鸭！！！",
        State: 1,
      },
      //模拟奖品列表
      tableData: [
        {
            Amount: 0,
            AngleRotate: 90,
            IsAwards: true,
            PrizeID: 2,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/16092229869047fb9e2a6a4e81b063aca000ed0fce.png",
            PrizeName: "IPad AIR",
            PrizeNum: 0,
            PrizeRemark: "奖品备注",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/16092229869047fb9e2a6a4e81b063aca000ed0fce.png",
            Probability: 0.2,
            Type: 1,
          },
          {
            Amount: 200,
            AngleRotate: 122,
            IsAwards: true,
            PrizeID: 3,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/160922321385a955c8e32149359381aca000ee19af.png",
            PrizeName: "积分",
            PrizeNum: 48,
            PrizeRemark: "获得200积分",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/160922321385a955c8e32149359381aca000ee19af.png",
            Probability: 0.4,
            Type: 2,
          },
          {
            Amount: 0,
            AngleRotate: 4,
            IsAwards: true,
            PrizeID: 4,
            PrizeImage:
              "http://kjpc.aicomingsys.com//file/160922776228d97b4264ee4f198cddaca00102ec21.png",
            PrizeName: "摩托车",
            PrizeNum: 1,
            PrizeRemark: "125cc",
            PrizeWinImage:
              "http://kjpc.aicomingsys.com//file/160922776228d97b4264ee4f198cddaca00102ec21.png",
            Probability: 0.1,
            Type: 1,
          },
      ],
      //抽奖设置列表
      formLists: [
        {
          label: "抽奖活动",
          prop: "State",
          type: "switch",
        },
        {
          label: "抽奖说明文章Key",
          placeholder: "请输入抽奖说明文章Key",
          prop: "LotteryActivityKeyHtml",
          type: "input",
        },
        {
          label: "是否100%中奖",
          prop: "IsMustWin",
          type: "radio",
          options: [
            {
              label: true,
              value: "是",
            },
            {
              label: false,
              value: "否",
            },
          ],
        },
        {
          label: "未激活标签能否抽奖",
          prop: "IsLimitBarCode",
          type: "radio",
          options: [
            {
              label: true,
              value: "能",
            },
            {
              label: false,
              value: "不能",
            },
          ],
        },
        {
          label: "是否限制代理抽奖",
          prop: "IsLimitCustomer",
          type: "radio",
          options: [
            {
              label: true,
              value: "是",
            },
            {
              label: false,
              value: "否",
            },
          ],
        },
        {
          label: "奖品名称",
          placeholder: "请选择奖品名称",
          prop: "MustWinPrize_ID",
          type: "select",
        },
        {
          label: "没中奖显示内容",
          placeholder: "请输入没中奖显示内容",
          prop: "NoWinWords",
          type: "input",
        },
        {
          label: "奖品确认有效期",
          placeholder: "请输入有效期(天)",
          prop: "EffectiveDay",
          type: "inputDay",
        },
      ],
      //模拟转盘图
      Rotary_img: "",
      //模拟奖品列表
      tableSet: [
        {
          label: "奖品名称",
          prop: "PrizeName",
          width: "120",
        },
        {
          label: "奖品类型",
          prop: "Type",
          scope: "TypeText",
        },
        // {
        //   label: "是否中奖",
        //   prop: "IsAwards",
        //   scope: "IsAwards"
        // },
        {
          label: "概率系数",
          prop: "Probability",
        },
        {
          label: "剩余可抽数",
          prop: "PrizeNum",
        },
        {
          label: "加减可抽数",
          prop: "num",
          scope: "addOrSub",
          width: "320",
          option: "增加",
        },
        {
          label: "奖品图片",
          prop: "PrizeImage",
          scope: "img",
        },
        {
          label: "旋转角度（度）",
          prop: "AngleRotate",
        },
        {
          label: "奖品备注",
          prop: "PrizeRemark",
        },
        {
          label: "操作",
          scope: "editor",
          width: "150",
        },
      ],
      // 增减列表
      tableOptions: [
        {
          value: "增加",
          label: "增加",
        },
        {
          value: "减少",
          label: "减少",
        },
      ],
      //base64转盘图
      base64Img: "",
      //上传转盘图片
      ImageUrlsBigDraw: [],
      //模拟奖品图
      prize_img: "",
      //当前活动ID
      LotteryID: 0,
    };
  },
  created() {
    this.LotteryID = this.$route.query.id;
    this.initList();
  },
  mounted() {},
  methods: {
    // 获取抽奖活动列表
    initList() {
      var datas = {
        ID: Number(this.LotteryID),
      };
      // this.$http.draw.PCGetLotteryDrawActivityModelCtl(datas.ID).then((res) => {
      //   this.headerListData = res;
      //   this.tableData = this.headerListData.PrizeList;
      //   this.initImg();
      //   this.initNum();
      //   console.log(res);
      // });
    },
    //初始话获取转盘图
    initImg() {
      console.log(this.headerListData.ActivityRotateImage);
      this.$set(
        this.ImageUrlsBigDraw,
        0,
        this.headerListData.ActivityRotateImage
      );
    },
    // 图片 start
    changeSuccess(rs, type) {
      this.ImageUrlsBigDraw.push(rs.url);
    },
    changeImg(rs, index) {
      this.$set(this.ImageUrlsBigDraw, index, rs.url);
      console.log("转盘图");
    },
    changeRemove(index) {
      this.ImageUrlsBigDraw.splice(index, 1);
    },
    // 图片 end

    //活动开关
    changeSit(bolt) {
      console.log("open", bolt);
    },
    //初始化    为商品数组对象中添加字段
    initNum() {
      var self = this;
      this.tableData.forEach((item) => {
        self.$set(item, "num", 0);
        self.$set(item, "option", "增加");
      });
    },
    //新增奖品/编辑跳转
    handleClick(datas) {
      if (datas.PrizeID) {
        this.rowForm = datas;
      } else {
        this.rowForm = {
          Name: "",
          PrizeNum: "",
          IsAwards: "",
          Probability: "",
          AngleRotate: 0,
          PrizeImg: "",
          PrizeRemark: "",
          Type: "",
          Amount: "",
        };
      }
      this.rowForm.ActivityRotateImage = this.ImageUrlsBigDraw[0];
      this.$router.push({
        name: "editingAwards",
        query: {
          LotteryActivityID: this.LotteryID,
          ActivityRotateImage: this.rowForm.ActivityRotateImage,
          ID: datas.PrizeID,
          Name: this.rowForm.PrizeName,
          PrizeNum: this.rowForm.PrizeNum,
          IsAwards: this.rowForm.IsAwards,
          Probability: this.rowForm.Probability,
          AngleRotate: this.rowForm.AngleRotate,
          PrizeImg: this.rowForm.PrizeImage,
          PrizeRemark: this.rowForm.PrizeRemark,
          Type: this.rowForm.Type,
          Amount: this.rowForm.Amount,
        },
      });
      // window.localStorage.setItem("rowForm", JSON.stringify(this.rowForm));
    },
    //删除商品
    del_list(datas) {
      this.$confirm("此操作将永久删除该奖品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$http.draw
          //   .LotteryDrawPrizeDeleteCtl(datas.PrizeID)
          //   .then((res) => {
          //     if (res) {
          //       this.$message.success("删除成功");
          //       this.initList();
          //     } else {
          //       this.$message.error("删除失败");
          //     }
          //     console.log(res);
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 抽奖设置保存
    onSubmit() {
      if (!this.headerListData.LotteryActivityKeyHtml) {
        this.$message.error("请输入抽奖说明文章Key");
        return;
      }
      if (
        this.headerListData.IsMustWin == undefined ||
        this.headerListData.IsMustWin == null
      ) {
        this.$message.error("请选择是否100%中奖");
        return;
      } else {
        if (this.headerListData.IsMustWin == 1) {
          if (!this.headerListData.MustWinPrize_ID) {
            this.$message.error("请选择奖品名称");
            return;
          }
        }
      }
      if (
        this.headerListData.IsLimitBarCode == undefined ||
        this.headerListData.IsLimitBarCode == null
      ) {
        this.$message.error("请选择是否限制代理抽奖");
        return;
      }
      if (
        this.headerListData.IsLimitCustomer == undefined ||
        this.headerListData.IsLimitCustomer == null
      ) {
        this.$message.error("请选择未激活标签能否抽奖");
        return;
      }
      if (!this.headerListData.NoWinWords) {
        this.$message.error("请输入没中奖显示内容");
        return;
      }
      if (!this.headerListData.EffectiveDay) {
        this.$message.error("请输入奖品有效期(天)");
        return;
      } else {
        var pars = /^[1-9]\d*$/;
        if (!pars.test(this.headerListData.EffectiveDay)) {
          this.$message.error("奖品有效期不得少于1天");
          return;
        }
      }
      if (this.ImageUrlsBigDraw.length == 0) {
        this.$message.error("请上传转盘图片");
        return;
      }
      var datas = {
        ID: this.headerListData.ID,
        State: this.headerListData.State,
        LotteryActivityKeyHtml: this.headerListData.LotteryActivityKeyHtml,
        IsMustWin: this.headerListData.IsMustWin,
        MustWinPrize_ID: this.headerListData.MustWinPrize_ID,
        NoWinWords: this.headerListData.NoWinWords,
        IsLimitBarCode: this.headerListData.IsLimitBarCode,
        IsLimitCustomer: this.headerListData.IsLimitCustomer,
        EffectiveDay: this.headerListData.EffectiveDay,
        ActivityRotateImage: this.ImageUrlsBigDraw[0],
      };
      if (datas.ActivityRotateImage === null) {
        this.$message.error("请上传转盘图片");
        return;
      }
      console.log(datas);
      // this.$http.draw.LotteryDrawActivityUpdateCtl(datas).then((res) => {
      //   console.log(res);
      //   if (res) {
      //     this.initList();
      //     this.$message.success("保存成功");
      //   }
      // });
    },
    //增加或减少抽奖数
    numberChange(Open) {
      var self = this;
      if (!Open.option) {
        this.$message.error("请选择增加或减少");
        return;
      } else {
        if (Open.num <= 0) {
          this.$message.error("请输入有效加减值");
          return;
        } else {
          if (Open.option == "减少") {
            Open.num = -Open.num;
          }
          Open.PrizeNum = Number(Open.PrizeNum) + Number(Open.num);
          if (Open.PrizeNum <= 0) {
            this.$message.error("剩余次数不得小于0次");
            this.initList();
            return;
          }
          var datas = {
            ID: Open.PrizeID,
            Name: Open.PrizeName,
            PrizeNum: Open.PrizeNum,
            IsAwards: true,
            Probability: Open.Probability,
            AngleRotate: Open.AngleRotate,
            PrizeImg: Open.PrizeImage,
            PrizeRemark: Open.PrizeRemark,
            Type: Open.Type,
            Amount: Open.Amount,
          };
          // this.$http.draw.LotteryDrawPrizeUpdateCtl(datas).then(res => {
          //   if(res){
          //     this.$message.success("修改成功")
          //     this.initList()
          //   }else{
          //     this.$message.error("修改失败")
          //   }
          // })
        }
      }
    },
    //确定改变抽奖数
    sendChenge(Open) {
      var self = this;
      var datas = {
        num: Number(Open.num),
      };
      console.log("datas", datas);
      // self.initNum();
    },
    //返回活动列表页
    backHome() {
      window.history.back();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 215px;
}
#LotteryIsSet {
  font-family: PingFangSC-Regular, PingFang SC;
  padding: 10px 26px;
  .divider {
    width: 100%;
    height: 2px;
    background-color: #f2f2f2;
    margin: 10px 0px;
  }
  .LotterySet {
    display: flex;
    flex-direction: column;
    .LotterySetHeader {
      color: #333;
      font-size: 15px;
      margin: 0px 0px 10px;
    }
    .lists_liset {
      margin: 5px 0px;
    }
  }
  .prize_Set {
    .LotterySetHeader {
      color: #333;
      font-size: 15px;
      margin: 0px 0px 10px;
    }
    .clues {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: rgb(237, 248, 232);
      margin-bottom: 26px;
      p {
        color: #67c23a;
        font-size: 12px;
        white-space: nowrap;
        padding: 0 10px;
      }
    }
    .RotaryTablePicture {
      display: flex;
      padding-bottom: 10px;
      .left {
        font-size: 12px;
        color: #666;
        width: 100px;
      }
      .right {
        p {
          color: #9f9f9f;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .right_bottom {
          display: block;
          width: 148px;
          height: 148px;
          border: 1px dotted #c0ccda;
          border-radius: 4px;
          background: #fbfbff;
          position: relative;
          cursor: pointer;
          .right_imgDraw {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            font-style: normal;
            color: #b8b8b8;
            font-size: 32px;
          }
        }
      }
    }
  }
  .The_prizeList {
    margin: 20px 0px 0px;
  }
}
.draw_rag_box {
  width: 148px;
  height: 148px;
  margin: 10px 0px;
  background-color: #fbfbff;
  border: 1px dotted #c0ccda;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  box-sizing: border-box;
  position: relative;
  z-index: 9999;
  img {
    width: 100%;
    height: 100%;
  }
  .Pointer {
    position: absolute;
    width: 30px;
    height: 34px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.draw_rag_box:hover {
  transform: scale(3);
}
.upload_bottom {
  display: block;
  width: 148px;
  height: 148px;
  background-color: #fbfbff;
  border-radius: 4px;
  border: 1px dotted #c0ccda;
  margin: 10px 0px;
  .upload_imgDraw {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .prize_i {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-style: normal;
      font-size: 30px;
      color: #c1c1c2;
    }
  }
}
/deep/.el-dialog__header {
  background-color: #f2f2f2;
}
/deep/.el-dialog__title {
  font-size: 16px;
}
/deep/ .el-dialog {
  max-width: 658px;
  min-width: 380px;
}
</style>