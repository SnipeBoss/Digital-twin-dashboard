<script setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  height: { type: String, default: "300px" },
  width: { type: String, default: "100%" },
  color: { type: String, default: "#546E7A" },
  series: { type: Array, required: true },
});

const chartOptions = ref({
  chart: {
    type: "line",
    height: props.height,
  },
  colors: [props.color],
  // Display time format
  xaxis: {
    type :"datetime",
    labels : {
      format : "HH:mm:ss",
    }
  },
});
</script>

<template>
  <VueApexCharts :options="chartOptions" :series="series" type="line" :height="height" :width="width" />
</template>
