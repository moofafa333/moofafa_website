<!-- 使用步骤说明组件 -->
<template>
  <section class="steps">
    <div class="steps-container">
      <div class="steps-grid">
        <div class="step-item" v-for="step in steps" :key="step.id">
          <div class="step-icon">
            <img :src="step.icon" :alt="step.title">
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    id: 1,
    title: '上传文件',
    description: '支持拖拽或点击上传',
    icon: '@/assets/icons/upload.svg'
  },
  {
    id: 2,
    title: '选择选项',
    description: '自定义处理参数',
    icon: '@/assets/icons/settings.svg'
  },
  {
    id: 3,
    title: '完成处理',
    description: '下载处理后的文件',
    icon: '@/assets/icons/download.svg'
  }
]
</script>

<style scoped>
.steps {
  background-color: #f9fafb;
  padding: 60px 0;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.step-item {
  text-align: center;
}

.step-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
}

.step-icon img {
  width: 100%;
  height: 100%;
}

.step-title {
  font-size: 18px;
  color: #262626;
  margin-bottom: 12px;
}

.step-description {
  font-size: 14px;
  color: #595959;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style> 