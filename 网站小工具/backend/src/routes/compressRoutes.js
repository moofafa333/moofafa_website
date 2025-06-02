const express = require('express');
const router = express.Router();
const multer = require('multer');
const { compressImage } = require('../controllers/compressController');

// 配置内存存储
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制10MB
  },
  fileFilter: (req, file, cb) => {
    // 检查文件类型
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只能上传图片文件'), false);
    }
    cb(null, true);
  }
});

// 图片压缩路由
router.post('/compress', upload.single('image'), compressImage);

module.exports = router; 