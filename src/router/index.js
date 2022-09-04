/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import { Role } from '@/_helpers';
import HomePage from '@/components/home/HomePage';
import VoucherPage from '@/components/voucher/VoucherPage';
import PegawaiPage from '@/components/pegawai/PegawaiPage';
import LoginPage from '@/components/login/LoginPage';
import PaymentPage from '@/components/payment/PaymentPage';
import PPPoEPage from '@/components/pppoe/PPPoEPage';
import ResellerPage from '@/components/reseller/ResellerPage';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            name: 'home',
            component: HomePage, 
            meta: { authorize: [] } 
        },
        { 
            path: '/pegawai', 
            name: 'pegawai',
            component: PegawaiPage, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/voucher', 
            name: 'voucher',
            component: VoucherPage, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/pegawai/create', 
            name: 'pegawai-create',
            component: () => import("../components/pegawai/CreatePegawaiPage"),
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/login', 
            name: 'login',
            component: LoginPage 
        },
        { 
            path: '/payment', 
            name: 'payment',
            component: PaymentPage, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/pppoe', 
            name: 'pppoe',
            component: PPPoEPage, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/reseller', 
            name: 'reseller',
            component: ResellerPage, 
            meta: { authorize: [Role.Admin] } 
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.level)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})

export default router;
/*
import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import Pegawai from "../components/Pegawai.vue"
import Todos from "@/components/Todos";
import store from "../store.js";
import { Role } from '../_helpers/role.js';
 
Vue.use(Router);
 
let router =  new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/home",
            name: "Home",
            component: Home,
            meta: {
                auth: true
            }
        },
        {
            path: "/pegawai",
            name: "pegawai",
            component: Pegawai,
            meta: { authorize: [Role.Admin] } 
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/About.vue'),
            meta: {
                auth: true
            }
        },
        {
            path: "/",
            name: "Login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                auth: true
            }
        },
        {
            path: '/todo',
            name: 'Todos',
            component: Todos,
            meta: {
                auth: true
            }
        },
        // otherwise redirect to home
        { path: '*', redirect: '/home' }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {    
        if (store.state.isLogin) {
            next();
        } else {
            next({
                path: "/",
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.isLogin) {
            next({
                path: "/profile",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
*/