export default [
    {
        path: "/home",
        name: "home",
        meta: {
            title: "家"
        },
        component: () => import("../view/home.vue")
    },
]