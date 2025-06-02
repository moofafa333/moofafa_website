<template>
  <div class="image-convert-container">
    <h1 class="page-title">图片格式转换</h1>
    <p class="page-description">
      支持多种图片格式互转，包括JPG、PNG、WEBP、GIF、BMP等格式。可调节输出质量，快速简单。
    </p>
    
    <!-- 上传区域 -->
    <div class="upload-area" 
         @drop.prevent="handleDrop"
         @dragover.prevent
         @click="triggerFileInput">
      <el-icon class="upload-icon"><Upload /></el-icon>
      <p>拖拽图片到此处或点击上传</p>
      <p class="supported-formats">支持格式：JPG、PNG、WEBP、GIF</p>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileSelect"
        accept="image/*"
      />
    </div>

    <!-- 转换选项 -->
    <div class="conversion-options" v-if="selectedFile">
      <el-form :model="conversionOptions" label-width="100px">
        <el-form-item label="目标格式">
          <el-select v-model="conversionOptions.format">
            <el-option label="JPG" value="jpg" />
            <el-option label="PNG" value="png" />
            <el-option label="WEBP" value="webp" />
            <el-option label="GIF" value="gif" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="质量" v-if="conversionOptions.format !== 'png'">
          <el-slider
            v-model="conversionOptions.quality"
            :min="1"
            :max="100"
            :step="1"
          />
        </el-form-item>
      </el-form>
    </div>

    <!-- 预览区域 -->
    <div class="preview-area" v-if="selectedFile">
      <div class="preview-container">
        <div class="preview-original">
          <h3>原图</h3>
          <img :src="previewUrl" alt="原图预览" />
        </div>
      </div>
      
      <el-button type="primary" @click="convertImage" :loading="converting">
        开始转换
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const converting = ref(false)

const conversionOptions = reactive({
  format: 'jpg',
  quality: 80
})

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processSelectedFile(target.files[0])
  }
}

// 处理拖放
const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processSelectedFile(event.dataTransfer.files[0])
  }
}

// 处理选中的文件
const processSelectedFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

// 转换图片
const convertImage = async () => {
  if (!selectedFile.value) return
  
  converting.value = true
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  formData.append('format', conversionOptions.format)
  formData.append('quality', conversionOptions.quality.toString())
  
  try {
    const response = await fetch('http://localhost:3000/api/convert-image', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'image/*'
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(errorData.error || '转换失败')
      } catch (e) {
        console.error('解析错误响应失败:', errorText)
        throw new Error('转换失败')
      }
    }
    
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `converted.${conversionOptions.format}`
    link.click()
    
    ElMessage.success('转换成功')
  } catch (error: unknown) {
    console.error('转换失败:', error)
    ElMessage.error(error instanceof Error ? error.message : '转换失败，请重试')
  } finally {
    converting.value = false
  }
}
</script>

<style scoped>
.image-convert-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  color: #303133;
  margin-bottom: 1rem;
}

.page-description {
  text-align: center;
  color: #606266;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.upload-area {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  background-color: #fafafa;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-area:hover {
  border-color: #409EFF;
}

.upload-icon {
  font-size: 48px;
  color: #909399;
  margin-bottom: 16px;
}

.supported-formats {
  color: #909399;
  font-size: 14px;
  margin-top: 8px;
}

.conversion-options {
  margin-top: 24px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.preview-area {
  margin-top: 24px;
  text-align: center;
}

.preview-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.preview-original {
  flex: 1;
  max-width: 400px;
}

.preview-original img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

h3 {
  margin-bottom: 16px;
  color: #606266;
}
</style> 