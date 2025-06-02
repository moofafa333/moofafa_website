<template>
  <div class="image-compress-page">
    <!-- 顶部标题区域 -->
    <div class="page-header">
      <h1 class="main-title">图片压缩</h1>
      <p class="subtitle">快速压缩图片文件大小，保持最佳画质</p>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 上传区域 -->
      <div class="upload-area" @drop.prevent="handleDrop" @dragover.prevent>
        <div class="upload-inner" :class="{ 'has-file': selectedFile }">
          <template v-if="!selectedFile">
            <el-icon class="upload-icon"><Upload /></el-icon>
            <div class="upload-text">
              <p>拖拽图片到这里，或者</p>
              <el-button type="primary" @click="triggerUpload">选择图片</el-button>
            </div>
            <p class="upload-tip">支持 JPG、PNG、WebP 格式，最大 10MB</p>
          </template>
          <template v-else>
            <img :src="previewUrl" class="preview-image" alt="预览图" />
            <div class="file-info">
              <p>{{ selectedFile.name }}</p>
              <p>{{ formatFileSize(selectedFile.size) }}</p>
              <el-button type="danger" plain size="small" @click="clearCurrentFile" class="mt-2">
                清除图片
              </el-button>
            </div>
          </template>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden-input"
          @change="handleFileChange"
        />
      </div>

      <!-- 压缩选项 -->
      <div class="compress-options" v-if="selectedFile">
        <div class="options-card">
          <h3>压缩选项</h3>
          <div class="option-item">
            <div class="option-label">
              <span>压缩质量</span>
              <span class="quality-value">{{ quality }}%</span>
            </div>
            <el-slider v-model="quality" :min="0" :max="100" />
          </div>
          <div class="option-item">
            <span class="option-label">输出格式</span>
            <el-radio-group v-model="outputFormat">
              <el-radio-button label="original">原格式</el-radio-button>
              <el-radio-button label="jpeg">JPG</el-radio-button>
              <el-radio-button label="png">PNG</el-radio-button>
              <el-radio-button label="webp">WebP</el-radio-button>
            </el-radio-group>
          </div>
          <div class="option-item">
            <el-button type="primary" size="large" @click="startCompress" :loading="compressing">
              开始压缩
            </el-button>
          </div>
        </div>
      </div>

      <!-- 结果展示 -->
      <div class="compress-result" v-if="compressedFile">
        <div class="result-card">
          <div class="result-header">
            <h3>压缩结果</h3>
            <el-button type="primary" @click="downloadCompressed">下载</el-button>
          </div>
          <div class="result-content">
            <div class="result-item">
              <span>原始大小</span>
              <span>{{ formatFileSize(selectedFile?.size || 0) }}</span>
            </div>
            <div class="result-item">
              <span>压缩后大小</span>
              <span>{{ formatFileSize(compressedFile.size) }}</span>
            </div>
            <div class="result-item">
              <span>压缩率</span>
              <span>{{ compressionRatio }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 历史记录 -->
      <div class="history-section" v-if="compressionHistory.length > 0">
        <div class="history-card">
          <div class="history-header">
            <h3>历史记录</h3>
            <div class="history-actions">
              <el-button type="primary" plain @click="downloadAllHistory">批量下载</el-button>
              <el-button type="danger" plain @click="clearHistory">清空历史</el-button>
            </div>
          </div>
          <div class="history-list">
            <div v-for="(item, index) in compressionHistory" :key="index" class="history-item">
              <div class="history-item-info">
                <span class="file-name">{{ item.originalName }}</span>
                <span class="file-size">{{ formatFileSize(item.compressedSize) }}</span>
              </div>
              <el-button type="primary" link @click="downloadHistoryItem(item)">下载</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface HistoryItem {
  originalName: string
  compressedName: string
  compressedSize: number
  compressedUrl: string
}

// 状态变量
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const compressedFile = ref<File | null>(null)
const previewUrl = ref('')
const quality = ref(80)
const outputFormat = ref('original')
const compressing = ref(false)
const compressionHistory = ref<HistoryItem[]>([])

// 计算属性
const compressionRatio = computed(() => {
  if (!selectedFile.value || !compressedFile.value) return 0
  return Math.round((1 - compressedFile.value.size / selectedFile.value.size) * 100)
})

// 方法
const triggerUpload = () => {
  fileInput.value?.click()
}

const clearCurrentFile = () => {
  selectedFile.value = null
  compressedFile.value = null
  previewUrl.value = ''
  quality.value = 80
  outputFormat.value = 'original'
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 10 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过10MB')
      return
    }
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    compressedFile.value = null
  }
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过10MB')
      return
    }
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    compressedFile.value = null
  }
}

const startCompress = async () => {
  if (!selectedFile.value) return
  
  compressing.value = true
  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    formData.append('quality', quality.value.toString())
    formData.append('format', outputFormat.value)

    const response = await fetch('/api/compress', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('压缩失败')
    }

    const blob = await response.blob()
    const compressedFileName = `compressed_${selectedFile.value.name}`
    compressedFile.value = new File([blob], compressedFileName, {
      type: blob.type
    })

    // 添加到历史记录
    const historyItem: HistoryItem = {
      originalName: selectedFile.value.name,
      compressedName: compressedFileName,
      compressedSize: blob.size,
      compressedUrl: URL.createObjectURL(blob)
    }
    compressionHistory.value.unshift(historyItem)

    ElMessage.success('压缩成功')
  } catch (error) {
    ElMessage.error('压缩失败：' + (error as Error).message)
  } finally {
    compressing.value = false
  }
}

const downloadCompressed = () => {
  if (!compressedFile.value) return
  const link = document.createElement('a')
  link.href = URL.createObjectURL(compressedFile.value)
  link.download = compressedFile.value.name
  link.click()
}

const downloadHistoryItem = (item: HistoryItem) => {
  const link = document.createElement('a')
  link.href = item.compressedUrl
  link.download = item.compressedName
  link.click()
}

const downloadAllHistory = async () => {
  if (compressionHistory.value.length === 0) return

  // 使用JSZip打包所有文件
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  compressionHistory.value.forEach(item => {
    zip.file(item.compressedName, fetch(item.compressedUrl).then(res => res.blob()))
  })

  const content = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(content)
  link.download = `compressed_images_${new Date().getTime()}.zip`
  link.click()
}

const clearHistory = () => {
  compressionHistory.value = []
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.image-compress-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40px 20px;
}

.page-header {
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
}

.upload-area {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.upload-inner {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-inner:hover {
  border-color: #409eff;
}

.upload-inner.has-file {
  border-style: solid;
}

.upload-icon {
  font-size: 48px;
  color: #909399;
  margin-bottom: 20px;
}

.upload-text {
  margin-bottom: 12px;
  color: #606266;
}

.upload-tip {
  font-size: 0.9rem;
  color: #909399;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 16px;
}

.file-info {
  color: #606266;
}

.hidden-input {
  display: none;
}

.compress-options {
  margin-bottom: 24px;
}

.options-card, .result-card, .history-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.options-card h3, .result-card h3, .history-card h3 {
  font-size: 1.2rem;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.option-item {
  margin-bottom: 24px;
}

.option-item:last-child {
  margin-bottom: 0;
}

.option-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #606266;
}

.quality-value {
  color: #409eff;
}

.result-header, .history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.result-item, .history-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item span:first-child, .history-item-info .file-name {
  color: #606266;
}

.result-item span:last-child, .history-item-info .file-size {
  color: #1a1a1a;
  font-weight: 500;
}

.history-section {
  margin-top: 24px;
}

.history-actions {
  display: flex;
  gap: 12px;
}

.history-list {
  margin-top: 12px;
}

.history-item {
  align-items: center;
}

.history-item-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-right: 16px;
}

.mt-2 {
  margin-top: 8px;
}
</style> 