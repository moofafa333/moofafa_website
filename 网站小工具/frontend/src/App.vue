<template>
  <el-container class="app-container">
    <el-header class="header">
      <nav class="nav-container">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="h-8" />
          <span class="text-xl font-semibold">在线工具</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/image-compress">图片压缩</router-link>
          <router-link to="/image-convert">格式转换</router-link>
          <router-link to="/image-crop">图片裁剪</router-link>
          <router-link to="/image-mosaic">图片马赛克</router-link>
          <router-link to="/image-watermark">图片水印</router-link>
          <router-link to="/file-watermark">文件水印</router-link>
          <router-link to="/file-convert">文件转换</router-link>
        </div>
      </nav>
    </el-header>

    <el-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <el-footer class="footer">
      <p>&copy; 2024 在线工具. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
// App.vue作为应用程序的根组件，主要负责布局和全局样式
</script>

<style>
/* 全局样式 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #303133;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #409EFF;
}

.main-content {
  flex: 1;
  background-color: #f5f7fa;
  padding: 0;
}

.footer {
  background-color: #fff;
  text-align: center;
  padding: 24px;
  color: #909399;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 响应式字体大小 */
html {
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

/* 全局字体设置 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262626;
}
</style> 