import Vue from 'vue'
import VueRouter from 'vue-router'
import {productsRoute} from "@/pages/product";
import {categoriesRoute} from "../pages/category";
import CKEditor from '@ckeditor/ckeditor5-vue2'
import {orderRoute} from "../pages/order";


Vue.use( CKEditor );
Vue.use(VueRouter)

const routes = [
    ...productsRoute,
    ...categoriesRoute,
    ...orderRoute,

]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})

export default router;