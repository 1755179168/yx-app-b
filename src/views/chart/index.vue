<template>
  <div class="chart-container">
    <div class="card">
      <Card />
    </div>
    <div class="chart"><Chart /></div>
  </div>
</template>

<script>
import Chart from './v-chart/index.vue';
import Card from './card/index.vue';

export default {
  components: {
    Chart,
    Card,
  },
};
</script>

<style>

</style>
