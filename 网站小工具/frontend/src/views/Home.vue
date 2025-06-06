<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <img src="../assets/logo.svg" alt="Logo" class="nav-logo" />
          <div class="nav-menu">
            <a href="/" class="nav-link active">首页</a>
            <a href="/image-tools" class="nav-link">图片工具</a>
            <a href="/file-tools" class="nav-link">文件工具</a>
            <a href="/more" class="nav-link">更多功能</a>
          </div>
        </div>
        <div class="nav-right">
          <a href="/pricing" class="nav-link">定价</a>
          <button class="btn-login">登录</button>
        </div>
      </div>
    </nav>

    <!-- Banner区域 -->
    <section class="banner">
      <div class="banner-content">
        <h1 class="banner-title">免费在线图片和文件处理工具</h1>
        <div class="search-container">
          <div class="search-type">
            <span>工具</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <input type="text" placeholder="搜索工具..." class="search-input" />
          <button class="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 功能展示区 -->
    <section class="features">
      <div class="tools-grid">
        <router-link to="/crop" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
              <path d="M8 16V4a2 2 0 0 1 2-2h12"/>
            </svg>
          </div>
          <h2>图片裁剪</h2>
          <p>自由裁剪图片尺寸，调整图片比例</p>
        </router-link>

        <router-link to="/compress" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <polyline points="16 3 21 3 21 8"/>
              <line x1="4" y1="20" x2="21" y2="3"/>
              <polyline points="21 16 21 21 16 21"/>
              <line x1="15" y1="15" x2="21" y2="21"/>
              <line x1="4" y1="4" x2="9" y2="9"/>
            </svg>
          </div>
          <h2>图片压缩</h2>
          <p>压缩图片文件大小，保持最佳质量</p>
        </router-link>

        <router-link to="/convert" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M17 3v4h4"/>
              <path d="M7 21v-4H3"/>
              <path d="M21 7v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
            </svg>
          </div>
          <h2>图片格式转换</h2>
          <p>转换图片格式，支持 JPG、PNG、WebP 等</p>
        </router-link>

        <router-link to="/mosaic" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M3 9h18"/>
              <path d="M3 15h18"/>
              <path d="M9 3v18"/>
              <path d="M15 3v18"/>
            </svg>
          </div>
          <h2>图片马赛克</h2>
          <p>为图片添加马赛克效果，保护隐私信息</p>
        </router-link>

        <router-link to="/watermark" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12s2 2 4 2 4-2 4-2"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
            </svg>
          </div>
          <h2>图片水印</h2>
          <p>为图片添加文字或图片水印，保护版权</p>
        </router-link>

        <router-link to="/file-watermark" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M8 13s1.5 1 4 1 4-1 4-1"/>
              <line x1="12" y1="11" x2="12" y2="15"/>
            </svg>
          </div>
          <h2>文件水印</h2>
          <p>为PDF、Word等文档添加水印，保护版权</p>
        </router-link>

        <router-link to="/file-convert" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M10 12l-2 2 2 2"/>
              <path d="M14 12l2 2-2 2"/>
            </svg>
          </div>
          <h2>文件格式转换</h2>
          <p>支持PDF、Word、Excel等多种格式互转</p>
        </router-link>

        <router-link to="/file-compress" class="tool-card">
          <div class="tool-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="8" y1="16" x2="12" y2="16"/>
            </svg>
          </div>
          <h2>文件压缩</h2>
          <p>压缩PDF、Word等文档，减小文件体积</p>
        </router-link>
      </div>
    </section>

    <!-- 使用步骤说明 -->
    <section class="steps">
      <div class="steps-container">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>关于我们</h4>
          <p>提供免费、高效、便捷的在线工具</p>
        </div>
        <div class="footer-section">
          <h4>快速链接</h4>
          <a href="/tools">所有工具</a>
          <a href="/blog">博客</a>
          <a href="/about">关于</a>
        </div>
        <div class="footer-section">
          <h4>联系我们</h4>
          <a href="mailto:contact@example.com">contact@example.com</a>
        </div>
        <div class="footer-section">
          <h4>关注我们</h4>
          <div class="social-links">
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">GitHub</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 在线工具. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CompressIcon, ConvertIcon, CropIcon } from '@/components/icons'
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    title: '图片压缩',
    description: '快速压缩图片大小，保持最佳质量',
    iconBg: '#E3F2FD',
    icon: CompressIcon,
    path: '/image-compress'
  },
  {
    title: '格式转换',
    description: '支持多种图片格式互转',
    iconBg: '#F3E5F5',
    icon: ConvertIcon,
    path: '/image-convert'
  },
  {
    title: '图片裁剪',
    description: '自由裁剪图片尺寸和比例',
    iconBg: '#E8F5E9',
    icon: CropIcon,
    path: '/image-crop'
  }
]

const steps = [
  {
    title: '选择工具',
    description: '从首页选择需要使用的工具'
  },
  {
    title: '上传文件',
    description: '拖拽或点击上传您的文件'
  },
  {
    title: '完成处理',
    description: '等待处理完成后下载结果'
  }
]

const navigateToFeature = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  background-color: #1f2937;
  padding: 16px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 48px;
}

.nav-logo {
  height: 40px;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 0;
  position: relative;
}

.nav-link.active::after,
.nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ffffff;
}

.btn-login {
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-login:hover {
  background-color: #ffffff;
  color: #1f2937;
}

/* Banner样式 */
.banner {
  background-color: #1f2937;
  padding: 120px 0 60px;
  text-align: center;
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.banner-title {
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 32px;
  font-weight: 600;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.search-type {
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  border-right: 1px solid #e5e7eb;
  color: #4b5563;
  cursor: pointer;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 16px;
}

.search-button {
  padding: 12px 24px;
  background-color: #60a5fa;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #3b82f6;
}

/* 功能展示区样式 */
.features {
  padding: 64px 24px;
  background-color: #ffffff;
}

.tools-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.tool-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tool-icon {
  margin-bottom: 16px;
}

.tool-card h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.tool-card p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* 使用步骤说明样式 */
.steps {
  background-color: #f9fafb;
  padding: 60px 24px;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.step {
  text-align: center;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #1f2937;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 18px;
  font-weight: 600;
}

.step-title {
  font-size: 18px;
  color: #262626;
  margin-bottom: 8px;
}

.step-description {
  font-size: 14px;
  color: #595959;
}

/* 页脚样式 */
.footer {
  background-color: #1f2937;
  color: #ffffff;
  padding: 40px 24px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 16px;
}

.footer-section a {
  color: #e5e7eb;
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
}

.footer-section a:hover {
  color: #ffffff;
}

.social-links {
  display: flex;
  gap: 16px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 32px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 14px;
  color: #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .banner {
    padding: 100px 0 40px;
  }

  .banner-title {
    font-size: 24px;
  }

  .search-type {
    display: none;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style> 