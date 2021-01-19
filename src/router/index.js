import Vue from 'vue'
import Router from 'vue-router'
import integral from './integral'//积分兑换模块

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    redirect: { name: "home" }
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      title: '登入',
    },
    component: () => import("../view/login/login.vue")
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import("../view/page/home.vue"),
  },
  {
    path: '/tool',
    name: 'tool',
    meta: {
      title: '工具'
    },
    component: () => import("../view/page/tool.vue"),
  },
  {
    path: '/team',
    name: 'team',
    meta: {
      title: '团队'
    },
    component: () => import("../view/page/team.vue"),
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '我的'
    },
    component: () => import("../view/page/mine.vue"),
  },
  // {
  //   path: '/',
  //   name: 'MarginBox',
  //   meta: {
  //     title: '首页'
  //   },
  //   component: () => import("../components/MarginBox.vue"),
  //   children: [
  //     ...draw,
  //     ...integral
  //   ]
  // },
]

const router = new Router({
  routes
})

export default router