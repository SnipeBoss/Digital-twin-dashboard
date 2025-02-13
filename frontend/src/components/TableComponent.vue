<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const historyData = ref([]);
const sortOrder = ref("desc");

const fetchHistory = async () => {
    try {
        const response = await axios.get("http://localhost:3000/");
        historyData.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(fetchHistory);

const sortedHistory = computed(() => {
    return [...historyData.value].sort((a, b) => {
        return sortOrder.value === "asc"
            ? new Date(a.Timestamp) - new Date(b.Timestamp)
            : new Date(b.Timestamp) - new Date(a.Timestamp);
    });
});

const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};
</script>

<template>
  <div class="container">
    <h2 class="text-xl font-bold mb-4">Historical Sensor Data</h2>
    <button @click="toggleSortOrder" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Sort by Time ({{ sortOrder.toUpperCase() }})
    </button>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Timestamp</th>
            <th scope="col" class="px-6 py-3">Peak X-Axis</th>
            <th scope="col" class="px-6 py-3">RMS X-Axis</th>
            <th scope="col" class="px-6 py-3">Battery Volt</th>
            <th scope="col" class="px-6 py-3">Temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in sortedHistory" :key="index" 
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td class="px-6 py-4">{{ entry.Timestamp }}</td>
            <td class="px-6 py-4">{{ entry.Peakmg_X_Axis }}</td>
            <td class="px-6 py-4">{{ entry.RMSmg_X_Axis }}</td>
            <td class="px-6 py-4">{{ entry.BatteryVolt_Device }}</td>
            <td class="px-6 py-4">{{ entry.TempHumi_SenVal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 20px;
}
</style>
