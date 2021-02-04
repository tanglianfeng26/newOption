const baseUrl = {
    mine: "/mine/",
    home: "/home/",
    tool: "/tool/",
    shopGoods: "/shopGoods/"
}
export default [

    {
        path: baseUrl.mine + 'addressONE',
        name: 'addressONE',
        meta: {
            title: '地址管理',
        },
        component: () => import("../view/pageB/TestAddress/address.vue")
    },
    {
        path: baseUrl.mine + 'addressChild',
        name: 'addressChild',
        meta: {
            title: '新增地址',
        },
        component: () => import("../view/pageB/TestAddress/AddAddress.vue")
    },

    {
        path: baseUrl.home + 'orderPage',
        name: 'orderPage',
        meta: {
            title: '订单审核',
        },
        component: () => import("../view/pageB/orderReview/orderPage.vue")
    },

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
    {
        path: baseUrl.home + 'goods/settlement',
        name: 'settlement',
        meta: {
            title: '结算',
        },
        component: () => import("../view/pageB/placeAnOrder/settlement.vue")
    },
    {
        path: baseUrl.home + 'myOrder',
        name: 'myOrder',
        meta: {
            title: '我的订单',
        },
        component: () => import("../view/pageB/myOrder/myOrder.vue")
    },
    {
        path: baseUrl.home + 'myOrder/detailsPage',
        name: 'detailsPage',
        meta: {
            title: '详情页',
        },
        component: () => import("../view/pageB/myOrder/detailsPage.vue")
    },
    {

        path: baseUrl.home + 'InviteAgentg',
        name: 'InviteAgentg',
        meta: {
            title: '邀请代理',
        },
        component: () => import("../view/pageB/InviteAgents/InviteAgents.vue"),
    },
    {
        path: baseUrl.home + "InviteAgentg/inviteDealers",
        name: "inviteDealers",
        meta: {
            title: "邀请经销商"
        },
        component: () => import("../view/pageB/InviteAgents/childrenPage/inviteDealers.vue")
    },
    {
        path: baseUrl.home + "InviteAgentg/inviteDealers/share",
        name: "share",
        meta: {
            title: "邀请经销商"
        },
        component: () => import("../view/pageB/InviteAgents/childrenPage/share.vue")
    },
    {
        path: baseUrl.mine + "address",
        name: "address",
        meta: {
            title: "修改地址"
        },
        component: () => import("../view/pageB/address/address.vue")
    },
    {
        path: baseUrl.mine + "address/nextAddress",
        name: "nextAddress",
        meta: {
            title: "新增地址"
        },
        component: () => import("../view/pageB/address/AddAddress.vue")
    },
    {
        path: baseUrl.tool + "myAssets",
        name: "myAssets",
        meta: {
            title: "我的资产"
        },
        component: () => import("../view/pageB/myAssets/myAssets.vue")
    },
    {
        path: baseUrl.tool + "myAssets/addPrice",
        name: "addPrice",
        meta: {
            title: "充帐"
        },
        component: () => import("../view/pageB/myAssets/addPrice.vue")
    },
    {
        path: baseUrl.tool + "myAssets/reducePrice",
        name: "reducePrice",
        meta: {
            title: "减帐"
        },
        component: () => import("../view/pageB/myAssets/reducePrice.vue")
    },
    {
        path: baseUrl.tool + "myAssets/accountingRecords",
        name: "accountingRecords",
        meta: {
            title: "记账记录"
        },
        component: () => import("../view/pageB/myAssets/accountingRecords.vue")
    },
    {
        path: baseUrl.shopGoods + "goodsInfo",
        name: "goodsInfo",
        meta: {
            title: "商品详情"
        },
        component: () => import("../view/pageA/shopGoods/goodsInfo.vue")
    },
    {
        path: baseUrl.shopGoods + "settlementG",
        name: "settlementG",
        meta: {
            title: "商品结算"
        },
        component: () => import("../view/pageA/shopGoods/settlementG.vue")
    },
]