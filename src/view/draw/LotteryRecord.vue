<template>
  <!-- 抽奖纪录 -->
  <div id="lotteryRecord">
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
            v-for="(item, index) in item.options"
            :key="index"
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
          <el-button @click="init_search" type="primary">搜索</el-button>
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
          <span v-else-if="item.scope == 'ISWin'"
            >{{ scope.row[item.prop1]}}</span
          >
          <div v-else-if="item.scope == 'Status'">
            <span v-if="scope.row[item.prop] == 3">其他</span>
            <span v-else>{{ scope.row[item.prop] == 1 ? "实物" : "虚拟物品" }}</span>
          </div>
          <div v-else-if="item.scope == 'prize'">
            <p>{{ scope.row[item.prop1] }}</p>
            <p>{{ scope.row[item.prop2] }}</p>
          </div>
          <div
            v-else-if="item.scope == 'cusInfo'"
            style="display: flex; justify-content: left; align-items: center"
          >
            <!-- <div style="width: 40px; height: 40px; margin-right: 10px">
              <img
                style="width: 100%; height: 100%; border-radius: 50%"
                :src="scope.row[item.prop1]"
                alt=""
              />
            </div> -->
            <div style="text-align: left">
              <p>昵称：{{ scope.row[item.prop2] }}</p>
              <p>
                地址： {{ scope.row[item.prop3] }}
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
        {
          label: "是否中奖",
          placeholder: "选择是否中奖",
          prop: "IsWinPrize",
          scope: "select",
          options: [
            {
              value: true,
              label: "是",
            },
            {
              value: false,
              label: "否",
            },
          ],
        },
        {
          label: "是否确认",
          placeholder: "选择是否确认",
          prop: "WinnerPrizeState",
          scope: "select",
          options: [
            {
              value: 1,
              label: "已领取",
            },
            {
              value: 2,
              label: "已丢弃",
            },
            {
              value: 0,
              label: "已过期/未确认",
            },
          ],
        },
        {
          label: "是否发奖",
          placeholder: "选择是否发奖",
          prop: "OrderState",
          scope: "select",
          options: [
            {
              value: 1,
              label: "是",
            },
            {
              value: 0,
              label: "否",
            },
          ],
        },
        {
          label: "奖品类型",
          placeholder: "选择奖品类型",
          prop: "Type",
          scope: "select",
          options: [
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
              label: "其他"
            }
          ],
        },
        {
          scope: "btn",
        },
      ],
      //表单数据
      tableData: [
        {
          IsWinPrize: true,
          CreateWorkDate: "2020-10-12 14:12:42",
          QueryFWCode: 3615212731283712,
          Type: 1,
          PrizeName: "iPhone 12",
          Prize: "256G",
          WinnerPrizeStateText: "已领奖",
          OpenID: "iugher123huiv",
          WinnerPhone: "13888888888",
          headimgurl: "http://maotaiprice.oss-cn-hangzhou.aliyuncs.com/kanglifu/%E6%88%90%E5%8A%9F.png",
          WinnerName: "唐先生",
          WinnerAddress: "广东省广州市天河区伍仙桥"
        }
      ],
      // 表头数据
      tableSet: [
        {
          label: "是否中奖",
          prop: "IsWinPrize",
          width: "100px",
          scope: "IS",
          ch: "中奖",
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
          label: "奖品类型",
          prop: "Type",
          scope: "Status",
          width: "180px",
        },
        {
          label: "奖品信息",
          prop1: "PrizeName",
          prop2: "Prize",
          scope: "prize",
          width: "150px",
        },
        {
          label: "领奖状态",
          prop: "WinnerPrizeState",
          prop1: "WinnerPrizeStateText",
          scope: "ISWin",
          width: "180px",
        },
        {
          label: "OpenID",
          prop: "OpenID",
          width: "300px",
        },
        {
          label: "手机号",
          prop: "WinnerPhone",
          width: "180px",
        },
        {
          label: "客户信息",
          prop1: "headimgurl",
          prop2: "WinnerName",
          prop3: "WinnerAddress",
          scope: "cusInfo",
          width: "300px",
        },
      ],
      //分页
      currentRow: null,
      currentpage: 1,
      pagesize: 5,
      total: 1,
    };
  },
  mounted() {
    this.search()
  },
  methods: {
    // 搜索前置
    init_search(){
      this.currentpage = 1
      this.search()
    },
    // 搜索
    search() {
      var datas = {
        FWCode: this.searchItem.FWCode,
        OpenID: "",
        WinnerName: this.searchItem.WinnerName,
        WinnerPhone: this.searchItem.WinnerPhone,
        WinnerAddress: "",
        WinnerWechat: "",
        ActivityName: "",
        PrizeName: "",
        StarWorkDate: this.searchItem.StarWorkDate,
        EndWorkDate: this.searchItem.EndWorkDate,
        WinnerPrizeState: this.searchItem.WinnerPrizeState,
        IsWinPrize: this.searchItem.IsWinPrize,
        OrderState: this.searchItem.OrderState,
        Type: this.searchItem.Type,
        Paged: {
          PageIndex: this.currentpage,
          PageSize: this.pagesize,
          PageCount: "",
        },
      };
      if(datas.IsWinPrize === undefined){
        datas.IsWinPrize = true
      }
      // this.$http.draw.PCGetPagedListLotteryDrawRecordCtl(datas).then((res) => {
      //   this.tableData = res.Data;
      //   this.total = res.TotalCount
      // });
    },
    // 重置
    initSearch() {
      this.searchItem = {};
      this.init_search()
    },
    //每页条数改变时会触发
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.search()
    },
    //当前页改变时会触发
    handleCurrentChange: function (val) {
      this.currentpage = val;
      this.search()

    },
  },
};
</script>
<style lang="less" scoped>
#lotteryRecord {
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


