import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export const convertImage = async (req: Request, res: Response) => {
  try {
    const multerReq = req as MulterRequest;
    
    if (!multerReq.file) {
      console.error('没有接收到文件');
      return res.status(400).json({ error: '没有上传文件' });
    }

    console.log('接收到文件:', {
      originalname: multerReq.file.originalname,
      mimetype: multerReq.file.mimetype,
      size: multerReq.file.size
    });

    const { format, quality } = req.body;
    console.log('转换参数:', { format, quality });

    const supportedFormats = ['jpg', 'png', 'webp', 'gif'];
    
    if (!supportedFormats.includes(format)) {
      console.error('不支持的格式:', format);
      return res.status(400).json({ error: '不支持的格式' });
    }

    // 创建Sharp实例
    let sharpInstance = sharp(multerReq.file.buffer);

    // 获取图片信息
    const metadata = await sharpInstance.metadata();
    console.log('原始图片信息:', metadata);

    // 根据目标格式设置转换选项
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
  } catch (error) {
    console.error('图片转换错误:', error);
    res.status(500).json({ 
      error: '图片转换失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
}; 

export const cropImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传文件' })
    }

    const { width, height, left, top, rotate } = req.body
    const image = sharp(req.file.buffer)
    
    // 获取图片信息
    const metadata = await image.metadata()
    
    // 处理图片
    const processedImage = await image
      .rotate(parseInt(rotate) || 0) // 应用旋转
      .extract({ // 应用裁剪
        left: parseInt(left) || 0,
        top: parseInt(top) || 0,
        width: parseInt(width) || metadata.width || 0,
        height: parseInt(height) || metadata.height || 0
      })
      .toFormat('png') // 转换为PNG格式
      .toBuffer()

    // 设置响应头
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Content-Disposition', 'attachment; filename=cropped-image.png')
    
    // 发送处理后的图片
    res.send(processedImage)
  } catch (error) {
    console.error('图片处理错误:', error)
    res.status(500).json({ error: '图片处理失败' })
  }
} 