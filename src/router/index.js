import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from 'components/goods/Goods'
import Seller from 'components/seller/Seller'
import Ratings from 'components/ratings/Ratings'
Vue.use(VueRouter)


const router = new VueRouter({
    routes : [
        {
            path : '/goods',
            component : Goods
        },
        {
            path : '/ratings',
            component : Ratings
        },
        {
            path : '/seller',
            component : Seller
        }
    ],
    mode : 'history',
    // 为活跃的class取别名
    linkActiveClass : 'active'
})

export default router