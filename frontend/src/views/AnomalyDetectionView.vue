<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import AreaChart from "@/components/AreaChartComponent.vue";
import ChartCard from "@/components/ChartCardComponent.vue";
import LineChart from "@/components/LineChartComponent.vue";
import ScatterChart from "@/components/ScatterChartComponent.vue";


// Initialized the websocket
const ws = ref(null);
const WEBSOCKET_PORT = 4000

// Create the ref object to store the data from web scoket
const lastUpdate = ref(Date.now());
const motorData = ref({ rpm: [], temperature: [], vibration: [], timestamps: [] });
const amrData = ref({ battery: [], speed: [], timestamps: [] });
const plcData = ref({ pressure: [], flowRate: [], timestamps: [] });

// WebSocket connection setup
const connectWebSocket = () => {

  // Connect to Websocket webserver
  ws.value = new WebSocket("ws://localhost:" + WEBSOCKET_PORT);
  // Check Connection
  ws.value.onopen = () => console.log("Connected to WebSocket Server");
  // Check Disconnection
  ws.value.onerror = (error) => console.error("WebSocket error:", error);
  ws.value.onclose = () => console.log("WebSocket disconnected");


  // Check the data event 
  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data)

    // Update last received timestamp
    lastUpdate.value = Date.now(); 

    if (data.data_source === "motor") {
      updateChartData(motorData, data.data, ["rpm", "temperature", "vibration"]);
    }
    if (data.data_source === "amr") {
      updateChartData(amrData, data.data, ["battery", "speed"]);
    }
    if (data.data_source === "plc") {
      updateChartData(plcData, data.data, ["pressure", "flowRate"]);
    }
  };

};

// Update chart data with new values
const updateChartData = (chartRef, data, fields) => {
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      chartRef.value[field].push(data[field]);
      if (chartRef.value[field].length > 10) chartRef.value[field].shift();
    }
  });

  chartRef.value.timestamps.push(Date.now());
  if (chartRef.value.timestamps.length > 10) chartRef.value.timestamps.shift();
};

onMounted(connectWebSocket);
onUnmounted(() => ws.value && ws.value.close());
</script>


<template>
    <DashboardLayout heading="Anomaly Detection">
        <ScatterChart
          title="PLC Pressure"
          :series="[{ name: 'Pressure (Bar)', data: plcData.pressure }]"
          :timestamps="plcData.timestamps"
          :lastUpdate="lastUpdate"
          color="#1E8449"
        />
    </DashboardLayout>
</template>
