import Applayout from "@/layout/Applayout";
const routes = [
    {
        path: '/products',
        component: Applayout,
        name: 'products',
        meta: {
            title: 'Products',
            icon: 'menu-fold'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'productList',
                meta: {
                    title: 'Products List',
                }
            },
            {
                path: 'create',
                component:()=> import('./Created'),
                name:'createProduct',
                meta: {
                    title: 'Create Product'
                }
            },
            {
                path: 'detail/:id',
                component:()=> import('./Detail'),
                name:'detailProduct',
                meta: {
                }
            },
            {
                path: 'edit/:id',
                component:()=> import('./edit'),
                name:'editProduct',
                meta: {
                }
            },
        ]
    }
]

export default routes;