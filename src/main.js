// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'



Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
let app=Vue.extend(App);

let router=new VueRouter({
	linkActiveClass:"active"
});

router.map({
	'/goods':{
		component:goods
	}
})
router.map({
	'/ratings':{
		component:ratings
	}
})
router.map({
	'/seller':{
		component:seller
	}
})

router.start(App,'#app');
router.go('/goods');