
<script setup>
import { ref, watch, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";


// Input for setup
const props = defineProps({
  // Chart setup
  title: { type: String, required: true },
  height: { type: String, default: "300px" },
  width: { type: String, default: "100%" },
  color: { type: String, default: "#008FFB" },
  // Data Value : use as a y axis
  series: { type: Array, required: true },
  // Time stamp : use as a x axis
  timestamps: { type: Array, required: true },
  // Use as a status
  lastUpdate: { type: Number, required: true },
});


// Computed property to determine device status
const deviceStatus = computed(() => {
  // Get time now, to compare to the time stamp receive from websocket
  const currentTime = Date.now();
  // If the data is not update more than "10 sec" then showing offline
  return currentTime - props.lastUpdate <= 10000 ? "Online" : "Offline";
});

// Status color (Green for Online, Red for Offline)
const statusColor = computed(() => (deviceStatus.value === "Online" ? "#00FF9C" : "#FC2947"));


// Chart options
const chartOptions = ref({
  chart: {
    type: "line",
    height: props.height,
    zoom : { 
      enabled: true
    },
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: { speed: 1000 },
    },
  },
  colors: [props.color],
  xaxis: {
    type: "datetime",
    categories: props.timestamps,
    tickAmount: 6, // Adjust the number of ticks shown (increase for wider look)
    labels: {
      rotate: -45, // Rotate labels for better readability
      datetimeFormatter: { hour: "HH:mm:ss" }, // Format timestamps properly
    },
  },
  tooltip: {
    x: { format: "HH:mm:ss" },
  },
});

// Watch timestamps to update the chart dynamically
watch(() => props.timestamps, (newTimestamps) => {
  chartOptions.value.xaxis.categories = newTimestamps;
});
</script>

<template>
  <div class="chart-container">

    <!-- Show the title and status -->
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <span :style="{ color: statusColor }">● {{ deviceStatus }}</span>
    </div>

    <!-- Show the chart -->
    <VueApexCharts 
      :options="chartOptions" 
      :series="series" 
      type="line" 
      :height="height" 
      :width="width" 
    />
  </div>
</template>

<style scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
