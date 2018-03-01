<template>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside :width="width">
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
  },
  computed: {
    width(){
      return this.$store.getters.width + "px";
    }
  }
};
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    height: 42px!important;
    line-height: 42px;
    color: #686f92;
    text-align: right;
    padding-left: 0;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #267cb7;
    transition: width 0.5s;
  }
  
}
</style>