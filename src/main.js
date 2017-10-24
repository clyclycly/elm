import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

let _tabAPP = Vue.extend(App);      // 准备一个根组件_tabAPP
let _tabRouter = new VueRouter({    // 准备路由_tabRouter
  linkActiveClass: 'active'         // 传参选中的class为active，默认v-link-active
});
_tabRouter.map({                    // 关联
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
});
_tabRouter.start(_tabAPP, '#app');      // 启动路由
_tabRouter.go('/goods');              // 默认选中
