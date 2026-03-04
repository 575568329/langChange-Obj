/**
 * ============================================
 * 示例 2：带记忆的对话
 * ============================================
 * 
 * 学习目标：
 * - 理解为什么需要 Memory
 * - 如何使用 BufferMemory 记住对话历史
 * - 如何使用 ConversationChain 实现多轮对话
 */

import { ChatZhipuAI } from "@langchain/community/chat_models/zhipu";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * 创建模型
 */
const model = new ChatZhipuAI({
  model: "glm-4-flash",
  temperature: 0.7,
});

/**
 * 创建记忆
 * 
 * BufferMemory：最简单的记忆类型
 * - 保存所有对话历史
 * - 每次调用都会带上之前的对话
 * 
 * 其他记忆类型（进阶）：
 * - BufferWindowMemory：只保留最近 N 条
 * - SummaryMemory：自动总结历史
 * - VectorStoreMemory：用向量存储历史
 */
const memory = new BufferMemory();

/**
 * 创建对话链
 * 
 * ConversationChain 是一个预配置好的链
 * 自动处理：
 * - 记忆管理
 * - Prompt 构建
 * - 响应解析
 */
const chain = new ConversationChain({
  llm: model,
  memory: memory,
  // verbose: true,  // 开启可以看到内部过程
});

/**
 * 主函数
 */
async function main() {
  console.log("🧠 带记忆的对话示例");
  console.log("=".repeat(50));

  // ========================================
  // 对话 1：介绍自己
  // ========================================
  console.log("\n📝 第一轮对话");
  console.log("-".repeat(50));

  const res1 = await chain.call({ input: "你好！我叫码农，我是一名程序员" });
  console.log("我：你好！我叫码农，我是一名程序员");
  console.log("AI：" + res1.response);

  // ========================================
  // 对话 2：AI 应该记得你的名字
  // ========================================
  console.log("\n📝 第二轮对话");
  console.log("-".repeat(50));

  const res2 = await chain.call({ input: "我叫什么名字？我的职业是什么？" });
  console.log("我：我叫什么名字？我的职业是什么？");
  console.log("AI：" + res2.response);
  console.log("👆 AI 记住了你的名字和职业！");

  // ========================================
  // 对话 3：继续对话
  // ========================================
  console.log("\n📝 第三轮对话");
  console.log("-".repeat(50));

  const res3 = await chain.call({ input: "我想学习 LangChain，能给我一些建议吗？" });
  console.log("我：我想学习 LangChain，能给我一些建议吗？");
  console.log("AI：" + res3.response);

  // ========================================
  // 查看记忆中保存的内容
  // ========================================
  console.log("\n📝 查看记忆内容");
  console.log("-".repeat(50));

  const memoryData = await memory.loadMemoryVariables();
  console.log("记忆中的对话历史：");
  console.log(JSON.stringify(memoryData, null, 2));

  console.log("\n✅ 示例完成！");
  console.log("💡 关键点：");
  console.log("   - BufferMemory 会保存所有对话");
  console.log("   - ConversationChain 自动处理记忆");
  console.log("   - 每次调用都会带上历史记录");
  console.log("\n下一步：运行 npm run prompt 学习 Prompt 模板");
}

main().catch(console.error);
