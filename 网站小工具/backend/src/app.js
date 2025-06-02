const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const compressRoutes = require('./routes/compressRoutes');
const imageRoutes = require('./routes/imageRoutes');

// 创建Express应用
const app = express();

// CORS配置
app.use(cors({
  origin: 'http://localhost:5173', // Vite默认端口
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// 中间件配置
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));             // 安全头
app.use(compression());        // 响应压缩
app.use(express.json());       // JSON解析
app.use(morgan('combined'));   // 日志记录

// 确保上传目录存在
const fs = require('fs');
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// 静态文件服务
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// 路由配置
app.use('/api/tools', require('./routes/tools'));
app.use('/api/files', require('./routes/files'));
app.use('/api', compressRoutes);
app.use('/api', imageRoutes);  // 添加图片转换路由

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || '服务器内部错误' });
});

// 简单的健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = app; 