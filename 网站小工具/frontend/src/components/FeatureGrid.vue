<!-- 功能展示区组件 -->
<template>
  <section class="features">
    <div class="features-container">
      <h2 class="features-title">图片工具</h2>
      <div class="feature-grid">
        <router-link 
          v-for="tool in imageTools" 
          :key="tool.id" 
          :to="tool.path"
          class="feature-card"
        >
          <h3 class="feature-title">{{ tool.title }}</h3>
          <p class="feature-description">{{ tool.description }}</p>
        </router-link>
      </div>

      <h2 class="features-title">文件工具</h2>
      <div class="feature-grid">
        <router-link
          v-for="tool in fileTools" 
          :key="tool.id" 
          :to="tool.path"
          class="feature-card"
        >
          <h3 class="feature-title">{{ tool.title }}</h3>
          <p class="feature-description">{{ tool.description }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const imageTools = [
  {
    id: 1,
    title: '图片压缩',
    description: '快速压缩图片文件大小，保持画质',
    path: '/image-compress'
  },
  {
    id: 2,
    title: '图片转换',
    description: '支持多种格式之间的转换',
    path: '/image-convert'
  },
  {
    id: 3,
    title: '图片裁剪',
    description: '自由裁剪图片尺寸和比例',
    path: '/image-crop'
  },
  {
    id: 4,
    title: '图片马赛克',
    description: '为图片添加马赛克效果',
    path: '/image-mosaic'
  },
  {
    id: 5,
    title: '图片水印',
    description: '为图片添加文字或图片水印',
    path: '/image-watermark'
  }
]

const fileTools = [
  {
    id: 1,
    title: '文件水印',
    description: '为PDF等文档添加水印',
    path: '/file-watermark'
  },
  {
    id: 2,
    title: '文件格式转换',
    description: '支持多种文件格式转换',
    path: '/file-convert'
  }
]
</script>

<style scoped>
.features {
  background-color: #ffffff;
  padding: 60px 0;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.features-title {
  font-size: 24px;
  color: #262626;
  margin-bottom: 32px;
  font-weight: 600;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.feature-card {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.feature-title {
  font-size: 18px;
  color: #262626;
  margin-bottom: 8px;
  font-weight: 500;
}

.feature-description {
  font-size: 14px;
  color: #595959;
  line-height: 1.5;
}
</style> 