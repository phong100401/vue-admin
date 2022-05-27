import Applayout from "@/layout/Applayout";
const routes = [
    {
        path: '/orders',
        component: Applayout,
        name: 'orders',
        meta: {
            title: 'Order',
            icon: 'menu-fold'
        },
        children: [
            {
                path: 'order',
                component: () => import('./List'),
                name: 'OrderList',
                meta: {
                    title: 'Orders List',
                }
            },
        ]
    }
]

export default routes;