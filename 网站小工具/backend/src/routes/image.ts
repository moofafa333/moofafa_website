import { Router } from 'express'
import multer from 'multer'
import { cropImage } from '../controllers/imageController'

const router = Router()
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制10MB
  }
})

router.post('/crop', upload.single('image'), cropImage)

export default router 