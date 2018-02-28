<template>
  <div class="login">
    <section>
      <!-- rules校验规则,ref是代表dom的引用，用来获取dom的 -->
      <el-form :model="ruleForm2" status-icon label-position="top" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!-- 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
        <el-form-item label="账号" prop="uname">
          <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="success" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        uname: "",
        upwd: ""
      },
      rules2: {
        uname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$http.post(this.$api.login, this.ruleForm2).then(res => {
        if (!res.data.status) {
          Message.success({
            message: "登录成功！",
            type: "success",
            duration: 1000
          });
          localStorage.setItem("uname", res.data.message.uname);
          /* 路由跳转，也可以使用replace */
          this.$router.push({ name: "admin" });
        } else {
          Message.success({
            message: res.data.message,
            type: "error",
            duration: 1000
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          Message.success({
            message: "登录失败！",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background: aqua;
}
section {
  width: 400px;
  height: 300px;
  border: 1px solid #fff;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
form {
  padding: 10px 20px;
}
</style>