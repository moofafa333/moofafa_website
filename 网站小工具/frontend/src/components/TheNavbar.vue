<!-- 导航栏组件 -->
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </router-link>
      <div class="nav-menu">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/image-tools" class="nav-item">图片工具</router-link>
        <router-link to="/file-tools" class="nav-item">文件工具</router-link>
        <router-link to="/more" class="nav-item">更多功能</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.navbar {
  background-color: #1f2937;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo img {
  height: 40px;
  width: auto;
  filter: brightness(0) invert(1);
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  position: relative;
  padding: 4px 0;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style> 