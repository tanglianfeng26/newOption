const baseUrl = {
    mine: "/mine/",
    home: "/home/"
}
export default [
    {
        path: baseUrl.mine + 'personalData',
        name: 'personalData',
        meta: {
            title: '个人资料',
        },
        component: () => import("../view/pageB/personalData/personalData.vue")
    },
    {
        path: baseUrl.home + 'message',
        name: 'message',
        meta: {
            title: '消息',
        },
        component: () => import("../view/pageB/message/message.vue")
    },
    {
        path: baseUrl.home + 'sweepCodeDelivery',
        name: 'sweepCodeDelivery',
        meta: {
            title: '扫码发货',
        },
        component: () => import("../view/pageB/sweepCodeDelivery/sweepCodeDelivery.vue")
    },
    {
        path: baseUrl.home + 'goods',
        name: 'goods',
        meta: {
            title: '我要订货',
        },
        component: () => import("../view/pageB/placeAnOrder/goods.vue")
    },
]