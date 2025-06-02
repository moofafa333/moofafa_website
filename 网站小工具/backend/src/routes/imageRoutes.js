const express = require('express');
const multer = require('multer');
const { convertImage } = require('../controllers/imageController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制10MB
  },
});

// 图片转换路由
router.post('/convert-image', upload.single('image'), convertImage);

module.exports = router; 