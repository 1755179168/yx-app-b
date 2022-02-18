<template>
  <div class="container">
    <span class="p">商品种类：</span>
    <a-select :default-value="'选择分类'" style="width: 200px" @change="btnClick">
        <!--  -->
        <!--  -->
        <a-select-option :value="prop" v-for="prop in option" :key="prop"> {{prop}}
           </a-select-option>
           <a-select-option value="不选择">不选择</a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    btnClick(option) {
      if (this.value === '不选择') {
        this.value = false;
      }
      this.$emit('btnClick', option);
    },
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>
<style lang="less" scoped>
span.p {
  margin: 0 0 0 20px;
}
.b {
  margin: 0 20px;
}
.container{
  margin-right: 10px;
}
</style>
