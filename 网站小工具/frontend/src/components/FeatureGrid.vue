<!-- 功能展示区组件 -->
<template>
  <section class="features-section">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">功能列表</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link to="/image-compress" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Picture /></el-icon>
              <h3 class="text-xl font-semibold mb-2">图片压缩</h3>
              <p class="text-gray-600">快速压缩图片文件大小，支持批量处理</p>
            </div>
          </el-card>
        </router-link>

        <router-link to="/image-convert" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Switch /></el-icon>
              <h3 class="text-xl font-semibold mb-2">格式转换</h3>
              <p class="text-gray-600">支持多种图片格式之间的转换</p>
            </div>
          </el-card>
        </router-link>

        <router-link to="/image-crop" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Crop /></el-icon>
              <h3 class="text-xl font-semibold mb-2">图片裁剪</h3>
              <p class="text-gray-600">自由裁剪、旋转图片</p>
            </div>
          </el-card>
        </router-link>

        <router-link to="/image-mosaic" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Grid /></el-icon>
              <h3 class="text-xl font-semibold mb-2">图片马赛克</h3>
              <p class="text-gray-600">为图片添加马赛克效果</p>
            </div>
          </el-card>
        </router-link>

        <router-link to="/image-watermark" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Stamp /></el-icon>
              <h3 class="text-xl font-semibold mb-2">图片水印</h3>
              <p class="text-gray-600">为图片添加文字或图片水印</p>
            </div>
          </el-card>
        </router-link>

        <router-link to="/file-watermark" class="feature-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <el-icon class="text-4xl mb-4 text-blue-500"><Document /></el-icon>
              <h3 class="text-xl font-semibold mb-2">文件水印</h3>
              <p class="text-gray-600">为PDF等文件添加水印</p>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Picture, Switch, Crop, Grid, Stamp, Document } from '@element-plus/icons-vue'
</script>

<style scoped>
.feature-card {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}
</style> 