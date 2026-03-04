# 🦜 LangChain 入门项目

> 使用智谱 GLM 模型的 LangChain 实战教程

## 📖 项目简介

这是一个 LangChain 入门项目，帮助你快速掌握 LangChain JS 的核心概念和用法。

**为什么用智谱 GLM？**
- ✅ 国内访问稳定
- ✅ 新用户有免费额度
- ✅ 中文支持好
- ✅ 价格便宜

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，填入你的智谱 API Key：

```bash
ZHIPU_API_KEY=你的智谱key
```

**获取方式**：
1. 访问 https://open.bigmodel.cn
2. 注册登录
3. API 密钥 → 创建密钥

### 3. 运行示例

```bash
# 基础对话
npm run chat

# 带记忆的对话
npm run memory

# Prompt 模板
npm run prompt

# Chain 链式调用
npm run chain

# Agent 智能代理
npm run agent
```

---

## 📚 学习路径

### 第一步：基础对话
👉 `src/01-basic-chat.js`

学习如何：
- 初始化智谱 GLM 模型
- 发送消息并获取响应
- 设置模型参数（temperature、max_tokens）

### 第二步：对话记忆
👉 `src/02-chat-with-memory.js`

学习如何：
- 使用 BufferMemory 记住对话历史
- 创建 ConversationChain 实现多轮对话
- 理解上下文保持机制

### 第三步：Prompt 模板
👉 `src/03-prompt-template.js`

学习如何：
- 创建可复用的 Prompt 模板
- 动态填充变量
- 使用 Pipe 操作符组合模板和模型

### 第四步：Chain 链式调用
👉 `src/04-chain.js`

学习如何：
- 组合多个步骤形成流水线
- 使用 LLMChain
- 实现翻译 → 总结 → 改写

### 第五步：Agent 智能代理
👉 `src/05-agent.js`

学习如何：
- 定义工具（Tools）
- 让 AI 自主决定调用哪个工具
- 实现能搜索、计算的智能助手

---

## 📁 项目结构

```
langChange Obj/
├── README.md           # 项目说明（你正在看）
├── package.json        # 依赖配置
├── .env.example        # 环境变量模板
├── .env                # 你的环境变量（不提交到 git）
└── src/
    ├── index.js        # 主入口 - 运行所有示例
    ├── 01-basic-chat.js        # 基础对话
    ├── 02-chat-with-memory.js  # 带记忆的对话
    ├── 03-prompt-template.js   # Prompt 模板
    ├── 04-chain.js             # Chain 链式调用
    └── 05-agent.js             # Agent 智能代理
```

---

## 💡 核心概念速查

| 概念 | 是什么 | 用在哪 |
|------|--------|--------|
| **LLM** | 大语言模型（如 GLM、GPT） | 生成文本 |
| **Prompt Template** | 提示词模板 | 复用提示词 |
| **Chain** | 链式调用，组合多个步骤 | 流水线处理 |
| **Memory** | 记忆，保存对话历史 | 多轮对话 |
| **Agent** | 智能代理，自主决策 | 调用工具 |
| **Tool** | 工具，给 Agent 用的能力 | 搜索、计算 |

---

## 🎯 下一步

学完这些示例后，可以尝试：

1. **RAG（检索增强生成）**
   - 上传文档 → 问答系统
   - 需要：向量数据库 + 文档加载器

2. **自定义 Agent**
   - 添加更多工具（天气、发邮件等）
   - 让 AI 能做更多事

3. **结合 Next.js**
   - 做一个 Web 界面
   - 部署到 Vercel

---

## ❓ 常见问题

**Q：报错 "Cannot find module"**
```bash
npm install
```

**Q：报错 "Invalid API key"**
- 检查 .env 文件中的 key 是否正确
- 确认 key 没过期（去智谱后台看）

**Q：想用其他模型怎么办？**
```javascript
// OpenAI
import { ChatOpenAI } from "@langchain/openai";

// 通义千问
import { ChatTongyi } from "@langchain/community/chat_models/tongyi";

// DeepSeek
import { ChatDeepSeek } from "@langchain/community/chat_models/deepseek";
```

---

## 📝 笔记区

> 学习过程中可以在这里记录笔记

-

---

**祝你学习愉快！有问题随时问我 🦞**
