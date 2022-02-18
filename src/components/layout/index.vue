<template>
  <div class="layout-container">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="center">
        <slot></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  & > div {
    height: 100%;
  }
  & .left,& .right{
      flex: 0 0 auto;
  }
  & .center{
      flex: 1 1 auto;
  }
}
</style>
