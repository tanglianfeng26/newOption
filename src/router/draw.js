const baseUrl = {
    draw: "/draw/",
}
export default [
    {
        path: baseUrl.draw + 'homePage',
        name: 'homePage',
        meta: {
            title: '中奖记录',
        },
        component: () => import("../view/pageB/drawLucky/homePage.vue")
    },
    {
        path: baseUrl.draw + 'drawRecord',
        name: 'drawRecord',
        meta: {
            title: '中奖记录',
        },
        component: () => import("../view/pageB/drawLucky/drawRecord.vue")
    },
    {
        path: baseUrl.draw + 'accept',
        name: 'accept',
        meta: {
            title: '立即领奖',
        },
        component: () => import("../view/pageB/drawLucky/accept.vue")
    },
    {
        path: baseUrl.draw + 'checkDetails',
        name: 'checkDetails',
        meta: {
            title: '查看详情',
        },
        component: () => import("../view/pageB/drawLucky/checkDetails.vue")
    },
]