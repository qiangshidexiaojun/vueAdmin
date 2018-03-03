<template>
    <div class="aside">
        <el-menu :default-active="menu[4].title + menu[0].submenu[0].text" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" :collapse="checkContent" text-color="#fff" background-color="#267cb7" active-text-color="#ffd04b">
            <el-submenu :index="item.title" v-for="item in menu" :key="item.title">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <!-- nav_item -->
                <el-menu-item-group v-for="itemContent in item.submenu" :key="itemContent.text">
                    <router-link :to="itemContent.path">
                        <el-menu-item :index="item.title+itemContent.text">
                            <i class="el-icon-document"></i>
                            <span>{{itemContent.text}}</span>
                        </el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "学员问题",
          submenu: [
            { text: "内容管理", path: "/admin/student/content" },
            { text: "类别管理", path: "/admin/student/category" },
            { text: "评论管理", path: "/admin/student/comment" }
          ]
        },
        {
          title: "前端技术",
          submenu: [
            { text: "内容管理", path: "/admin/web/content" },
            { text: "类别管理", path: "/admin/web/category" },
            { text: "评论管理", path: "/admin/web/comment" }
          ]
        },
        {
          title: "难点答疑",
          submenu: [
            { text: "内容管理", path: "/admin/difficulty/content" },
            { text: "类别管理", path: "/admin/difficulty/category" },
            { text: "评论管理", path: "/admin/difficulty/comment" }
          ]
        },
        {
          title: "资源下载",
          submenu: [
            { text: "内容管理", path: "/admin/assets/content" },
            { text: "类别管理", path: "/admin/assets/category" },
            { text: "评论管理", path: "/admin/assets/comment" }
          ]
        },
        {
          title: "商品管理",
          submenu: [
            { text: "内容管理", path: "/admin/goods/list" },
            { text: "类别管理", path: "/admin/goods/categoryList" },
          ]
        },
        {
          title: "订单管理",
          submenu: [{ text: "订单列表", path: "/admin/order/content" }]
        }
      ]
    };
  },
  computed: {
    checkContent() {
      /* 去getters拿值 */
      return this.$store.getters.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
    }
  }
};
</script>

<style scoped lang="less">
// 让导航列表撑满屏幕
.aside {
  height: 100%;
  text-align: left;
  background: #267cb7;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  i {
    color: #fff;
  }
}
</style>