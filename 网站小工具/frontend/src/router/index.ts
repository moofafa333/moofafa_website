import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ImageCompress from '../views/ImageCompress.vue'
import ImageConvert from '../views/ImageConvert.vue'
import ImageCrop from '../views/ImageCrop.vue'
import ImageMosaic from '../views/ImageMosaic.vue'
import ImageWatermark from '../views/ImageWatermark.vue'
import FileWatermark from '../views/FileWatermark.vue'
import FileConvert from '../views/FileConvert.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/image-compress',
      name: 'image-compress',
      component: ImageCompress
    },
    {
      path: '/image-convert',
      name: 'image-convert',
      component: ImageConvert
    },
    {
      path: '/image-crop',
      name: 'image-crop',
      component: ImageCrop
    },
    {
      path: '/image-mosaic',
      name: 'image-mosaic',
      component: ImageMosaic
    },
    {
      path: '/image-watermark',
      name: 'image-watermark',
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
    }
  ]
})

export default router 