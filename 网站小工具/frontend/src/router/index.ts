import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ImageCrop from '../views/ImageCrop.vue'
import ImageCompress from '../views/ImageCompress.vue'
import ImageConvert from '../views/ImageConvert.vue'
import ImageMosaic from '../views/ImageMosaic.vue'
import ImageWatermark from '../views/ImageWatermark.vue'
import FileWatermark from '../views/FileWatermark.vue'
import FileConvert from '../views/FileConvert.vue'
import FileCompress from '../views/FileCompress.vue'
import ImageConverterView from '../views/ImageConverterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/crop',
      name: 'crop',
      component: ImageCrop
    },
    {
      path: '/compress',
      name: 'compress',
      component: ImageCompress
    },
    {
      path: '/convert',
      name: 'convert',
      component: ImageConvert
    },
    {
      path: '/mosaic',
      name: 'mosaic',
      component: ImageMosaic
    },
    {
      path: '/watermark',
      name: 'watermark',
      component: ImageWatermark
    },
    {
      path: '/file-watermark',
      name: 'file-watermark',
      component: FileWatermark
    },
    {
      path: '/file-convert',
      name: 'file-convert',
      component: FileConvert
    },
    {
      path: '/file-compress',
      name: 'file-compress',
      component: FileCompress
    },
    {
      path: '/image-converter',
      name: 'imageConverter',
      component: ImageConverterView
    }
  ]
})

export default router 