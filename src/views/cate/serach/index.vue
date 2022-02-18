<template>
  <!-- -->
  <!--  -->
  <div class="serach">
    <div class="rule">
      <span class="title">检索商品：</span>
      <input type="text" placeholder="请输入商品" v-model="value" />
    </div>

    <div class="select">
      <selectd :option="option" @btnClick="handlerClick" />
    </div>
    <a-button type="primary" class="b"
     @click="$router.push({path:'/product/add'})"> 增加商品 </a-button>
  </div>
</template>

<script>
import selectd from './selectd/index.vue';

export default {
  props: {
    option: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    selectd,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    handlerClick(p) {
      this.$emit('btnClick', p);
    },
  },
};
</script>

<style scoped>
.serach {
  display: flex;
  margin: 20px 0;
}
span.title {
  text-align: right;
  width: 80px;
  display: inline-block;
}
div.rule {
  width: 300px;
  display: flex;
}
div.rule > * {
  width: 50%;
}
input {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}
</style>
