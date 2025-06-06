<!-- 使用步骤说明组件 -->
<template>
  <section class="steps-guide bg-gray-50">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">使用步骤</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="step-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <div class="step-number">1</div>
              <h3 class="text-xl font-semibold mb-2">选择功能</h3>
              <p class="text-gray-600">从功能列表中选择需要使用的工具</p>
            </div>
          </el-card>
        </div>

        <div class="step-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <div class="step-number">2</div>
              <h3 class="text-xl font-semibold mb-2">上传文件</h3>
              <p class="text-gray-600">将需要处理的文件拖拽到上传区域或点击上传</p>
            </div>
          </el-card>
        </div>

        <div class="step-card">
          <el-card shadow="hover" class="h-full">
            <div class="text-center">
              <div class="step-number">3</div>
              <h3 class="text-xl font-semibold mb-2">下载结果</h3>
              <p class="text-gray-600">处理完成后下载处理好的文件</p>
            </div>
          </el-card>
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
.step-number {
  width: 40px;
  height: 40px;
  background-color: #409EFF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto 16px;
}

.step-card {
  transition: transform 0.2s;
}

.step-card:hover {
  transform: translateY(-4px);
}
</style> 