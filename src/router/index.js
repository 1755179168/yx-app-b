import Vue from 'vue';
import VueRouter from 'vue-router';
import cookie from 'cookiejs';
import Home from '@/views/Home/index.vue';
import data from './router/admin';
import store from '@/store';

Vue.use(VueRouter);
// 解决报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/login',
  name: 'Login',
  component: () => import('@/components/login/index.vue'),
},
];
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});
let add = false;
router.beforeEach((to, from, next) => {
  const login = cookie.get('yx_app') || 'false';

  if (to.path === '/login') {
    if (login === 'true') {
      next({ path: from.path });
    } else {
      next();
    }
  } else if (login === 'true') {
    // store;
    next();
  } else {
    next('/login');
  }
  if (login === 'true') {
    const { role } = JSON.parse(cookie.get('userInfo'));
    if (role === 'admin' && !add) {
      const obj = [];
      const { admin } = data.admin;
      for (let i = 0; i < admin.length; i += 1) {
        const key = admin[i].meta.title;
        obj[i] = {
          title: key,
          children: {
            title: [],
            path: [],
            type: [],
          },
          type: admin[i].meta.type,
          path: admin[i].path,
        };
        if (admin[i].children) {
          for (let i1 = 0; i1 < admin[i].children.length; i1 += 1) {
            obj[i].children.title.push(admin[i].children[i1].meta.title);
            obj[i].children.path.push(admin[i].children[i1].path);
            obj[i].children.type.push(admin[i].children[i1].meta.type);
          }
        }
      }
      store.commit('list/data', obj);
      add = true;
      for (let i = 0; i < admin.length; i += 1) {
        router.addRoute('Home', admin[i]);
      }
    } else if (role === 'coustomer' && !add) {
      const { coustomer } = data;
      const obj = [];
      for (let i = 0; i < coustomer.length; i += 1) {
        const key = coustomer[i].meta.title;
        obj[i] = {
          title: key,
          children: {
            title: [],
            path: [],
            type: [],
          },
          type: coustomer[i].meta.type,
          path: coustomer[i].path,
        };
        if (coustomer[i].children) {
          for (let i1 = 0; i1 < coustomer[i].children.length; i1 += 1) {
            obj[i].children.title.push(coustomer[i].children[i1].meta.title);
            obj[i].children.path.push(coustomer[i].children[i1].path);
            obj[i].children.type.push(coustomer[i].children[i1].meta.type);
          }
        }
      }
      store.commit('list/data', obj);
      add = true;
      for (let i = 0; i < coustomer.length; i += 1) {
        router.addRoute('Home', coustomer[i]);
      }
    }
  }
});
router.afterEach((to) => {
  if (to.meta.title) {
    const { title } = to.meta;
    if (to.meta.one) {
      store.commit('list/title', title);
    } else {
      store.commit('list/childrenTitle', title);
    }
    if (to.meta.one) {
      store.commit('list/show', false);
    } else {
      store.commit('list/show', true);
    }
  }
});
export default router;
