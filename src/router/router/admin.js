export default {
  admin: [{
    path: '/index',
    redirect: '/index/chart',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      title: '首页',
      one: true,
      type: 'home',
    },
    children: [{
      name: 'Chart',
      path: '/index/chart',
      component: () => import('@/views/chart/index.vue'),
      meta: {
        title: '销售统计',
        type: 'area-chart',
      },
    }],
  }, {
    name: 'Product',
    path: '/product',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      title: '商品',
      one: true,
      type: 'shopping',
    },
    children: [{
      name: 'List',
      path: '/product/list',
      component: () => import('@/views/cate/index.vue'),
      meta: {
        title: '商品列表',
        type: 'unordered-list',
      },
    }, {
      name: 'productEdit',
      path: '/product/edit/:productId',
      component: () => import('@/views/add/index.vue'),
      meta: {
        title: '',
      },
    }, {
      name: 'Add',
      path: '/product/add',
      component: () => import('@/views/add/index.vue'),
      meta: {
        title: '添加商品',
        type: 'folder-add',
      },
    }],

  }, {
    name: 'Admin',
    path: '/admin',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      title: '种类管理',
      one: true,
      type: 'user',
    },
    children: [{
      name: 'pAdmin',
      path: '/admin/pAdmin',
      component: () => import('@/views/admin/index.vue'),
      meta: {
        title: '商品种类管理',
        type: 'edit',
      },
    }],
  }],
  coustomer: [{
    path: '/index',
    redirect: '/index/chart',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      title: '首页',
      one: true,
      type: 'home',

    },
    children: [{
      name: 'Chart',
      path: '/index/chart',
      component: () => import('@/views/chart/index.vue'),
      meta: {
        title: '销售统计',
        type: 'area-chart',
      },
    }],
  }, {
    name: 'Product',
    path: '/product',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      title: '商品',
      one: true,
      type: 'shopping',
    },
    children: [{
      name: 'List',
      path: '/product/list',
      component: () => import('@/views/cate/index.vue'),
      meta: {
        title: '商品列表',
        type: 'unordered-list',
      },
    }, {
      name: 'Add',
      path: '/product/add',
      component: () => import('@/views/add/index.vue'),
      meta: {
        title: '添加商品',
        type: 'folder-add',
      },
    }, {
      name: 'productEdit',
      path: '/product/edit/:productId',
      component: () => import('@/views/add/index.vue'),
      meta: {
        title: '',
      },
    }],
  }],
};
