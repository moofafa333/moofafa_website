const Redis = require('redis');
require('dotenv').config();

// Redis客户端
let redisClient;

// Redis连接配置
const connectRedis = async () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URI || 'redis://localhost:6379'
    });

    // Redis错误处理
    redisClient.on('error', (err) => {
      console.error('Redis错误:', err);
    });

    // Redis连接断开处理
    redisClient.on('end', () => {
      console.warn('Redis连接断开');
    });

    // 连接Redis
    await redisClient.connect();

    return redisClient;
  } catch (error) {
    console.error('Redis连接失败:', error);
    process.exit(1);
  }
};

// 获取Redis客户端实例
const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis客户端未初始化');
  }
  return redisClient;
};

module.exports = {
  connectRedis,
  getRedisClient
}; 