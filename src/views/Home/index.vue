<template>
  <div class="home-container">
    <Layout>
      <template v-slot:left>
        <div
          class="sidebar"
          :style="{
            width: $store.state.collapsed.collapsed ? '80px' : '180px',
          }"
        >
          <Aside :list="$store.state.list.data" v-if="$store.state.list.data.length" />
        </div>
      </template>
      <template>
        <TopExhibition />
        <div class="center">
          <router-view></router-view>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/layout/index.vue';
import Aside from '../aside/index.vue';
import TopExhibition from '../TopExhibition/index.vue';

export default {
  components: {
    Layout,
    Aside,
    TopExhibition,
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}
div.sidebar {
  width: 180px;
  height: 100%;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}

/* div.center {
  height: 100%;
  width:100%;
} */
div.top {
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding: 5px;
}
div.center{
  width:100%;
  height:calc(100% - 45px);
  overflow: auto;
}
</style>
