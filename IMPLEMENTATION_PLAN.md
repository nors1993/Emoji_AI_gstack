# aiAurora MVP 实现计划

## 项目概述

- **项目名称**: aiAurora 虚拟人聊天产品
- **阶段**: MVP（最小可行产品）
- **目标**: 验证"视觉化情绪表达"的用户需求

## 技术架构

### 前后端分离架构

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  OpenAI API │
│   (React)   │◀────│  (Node.js)  │◀────│   (GPT-4)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       ▼                                       ▼
┌─────────────┐                         ┌─────────────┐
│  Live2D/    │                         │ 情绪触发    │
│  动画渲染   │◀────────────────────────│ JSON 协议   │
└─────────────┘                         └─────────────┘
```

### 技术栈

| 层级 | 技术选型 |
|------|----------|
| 前端框架 | React 18 + TypeScript |
| 虚拟形象 | Live2D Cubism 或 精灵动画 |
| 后端框架 | Express.js + TypeScript |
| LLM | OpenAI GPT-4o mini |
| 样式 | Tailwind CSS |

### API 协议

**请求:**
```json
POST /api/chat
{
  "message": "你好呀！"
}
```

**响应:**
```json
{
  "response": "你好！有什么我可以帮你的吗？",
  "emotion": "happy"
}
```

### 情绪映射表

| emotion | 动画状态 |
|---------|---------|
| happy | 笑容 + 眼睛眯起 + 腮红 |
| sad | 嘴角下垂 + 眼泪 |
| neutral | 正常表情 |
| surprised | 眼睛睁大 + 嘴巴张开 |
| angry | 眉头紧皱 + 脸红 |
| fearful | 眼睛睁大 + 颤抖 |
| disgusted | 嘴角上扬 + 眼睛斜视 |

## 实现任务清单

### 第一周：基础架构搭建

1. **项目初始化**
   - [ ] 初始化 React 前端项目 (Vite)
   - [ ] 初始化 Node.js 后端项目
   - [ ] 配置 TypeScript
   - [ ] 配置 Tailwind CSS

2. **后端服务**
   - [ ] 创建 Express 服务
   - [ ] 实现 /api/chat 接口
   - [ ] 集成 OpenAI API
   - [ ] 实现情绪分类逻辑

3. **前端界面**
   - [ ] 创建聊天窗口组件
   - [ ] 实现消息列表
   - [ ] 实现输入框

### 第二周：虚拟形象与动画

4. **虚拟形象组件**
   - [ ] 集成 Live2D 或创建精灵动画
   - [ ] 实现 7 种情绪状态
   - [ ] 实现情绪动画过渡

5. **集成与测试**
   - [ ] 前后端联调
   - [ ] 错误处理
   - [ ] 加载状态
   - [ ] 基础测试

## 文件结构

```
Emoji_AI_gstack/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VirtualAvatar.tsx    # 虚拟形象
│   │   │   ├── ChatWindow.tsx       # 聊天窗口
│   │   │   ├── MessageList.tsx      # 消息列表
│   │   │   └── ChatInput.tsx        # 输入框
│   │   ├── hooks/
│   │   │   ├── useChat.ts           # 聊天逻辑
│   │   │   └── useEmotion.ts        # 情绪管理
│   │   ├── utils/
│   │   │   └── emotionMapper.ts     # 情绪映射
│   │   ├── types/
│   │   │   └── index.ts             # 类型定义
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts              # 聊天路由
│   │   ├── services/
│   │   │   └── llm.ts               # LLM 服务
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                 # 入口
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 风险与缓解

| 风险 | 严重程度 | 缓解措施 |
|------|---------|---------|
| LLM API 延迟高 | 中 | 添加加载状态、优化动画 |
| API 成本超出预期 | 中 | 使用 GPT-4o mini，设置限额 |
| Live2D 许可证 | 低 | 先用精灵动画替代 |
| 前端/后端联调问题 | 中 | 提前定义 API 协议 |

## 成功标准

- [ ] 用户可以发送文字消息
- [ ] AI 可以回复文字消息
- [ ] 虚拟形象可以根据情绪显示不同表情
- [ ] 7 种情绪都可以正确触发
- [ ] 基本的错误处理正常
