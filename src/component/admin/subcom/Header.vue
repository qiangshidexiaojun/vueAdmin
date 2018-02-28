<template>
  <div class="appHeader">
    <div class="appMessage">{{msg}}</div>
    <el-dropdown @command="handleClick">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom"></i>功能
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="review">预览网站</el-dropdown-item>
        <el-dropdown-item command="updatePsd">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  data() {
    return {
      msg: "你好，" + localStorage.getItem("uname")
    };
  },
  methods: {
    handleClick(command) {
      /* 单击注销登录 */
      if (command == "logout") {
        this.$http.get(this.$api.logout).then(res => {
          if (res.data.status == 0) {
            /* 显示弹出框 */
            Message.success({
              message: res.data.message,
              type: "success",
              duration: 1000
            });
            localStorage.clear();
            this.$router.push({ name: "login" });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.appHeader {
  .appMessage {
    display: inline-block;
    padding-right: 10px;
  }
  .el-dropdown {
    float: right;
    padding-left: 10px;
    border-left: 2px solid #eeeeee;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    span{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
.el-dropdown-menu {
  li {
    width: 100px;
    text-align: center;
    font-size: 18px;
  }
}
</style>