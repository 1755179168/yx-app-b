<template>
  <div class="aside">
    <a-menu
      :default-selected-keys="['销售统计']"
      :default-open-keys="['首页']"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed.collapsed"
    >

        <a-sub-menu :key="prop.title"  v-for="prop in list">
        <span slot="title"  @click="$router.push(prop.path)"><a-icon :type="prop.type" />
        <span>{{prop.title}}</span></span>
        <template v-for="(child,i1) in prop.children.title">
          <a-menu-item :key="child"  v-if="prop.children.title[i1]!==''">
          <router-link :to="prop.children.path[i1]">
          <a-icon :type="prop.children.type[i1]" />
            {{child}}</router-link>
        </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      collapsed: this.$store.state.collapsed.collapsed,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
.aside,.ant-menu {
  height:100%;
}
</style>
