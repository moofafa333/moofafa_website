<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">文件压缩</h1>
      <p class="page-description">压缩PDF、Word等文档，减小文件体积</p>
    </div>
    
    <div class="tool-container">
      <div class="coming-soon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <h2>即将推出</h2>
        <p>我们正在开发这个功能，敬请期待！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑将在这里实现
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.page-description {
  font-size: 16px;
  color: #6b7280;
}

.tool-container {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coming-soon {
  text-align: center;
  padding: 40px;
}

.coming-soon h2 {
  font-size: 24px;
  color: #1f2937;
  margin: 20px 0 8px;
}

.coming-soon p {
  color: #6b7280;
  font-size: 16px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-description {
    font-size: 14px;
  }

  .coming-soon h2 {
    font-size: 20px;
  }

  .coming-soon p {
    font-size: 14px;
  }
}
</style> 