# 在线图片和文件处理工具

## 已实现功能

### 前端部分
- [x] 响应式布局设计
- [x] 首页完整实现
  - 顶部导航栏
  - Banner区域
  - 功能展示区
  - 使用步骤说明
  - 特色功能区
  - 页脚区域
- [x] 交互效果
  - 导航菜单悬停效果
  - 功能卡片动画
  - 按钮反馈效果

### 后端部分
- [x] 基础服务搭建
- [x] 静态资源服务
- [x] API路由配置

## 技术栈

### 前端
- Vue 3.0
- TypeScript
- Vite
- Element Plus
- TailwindCSS
- Pinia

### 后端
- Node.js
- Express.js
- MongoDB
- Redis

## 项目结构
```
project/
├── frontend/          # 前端项目目录
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── views/        # 页面
│   │   ├── store/        # 状态管理
│   │   ├── router/       # 路由配置
│   │   └── assets/       # 静态资源
│   └── public/           # 公共资源
├── backend/           # 后端项目目录
│   ├── src/
│   │   ├── routes/       # 路由
│   │   ├── controllers/  # 控制器
│   │   ├── models/       # 数据模型
│   │   └── config/       # 配置文件
│   └── public/           # 静态资源
└── README.md         # 项目说明
```

## 安装和运行

### 前端
```bash
cd frontend
npm install
npm run dev
```

### 后端
```bash
cd backend
npm install
npm run dev
```

## 环境要求
- Node.js >= 16
- MongoDB >= 4.4
- Redis >= 6.0 