<template>
  <div id="editingAwards">
    <!-- 新增弹窗or修改弹窗 -->
    <div class="bigbox">
      <el-form :model="rowForm" ref="rowForm" label-width="100px" class="form">
        <el-form-item
          v-for="(item, index) in rowFormList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <el-select
            v-if="item.scope == 'select'"
            :placeholder="item.placeholder"
            size="mini"
            v-model="rowForm[item.prop]"
            class="input_width"
            @change="changeSelect(rowForm[item.prop])"
          >
            <el-option
              v-for="item in item.option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="block" v-else-if="item.scope == 'rotating'">
            <el-slider
              v-model="rowForm[item.prop]"
              show-input
              :min="item.min"
              :max="item.max"
            >
            </el-slider>
            <div class="draw_rag_box">
              <img
                :style="{
                  transform: 'rotateZ(' + rowForm.AngleRotate + 'deg)',
                }"
                :src="ImageUrlsBigDraw"
                alt=""
              />
              <img
                class="Pointer"
                src="http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E5%BC%80%E5%A7%8B%E6%8A%BD%E5%A5%96@2x%20(1).png"
                alt=""
              />
            </div>
          </div>
          <div v-else-if="item.scope == 'upload'">
            <p style="color: #9f9f9f; font-size: 14px">
              {{ item.placeholder }}
            </p>
            
          </div>
          <div v-else-if="item.scope == 'Pb_t'">
            <el-input
              :placeholder="item.placeholder"
              size="mini"
              v-model="rowForm[item.prop]"
              class="input_width"
            >
            </el-input>
            <p style="color: #999999; font-size: 12px">{{ item.text }}</p>
          </div>
          <div v-else-if="item.scope == 'Pb_f'">
            <el-input
              :placeholder="item.placeholder"
              size="mini"
              v-model="rowForm[item.prop]"
              class="input_width"
              :disabled="disabledF"
            >
            </el-input>
            <p style="color: #999999; font-size: 12px">{{ item.text }}</p>
          </div>
          <el-input
            v-else
            :placeholder="item.placeholder"
            size="mini"
            v-model="rowForm[item.prop]"
            class="input_width"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //新增or修改的商品数据
      rowForm: {},
      //新增or修改的列表
      rowFormList: [
        {
          label: "奖品名称",
          placeholder: "请输入奖品名称",
          prop: "Name",
        },
        {
          label: "奖品类型",
          placeholder: "请输入奖品类型",
          prop: "Type",
          scope: "select",
          option: [
            {
              value: 1,
              label: "实物",
            },
            {
              value: 2,
              label: "虚拟物品",
            },
            {
              value: 3,
              label: "其他",
            },
          ],
        },
        // {
        //   label: "是否能抽中",
        //   placeholder: "请选择是否能抽中",
        //   prop: "IsAwards",
        //   scope: "select",
        //   option: [
        //     {
        //       value: true,
        //       label: "是",
        //     },
        //     {
        //       value: false,
        //       label: "否",
        //     },
        //   ],
        // },
        {
          label: "概率系数",
          placeholder: "请输入概率系数",
          prop: "Probability",
          scope: "Pb_t",
          text: "（注意：概率系数不能小于0.0000001）",
        },
        {
          label: "虚拟物品",
          placeholder: "请输入虚拟物品数值",
          prop: "Amount",
          scope: "Pb_f",
          text: "（积分，红包）数值",
        },
        {
          label: "可抽数量",
          placeholder: "请输入可抽数量",
          prop: "PrizeNum",
        },

        {
          label: "旋转角度",
          prop: "AngleRotate",
          scope: "rotating",
          max: 360,
          min: 0,
        },
        {
          label: "奖品图片",
          placeholder: "请上传尺寸为1:1的图片，且不超过500kb",
          prop: "PrizeImg",
          scope: "upload",
        },
        {
          label: "奖项备注",
          placeholder: "请输入奖项备注",
          prop: "PrizeRemark",
        },
      ],
      ImageUrlsBigDraw: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E8%BD%AC%E7%9B%98@2x.png",
      //上传奖品图片
      ImageUrls: [],
      par: {},
      disabledF: true,
    };
  },
  mounted() {
    this.rowForm = this.$route.query;
    // this.ImageUrlsBigDraw = this.rowForm.ActivityRotateImage;
    if (this.rowForm.PrizeImg !== undefined) {
      this.ImageUrls.push(this.rowForm.PrizeImg);
    }
    this.changeSelect(this.rowForm.Type);
  },
  methods: {
    changeSelect(v) {
      if (v == 2) {
        this.disabledF = false;
      } else {
        this.disabledF = true;
        this.rowForm.Amount = 0;
      }
    },
    // 图片 start
    // changeSuccessHandler(rs, type) {
    //   this.ImageUrls.push(rs.url);
    //   this.rowForm.PrizeImg = this.ImageUrls[0];
    // },
    // changeImgHandler(rs, index) {
    //   this.$set(this.ImageUrls, index, rs.url);
    //   this.rowForm.PrizeImg = this.ImageUrls[0];
    // },
    // changeRemoveHandler(index) {
    //   this.ImageUrls.splice(index, 1);
    //   this.rowForm.PrizeImg = "";
    // },
    // 图片 end

    //弹窗确认触发函数
    determine() {
      if (this.rowForm) {
        if (!this.rowForm.Name) {
          this.$message.error("请输入奖品名称");
          return;
        } else if (this.rowForm.Type === "") {
          console.log(this.rowForm.Type);
          this.$message.error("请选择奖品类型");
          return;
        } else if (!this.rowForm.Probability) {
          this.$message.error("请输入概率系数");
          return;
        } else if (
          this.rowForm.Probability > 1 ||
          this.rowForm.Probability < 0.0000001
        ) {
          this.$message.error("请重新输入概率系数");
          return;
        } else if (!this.rowForm.PrizeNum) {
          this.$message.error("请输入可抽数量");
          return;
        } else if (this.rowForm.PrizeNum <= 0) {
          this.$message.error("可抽取数量不得小于等于0");
          return;
        } else if (this.rowForm.AngleRotate < 0) {
          this.$message.error("请设置旋转角度");
          return;
        } else if (!this.rowForm.PrizeImg) {
          this.$message.error("请添加奖品图片");
          return;
        } else if (!this.rowForm.PrizeRemark) {
          this.$message.error("请输入奖项备注");
          return;
        } else if (this.rowForm.Type === 2) {
          if (this.rowForm.Amount === "" || this.rowForm.Amount === 0) {
            this.$message.error("请输入虚拟物品数值");
            return;
          }
        }
      }
      var datas = {
        Name: this.rowForm.Name,
        PrizeNum: Number(this.rowForm.PrizeNum),
        IsAwards: true,
        Probability: this.rowForm.Probability,
        AngleRotate: this.rowForm.AngleRotate,
        PrizeImg: this.rowForm.PrizeImg,
        PrizeRemark: this.rowForm.PrizeRemark,
        Type: this.rowForm.Type,
        Amount: this.rowForm.Amount,
      };
      if (this.rowForm.ID === undefined) {
        datas.LotteryActivityID = Number(this.rowForm.LotteryActivityID);
        // this.$http.draw.LotteryDrawPrizeAddCtl(datas).then((res) => {
        //   if (res) {
        //     this.$message({
        //       message: "新增成功",
        //       type: "success",
        //     });
        //     window.history.back();
        //   } else {
        //     this.$message.error("新增失败");
        //   }
        // });
      } else {
        datas.ID = this.rowForm.ID;
        // this.$http.draw.LotteryDrawPrizeUpdateCtl(datas).then((res) => {
        //   if (res) {
        //     this.$message({
        //       message: "更新成功",
        //       type: "success",
        //     });
        //     window.history.back();
        //   } else {
        //     this.$message.error("更新失败");
        //   }
        // });
      }
    },
    //弹窗关闭触发函数
    handleClose() {
      window.history.back();
    },
  },
};
</script>

<style lang="less" scoped>
#editingAwards {
  padding: 20px;
  .bigbox {
    margin: 0 auto;
    width: 500px;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
  }
}
/deep/.el-input--mini .el-input__inner {
  width: 260px !important;
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
</style>