<template>
  <div class="image-converter-view">
    <h1 class="page-title">图片格式转换</h1>
    <p class="page-description">
      支持多种图片格式互转，包括JPG、PNG、WEBP、GIF、BMP等格式。可调节输出质量，快速简单。
    </p>
    <ImageConverter />
  </div>
</template>

<script setup lang="ts">
import ImageConverter from '@/components/ImageConverter.vue'
</script>

<style scoped>
.image-converter-view {
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  color: #303133;
  margin-bottom: 1rem;
}

.page-description {
  text-align: center;
  color: #606266;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}
</style> 