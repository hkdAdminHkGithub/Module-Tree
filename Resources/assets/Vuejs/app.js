require('./bootstrap');
window.Vue = require('vue');

/* ==== > Global eventBus < ==== */
import VueBus from 'vue-bus';
Vue.use(VueBus);
/* ==== > / Global eventBus < ==== */

/* ==== > Plugin < ==== */
// import 'animate.css/animate.min.css'
/* ==== > / Plugin < ==== */

/* ==== > VueX < ==== */
import store from "./store/store";
/* ==== > / VueX < ==== */

/* ==== > Router < ==== */
import VueRouter from 'vue-router'
import { routes } from './routes';
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history', //'hash',
    linkActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) { // Bao luu vi tri scroll chuot
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
/* ==== > / Router < ==== */

import App from './App.vue'
const vm = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router: router
});