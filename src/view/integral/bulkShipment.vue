<template>
  <!-- 批量发货 -->
  <div id="bulkShipment">
    <el-container>
      <el-main class="main" style="padding: 0">
        <!-- 头部 -->
        <header class="header">
          <h3>批量发货</h3>
          <el-button
              size="small"
              type="success"
              style="margin-top: 10px;margin-right: 10px"
              @click="downXlsx">下载模板</el-button
            >
            <span style="color:#F56C6C">请先下载模板，在模板内填写对应数据</span>
          <el-upload
            class="upload-demo"
            action="/api/JF/PCSendOrUpdateJFOrderInBatchesCtl"
            ref="upload"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="handleChange"
            :auto-upload="false"
          >
            <el-button
              size="small"
              type="info"
              plain
              style="color: #333; letter-spacing: 1px"
              >选择xlsx文件</el-button
            >
          </el-upload>
          <el-button size="small" type="primary" style="margin-top: 14px" @click="submitUpload"
            >提交</el-button
          >
          <span style="color: red;margin-left:10px" v-if="uploadSuccessText">上传成功，成功{{uploadSNum}}条，失败{{uploadENum}}条</span>
        </header>
        <!-- 订单数据 -->
        <div class="main">
          <el-table
            ref="multipleTable"
            :data="tableList"
            style="width: 100%"
            class="table"
            border
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
                <span v-if="item.scope === 'IS'">
                  {{ Number(scope.row[item.prop]) ? "已" : "未" }}{{ item.ch }}
                </span>
                <div
                  v-else-if="item.scope === 'cusInfo'"
                  class="cusInfo"
                  style="justify-content: center"
                >
                  <div>
                    <p>
                      {{ scope.row[item.prop2]
                      }}<span style="margin-left: 10px">
                        {{ scope.row[item.prop3] }}</span
                      >
                    </p>
                    <p>{{ scope.row[item.prop4] }}{{ scope.row[item.prop5] }}{{ scope.row[item.prop6] }}{{ scope.row[item.prop7] }}</p>
                  </div>
                </div>
                <div v-else-if="item.scope === 'EMS'">
                  <span>{{ scope.row[item.prop1] }}</span>
                  <span style="margin-left: 10px; color: #409eff">{{
                    scope.row[item.prop2]
                  }}</span>
                </div>
                <span
                  v-else-if="item.scope === 'IsAwards'"
                  :style="scope.row[item.prop] == '成功' ? IsSuccess : IsFalse"
                  >{{ scope.row[item.prop] == "成功" ? "成功" : "失败" }}</span
                >
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
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
        uploadSuccessText: false,
        uploadSNum: 0,
        uploadENum: 0,
      IsSuccess: "color:#01AA9C",
      IsFalse: "color:#FF0202",
      fileList: [],
      form: {
        emscompanyNew: "",
        emscompany: "",
        emscode: "",
      },
      ID: "",
      dialogFormVisible: false,

      formLabelWidth: "100px",
      tableSet: [
        {
          label: "订单号",
          prop: "OrderCode",
          width: "300px",
        },
        {
          label: "商品名称",
          prop: "ProductName",
          scope: "goods",
          width: "400px",
        },
        {
          label: "商品数量",
          prop: "ProductNum",
          scope: "Nums",
          width: "150px",
        },
        {
          label: "收货信息",
          prop2: "ReceiverName",
          prop3: "ReceiverMobile",
          prop4: "ReceiverProvince",
          prop5: "ReceiverCity",
          prop6: "ReceiverDistrict",
          prop7: "ReceiverDetailAddress",
          scope: "cusInfo",
          width: "400px",
        },
        {
          label: "物流信息",
          prop1: "ExpressCompany",
          prop2: "ExpressCode",
          width: "300px",
          scope: "EMS",
        },
        {
          label: "结果",
          prop: "Result",
          width: "180px",
          scope: "IsAwards",
        },
      ],
      // 快递公司
      options: [
        {
          label: "优速快递",
          value: 0,
        },
        {
          label: "韵达快递",
          value: 1,
        },
        {
          label: "圆通速递",
          value: 2,
        },
        {
          label: "申通速递",
          value: 3,
        },
        {
          label: "百世汇通",
          value: 4,
        },
        {
          label: "邮政包裹",
          value: 5,
        },
        {
          label: "天天快递",
          value: 6,
        },
        {
          label: "中通快递",
          value: 7,
        },
        {
          label: "顺丰速递",
          value: 8,
        },
        {
          label: "EMS",
          value: 9,
        },
        {
          label: "宅急送",
          value: 10,
        },
        {
          label: "全峰快递",
          value: 11,
        },
        {
          label: "德邦物流",
          value: 12,
        },
        {
          label: "其它",
          value: 13,
        },
      ],
      //当前页数据
      tableData: [],
      // 分页
      currentpage: 1,
      pagesize: 5,
      total: 0,
      tableList: []
    };
  },
  mounted: function () {
    // this.getList()
  },
  methods: {
      //下载模板
      downXlsx(){
        //   this.$http.integral.PCGetJFOrderUpdateTemplateFileCtl().then(res => {
        //       console.log(res);
        //       window.location.href = `http://${res}`
        //       this.$message.success("下载成功")
        //   })
      },
    beforeAvatarUpload(file) {
      let fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = fileName === "xls";
      const extension2 = fileName === "xlsx";
      //限制文件大小
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning",
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2;
    },
    //提交后触发
    handleChange(data) {
      this.tableData = data.Data.Data
      this.uploadSuccessText = true
      this.uploadSNum = data.Data.SuccessCount
      this.uploadENum = data.Data.FailCount
      this.total = data.Data.Data.length
      this.getList()
    },
    handleRemove(file, fileList) {
    },
    //提交
    submitUpload(){
         this.$refs.upload.submit();
    },
    //点击文件触发
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        '当前限制选择 1 个文件'
      );
    },
    beforeRemove(file, fileList) {
      return this.$message.error(`请选择xlsx文件上传!`);
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange: function (val) {
      this.currentpage = val;
      this.getList();
    },
    getList: function () {
        this.tableList = this.tableData.filter((item,index) => {
            return (index >= this.pagesize * this.currentpage - this.pagesize) && (index < this.pagesize * this.currentpage)
        })
    },
  },
};
</script>

<style lang="less" scoped>
#bulkShipment {
  font-family: PingFang-SC-Medium, PingFang-SC;
  padding: 20px;
}
.header {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 30px;
}

.main {
  width: 100%;
}

.main .table {
  margin: 30px 0 30px 0;
}

.main .table .cusInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.main .table .cusInfo p {
  text-align: left;
}

.main .table .cusInfo img {
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 0.08rem;
}

.main .pagination {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 30px;
}

.upload-demo {
  margin-top: 15px;
  display: flex;
}

.el-upload {
  margin-right: 10px;
}

</style>