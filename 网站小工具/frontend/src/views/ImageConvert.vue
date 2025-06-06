<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">格式转换</h1>
      <p class="page-description">将图片转换为其他格式，支持JPG、PNG、WebP等格式互转</p>
    </div>
    
    <div class="tool-container">
      <!-- 上传区域 -->
      <div class="upload-area" v-if="!selectedFile" @drop.prevent="handleDrop" @dragover.prevent>
        <div class="upload-content" @click="triggerUpload">
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1890ff" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <p class="upload-text">点击或拖拽图片到此处</p>
          <p class="upload-hint">支持 JPG、PNG、WebP、GIF、BMP 等常见图片格式</p>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden-input"
          @change="handleFileChange"
        />
      </div>

      <!-- 转换选项和预览 -->
      <div class="convert-container" v-else>
        <div class="preview-section">
          <div class="image-preview">
            <img :src="previewUrl" alt="图片预览" />
            <div class="image-info">
              <div class="info-details">
                <span>当前格式：{{ currentFormat }}</span>
                <span>文件大小：{{ formatFileSize(selectedFile!.size) }}</span>
              </div>
              <button class="btn-clear" @click="clearFile">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                清除
              </button>
            </div>
          </div>
        </div>

        <div class="options-section">
          <div class="option-group">
            <label class="option-label">目标格式</label>
            <div class="format-options">
              <label 
                v-for="format in availableFormats" 
                :key="format.value"
                class="format-option"
                :class="{ 'selected': targetFormat === format.value }"
              >
                <input 
                  type="radio" 
                  v-model="targetFormat" 
                  :value="format.value"
                  :disabled="currentFormat === format.value"
                />
                <span>{{ format.label }}</span>
              </label>
            </div>
          </div>

          <div class="option-group" v-if="showQualityOption">
            <label class="option-label">
              <span>输出质量</span>
              <span class="quality-value">{{ quality }}%</span>
            </label>
            <input
              type="range"
              v-model="quality"
              class="quality-slider"
              min="0"
              max="100"
              step="1"
            />
          </div>

          <button 
            class="btn-convert" 
            @click="startConvert"
            :disabled="converting || currentFormat === targetFormat"
          >
            <span v-if="!converting">开始转换</span>
            <span v-else>转换中...</span>
          </button>
        </div>
      </div>

      <!-- 转换结果 -->
      <div class="result-section" v-if="convertedFile">
        <div class="result-header">
          <h3>转换结果</h3>
          <div class="result-stats">
            <div class="stat-item">
              <span class="stat-label">原始格式</span>
              <span class="stat-value">{{ currentFormat.toUpperCase() }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">目标格式</span>
              <span class="stat-value highlight">{{ targetFormat.toUpperCase() }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">文件大小变化</span>
              <span class="stat-value" :class="{ 'success': sizeChange <= 0, 'warning': sizeChange > 0 }">
                {{ sizeChange > 0 ? '+' : '' }}{{ sizeChange }}%
              </span>
            </div>
          </div>
          <button class="btn-download" @click="downloadConverted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            下载转换后的图片
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const convertedFile = ref<File | null>(null)
const previewUrl = ref('')
const quality = ref(90)
const converting = ref(false)

// 支持的格式列表
const availableFormats = [
  { label: 'JPG', value: 'jpeg' },
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
  { label: 'GIF', value: 'gif' },
  { label: 'BMP', value: 'bmp' }
]

// 当前文件格式
const currentFormat = computed(() => {
  if (!selectedFile.value) return ''
  const type = selectedFile.value.type.split('/')[1]
  return type === 'jpeg' ? 'jpg' : type
})

// 目标格式
const targetFormat = ref('png')

// 是否显示质量选项（仅对JPG和WebP有效）
const showQualityOption = computed(() => {
  return ['jpeg', 'webp'].includes(targetFormat.value)
})

// 文件大小变化百分比
const sizeChange = computed(() => {
  if (!selectedFile.value || !convertedFile.value) return 0
  const change = ((convertedFile.value.size - selectedFile.value.size) / selectedFile.value.size) * 100
  return Math.round(change)
})

// 触发文件选择
const triggerUpload = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

// 处理拖放
const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

// 处理文件
const processFile = (file: File) => {
  if (file.size > 50 * 1024 * 1024) {
    alert('文件大小不能超过50MB')
    return
  }
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  convertedFile.value = null
}

// 清除文件
const clearFile = () => {
  selectedFile.value = null
  convertedFile.value = null
  previewUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 开始转换
const startConvert = async () => {
  if (!selectedFile.value) return
  
  converting.value = true
  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    formData.append('format', targetFormat.value)
    if (showQualityOption.value) {
      formData.append('quality', quality.value.toString())
    }

    const response = await fetch('/api/convert', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('转换失败')
    }

    const blob = await response.blob()
    convertedFile.value = new File([blob], `converted_${selectedFile.value.name.split('.')[0]}.${targetFormat.value}`, {
      type: `image/${targetFormat.value}`
    })
  } catch (error) {
    alert('转换失败：' + (error as Error).message)
  } finally {
    converting.value = false
  }
}

// 下载转换后的文件
const downloadConverted = () => {
  if (!convertedFile.value) return
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(convertedFile.value)
  link.download = convertedFile.value.name
  link.click()
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
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
  overflow: hidden;
}

/* 上传区域样式 */
.upload-area {
  padding: 40px;
  text-align: center;
  cursor: pointer;
}

.upload-content {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 40px;
  transition: all 0.3s;
}

.upload-content:hover {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.02);
}

.upload-icon {
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 14px;
  color: #6b7280;
}

.hidden-input {
  display: none;
}

/* 转换选项和预览样式 */
.convert-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  padding: 24px;
}

.preview-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
}

.image-preview {
  width: 100%;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 16px;
}

.image-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 14px;
}

.info-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.btn-clear {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-clear:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.options-section {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.option-group {
  margin-bottom: 24px;
}

.option-group:last-child {
  margin-bottom: 0;
}

.option-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #1f2937;
  font-size: 14px;
}

.quality-value {
  color: #1890ff;
}

.quality-slider {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.quality-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #1890ff;
  border-radius: 50%;
  cursor: pointer;
}

.format-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.format-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.format-option:hover:not(:disabled) {
  border-color: #1890ff;
}

.format-option.selected {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
}

.format-option input[type="radio"] {
  margin: 0;
}

.format-option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-convert {
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-convert:hover:not(:disabled) {
  background: #40a9ff;
}

.btn-convert:disabled {
  background: #bfbfbf;
  cursor: not-allowed;
}

/* 结果区域样式 */
.result-section {
  border-top: 1px solid #e5e7eb;
  padding: 24px;
}

.result-header h3 {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 16px;
}

.result-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  padding: 12px;
  background: #f9fafb;
  border-radius: 4px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

.stat-value.highlight {
  color: #1890ff;
}

.stat-value.success {
  color: #10b981;
}

.stat-value.warning {
  color: #f59e0b;
}

.btn-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-download:hover {
  background: #40a9ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 24px 16px;
  }

  .convert-container {
    grid-template-columns: 1fr;
  }

  .preview-section {
    order: 1;
  }

  .options-section {
    order: 2;
  }

  .result-stats {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style> 