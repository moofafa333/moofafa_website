<!-- 页脚组件 -->
<template>
  <footer class="footer bg-white">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">关于我们</h3>
          <p class="text-gray-600">提供简单、快速、高效的在线工具，让文件处理变得更简单。</p>
        </div>

        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">图片工具</h3>
          <ul class="space-y-2">
            <li><router-link to="/image-compress" class="text-gray-600 hover:text-blue-500">图片压缩</router-link></li>
            <li><router-link to="/image-convert" class="text-gray-600 hover:text-blue-500">格式转换</router-link></li>
            <li><router-link to="/image-crop" class="text-gray-600 hover:text-blue-500">图片裁剪</router-link></li>
            <li><router-link to="/image-mosaic" class="text-gray-600 hover:text-blue-500">图片马赛克</router-link></li>
            <li><router-link to="/image-watermark" class="text-gray-600 hover:text-blue-500">图片水印</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">文件工具</h3>
          <ul class="space-y-2">
            <li><router-link to="/file-watermark" class="text-gray-600 hover:text-blue-500">文件水印</router-link></li>
            <li><router-link to="/file-convert" class="text-gray-600 hover:text-blue-500">文件转换</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">联系我们</h3>
          <ul class="space-y-2">
            <li class="text-gray-600">邮箱：support@example.com</li>
            <li class="text-gray-600">微信：your-wechat</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
        <p>&copy; 2024 在线工具. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 页脚组件逻辑
</script>

<style scoped>
.footer {
  border-top: 1px solid #eee;
}

.footer-section {
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }
}
</style> 