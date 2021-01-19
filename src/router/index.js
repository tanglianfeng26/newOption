import Vue from 'vue'
import Router from 'vue-router'
import introduction from './introduction'
import draw from './draw'//抽奖模块
import integral from './integral'//积分兑换模块

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/',
    redirect: { name: "login" }
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
    path: '/',
    name: 'MarginBox',
    meta: {
      title: '首页'
    },
    component: () => import("../components/MarginBox.vue"),
    children: [
      ...draw,
      ...integral
    ]
  },
  ...introduction,//导入url
]

const router = new Router({
  routes
})

export default router