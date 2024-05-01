
<style lang="scss" scoped>
.main-admin {
  width: 100%;
  height: 100%;

  .el-aside {
    color: #333;
    background-color: rgb(68, 74, 80);
    transition: width 0.3s;
  }

  .el-container {
    height: 100%;

    .el-header {
      background-color: #fafafa;
      color: black;
      line-height: 60px;
      // box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .header-title {
        font-weight: 800;
        font-size: 1.15rem;
      }
    }

    .el-main {
      height: 100%;
    }
  }
}

.editor-form-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  width: 12rem;
  height: 1.5rem;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>

<template>
  <main class="main-admin">

    <el-container>

      <!------- 导航栏 ------->
      <!-- #region  -->
      <el-aside :style="isCollapse ? 'width: 4rem' : 'width: 11rem'">
        <div
          class="logo"
          @click="$router.push({ path: '/index' })"
        ></div>

        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :router="true"
          :unique-opened="true"
        >
          <el-menu-item index="/admin/welcome">
            <i class="el-icon-location"></i>
            <span>主页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <!-- <el-menu-item index="/admin/self">个人中心</el-menu-item> -->
              <el-menu-item index="/admin/userManage">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/articleManage">文章列表</el-menu-item>
              <el-menu-item index="/admin/articlePublish">文章发布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/commentManage">评论列表</el-menu-item>
              <el-menu-item index="/admin/msgBoardManage">留言列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>轮播管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/swiperManage">轮播列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- #endregion  -->
      <!------- end ------->

      <!------- 页面 ------->
      <!-- #region  -->
      <el-container>

        <el-header>
          <div
            class="left el-icon-s-fold system-title"
            @click="isCollapse = !isCollapse"
          >
          </div>
          <div class="header-title">后台管理</div>
          <div class="right">
            欢迎你:{{ getUser }}
            <el-button
              type="danger"
              @click="logout"
            >
              退出
            </el-button>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- #endregion  -->
      <!------- end ------->
    </el-container>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      articleList: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0,
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters("Login", ["getUser"]),
  },
  methods: {
    ...mapActions("Login", ["logout", "fetchLoginInfo"]),
    
  },
  created() {
    const TOKEN = window.localStorage.getItem("ADMIN_TOKEN");
    this.fetchLoginInfo(TOKEN);
  },
};
</script>
















