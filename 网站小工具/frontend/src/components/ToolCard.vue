<template>
  <router-link :to="link" class="tool-card block bg-white rounded-lg shadow-md p-6 transition duration-300">
    <div class="flex items-center mb-4">
      <el-icon :size="32" class="text-blue-500">
        <component :is="icon" />
      </el-icon>
      <h3 class="text-xl font-bold ml-4">{{ title }}</h3>
    </div>
    <p class="text-gray-600">{{ description }}</p>
    <el-button type="primary" class="mt-4 w-full">立即使用</el-button>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  link: string
}>()
</script>

<style scoped>
.tool-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style> 