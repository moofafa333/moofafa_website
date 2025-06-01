const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// 创建Express应用
const app = express();

// 中间件配置
app.use(cors());                // 跨域支持
app.use(helmet());             // 安全头
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

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
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