import Applayout from "@/layout/Applayout";
const routes = [
    {
        path: '/categories',
        component: Applayout,
        name: 'categories',
        meta: {
            title: 'Category',
            icon: 'menu-fold'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'categoryList',
                meta: {
                    title: 'Categories List',
                }
            },
            {
                path: 'create',
                component:()=> import('./Created'),
                name:'createCategory',
                meta: {
                    title: 'Create Category'
                }
            },
            {
                path: 'detail/:id',
                component:()=> import('./Detail'),
                name:'detailCategory',
                meta: {

                }
            },
            {
                path: 'edit/:id',
                component:()=> import('./Edit'),
                name:'editCategory',
                meta: {

                }
            },
        ]
    }
]

export default routes;