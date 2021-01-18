<template>
  <!-- 积分用户 -->
  <div id="integratingUser">
    <!-- 搜索功能 -->
    <el-form label-width="100px" :inline="true">
      <el-form-item
        v-for="(item, index) in searchList"
        :key="index"
        :label="item.label"
      >
        <div v-if="item.scope == 'btn'" style="padding-left: 30px">
          <el-button @click="initSS" type="primary">搜索</el-button>
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
    <!-- 用户信息 -->
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
          <div v-if="item.scope == 'BTN'">
            <el-button type="text" @click="delivery(scope.row)"
              >修改积分</el-button
            >
          </div>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
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
    <!-- 弹窗 -->
    <el-dialog title="修改积分" :visible.sync="Popup" width="26%" :before-close="handleClose">
      <el-form label-position="left">
        <el-form-item
          v-for="(item, index) in JSLists"
          :key="index"
          :label="item.label"
          label-width="80px"
        >
          <div
            style="display: flex; align-items: center"
            v-if="item.scope == 'img_name'"
          >
            <span style="margin-left: 12px">{{ JFnum[item.prop2] }}</span>
          </div>
          <el-input
            v-else
            v-model="JFinit"
            autocomplete="off"
            placeholder="请输入增加/减少积分值"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
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
          label: "手机号",
          placeholder: "输入手机号",
          prop: "Phone",
        },
        {
          label: "",
          scope: "btn",
        },
      ],
      //表头数据
      tableList: [
        {
          label: "手机号",
          prop: "Phone",
          width: "400px",
        },
        {
          label: "剩余积分",
          prop: "CurrentJF",
          width: "400px",
        },
        {
          label: "创建时间",
          prop: "CreateTime",
          width: "400px",
        },
        {
          label: "操作",
          scope: "BTN",
          width: "400px",
        },
      ],
      //表单数据
      tableText: [],
      //修改积分
      JFnum: {},
      //初始积分
      JFinit: 0,
      //修改积分弹窗
      Popup: false,
      //   修改积分列表
      JSLists: [
        {
          label: "手机号",
          prop2: "Phone",
          scope: "img_name",
        },
        {
          label: "加减积分",
          prop: "CurrentJF",
        },
      ],
      //   分页
      currentpage: 1,
      pagesize: 5,
      total: 1,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    //搜索
    initSS() {
        this.currentpage = 1 
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        Phone: this.searchItem.Phone || "",
      };
    //   this.$http.integral.PCGetPagedListJFCtl(datas).then((res) => {
    //     console.log(res);
    //     this.tableText = res.Data;
    //     this.total = res.TotalCount;
    //   });
      console.log(this.searchItem);
    },
    search() {
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        Phone: this.searchItem.Phone || "",
      };
    //   this.$http.integral.PCGetPagedListJFCtl(datas).then((res) => {
    //     console.log(res);
    //     this.tableText = res.Data;
    //     this.total = res.TotalCount;
    //   });
      console.log(this.searchItem);
    },
    //重置
    initSearch() {
      this.searchItem = {};
      this.initSS();
    },
    //取消修改
    Cancel() {
      this.Popup = false;
      this.search();
    },
    //确定修改积分
    confirm() {
      var datas = {
        Phone: this.JFnum.Phone,
        JFValue: this.JFinit,
      };
      console.log(this.JFnum);
      if(this.JFinit == 0){
          this.$message.error("请输入加减积分值")
          return
      }
    //   this.$http.integral.PCUpdateJFByPhoneCtl(datas).then((res) => {
    //     this.$message.success("修改积分成功")
    //     this.Popup = false;
    //     this.search();
    //   });
    },
    //   修改积分
    delivery(datas) {
      console.log(datas);
      this.JFinit = 0
      this.JFnum = datas;
      this.Popup = true;
    },
    // 	每页条数改变时会触发
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.search();
    },
    // 当前页改变时会触发
    handleCurrentChange: function (val) {
      this.currentpage = val;
      this.search();
    },
    //关闭弹窗
    handleClose(){
        this.$confirm('此操作将取消修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
          this.Popup = false
        }).catch(() => {        
        });
    }
  },
};
</script>

<style lang="less" scoped>
#integratingUser {
  padding: 20px;
  .FGline {
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    margin-bottom: 20px;
  }
}
.dis_flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>