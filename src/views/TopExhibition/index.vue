<template>
  <div class="top">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon
        :type="
          this.$store.state.collapsed.collapsed ? 'menu-unfold' : 'menu-fold'
        "
      />
    </a-button>
    <div class="Breadcrumb">
      <a-breadcrumb v-show="$store.state.list.show">
        <a-breadcrumb-item>{{$store.state.list.title}}</a-breadcrumb-item>
        <a-breadcrumb-item>{{$store.state.list.childrenTitle}}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user">
      欢迎：<span>{{ $store.state.login.user.username }}</span>
      <div class="close" @click="onLogin">退出登录</div>
    </div>
  </div>
</template>

<script>
import cookie from 'cookiejs';

export default {
  methods: {
    toggleCollapsed() {
      this.$store.commit(
        'collapsed/isClose',
        !this.$store.state.collapsed.collapsed,
      );
    },
    onLogin() {
      cookie.set('yx_app', false);
      cookie.set('userInfo', JSON.stringify({}));
      this.$store.commit('login/user', {});
      this.$store.commit('login/login', 'false');
      this.$store.commit('login/role', '');
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style scoped>
div.top {
  width: 100%;
  height: 45px;
  position: relative;
  border:1px solid #eee;
}
div.Breadcrumb {
  display: inline-block;
  margin-left: 20px;
}
div.user {
  position: absolute;
  right: 50px;
  top: 12px;
  cursor: pointer;
}
div.close {
  /* position: absolute; */
  padding: 5px;
  background: #ccc;
  display: none;
  width: 80px;
  text-align: center;
}
div.user:hover div.close {
  display: block;
}
</style>
