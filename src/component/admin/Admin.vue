<template>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <app-aside></app-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./subcom/Header.vue";
import Aside from "./subcom/Aside.vue";
export default {
  //子组件
  components: {
    appHeader: Header,
    appAside: Aside
  }
};
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    line-height: 60px;
    color: #686f92;
    text-align: right;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: red;
  }
  
}
</style>