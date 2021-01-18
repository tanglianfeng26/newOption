<template>
  <!-- 发货记录 -->
  <div id="AwardRecord">
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
            >{{ scope.row[item.prop] ? "已" : "未" }}{{ item.ch }}</span
          >
          <span v-else-if="item.scope == 'Status'">{{
            scope.row[item.prop] == 1 ? "实物" : "虚拟"
          }}</span>
          <div v-else-if="item.scope == 'prize'">
            <p>{{ scope.row[item.prop1] }}</p>
            <p>{{ scope.row[item.prop2] }}</p>
          </div>
          <div v-else-if="item.scope == 'information'">
            <p>{{scope.row[item.prop1]}} {{scope.row[item.prop2]}}</p>
            <p>{{scope.row[item.prop3]}}</p>
          </div>
          <div
            v-else-if="item.scope == 'cusInfo'"
            style="display: flex; justify-content: center; align-items: center"
          >
            <!-- <div style="width:40px;height:40px;margin-right:10px;">
              <img style="width:100%;height:100%;border-radius:50%" :src="scope.row[item.prop1]" alt="">
            </div> -->
            <div style="text-align:left">
              <p>昵称：{{ scope.row[item.prop2] }}</p>
              <p>地址：
                {{ scope.row[item.prop3] }}
              </p>
            </div>
          </div>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
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
        // {
        //   label: "物流单号",
        //   placeholder: "输入物流单号",
        //   prop: "EMSCode",
        // },
        {
          scope: "btn",
        },
      ],
      //表单数据
      tableData: [
        {
          IsWinPrizeText: "已中奖",
          CreateWorkDate: "2020-10-12 14:12:42",
          QueryFWCode: 3615212731283712,
          Type: 1,
          IsPay: true,
          PrizeName: "iPhone 12",
          PrizeRemark: "256G",
          OrderStateText: "是",
          WinnerPrizeStateText: "已领奖",
          OpenID: "iugher123huiv",
          WinnerPhone: "13888888888",
          headimgurl: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E6%88%90%E5%8A%9F.png",
          WinnerName: "唐先生",
          WinnerAddress: "广东省广州市天河区伍仙桥",
          EMSCompany: "顺丰快递",
          EMSCode: "SF101584"
        }
      ],
      // 表头数据
      tableSet: [
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
          label: "抽奖结果",
          prop: "IsWinPrizeText",
          width: "150px",
        },
        {
          label: "奖品信息",
          prop1: "PrizeName",
          prop2: "PrizeRemark",
          scope: "prize",
          width: "150px",
        },
        {
          label: "收货信息",
          prop1: "WinnerName",
          prop2: "WinnerPhone",
          prop3: "WinnerAddress",
          scope: "information",
          width: "280px",
        },
        {
          label: "是否付款",
          prop: "IsPay",
          scope: "IS",
          width: "180px",
          ch: "付款",
        },
        {
          label: "是否发奖",
          prop: "OrderStateText",
          width: "180px",
        },
        {
          label: "OpenID",
          prop: "OpenID",
          width: "300px",
        },
        {
          label: "客户信息",
          prop2: "WinnerName",
          prop3: "WinnerAddress",
          scope: "cusInfo",
          width: "300px",
        },
        {
          label: "物流信息",
          prop1: "EMSCompany",
          prop2: "EMSCode",
          scope: "prize",
          width: "200px"
        }
      ],
      //分页
      currentRow: null,
      currentpage: 1,
      pagesize: 5,
      total: 0,
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    // 初始化
    init() {
      console.log(this.searchItem);
      var param = {
        FWCode: this.searchItem.FWCode,
        OpenID: "" ,
        WinnerName: this.searchItem.WinnerName,
        WinnerPhone: this.searchItem.WinnerPhone,
        WinnerAddress: "",
        WinnerWechat: "" ,
        ActivityName: "" ,
        PrizeName: "" ,
        StarWorkDate: this.searchItem.StarWorkDate ,
        EndWorkDate: this.searchItem.EndWorkDate ,
        WinnerPrizeState: "" ,
        IsWinPrize: "" ,
        OrderState: "" ,
        Type: "" ,
        Paged: {
          PageIndex: this.currentpage,
          PageSize: this.pagesize ,
          PageCount: "",
        }
      }
      // this.$http.draw.PCGetPagedListLotteryDrawSendGoodsCtl(param).then(res => {
      //   if(res){
      //   this.tableData = res.Data;
      //   this.total = res.TotalCount
      //   }else{
      //     this.$message.error("查询失败")
      //   }
      // })
    },
    // 搜索
    search() {
      console.log(this.searchItem);
      var param = {
        FWCode: this.searchItem.FWCode,
        OpenID: "" ,
        WinnerName: this.searchItem.WinnerName,
        WinnerPhone: this.searchItem.WinnerPhone,
        WinnerAddress: "",
        WinnerWechat: "" ,
        ActivityName: "" ,
        PrizeName: "" ,
        StarWorkDate: this.searchItem.StarWorkDate ,
        EndWorkDate: this.searchItem.EndWorkDate ,
        WinnerPrizeState: "" ,
        IsWinPrize: "" ,
        OrderState: "" ,
        Type: "" ,
        Paged: {
          PageIndex: 1,
          PageSize: this.pagesize ,
          PageCount: "",
        }
      }
      // this.$http.draw.PCGetPagedListLotteryDrawSendGoodsCtl(param).then(res => {
      //   if(res){
      //   this.tableData = res.Data;
      //   this.total = res.TotalCount
      //   }else{
      //     this.$message.error("查询失败")
      //   }
      // })
    },
    // 重置
    initSearch() {
      this.searchItem = {};
      this.search()
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
#AwardRecord {
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


