export default [
    {
        path: 'draw/drawLucky',
        name: 'drawLucky',
        meta: {
            title: '抽奖活动',
        },
        component: () => import("../view/draw/drawLucky.vue")
    },
    {
        path: 'draw/editingAwards',
        name: 'editingAwards',
        meta: {
            title: '新增奖项',
        },
        component: () => import("../view/draw/editingAwards.vue")
    },
    {
        path: 'draw/lotteryRecord',
        name: 'lotteryRecord',
        meta: {
            title: '抽奖记录',
        },
        component: () => import("../view/draw/lotteryRecord.vue")
    },
    {
        path: 'draw/awardingOperation',
        name: 'awardingOperation',
        meta: {
            title: '奖品发货',
        },
        component: () => import("../view/draw/awardingOperation.vue")
    },
    {
        path: 'draw/awardRecord',
        name: 'awardRecord',
        meta: {
            title: '发货记录',
        },
        component: () => import("../view/draw/awardRecord.vue")
    },
    {
        path: 'draw/LotteryIsSet',
        name: 'LotteryIsSet',
        meta: {
            title: '抽奖设置',
        },
        component: () => import("../view/draw/LotteryIsSet.vue")
    },
]