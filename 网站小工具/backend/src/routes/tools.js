const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');
const fs = require('fs').promises;

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制10MB
  }
});

// 图片压缩
router.post('/compress', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请上传图片' });
    }

    const { quality = 80 } = req.body;
    const outputPath = `compressed_${req.file.filename}`;
    const outputFullPath = path.join('uploads', outputPath);

    const image = await Jimp.read(req.file.path);
    await image
      .quality(parseInt(quality))
      .writeAsync(outputFullPath);

    res.json({
      success: true,
      data: {
        url: `/uploads/${outputPath}`
      }
    });
  } catch (error) {
    console.error('图片压缩失败:', error);
    res.status(500).json({ success: false, message: '图片压缩失败' });
  }
});

// 图片格式转换
router.post('/convert', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请上传图片' });
    }

    const { format = 'jpeg' } = req.body;
    const outputPath = `converted_${Date.now()}.${format}`;
    const outputFullPath = path.join('uploads', outputPath);

    const image = await Jimp.read(req.file.path);
    await image.writeAsync(outputFullPath);

    res.json({
      success: true,
      data: {
        url: `/uploads/${outputPath}`
      }
    });
  } catch (error) {
    console.error('图片转换失败:', error);
    res.status(500).json({ success: false, message: '图片转换失败' });
  }
});

// 图片裁剪
router.post('/crop', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请上传图片' });
    }

    const { width, height, left, top } = req.body;
    const outputPath = `cropped_${req.file.filename}`;
    const outputFullPath = path.join('uploads', outputPath);

    const image = await Jimp.read(req.file.path);
    await image
      .crop(
        parseInt(left),
        parseInt(top),
        parseInt(width),
        parseInt(height)
      )
      .writeAsync(outputFullPath);

    res.json({
      success: true,
      data: {
        url: `/uploads/${outputPath}`
      }
    });
  } catch (error) {
    console.error('图片裁剪失败:', error);
    res.status(500).json({ success: false, message: '图片裁剪失败' });
  }
});

module.exports = router; 