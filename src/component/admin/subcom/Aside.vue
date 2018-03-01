<template>
    <div class="aside">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="checkContent" text-color="#fff" background-color="#267cb7">
            <el-submenu :index="item.title" v-for="item in menu" :key="item.title">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="itemContent in item.submenu" :key="itemContent.text">
                    <router-link :to="itemContent.path">
                        <el-menu-item :index="itemContent.text">
                            <i class="el-icon-document"></i>
                            {{itemContent.text}}
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
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "前端技术",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "难点答疑",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "资源下载",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "商品管理",
          submenu: [
            { text: "内容管理", path: "/" },
            { text: "类别管理", path: "/" },
            { text: "评论管理", path: "/" }
          ]
        },
        {
          title: "订单管理",
          submenu: [{ text: "订单列表", path: "/" }]
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
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

  /*   .el-menu {
    min-height: 0;
  } */

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  i {
    color: #fff;
  }
}
</style>