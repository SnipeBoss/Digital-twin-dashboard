<script setup>
const props = defineProps({
  title: { type: String, required: true }, // Heading ของกราฟ
});
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <slot></slot> <!-- Render Chart -->
  </div>
</template>
