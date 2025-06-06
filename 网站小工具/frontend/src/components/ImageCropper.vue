<template>
  <div class="image-cropper">
    <div class="cropper-header">
      <h2 class="cropper-title">图片裁剪</h2>
      <div class="cropper-tools">
        <button class="tool-button" :disabled="!hasImage">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#595959" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h6v6M14 10l6-6M9 21H3v-6M10 14l-6 6"/>
          </svg>
          <span>旋转</span>
        </button>
        <button class="tool-button" :disabled="!hasImage">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#595959" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 15h18M3 9h18"/>
          </svg>
          <span>比例</span>
        </button>
      </div>
    </div>

    <div class="cropper-container">
      <div class="upload-area" v-if="!hasImage">
        <div class="upload-content">
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#1890ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 8L12 3L7 8" stroke="#1890ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 3V15" stroke="#1890ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="upload-text">点击或拖拽图片到此处</p>
          <p class="upload-hint">支持 JPG、PNG、WebP 格式</p>
          <div class="upload-size-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span>最大支持 10MB</span>
          </div>
        </div>
      </div>
      <div class="cropper-content" v-else>
        <slot></slot>
      </div>
    </div>

    <div class="cropper-footer" v-if="hasImage">
      <div class="image-info">
        <span class="info-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M20.4 14.5L16 10 4 20"/>
          </svg>
          <span>原始尺寸：1920 x 1080</span>
        </span>
        <span class="info-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18M3 12h18"/>
          </svg>
          <span>裁剪尺寸：800 x 600</span>
        </span>
      </div>
      <div class="action-buttons">
        <button class="btn btn-secondary">重新选择</button>
        <button class="btn btn-primary">下载</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hasImage = ref(false)
const isLoading = ref(false)

const props = defineProps<{
  maxSize?: number // 最大文件大小（MB）
}>()
</script>

<style scoped>
.image-cropper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cropper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.cropper-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  margin: 0;
}

.cropper-tools {
  display: flex;
  gap: 8px;
}

.tool-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #ffffff;
  color: #595959;
  cursor: pointer;
  transition: all 0.3s;
}

.tool-button:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.tool-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.cropper-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #fafafa;
}

.upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
}

.upload-content {
  text-align: center;
}

.upload-icon {
  margin-bottom: 16px;
}

.upload-text {
  color: #262626;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px;
}

.upload-hint {
  color: #595959;
  font-size: 14px;
  margin: 0 0 16px;
}

.upload-size-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #8c8c8c;
  font-size: 12px;
}

.cropper-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

.image-info {
  display: flex;
  gap: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #595959;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  color: #595959;
}

.btn-secondary:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-primary {
  background: #1890ff;
  border: 1px solid #1890ff;
  color: #ffffff;
}

.btn-primary:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cropper-header {
    padding: 12px 16px;
  }

  .cropper-container {
    height: 300px;
  }

  .upload-text {
    font-size: 14px;
  }

  .cropper-footer {
    flex-direction: column;
    gap: 16px;
    padding: 12px 16px;
  }

  .image-info {
    flex-direction: column;
    gap: 8px;
  }

  .action-buttons {
    width: 100%;
  }

  .btn {
    flex: 1;
  }
}
</style> 