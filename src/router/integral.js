export default [
    {
        path: 'integral/integralOrder',
        name: 'integralOrder',
        meta: {
            title: '积分订单',
        },
        component: () => import("../view/integral/integralOrder.vue")
    },
    {
        path: 'integral/bulkShipment',
        name: 'bulkShipment',
        meta: {
            title: '批量发货',
        },
        component: () => import("../view/integral/bulkShipment.vue")
    },{
        path: 'integral/integratingUser',
        name: 'integratingUser',
        meta: {
            title: '积分用户',
        },
        component: () => import("../view/integral/integratingUser.vue")
    },{
        path: 'integral/listCredits',
        name: 'listCredits',
        meta: {
            title: '积分商品列表',
        },
        component: () => import("../view/integral/listCredits.vue")
    },
]