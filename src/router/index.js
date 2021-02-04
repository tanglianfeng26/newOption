import Vue from 'vue'
import Router from 'vue-router'
import points from './points'//积分兑换模块
import modelS from './modelS'//个人资料模块
import draw from './draw' //幸运大转盘模块

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
    meta: {
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
    path: '/shopGoods',
    name: 'shopGoods',
    meta: {
      title: '商店'
    },
    component: () => import("../view/page/shopGoods.vue"),
  },
  {
    path: '/shopCars',
    name: 'shopCars',
    meta: {
      title: '购物车'
    },
    component: () => import("../view/page/shopCars.vue"),
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '我的'
    },
    component: () => import("../view/page/mine.vue"),
  },
  ...modelS,
  ...draw,
  ...points,
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
router.beforeEach((to, form, next) => {
  /*路由变化修改title*/
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
export default router