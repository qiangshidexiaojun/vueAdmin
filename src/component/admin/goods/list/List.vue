<template>
    <div>
        <section class="contentHeader">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">知识内容</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin/goods'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="item-action">内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section class="contentBtn">
            <el-button plain icon="el-icon-plus" @click="add()" size="mini">新增</el-button>
            <el-button plain icon="el-icon-check" @click="all()" size="mini">全选</el-button>
            <el-button plain icon="el-icon-close" @click="open()" size="mini">删除</el-button>
            <el-input class="content_btn_search" @input="search()" v-model="apiQuery.searchvalue" placeholder="请输入搜索内容" prefix-icon="el-icon-search">
            </el-input>
        </section>
        <section class="mainContent">
            <template>
                <el-table :data="tableData2" style="width: 100%;" max-height="350" :row-class-name="tableRowClassName" @selection-change="selector">
                    <el-table-column width="50" type="selection">
                    </el-table-column>
                    <el-table-column label="标题">
                        <template slot-scope="scope">
                            <el-tooltip placement="right" :open-delay="500">
                                <router-link :to="{path: `/admin/goods/detailList/${scope.row.id}`}">
                                    {{scope.row.title}}
                                </router-link>
                                <div slot="content">
                                    <p>商品货号{{scope.row.goods_no}}</p>
                                    <p>交易积分{{scope.row.point}}</p>
                                    <img style="width: 200px;" :src="`${scope.row.imgurl}`" alt="商品图片">
                                </div>
                            </el-tooltip>
                        </template>

                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属类别" width="100">
                    </el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" width="100">
                    </el-table-column>
                    <el-table-column prop="market_price" label="市场价" width="100">
                    </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" width="100">
                    </el-table-column>
                    <el-table-column label="属性" width="100">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="轮播图" placement="bottom" :open-delay="500">
                                <!-- is_slide -->
                                <i :class="['el-icon-picture',scope.row.is_slide == 1 ? 'active' : '']"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="置顶" placement="bottom" :open-delay="500">
                                <!-- is_top -->
                                <i :class="['el-icon-upload',scope.row.is_top == 1 ? 'active' : '']"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="推荐" placement="bottom" :open-delay="500">
                                <!-- is_hot -->
                                <i :class="['el-icon-star-on',scope.row.is_hot == 1 ? 'active' : '']"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <router-link :to="{path: `/admin/goods/detailList/${scope.row.id}`}">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="apiQuery.pageIndex" :page-sizes="[5,8,10]" :page-size="apiQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="apiQuery.totalcount">
                    </el-pagination>
                </div>
            </template>
        </section>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  methods: {
    handleSizeChange(val) {
      this.apiQuery.pageSize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.apiQuery.pageIndex = val;
      this.getGoodsList();
    },
    //* 改变行的颜色 */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "success-row";
      } /* else if(rowIndex % 2 != 0){
        return "success-row";
      } */
      return "";
    },
    /* 查询商品列表 */
    getGoodsList() {
      var api = `?pageIndex=${this.apiQuery.pageIndex}&pageSize=${
        this.apiQuery.pageSize
      }&searchvalue=${this.apiQuery.searchvalue}`;
      this.$http.get(this.$api.gsList + api).then(res => {
        if (res.status == 200) {
          this.tableData2 = res.data.message;
          this.apiQuery.totalcount = res.data.totalcount;
        }
      });
    },
    /* 搜索功能 */
    search() {
      this.getGoodsList();
    },
    /* 选中复选框 */
    selector(selection) {
      this.selected = selection;
    },
    /* 删除功能 */
    del() {
      let delIDS = this.selected.map(value => value.id);
      if (delIDS.length == 0) {
        Message.error({
          message: `请至少选择一条数据`,
          duration: 1000
        });
      } else {
        this.$http.get(this.$api.gsDel + delIDS).then(res => {
          if (res.status == 200) {
            this.getGoodsList();
            Message.success({
              message: `成功删除${delIDS.length}条数据`,
              duration: 1000
            });
          }
        });
      }
    },
    /* 点击全选 */
    all() {
      document.querySelector(".el-checkbox__original").click();
    },
    /* 新增 */
    add(){
      /* 跳转到新增页面 */
      this.$router.push({name: "goodsAdd"});
    },
    /* 刪除提示框 */
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getGoodsList();
  },
  data() {
    return {
      /* 商品列表数据 */
      tableData2: [],
      /* 商品查询数据 */
      apiQuery: {
        pageIndex: 1,
        pageSize: 5,
        searchvalue: "",
        totalcount: 0
      },
      /* 商品选中数据 */
      selected: []
    };
  }
};
</script>

<style scoped lang="less">
.contentBtn {
  padding: 14px 10px;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  margin-top: 20px;
  .content_btn_search {
    width: 150px;
    float: right;
    top: -5px;
  }
}
.mainContent {
  a {
    color: #5b92d2;
  }
  i {
    font-size: 20px;
  }
  i[class$="active"] {
    color: #000;
  }
  .block{
      padding-top: 6px;
  }
}
</style>