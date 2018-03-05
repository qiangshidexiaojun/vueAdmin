<template>
    <div>
        <section class="contentHeader">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/admin/goods/list'}">返回上一层</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin/'}">购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="item-action">添加商品</el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section class="mainContent">
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内容标题" prop="title" class="">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="副标题">
                            <el-input v-model="form.sub_title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属类别" prop="category_id">
                            <!-- <input type="text" v-model="form.category_id"> -->
                            <el-select v-model="form.category_id" placeholder="请选择">
                                <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                                    <span>
                                        <span v-if="item.class_layer != 1">|-</span>
                                        <span>{{item.title}}</span>
                                    </span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="是否发布">
                                    <el-switch v-model="form.status" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                                </el-form-item>
                            </el-col>

                            <el-col :span="16">
                                <el-form-item label="推荐类型">
                                    <el-switch v-model="form.is_slide" inactive-text="轮播图" active-color="#20a0ff" inactive-color="#bfcbd9">
                                    </el-switch>
                                    <el-switch v-model="form.is_top" inactive-text="置顶" active-color="#20a0ff" inactive-color="#bfcbd9">
                                    </el-switch>
                                    <el-switch v-model="form.is_hot" inactive-text="推荐" active-color="#20a0ff" inactive-color="#bfcbd9">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上传封面">
                            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg" :on-remove="removeImg">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上传附件">
                            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :file-list="form.fileList" multiple :on-success="uploadFile" :on-remove="removeFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="商品货号">
                            <el-input v-model="form.goods_no"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="库存数量">
                            <el-input v-model="form.stock_quantity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="市场价格">
                            <el-input v-model="form.market_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="销售价格">
                            <el-input v-model="form.sell_price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="内容摘要" prop="zhaiyao">
                    <el-input type="textarea" v-model="form.zhaiyao"></el-input>
                </el-form-item>
                <template>
                    <el-form-item label="详细内容" prop="content">
                        <quill-editor v-model="form.content" name=""></quill-editor>
                    </el-form-item>
                </template>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
                    <el-button @click="$router.go(-1)">返回上一页</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        category_id: "",
        content: "",
        fileList: [],
        goods_no: "",
        imgList: [],
        is_hot: false,
        is_slide: false,
        is_top: false,
        market_price: 0,
        sell_price: 0,
        status: true,
        stock_quantity: 0,
        sub_title: "",
        title: "",
        zhaiyao: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择类别", trigger: "blur" }
        ],
        zhaiyao: [
          { required: true, message: "请输入摘要内容", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入详细内容", trigger: "blur" }
        ]
      },
      category: []
    };
  },
  methods: {
    /* 提交按钮 */
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        /* 验证通过 */
        if (valid) {
          this.$http.post(this.$api.gsAdd, this.form).then(res => {
            if (res.data.status == 0) {
              Message.success({
                message: `添加成功`,
                duration: 1000
              });
              this.$router.go(-1);
            } else if (res.data.status == 1) {
              Message.error({
                message: `添加失败`,
                duration: 1000
              });
            }
          });
        } else {
          Message.error({
            message: `验证失败`,
            duration: 1000
          });
          return false;
        }
      });
    },
    /* 获取下拉列表 */
    getUpList() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          this.category = res.data.message;
        }
      });
    },
    /* 上传图片 */
    uploadImg(response) {
      this.form.imgList = [response];
    },
    /* 移出图片 */
    removeImg(file, fileList) {
      this.form.imgList = fileList;
    },
    /* 上傳文件 */
    uploadFile(response) {
      this.form.fileList.push(response);
    },
    /* 移出文件 */
    removeFile(file, fileList) {
      this.form.fileList = fileList;
    }
  },
  created() {
    /* 获取下拉列表 */
    this.getUpList();
  }
};
</script>

<style scoped lang="less">
.mainContent {
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px 20px;
}
</style>