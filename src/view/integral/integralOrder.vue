<template>
  <!-- 积分订单 -->
  <div id="integralOrder">
    <el-form label-width="100px" :inline="true">
      <el-form-item
        v-for="(item, index) in searchList"
        :key="index"
        :label="item.label"
      >
        <el-select
          v-if="item.scope == 'select'"
          v-model="searchItem[item.prop]"
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div v-else-if="item.scope == 'btn'" style="padding-left: 30px">
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="initSearch">重置</el-button>
        </div>
        <el-input
          v-else
          v-model="searchItem[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 分割线 -->
    <div class="FGline"></div>
    <!-- 批量发货按钮 -->
    <el-button type="primary" style="margin: 10px 0px" @click="shipment"
      >批量发货</el-button
    >
    <!-- 积分订单 -->
    <el-table
      :data="tableText"
      style="width: 100%"
      border
      :header-cell-style="{
        'background-color': '#eee',
        padding: '8px',
        color: '#333',
      }"
    >
      <el-table-column
        align="center"
        v-for="(item, index) in tableList"
        :key="index"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.scope == 'IS'"
            >{{ scope.row[item.prop] == 1 ? "已" : "未" }}{{ item.ch }}</span
          >
          <div v-else-if="item.scope == 'palceOrder'" class="dis_flex">
            <div>
              <p>{{ scope.row[item.prop2] }}</p>
            </div>
          </div>
          <div v-else-if="item.scope == 'goods'" class="dis_flex">
            <img
              :src="scope.row[item.prop1]"
              alt=""
              style="width: 48px; height: 48px; margin-right: 10px"
            />
            <div class="goodsText">
              <h4>{{ scope.row[item.prop2] }}</h4>
              <p>{{ scope.row[item.prop3] }}{{ item.ch }}</p>
            </div>
          </div>
          <div v-else-if="item.scope == 'cusInfo'">
            <p>{{ scope.row[item.prop2] }} {{ scope.row[item.prop3] }}</p>
            <p>
              {{ scope.row[item.prop4] }}{{ scope.row[item.prop5]
              }}{{ scope.row[item.prop6] }}{{ scope.row[item.prop7] }}
            </p>
          </div>
          <div v-else-if="item.scope == 'Delivery'">
            <p>{{ scope.row[item.prop1] }}</p>
            <p>{{ scope.row[item.prop2] }}</p>
            <!-- 物流框 -->
            <i
              v-if="scope.row[item.prop1]"
              @click="openEMS(scope.row)"
              style="font-style: normal; color: #409eff; cursor: pointer"
              >查看物流</i
            >
          </div>
          <span v-else-if="item.scope == 'timeS'"
            >{{ item.ch }}{{ scope.row[item.prop] }}</span
          >
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row['State'] == '0'"
            @click="delivery(scope.row)"
            >发货</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 发货 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
      <el-form label-position="left">
        <el-form-item
          v-for="(item, index) in EMSList"
          :key="index"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-input
            v-if="item.scope == 'input'"
            v-model="ruleForm[item.prop]"
            autocomplete="off"
          ></el-input>
          <el-select
            filterable
            v-else
            v-model="ruleForm[item.prop]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(item, index) in EMSORDER"
              :key="index"
              :label="item.EMSCompany"
              :value="item.EMSCompany"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="send_form">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 批量发货 -->
    <el-dialog
      class="dialog"
      title="批量导入快递单"
      :visible.sync="showBatchExport"
      width="550px"
      @close="handleClose"
    >
      <div class="dialog_body">
        <div class="title">Excel内容复制输入</div>
        <div class="content">
          <span>格式：ID&nbsp;&nbsp;物流公司&nbsp;&nbsp;物流单号</span
          >&nbsp;&nbsp;
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="updatetext"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitBatchExport"
          >提 交</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 4,
      //搜索参数
      searchItem: {},
      //搜索列表
      searchList: [
        {
          label: "单号",
          placeholder: "输入零售单号",
          prop: "OrderNo",
        },
        {
          label: "状态",
          placeholder: "请选择状态",
          prop: "state",
          scope: "select",
          options: [
            {
              value: 1,
              label: "已发货",
            },
            {
              value: 0,
              label: "待发货",
            },
          ],
        },
        {
          label: "商品名称",
          placeholder: "输入商品名称",
          prop: "goodsName",
        },
        {
          label: "中奖人手机号",
          placeholder: "输入中奖人手机号",
          prop: "PPName",
        },
        {
          label: "收货人姓名",
          placeholder: "输入收货人姓名",
          prop: "consignee",
        },
        {
          label: "收货人手机号",
          placeholder: "输入收货人手机号",
          prop: "Phone",
        },
        {
          label: "物流码",
          placeholder: "输入物流码",
          prop: "emscode",
        },
        {
          scope: "btn",
        },
      ],
      //表单
      tableList: [
        {
          label: "序号",
          prop: "ID",
          width: "80",
          scope: "index",
        },
        {
          label: "状态",
          prop: "State",
          scope: "IS",
          ch: "发货",
          width: "120px",
        },
        {
          label: "单号",
          prop: "OrderCode",
          width: "180px",
        },
        {
          label: "中奖人手机号",
          prop2: "Phone",
          scope: "palceOrder",
          width: "180px",
        },
        {
          label: "商品",
          prop1: "ProductImg", //图片
          prop2: "ProductName",
          prop3: "JFCost",
          ch: "积分",
          scope: "goods",
          width: "300px",
        },
        {
          label: "数量",
          prop: "JFExchangeProductNum",
          width: "100px",
        },
        {
          label: "消耗积分",
          prop: "JFCost",
          width: "150px",
        },
        {
          label: "收货地址",
          prop2: "ReceiverName",
          prop3: "ReceiverMobile",
          prop4: "ReceiverProvince",
          prop5: "ReceiverCity",
          prop6: "ReceiverDistrict",
          prop7: "ReceiverDetailAddress",
          scope: "cusInfo",
          width: "300px",
        },
        {
          label: "时间",
          prop: "OrderTime",
          scope: "timeS",
          ch: "下单：",
          width: "300px",
        },
        {
          label: "快递信息",
          prop1: "ExpressCompany",
          prop2: "ExpressCode",
          scope: "Delivery",
          width: "180px",
        },
      ],
      //表单数据
      tableText: [
        {
          ID: 1,
          State: 1,
          OrderCode: 4421053968428194245,
          Phone: 13602712688,
          ProductImg: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E8%BD%AC%E7%9B%98@2x.png",
          ProductName: "幸运大转盘",
          JFCost: 88,
          JFExchangeProductNum: 15,
          JFCost: 6,
          ReceiverName: "唐先生",
          ReceiverMobile: "13888888888",
          ReceiverProvince: "广东省",
          ReceiverCity:"广州市",
          ReceiverDistrict:"天河区",
          ReceiverDetailAddress:"伍仙桥",
          OrderTime:"2020-12-21 12:21:51",
          ExpressCompany:"顺丰快递",
          ExpressCode:"SF00110022",
        },
        {
          ID: 2,
          State: 0,
          OrderCode: 41231396842812315,
          Phone: 13602712688,
          ProductImg: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BA%A7%E5%93%811@2x.png",
          ProductName: "iPhone 12",
          JFCost: 65,
          JFExchangeProductNum: 15,
          JFCost: 14,
          ReceiverName: "唐先生",
          ReceiverMobile: "13888888888",
          ReceiverProvince: "广东省",
          ReceiverCity:"广州市",
          ReceiverDistrict:"天河区",
          ReceiverDetailAddress:"伍仙桥",
          OrderTime:"2020-12-21 12:21:51",
          ExpressCompany:"",
          ExpressCode:"",
        },
        {
          ID: 3,
          State: 0,
          OrderCode: 4434533934538194245,
          Phone: 13602712688,
          ProductImg: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E4%BA%A7%E5%93%812@2x.png",
          ProductName: "电动车",
          JFCost: 88,
          JFExchangeProductNum: 15,
          JFCost: 21,
          ReceiverName: "唐先生",
          ReceiverMobile: "13888888888",
          ReceiverProvince: "广东省",
          ReceiverCity:"广州市",
          ReceiverDistrict:"天河区",
          ReceiverDetailAddress:"伍仙桥",
          OrderTime:"2020-12-21 12:21:51",
          ExpressCompany:"",
          ExpressCode:"",
        }
      ],
      //分页
      currentRow: null,
      currentpage: 1,
      pagesize: 5,
      total: 3,
      //发货
      dialogFormVisible: false,
      //发货数据列表
      EMSList: [
        {
          label: "快递公司",
          prop: "emscompany",
          placeholder: "请选择快递公司",
          scope: "select",
        },
        {
          label: "快递单号",
          prop: "emscode",
          placeholder: "请填写快递单号",
          scope: "input",
        },
      ],
      //发货信息表
      ruleForm: {},
      //模拟快递公司列表
      EMSORDER: [
        {
          value: 0,
          EMSCompany: "顺丰快递"
        },
        {
          value: 1,
          EMSCompany: "中通快递"
        },
        {
          value: 2,
          EMSCompany: "京东快递"
        },
      ],
      //批量导入文本
      updatetext: "",
      //批量导入
      batch: "",
      //批量导入框
      showBatchExport: false,

      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.search();
    this.getEMS();
  },
  methods: {
    //   获取快递公司列表
    getEMS() {
    //   this.$http.integral.GetMTEMSListCtl().then((res) => {
    //     this.EMSORDER = res;
    //     var data = {
    //       EMSCode: "999",
    //       EMSCompany: "其他",
    //       Id: 999,
    //       Sort: 0,
    //     };
    //     this.EMSORDER.push(data);
    //   });
    },
    //搜索
    search() {
      this.currentpage = 1;
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        State: this.searchItem.state,
        OrderCode: this.searchItem.OrderNo || "",
        ProductName: this.searchItem.goodsName || "",
        Phone: this.searchItem.PPName || "",
        ReceiverName: this.searchItem.consignee || "",
        ReceiverMobile: this.searchItem.Phone || "",
        ExpressCode: this.searchItem.emscode || "",
      };
    //   this.$http.integral.PCGetPagedListJFOrderCtl(datas).then((res) => {
    //     this.tableText = res.Data;
    //     this.total = res.TotalCount;
    //   });
    },
    init() {
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        State: this.searchItem.state,
        OrderCode: this.searchItem.OrderNo || "",
        ProductName: this.searchItem.goodsName || "",
        Phone: this.searchItem.PPName || "",
        ReceiverName: this.searchItem.consignee || "",
        ReceiverMobile: this.searchItem.Phone || "",
        ExpressCode: this.searchItem.emscode || "",
      };
    //   this.$http.integral.PCGetPagedListJFOrderCtl(datas).then((res) => {
    //     this.tableText = res.Data;
    //     this.total = res.TotalCount;
    //   });
    },
    //重置
    initSearch() {
      this.searchItem = {};
      this.search();
    },
    //单发货按钮
    delivery(datas) {
      this.ruleForm = {};
      this.ruleForm.ID = datas.ID;
      this.dialogFormVisible = true;
    },
    //每页条数改变时会触发
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.init();
    },
    //当前页改变时会触发
    handleCurrentChange: function (val) {
      this.currentpage = val;
      this.init();
    },
    //提交发货订单
    send_form() {
      if (!this.ruleForm.emscompany) {
        this.$message.error("请选择快递公司");
        return;
      }
      if (!this.ruleForm.emscode) {
        this.$message.error("请输入快递单号");
        return;
      }
      var datas = {
        ID: this.ruleForm.ID,
        ExpressCode: this.ruleForm.emscode,
        ExpressCompany: this.ruleForm.emscompany,
      };
      console.log(datas);
    //   this.$http.integral.PCSendOrUpdateJFOrderCtl(datas).then((res) => {
    //     if (res) {
    //       this.$message.success("发货成功");
    //       this.dialogFormVisible = false;
    //       this.init();
    //     } else {
    //       this.$message.error(res.Message);
    //     }
    //   });
    },
    //批量发货按钮
    shipment() {
      this.$router.push({
        name: "bulkShipment"
      })
    },
    //提交批量发货数据
    submitBatchExport: function () {
      var first = this.updatetext.replace(/ *[\t] */gm, "/t");
      this.batch = first.replace(/ *[\r|\n] */gm, "/r/n");
      var self = this;
      var datas = {
        txtQueryCode: self.batch,
      };
      if (!datas.txtQueryCode) {
        self.$message({
          type: "error",
          message: "请输入批量导入信息",
        });
        return;
      }
      console.log(datas.txtQueryCode);
    },
    //关闭批量窗口
    handleClose: function () {
      this.showBatchExport = false;
      this.updatetext = "";
    },
    //查看物流
    openEMS(data) {
      this.$confirm("请求跳转快递页, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.open(
            `https://www.kuaidi100.com/chaxun?com=${data.ExpressCompany}&nu=${data.ExpressCode}`
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消跳转",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
h4 {
  margin: 0;
}
/deep/.el-pagination {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
#integralOrder {
  font-family: PingFang-SC-Medium, PingFang-SC;
  padding: 20px;
  .FGline {
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
}
.dis_flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodsText {
  h4 {
    width: 180px;
    text-align: left;
  }
  p {
    text-align: left;
    color: #999;
    font-size: 12px;
  }
}
.EMSK {
  width: 96%;
  max-height: 440px;
  padding: 20px 22px;
  p {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
  }
  .big_box_emsText {
    margin: 10px 0px;
    max-height: 350px;
    overflow: auto;
  }
}
.EMST {
  height: 80px;
}
.dialog .dialog_body .title {
  position: relative;
  margin-left: 30px;
}

.dialog .dialog_body .title::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 1px;
  background: #aaa;
  position: absolute;
  top: 10px;
  left: -30px;
}

.dialog .dialog_body .title::after {
  content: "";
  display: inline-block;
  width: 360px;
  height: 1px;
  background: #999;
  position: absolute;
  top: 10px;
  left: 120px;
}

.dialog .content {
  width: 100%;
  margin-top: -8px;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 20px;
  box-sizing: border-box;
}

.dialog .content > span {
  color: red;
  margin-bottom: 20px;
  display: inline-block;
}
</style>