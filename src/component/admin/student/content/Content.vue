<template>
    <div>
        <section class="contentHeader">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin' }">知识内容</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin/student'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="item-action">内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section class="contentBtn">
            <el-button plain icon="el-icon-plus" size="mini">新增</el-button>
            <el-button plain icon="el-icon-check" size="mini">全选</el-button>
            <el-button plain icon="el-icon-close" size="mini">删除</el-button>
            <el-input class="content_btn_search" @input="search()" v-model="apiQuery.searchvalue" placeholder="请输入搜索内容" prefix-icon="el-icon-search">
            </el-input>
        </section>
        <section class="mainContent">
            <template>
                <el-table :data="tableData2" style="width: 100%;" max-height="370" :row-class-name="tableRowClassName">
                    <el-table-column width="50" type="selection">
                    </el-table-column>
                    <el-table-column label="标题">
                        <template slot-scope="scope">
                            <router-link to="">{{scope.row.title}}</router-link>
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
                                <i class="el-icon-picture"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="置顶" placement="bottom" :open-delay="500">
                                <i class="el-icon-upload"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="推荐" placement="bottom" :open-delay="500">
                                <i class="el-icon-star-on"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                        <template slot-scope="scope">
                            <router-link to="">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </section>
    </div>
</template>

<script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "success-row";
      } /* else if(rowIndex % 2 != 0){
        return "success-row";
      } */
      return "";
    },
    getGoodsList() {
        var api = `?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`;
      this.$http
        .get(this.$api.gsList + api)
        .then(res => {
          if (res.status == 200) {
            this.tableData2 = res.data.message;
          }
        });
    },
    search(){
        this.getGoodsList();
    }
  },
  created () {
    this.getGoodsList();  
  },
  data() {
    return {
      tableData2: [],
      apiQuery: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      },
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
}
</style>