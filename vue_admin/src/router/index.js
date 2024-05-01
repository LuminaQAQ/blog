import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';

import Admin from "../views/Admin"
import Welcome from "../views/Admin/children/Welcome"
import UserManage from "../views/Admin/children/UserManage"
import ArticlePublish from "../views/Admin/children/ArticlePublish"
import ArticleManage from "../views/Admin/children/ArticleManage"
import CommentManage from "../views/Admin/children/CommentManage.vue"
import MsgBoardManage from "../views/Admin/children/MsgBoardManage"
import SwiperManage from "../views/Admin/children/SwiperManage"

import NotFound from "../components/NotFound"

import Login from "../views/Login"

import ArticlePreview from "../components/ArticlePreview"

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: "/admin",
  },

  {
    path: "*",
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: "页面找不到了",
    },

  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: { name: "Welcome" },
    meta: {
      title: "管理",
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: Welcome,
        meta: {
          title: "欢迎",
        },
      },
      {
        path: "userManage",
        name: "User",
        component: UserManage,
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "articlePublish",
        name: "ArticlePublish",
        component: ArticlePublish,
        meta: {
          title: "文章发布",
        },
      },
      {
        path: "articleManage",
        name: "ArticleManage",
        component: ArticleManage,
        meta: {
          title: "文章管理",
        },
      },
      {
        path: "commentManage",
        name: "CommentManage",
        component: CommentManage,
        meta: {
          title: "评论管理",
        },
      },
      {
        path: "msgBoardManage",
        name: "MsgBoardManage",
        component: MsgBoardManage,
        meta: {
          title: "留言管理",
        },
      },
      {
        path: "swiperManage",
        name: "SwiperManage",
        component: SwiperManage,
        meta: {
          title: "轮播管理",
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "登陆",
    },
  },

  {
    path: '/article/:id',
    name: 'ArticlePreview',
    component: ArticlePreview,
    meta: {
      title: "文章预览",
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    document.title = to.meta.title;
    next()
  } else {
    let token = window.localStorage.getItem('ADMIN_TOKEN');

    if (token) {
      document.title = to.meta.title;
      next();
    } else {
      Message.warning('请先登陆');
      next("/login");
    }
  }
})

export default router
