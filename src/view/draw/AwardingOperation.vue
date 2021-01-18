<template>
  <!-- 奖品发货 -->
  <div id="AwardingOperation">
    <!-- 搜索 -->
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
        <div v-else-if="item.scope === 'timeRange'">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchItem[item.prop1]"
            type="datetime"
            placeholder="选择开始时间"
            size="mini"
            style="width: 200px"
            clearable
          >
          </el-date-picker>
          &nbsp;-&nbsp;
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchItem[item.prop2]"
            type="datetime"
            placeholder="选择结束时间"
            size="mini"
            style="width: 200px"
            clearable
          >
          </el-date-picker>
        </div>
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
    <!-- 表单 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      class="table"
      :header-cell-style="{
        'background-color': '#eee',
        padding: '8px',
        color: '#333',
      }"
    >
      <el-table-column
        v-for="(item, index) in tableSet"
        :width="item.width"
        :key="index"
        :label="item.label"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="item.scope == 'IS'"
            >{{ scope.row[item.prop] == 1 ? "已" : "未" }}{{ item.ch }}</span
          >
          <span v-else-if="item.scope == 'Status'">{{
            scope.row[item.prop] ? "实物" : "虚拟"
          }}</span>
          <span v-else-if="item.scope == 'ceremony'">{{
            scope.row[item.prop] == 1 ? "是" : "否"
          }}</span>
          <div v-else-if="item.scope == 'prize'">
            <p>{{ scope.row[item.prop1] }}</p>
            <p>{{ scope.row[item.prop2] }}</p>
          </div>
          <div v-else-if="item.scope == 'information'">
            <p>{{ scope.row[item.prop1] }} {{ scope.row[item.prop2] }}</p>
            <p>{{ scope.row[item.prop3] }}</p>
          </div>
          <div
            v-else-if="item.scope == 'cusInfo'"
            style="display: flex; justify-content: center; align-items: center"
          >
            <!-- <div style="width: 40px; height: 40px; margin-right: 10px">
              <img
                style="width: 100%; height: 100%; border-radius: 50%"
                :src="scope.row[item.prop1]"
                alt=""
              />
            </div> -->
            <div style="text-align: left;width:100%">
              <p>昵称：{{ scope.row[item.prop2] }}</p>
              <p>地址： {{ scope.row[item.prop4] }}</p>
            </div>
          </div>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="modEMSAddress(scope.row)">修改地址</el-button> -->
          <el-button
            v-if="scope.row.IsPay"
            size="mini"
            type="primary"
            @click="EMSAddress(scope.row.ID)"
            >发货</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 发货弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        label-position="left"
        :model="ruleForm"
        :rules="rules"
        :ref="ruleForm"
      >
        <el-form-item
          v-for="(item, index) in EMSList"
          :key="index"
          :label="item.label"
          label-width="120px"
          :prop="item.prop"
        >
          <el-input
            v-if="item.scope == 'input'"
            v-model="ruleForm[item.prop]"
            autocomplete="off"
          ></el-input>
          <el-select
          allow-create
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
        <el-button @click="NOT_send">取 消</el-button>
        <el-button type="primary" @click="send_form">提 交</el-button>
      </div>
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
      //搜索参数
      searchItem: {},
      //搜索列表
      searchList: [
        {
          label: "抽奖时间区间",
          prop1: "StarWorkDate",
          prop2: "EndWorkDate",
          scope: "timeRange",
        },
        {
          label: "订单号",
          placeholder: "输入订单号",
          prop: "FWCode",
        },
        {
          label: "收货人",
          placeholder: "输入收货人",
          prop: "WinnerName",
        },
        {
          label: "联系号码",
          placeholder: "输入联系号码",
          prop: "WinnerPhone",
        },
        {
          scope: "btn",
        },
      ],
      //表单数据
      tableData: [
        {
          PrizeName: "iPhone 12",
          PrizeRemark: "256G",
          CreateWorkDate: "2020-10-12 14:12:42",
          QueryFWCode: "48915651243461231",
          OpenID: "NGiwenjfn123d",
          WinnerName: "唐先生",
          WinnerPhone: "13888888888",
          WinnerAddress: "广东省广州市天河区",
          IsPay: true,
        }
      ],
      // 表头数据
      tableSet: [
        {
          label: "奖品信息",
          prop1: "PrizeName",
          prop2: "PrizeRemark",
          scope: "prize",
          width: "220px",
        },
        {
          label: "抽奖时间",
          prop: "CreateWorkDate",
          width: "180px",
        },
        {
          label: "订单号",
          prop: "QueryFWCode",
          width: "200px",
        },
        {
          label: "OpenID",
          prop: "OpenID",
          width: "300px",
        },
        {
          label: "客户信息",
          // prop1: "headimgurl",
          prop2: "WinnerName",
          prop3: "WinnerPhone",
          prop4: "WinnerAddress",
          scope: "cusInfo",
          width: "300px",
        },
        {
          label: "收货信息",
          prop1: "WinnerName",
          prop2: "WinnerPhone",
          prop3: "WinnerAddress",
          scope: "information",
          width: "280px",
        },
        // {
        //   label: "是否发奖",
        //   prop: "IsPay",
        //   scope: "ceremony",
        //   width: "120px",
        // },
      ],
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
      rules: {
        emscompany: [
          { required: true, message: "请选择快递公司", trigger: "change" },
        ],
        emscode: [
          { required: true, message: "请输入快递单号", trigger: "blur" },
        ],
      },
      //发货信息表
      ruleForm: {},
      //快递公司列表
      EMSORDER: [
        {
          value: 0,
          EMSCompany: "顺丰快递"
        },
        {
          value: 1,
          EMSCompany: "京东快递"
        },
        {
          value: 2,
          EMSCompany: "韵达快递"
        },
      ],
      // 弹窗状态
      dialogFormVisible: false,
      //分页
      currentRow: null,
      currentpage: 1,
      pagesize: 5,
      total: 1,
    };
  },
  mounted() {
    this.init();
    this.getEMS();
  },
  methods: {
    getEMS() {
      // this.$http.draw.GetMTEMSListCtl().then((res) => {
      //   console.log(res);
      //   this.EMSORDER = res;
      //   console.log(this.EMSORDER);
      // });
    },
    // 初始化
    init() {
      var self = this;
      var data = {
        FWCode: this.searchItem.FWCode || "",
        OpenID: "",
        WinnerName: this.searchItem.WinnerName || "",
        WinnerPhone: this.searchItem.WinnerPhone || "",
        WinnerWechat: "",
        ActivityName: "",
        PrizeName: "",
        StarWorkDate: this.searchItem.StarWorkDate || "",
        EndWorkDate: this.searchItem.EndWorkDate || "",
        WinnerPrizeState: "",
        IsWinPrize: "",
        OrderState: "",
        Type: "",
        Paged: {
          PageIndex: self.currentpage,
          PageSize: self.pagesize,
          PageCount: "",
        },
      };
      console.log(data);
      // this.$http.draw
      //   .PCGetPagedListLotteryDrawWaitHandleCtl(data)
      //   .then((res) => {
      //     this.tableData = res.Data;
      //     this.total = res.TotalCount
      //   });
    },
    // 搜索
    search() {
      var self = this;
      var data = {
        FWCode: this.searchItem.FWCode || "",
        OpenID: "",
        WinnerName: this.searchItem.WinnerName || "",
        WinnerPhone: this.searchItem.WinnerPhone || "",
        WinnerWechat: "",
        ActivityName: "",
        PrizeName: "",
        StarWorkDate: this.searchItem.StarWorkDate || "",
        EndWorkDate: this.searchItem.EndWorkDate || "",
        WinnerPrizeState: "",
        IsWinPrize: "",
        OrderState: "",
        Type: "",
        Paged: {
          PageIndex: 1,
          PageSize: self.pagesize,
          PageCount: "",
        },
      };
      console.log(data);
      // this.$http.draw
      //   .PCGetPagedListLotteryDrawWaitHandleCtl(data)
      //   .then((res) => {
      //     this.tableData = res.Data;
      //     this.total = res.TotalCount
      //   });
    },
    // 重置
    initSearch() {
      this.searchItem = {};
      this.search();
    },
    // 发货
    EMSAddress(id) {
      this.ruleForm = {};
      this.dialogFormVisible = true;
      this.ruleForm.ID = id;
    },
    //确认发货
    send_form() {
      console.log(this.ruleForm);
      var param = {
        ID: this.ruleForm.ID,
        EMSCompany: this.ruleForm.emscompany,
        EMSCode: this.ruleForm.emscode,
      };
      // this.$http.draw.LotteryDrawOrderDeliverCtl(param).then((res) => {
      //   if (res) {
      //     this.$message.success("发货成功");
      //     this.init();
      //     this.dialogFormVisible = false;
      //   } else {
      //     this.$message.error("发货失败");
      //   }
      // });
    },
    //取消发货
    NOT_send() {
      this.dialogFormVisible = false;
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
  },
};
</script>
<style lang="less" scoped>
#AwardingOperation {
  padding: 20px;
  font-family: PingFang-SC-Medium, PingFang-SC;
}
.FGline {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin-bottom: 20px;
}
/deep/.el-pagination {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>


