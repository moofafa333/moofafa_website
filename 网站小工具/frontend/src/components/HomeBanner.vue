<!-- Banner组件 -->
<template>
  <div class="banner">
    <div class="banner-content">
      <h1 class="banner-title">免费在线图片和文件处理工具</h1>
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索工具..."
        >
        <button class="search-button">
          <i class="search-icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Banner组件逻辑
</script>

<style scoped>
.banner {
  background-color: #1f2937;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.banner-content {
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
}

.banner-title {
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 32px;
  font-weight: 600;
}

.search-container {
  position: relative;
  width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 48px 0 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.search-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('@/assets/search.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .search-container {
    width: 100%;
  }
  
  .banner-title {
    font-size: 24px;
  }
}
</style> 