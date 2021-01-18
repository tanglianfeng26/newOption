<template>
  <!-- 积分商品列表 -->
  <div id="listCredits">
    <!-- 搜索功能 -->
    <el-form label-width="60px" :inline="true" label-position="center">
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
    <!-- 新增商品 -->
    <el-button type="primary" style="margin-bottom: 10px" @click="Modify"
      >+ 新增商品</el-button
    >
    <!-- 商品列表 -->
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
          <div v-if="item.scope == 'IsAwards'">
            <p :style="scope.row[item.prop] ? '' : 'colorRed'">
              {{ scope.row[item.prop] ? "上架" : "下架" }}
            </p>
          </div>
          <div v-else-if="item.scope == 'Goodsurl'" class="dis_flex">
            <img
              :src="scope.row[item.prop]"
              alt=""
              style="width: 48px; height: 48px"
            />
          </div>
          <div v-else-if="item.scope == 'BTN'">
            <el-button type="text" @click="shelves(scope.row)">{{
              scope.row["IsOnline"] ? "下架" : "上架"
            }}</el-button>
            <el-button type="text" @click="Modify(scope.row)">修改</el-button>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </div>
          <span v-else-if="item.scope == 'MoreText'"
            >{{ scope.row[item.prop] }} {{ scope.row[item.prop2] }}</span
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
    <!-- 弹窗 -->
    <el-dialog
      :title="goodsList.ID == undefined ? '新增商品' : '修改商品'"
      :visible.sync="Popup"
      width="500px"
      :before-close="clear"
    >
      <el-form>
        <el-form-item
          v-for="(item, index) in ModifyGoods"
          :key="index"
          :label="item.label"
          label-width="80px"
        >
          <div v-if="item.scope == 'img'">
            <!-- <mt-uploader
              :limit="1"
              :imgList="ImageUrls"
              @uploadFile="changeSuccessHandler"
              @imgChange="changeImgHandler"
              @handleDelete="changeRemoveHandler"
              ref="imgUploader"
            ></mt-uploader> -->
          </div>
          <el-input
            :placeholder="item.placeholder"
            v-else-if="item.scope == 'num'"
            v-model="goodsList[item.prop]"
            autocomplete="off"
            @keyup.native="proving"
          ></el-input>
          <el-input
            :placeholder="item.placeholder"
            v-else
            v-model="goodsList[item.prop]"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <p style="margin-bottom: 10px">注意事项</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button type="primary" style="margin-top: 10px" @click="upText"
        >保 存</el-button
      >
    </div>
  </div>
</template>

<script>
// import mtUploader from "@/components/uploader/index";
export default {
  //   components: {
  //     mtUploader,
  //   },
  data() {
    return {
      //上传图片
      ImageUrls: [],
      //下架字体颜色
      colorRed: "color:#E02020",
      //搜索参数
      searchItem: {},
      //搜索列表
      searchList: [
        {
          label: "商品名",
          placeholder: "输入商品名",
          prop: "Name",
        },
        {
          label: "",
          scope: "btn",
        },
      ],
      //表单数据
      tableList: [
        {
          label: "序号",
          prop: "ID",
          width: "80",
        },
        {
          label: "商品图片",
          prop: "ProductImg",
          scope: "Goodsurl",
          width: "200px",
        },
        {
          label: "商品名称",
          prop: "Name",
          prop2: "Description",
          scope: "MoreText",
          width: "400px",
        },
        {
          label: "兑换积分",
          prop: "JFPrice",
          width: "300px",
        },
        {
          label: "商品库存",
          prop: "AvaliableNum",
          width: "300px",
        },
        {
          label: "状态",
          prop: "IsOnline",
          scope: "IsAwards",
          width: "200px",
        },
        {
          label: "操作",
          scope: "BTN",
          width: "300px",
        },
      ],
      //模拟商品数据
      tableText: [],
      ModifyGoods: [
        {
          label: "商品图片",
          prop: "ProductImg",
          scope: "img",
          placeholder: "建议尺寸：宽750px,高750px",
        },
        {
          label: "商品名称",
          prop: "Name",
          placeholder: "输入商品名称",
        },
        {
          label: "商品明细",
          prop: "Description",
          placeholder: "输入商品名称",
        },
        {
          label: "兑换积分",
          prop: "JFPrice",
          scope: "num",
          placeholder: "输入兑换所需积分值",
        },
        {
          label: "商品库存",
          prop: "AvaliableNum",
          placeholder: "输入商品库存",
        },
      ],
      //修改or新增商品
      goodsList: {},
      //商品弹窗
      Popup: false,
      //   分页
      currentpage: 1,
      pagesize: 5,
      total: 1,
      //注意事项
      textarea: "",
    };
  },
  mounted() {
    this.search();
    this.text();
  },
  methods: {
    //兑换积分为整数
    proving() {
      this.goodsList.JFPrice = this.goodsList.JFPrice.replace(/[^\.\d]/g, "");
      this.goodsList.JFPrice = this.goodsList.JFPrice.replace(".", "");
    },
    //获取注意事项
    text() {
      //   this.$http.integral.PCGetJFProductNoticeCtl().then((res) => {
      //     this.textarea = res;
      //   });
    },
    //   更新注意事项
    upText() {
      var datas = {
        Content: this.textarea,
      };
      //   this.$http.integral.PCUpdateJFProductNoticeCtl(datas).then((res) => {
      //     this.$message.success("修改成功");
      //   });
    },
    // 图片 start
    changeSuccessHandler(rs, type) {
      this.ImageUrls.push(rs.url);
    },
    changeImgHandler(rs, index) {
      this.$set(this.ImageUrls, index, rs.url);
    },
    changeRemoveHandler(index) {
      this.ImageUrls.splice(index, 1);
    },
    // 图片 end

    initSS() {
      this.currentpage = 1;
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        SearchStr: this.searchItem.Name || "",
      };
      //   this.$http.integral.PCGetPagedListJFProductCtl(datas).then((res) => {
      //     this.tableText = res.Data;
      //     this.total = res.TotalCount;
      //   });
    },
    //获取商品列表 搜索
    search() {
      var datas = {
        PageIndex: this.currentpage,
        PageSize: this.pagesize,
        SearchStr: this.searchItem.Name || "",
      };
      //   this.$http.integral.PCGetPagedListJFProductCtl(datas).then((res) => {
      var res = {
        Data: [
          {
            AvaliableNum: 10,
            CreateTime: "2020-12-09 18:53:10",
            Description: "256G",
            ID: 1,
            IsOnline: true,
            JFPrice: 1,
            Name: "IPhone12",
            ProductImg:
              "http://kjpc.aicomingsys.com//file/16079991749e1a865df04649d78632ac9200ac006d.png",
          },
          {
            AvaliableNum: 10,
            CreateTime: "2020-12-09 18:53:10",
            Description: "128G",
            ID: 2,
            IsOnline: true,
            JFPrice: 2,
            Name: "IPhone X",
            ProductImg:
              "https://img12.360buyimg.com/n7/jfs/t1/149071/13/17595/355519/5fcfa57cE9786ff3e/c4a272c34331debf.png",
          },
          {
            AvaliableNum: 10,
            CreateTime: "2020-12-14 19:34:36",
            Description: "64G",
            ID: 3,
            IsOnline: true,
            JFPrice: 3,
            Name: "iPhone12",
            ProductImg:
              "http://kjpc.aicomingsys.com//file/1607945664a7d7f3c3b4c34ea6a3c6ac910142900d.png",
          },
          {
            AvaliableNum: 10,
            CreateTime: "2020-12-15 10:26:49",
            Description: "24片",
            ID: 4,
            IsOnline: true,
            JFPrice: 4,
            Name: "面膜",
            ProductImg:
              "http://kjpc.aicomingsys.com//file/1607999194f721de3fba184a62aaffac9200ac17b3.png",
          },
          {
            AvaliableNum: 1,
            CreateTime: "2020-12-17 15:21:33",
            Description: "测试",
            ID: 5,
            IsOnline: false,
            JFPrice: 5,
            Name: "测试",
            ProductImg:
              "http://kjpc.aicomingsys.com//file/1608189689b3cafe0b8f9646dc8863ac9400fd18b4.png",
          },
        ],
        TotalCount: 5,
      };

      this.tableText = res.Data;
      this.total = res.TotalCount;
      //   });
    },
    //重置
    initSearch() {
      this.searchItem = {};
      this.initSS();
    },
    //上下架
    shelves(datas) {
      var self = this;
      this.$confirm(
        "此操作将使商品状态更改为：" + (datas.IsOnline ? "下架" : "上架"),
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          datas.IsOnline = !datas.IsOnline;
          var data = {
            isOnline: datas.IsOnline,
            id: datas.ID,
          };
          //   self.$http.integral.PCUpdateJFProductIsOnlineCtl(data).then((res) => {
          //     if (res) {
          //       self.$message.success("商品状态更新成功!");
          //       self.search();
          //     } else {
          //       self.$message.error("商品状态更新失败!");
          //     }
          //   });
        })
        .catch(() => {});
    },
    // 修改商品
    Modify(datas) {
      this.ImageUrls = [];
      if (datas.ID) {
        this.goodsList = datas;
        this.ImageUrls.push(datas.ProductImg);
      } else {
        this.goodsList = {};
      }
      this.Popup = true;
      console.log("goodsList", this.goodsList);
    },
    //取消修改、新增
    clear() {
      this.$confirm("此操作将关闭窗口", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Popup = false;
          this.search();
        })
        .catch(() => {});
    },
    //确定修改
    confirm() {
      this.goodsList.ProductImg = this.ImageUrls[0];
      if (!this.goodsList.ProductImg) {
        this.$message.error("请上传图片");
        return;
      }
      if (!this.goodsList.Name) {
        this.$message.error("请填写商品名称");
        return;
      }
      if (!this.goodsList.Description) {
        this.$message.error("请填写商品明细");
        return;
      }
      if (!this.goodsList.JFPrice) {
        this.$message.error("请填写兑换积分");
        return;
      }
      if (!this.goodsList.AvaliableNum) {
        this.$message.error("请填写商品库存");
        return;
      }
      var datas = {
        ProductImg: this.goodsList.ProductImg,
        ProductName: this.goodsList.Name,
        Description: this.goodsList.Description,
        JFPrice: this.goodsList.JFPrice,
        AvaliableNum: this.goodsList.AvaliableNum,
      };
      if (this.goodsList.ID) {
        datas.ID = this.goodsList.ID;
        // this.$http.integral.PCUpdateJFProductInfoCtl(datas).then((res) => {
        //   if (res) {
        //     this.$message.success("修改商品成功！");
        //     this.Popup = false;
        //     this.search();
        //   }
        // });
      } else {
        // this.$http.integral.PCAddJFProductCtl(datas).then((res) => {
        //   if (res) {
        //     this.$message.success("新增商品成功！");
        //     this.Popup = false;
        //     this.search();
        //   }
        // });
      }
    },
    //   删除商品
    del(datas) {
      var data = {
        id: datas.ID,
      };
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   this.$http.integral.PCDeleteJFProductCtl(data).then((res) => {
          //     if (res) {
          //       this.$message.success("删除成功!");
          //       this.search();
          //     } else {
          //       this.$message.error("删除失败!");
          //     }
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
  },
};
</script>

<style lang="less" scoped>
#listCredits {
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
.goodsImg_box {
  width: 120px;
  height: 120px;
  background-color: #fbfdff;
  border: 1px dotted #ccc;
  border-radius: 4px;
  display: block;
  position: relative;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 30px;
    color: #999999;
  }
}
/deep/.el-textarea__inner {
  width: 250px !important;
}
</style>