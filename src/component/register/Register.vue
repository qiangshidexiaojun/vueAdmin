<template>
    <div>
        <el-button type="text" @click="open">{{msg}}</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "注册"
    };
  },
  methods: {
    open() {
      this.$prompt("请新建邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
          this.open2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    open2() {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S{6,10}/,
        inputErrorMessage: "密码格式不正确"
      })
        .then(({ value }) => {
          /*  this.$message({
                    type: "success",
                    message: "你的密码是: " + value
                }); */
            this.open3();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    open3() {
      this.$prompt("请确认密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S{6,10}/,
        inputErrorMessage: "密码格式不正确"
      })
        .then(({ value }) => {
          /*  this.$message({
                    type: "success",
                    message: "你的密码是: " + value
                }); */
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style scoped>

</style>