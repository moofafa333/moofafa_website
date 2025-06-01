<!-- 页脚组件 -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-section">
          <h4 class="footer-title">关于我们</h4>
          <p class="footer-text">
            提供专业的在线图片和文件处理工具，让文件处理更简单高效。
          </p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/image-tools">图片工具</router-link></li>
            <li><router-link to="/file-tools">文件工具</router-link></li>
            <li><router-link to="/more">更多功能</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">联系方式</h4>
          <ul class="footer-links">
            <li><a href="mailto:contact@example.com">邮箱：contact@example.com</a></li>
            <li>QQ群：123456789</li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">版权信息</h4>
          <p class="footer-text">
            © 2024 在线工具. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 页脚组件逻辑
</script>

<style scoped>
.footer {
  background-color: #1f2937;
  padding: 40px 0;
  color: #ffffff;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-text {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style> 