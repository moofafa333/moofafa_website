<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// App.vue作为应用程序的根组件，主要负责布局和全局样式
</script>

<style>
/* 全局样式 */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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