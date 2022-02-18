<template>
  <a-steps :current="current">
    <a-step title="填写商品基本信息" subTitle="">
    </a-step>
    <a-step title="填写商品销售信息" subTitle="" />
  </a-steps>
</template>
<script>
export default {
  props: ['current'],
};
</script>
