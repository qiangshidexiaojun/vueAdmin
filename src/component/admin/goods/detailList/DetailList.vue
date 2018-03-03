<template>
    <div>
        <section class="contentHeader">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/admin/goods/list'}">返回上一层</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin/'}">购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/admin'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="item-action">编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </section>
        <section class="mainContent">
            <el-form :model="ruleForm" label-position="right" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内容标题" prop="name" class="">
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
                        <el-form-item label="所属类别" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
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
                            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上传附件">
                            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :file-list="form.fileList" multiple :on-success="uploadFile">
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
                <el-form-item label="内容摘要">
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
export default {
  data() {
    return {
      id: "",
      form: {
        fileImgList: [],
        fileList: []
      },
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    /* 提交按钮 */
    submitForm(formName) {},
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.form = res.data.message;
        }
      });
    },
    uploadImg(response) {
      this.form.imgList = [response];
    },
    uploadFile(response) {
      this.form.fileList.push(response);
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getGoods();
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