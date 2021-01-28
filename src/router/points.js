const baseUrl = {
    PointsFor: "/PointsFor/",
}
export default [
    {
        path: baseUrl.PointsFor + 'changePage',
        name: 'changePage',
        meta: {
            title: '积分兑换',
        },
        component: () => import("../view/pageB/pointsFor/changePage.vue")
    },
    {
        path: baseUrl.PointsFor + 'acceptPotions',
        name: 'acceptPotions',
        meta: {
            title: '兑换产品',
        },
        component: () => import("../view/pageB/pointsFor/acceptPotions.vue")
    },
    {
        path: baseUrl.PointsFor + 'successTip',
        name: 'successTip',
        meta: {
            title: '提交成功',
        },
        component: () => import("../view/pageB/pointsFor/successTip.vue")
    },
    {
        path: baseUrl.PointsFor + 'orderList',
        name: 'orderList',
        meta: {
            title: '积分兑换记录',
        },
        component: () => import("../view/pageB/pointsFor/orderList.vue")
    },
    {
        path: baseUrl.PointsFor + 'detailsPages',
        name: 'detailsPages',
        meta: {
            title: '订单详情',
        },
        component: () => import("../view/pageB/pointsFor/detailsPages.vue")
    },
]