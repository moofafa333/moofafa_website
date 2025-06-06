<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">图片裁剪</h1>
      <p class="page-description">自由裁剪图片尺寸，调整图片比例</p>
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
          <p class="upload-hint">支持 JPG、PNG、WebP 格式，最大 10MB</p>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden-input"
          @change="handleFileChange"
        />
      </div>

      <!-- 裁剪区域 -->
      <div class="crop-container" v-else>
        <div class="preview-section">
          <div class="image-editor">
            <vue-cropper
              ref="cropperRef"
              :src="previewUrl"
              :aspect-ratio="aspectRatio"
              :view-mode="2"
              :guides="true"
              :background="true"
              :rotatable="true"
              :scalable="true"
              :zoomable="true"
              :movable="true"
              :minCropBoxWidth="30"
              :minCropBoxHeight="30"
              :center="true"
              :highlight="false"
              :auto-crop-area="0.8"
              :responsive="true"
              :restore="true"
              :checkCrossOrigin="true"
              :modal="true"
            />
          </div>
          <div class="editor-tools">
            <button class="tool-btn" @click="rotateLeft" title="向左旋转90度">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"/>
                <path d="M2 12h10"/>
                <path d="M2 12l4-4"/>
                <path d="M2 12l4 4"/>
              </svg>
            </button>
            <button class="tool-btn" @click="rotateRight" title="向右旋转90度">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2"/>
                <path d="M22 12H12"/>
                <path d="M22 12l-4-4"/>
                <path d="M22 12l-4 4"/>
              </svg>
            </button>
            <button class="tool-btn" @click="flipHorizontal" title="水平翻转">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3v18"/>
                <path d="M16 7l-4-4-4 4"/>
                <path d="M16 17l-4 4-4-4"/>
              </svg>
            </button>
            <button class="tool-btn" @click="flipVertical" title="垂直翻转">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12h18"/>
                <path d="M7 8l-4 4 4 4"/>
                <path d="M17 8l4 4-4 4"/>
              </svg>
            </button>
            <button class="tool-btn" @click="resetImage" title="重置">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="options-section">
          <div class="option-group">
            <label class="option-label">预设比例</label>
            <div class="aspect-options">
              <button 
                v-for="ratio in aspectRatios" 
                :key="ratio.value"
                class="aspect-btn"
                :class="{ 'selected': aspectRatio === ratio.value }"
                @click="setAspectRatio(ratio.value)"
              >
                {{ ratio.label }}
              </button>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">输出尺寸</label>
            <div class="size-inputs">
              <div class="input-group">
                <input 
                  type="number" 
                  v-model="outputWidth" 
                  min="1"
                  @input="updateHeight"
                />
                <span>宽</span>
              </div>
              <div class="input-divider">×</div>
              <div class="input-group">
                <input 
                  type="number" 
                  v-model="outputHeight" 
                  min="1"
                  @input="updateWidth"
                />
                <span>高</span>
              </div>
              <button 
                class="link-btn"
                :class="{ 'active': maintainAspectRatio }"
                @click="toggleAspectRatio"
                title="锁定宽高比"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="maintainAspectRatio" d="M12 3v18M17 8l-5-5-5 5M17 16l-5 5-5-5"/>
                  <path v-else d="M12 3v18M17 8l-5-5-5 5M17 16l-5 5-5-5" stroke-dasharray="4"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">输出格式</label>
            <div class="format-options">
              <label 
                v-for="format in outputFormats" 
                :key="format.value"
                class="format-option"
                :class="{ 'selected': outputFormat === format.value }"
              >
                <input 
                  type="radio" 
                  v-model="outputFormat" 
                  :value="format.value"
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

          <div class="action-buttons">
            <button class="btn-secondary" @click="clearFile">
              取消
            </button>
            <button 
              class="btn-primary" 
              @click="cropImage"
              :disabled="cropping"
            >
              <span v-if="!cropping">确认裁剪</span>
              <span v-else>处理中...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 裁剪结果 -->
      <div class="result-section" v-if="croppedImage">
        <div class="result-header">
          <h3>裁剪结果</h3>
          <div class="result-preview">
            <img :src="croppedImage" alt="裁剪结果预览" />
          </div>
          <button class="btn-download" @click="downloadImage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            下载裁剪后的图片
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VueCropper from 'vue-cropperjs'

// 动态添加 CSS
onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'
  document.head.appendChild(link)
})

const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<any>(null)
const selectedFile = ref<File | null>(null)
const croppedImage = ref('')
const previewUrl = ref('')
const cropping = ref(false)
const quality = ref(90)
const outputWidth = ref(800)
const outputHeight = ref(600)
const maintainAspectRatio = ref(true)

// 预设比例选项
const aspectRatios = [
  { label: '自由', value: NaN },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4/3 },
  { label: '16:9', value: 16/9 },
  { label: '3:4', value: 3/4 },
  { label: '9:16', value: 9/16 }
]

// 输出格式选项
const outputFormats = [
  { label: 'JPG', value: 'jpeg' },
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' }
]

// 当前选择的比例
const aspectRatio = ref(NaN)

// 输出格式
const outputFormat = ref('jpeg')

// 是否显示质量选项（仅对JPG和WebP有效）
const showQualityOption = computed(() => {
  return ['jpeg', 'webp'].includes(outputFormat.value)
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
  if (file.size > 10 * 1024 * 1024) {
    alert('文件大小不能超过10MB')
    return
  }
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  croppedImage.value = ''
}

// 清除文件
const clearFile = () => {
  selectedFile.value = null
  croppedImage.value = ''
  previewUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 设置裁剪比例
const setAspectRatio = (ratio: number) => {
  aspectRatio.value = ratio
  if (cropperRef.value) {
    cropperRef.value.setAspectRatio(ratio)
  }
}

// 更新高度（保持比例）
const updateHeight = () => {
  if (maintainAspectRatio.value && aspectRatio.value) {
    outputHeight.value = Math.round(outputWidth.value / aspectRatio.value)
  }
}

// 更新宽度（保持比例）
const updateWidth = () => {
  if (maintainAspectRatio.value && aspectRatio.value) {
    outputWidth.value = Math.round(outputHeight.value * aspectRatio.value)
  }
}

// 切换是否保持比例
const toggleAspectRatio = () => {
  maintainAspectRatio.value = !maintainAspectRatio.value
}

// 向左旋转
const rotateLeft = () => {
  cropperRef.value?.rotate(-90)
}

// 向右旋转
const rotateRight = () => {
  cropperRef.value?.rotate(90)
}

// 水平翻转
const flipHorizontal = () => {
  cropperRef.value?.scaleX(-cropperRef.value.getData().scaleX || -1)
}

// 垂直翻转
const flipVertical = () => {
  cropperRef.value?.scaleY(-cropperRef.value.getData().scaleY || -1)
}

// 重置图片
const resetImage = () => {
  cropperRef.value?.reset()
}

// 裁剪图片
const cropImage = async () => {
  if (!cropperRef.value) return
  
  cropping.value = true
  try {
    const canvas = cropperRef.value.getCroppedCanvas({
      width: outputWidth.value,
      height: outputHeight.value,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    })

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob: Blob) => resolve(blob),
        `image/${outputFormat.value}`,
        showQualityOption.value ? quality.value / 100 : 1
      )
    })

    croppedImage.value = URL.createObjectURL(blob)
  } catch (error) {
    alert('裁剪失败：' + (error as Error).message)
  } finally {
    cropping.value = false
  }
}

// 下载裁剪后的图片
const downloadImage = () => {
  if (!croppedImage.value) return
  
  const link = document.createElement('a')
  link.href = croppedImage.value
  link.download = `cropped_${selectedFile.value?.name.split('.')[0]}.${outputFormat.value}`
  link.click()
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

/* 裁剪区域样式 */
.crop-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  padding: 24px;
}

.preview-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-editor {
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
}

.editor-tools {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
}

.tool-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
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

.aspect-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.aspect-btn {
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.3s;
}

.aspect-btn:hover {
  border-color: #1890ff;
}

.aspect-btn.selected {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
  color: #1890ff;
}

.size-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}

.input-group input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  color: #1f2937;
}

.input-group span {
  font-size: 14px;
  color: #6b7280;
}

.input-divider {
  color: #6b7280;
  padding: 0 4px;
}

.link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s;
}

.link-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.link-btn.active {
  border-color: #1890ff;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
}

.format-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.format-option:hover {
  border-color: #1890ff;
}

.format-option.selected {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
}

.format-option input[type="radio"] {
  margin: 0;
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

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-secondary {
  flex: 1;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: #6b7280;
  color: #1f2937;
}

.btn-primary {
  flex: 2;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #1890ff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #40a9ff;
}

.btn-primary:disabled {
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

.result-preview {
  margin-bottom: 16px;
  background: #f9fafb;
  border-radius: 4px;
  padding: 16px;
  text-align: center;
}

.result-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
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

  .crop-container {
    grid-template-columns: 1fr;
  }

  .preview-section {
    order: 1;
  }

  .options-section {
    order: 2;
  }

  .aspect-options,
  .format-options {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<script lang="ts">
export default {
  name: 'ImageCrop'
}
</script> 