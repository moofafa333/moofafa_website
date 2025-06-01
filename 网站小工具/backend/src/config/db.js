const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB连接配置
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/image-tools', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // 数据库连接事件监听
    mongoose.connection.on('error', err => {
      console.error('MongoDB连接错误:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB连接断开');
    });

    return conn;
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    process.exit(1);
  }
};

module.exports = {
  connectDB
}; 