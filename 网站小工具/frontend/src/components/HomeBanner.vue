<!-- Banner组件 -->
<template>
  <section class="banner">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">在线图片和文件处理工具</h1>
        <p class="text-xl text-gray-600 mb-8">简单、快速、高效的在线工具集合</p>
        <el-button type="primary" size="large" @click="scrollToFeatures">开始使用</el-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToFeatures = () => {
  const featuresSection = document.querySelector('.features-section')
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.banner {
  background-color: #fff;
  padding: 60px 0;
  border-bottom: 1px solid #eee;
}
</style> 