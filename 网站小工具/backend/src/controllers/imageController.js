const sharp = require('sharp');

const convertImage = async (req, res) => {
  try {
    if (!req.file) {
      console.error('没有接收到文件');
      return res.status(400).json({ error: '没有上传文件' });
    }

    console.log('接收到文件:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const { format, quality } = req.body;
    console.log('转换参数:', { format, quality });

    const supportedFormats = ['jpg', 'png', 'webp', 'gif'];
    
    if (!supportedFormats.includes(format)) {
      console.error('不支持的格式:', format);
      return res.status(400).json({ error: '不支持的格式' });
    }

    // 创建Sharp实例
    let sharpInstance = sharp(req.file.buffer);

    // 获取图片信息
    const metadata = await sharpInstance.metadata();
    console.log('原始图片信息:', metadata);

    // 根据目标格式设置转换选项
    try {
      switch (format) {
        case 'jpg':
          sharpInstance = sharpInstance.jpeg({
            quality: parseInt(quality) || 80,
          });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({
            compressionLevel: 9
          });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({
            quality: parseInt(quality) || 80,
          });
          break;
        case 'gif':
          sharpInstance = sharpInstance.gif();
          break;
      }

      // 处理图片并发送响应
      const buffer = await sharpInstance.toBuffer();
      console.log('转换完成，输出大小:', buffer.length);

      res.set('Content-Type', `image/${format}`);
      res.set('Content-Length', buffer.length.toString());
      res.send(buffer);
    } catch (conversionError) {
      console.error('图片转换过程错误:', conversionError);
      res.status(500).json({ 
        error: '图片转换失败',
        details: conversionError.message
      });
    }
  } catch (error) {
    console.error('图片转换错误:', error);
    res.status(500).json({ 
      error: '图片转换失败',
      details: error.message
    });
  }
};

module.exports = {
  convertImage
}; 