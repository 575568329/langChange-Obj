/**
 * ============================================
 * 示例 1：基础对话
 * ============================================
 * 
 * 学习目标：
 * - 如何初始化智谱 GLM 模型
 * - 如何发送消息并获取响应
 * - 如何设置模型参数
 */

import { ChatZhipuAI } from "@langchain/community/chat_models/zhipu";
import * as dotenv from "dotenv";

// 加载环境变量
dotenv.config();

/**
 * 创建模型实例
 * 
 * ChatZhipuAI 是智谱 GLM 的 LangChain 封装
 * 常用参数：
 * - model: 模型名称（glm-4-flash 最快最便宜）
 * - temperature: 创造性（0-1，越高越随机）
 * - maxTokens: 最大生成 token 数
 */
const model = new ChatZhipuAI({
  model: "glm-4-flash",      // 使用最快的 flash 模型
  temperature: 0.7,           // 0.7 是比较平衡的值
  // maxTokens: 1000,         // 可选：限制输出长度
});

/**
 * 主函数
 */
async function main() {
  console.log("🤖 基础对话示例");
  console.log("=".repeat(50));

  // ========================================
  // 示例 1：简单问答
  // ========================================
  console.log("\n📝 示例 1：简单问答");
  console.log("-".repeat(50));

  const question = "请用一句话介绍什么是 LangChain";
  console.log("问：" + question);

  // invoke() 方法发送消息并获取响应
  const response1 = await model.invoke(question);
  console.log("答：" + response1.content);

  // ========================================
  // 示例 2：多轮对话（无记忆）
  // ========================================
  console.log("\n\n📝 示例 2：多轮对话（注意：这个例子会忘记上下文）");
  console.log("-".repeat(50));

  const response2 = await model.invoke("我叫码农");
  console.log("我：我叫码农");
  console.log("AI：" + response2.content);

  const response3 = await model.invoke("我叫什么名字？");
  console.log("我：我叫什么名字？");
  console.log("AI：" + response3.content);
  console.log("👆 注意：AI 不知道你叫什么，因为没有记忆！");

  // ========================================
  // 示例 3：不同 temperature 的效果
  // ========================================
  console.log("\n\n📝 示例 3：temperature 参数对比");
  console.log("-".repeat(50));

  // 低 temperature：更确定，更一致
  const lowTempModel = new ChatZhipuAI({
    model: "glm-4-flash",
    temperature: 0.1,  // 很低的随机性
  });

  // 高 temperature：更随机，更有创意
  const highTempModel = new ChatZhipuAI({
    model: "glm-4-flash",
    temperature: 0.9,  // 很高的随机性
  });

  const prompt = "用一句话形容程序员";

  console.log("Temperature = 0.1（更确定）：");
  const res1 = await lowTempModel.invoke(prompt);
  console.log(res1.content);

  console.log("\nTemperature = 0.9（更有创意）：");
  const res2 = await highTempModel.invoke(prompt);
  console.log(res2.content);

  console.log("\n✅ 示例完成！");
  console.log("💡 下一步：运行 npm run memory 学习如何让 AI 记住对话");
}

// 运行主函数
main().catch(console.error);
