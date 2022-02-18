<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from 'cookiejs';

export default {
  created() {
    //
    const data = JSON.parse(cookie.get('userInfo'));
    this.$store.commit('login/user', data || {});
    this.$store.commit('login/login', cookie.get('yx_app') || 'false');
    this.$store.commit('login/role', data.role || '');
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
