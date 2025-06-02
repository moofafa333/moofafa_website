const Jimp = require('jimp');
const path = require('path');

const compressImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传图片' });
    }

    const { quality = 80, format = 'original', width, height } = req.body;
    
    // 读取图片
    const image = await Jimp.read(req.file.buffer);

    // 调整尺寸
    if (width && height) {
      image.resize(parseInt(width), parseInt(height), Jimp.RESIZE_BILINEAR);
    }

    // 设置输出格式和质量
    const outputFormat = format === 'original' 
      ? path.extname(req.file.originalname).substring(1).toLowerCase() || 'jpeg'
      : format.toLowerCase();

    // 设置质量（0-100）
    image.quality(parseInt(quality));

    // 获取MIME类型
    let mimeType;
    switch (outputFormat) {
      case 'jpeg':
      case 'jpg':
        mimeType = Jimp.MIME_JPEG;
        break;
      case 'png':
        mimeType = Jimp.MIME_PNG;
        break;
      case 'webp':
        // Jimp 不直接支持WebP，回退到JPEG
        mimeType = Jimp.MIME_JPEG;
        break;
      default:
        mimeType = Jimp.MIME_JPEG;
    }

    // 获取处理后的图片buffer
    const compressedBuffer = await image.getBufferAsync(mimeType);

    // 设置响应头
    res.set('Content-Type', mimeType);
    res.send(compressedBuffer);

  } catch (error) {
    console.error('图片压缩失败:', error);
    res.status(500).json({ error: '图片压缩失败' });
  }
};

module.exports = {
  compressImage
}; 