/**
 * ============================================
 * 示例 3：Prompt 模板
 * ============================================
 * 
 * 学习目标：
 * - 什么是 Prompt Template
 * - 如何创建和使用模板
 * - 如何用 pipe 组合模板和模型
 */

import { ChatZhipuAI } from "@langchain/community/chat_models/zhipu";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatZhipuAI({
  model: "glm-4-flash",
  temperature: 0.7,
});

/**
 * 主函数
 */
async function main() {
  console.log("📝 Prompt 模板示例");
  console.log("=".repeat(50));

  // ========================================
  // 示例 1：基础 PromptTemplate
  // ========================================
  console.log("\n📝 示例 1：基础模板");
  console.log("-".repeat(50));

  /**
   * PromptTemplate：字符串模板
   * 
   * 用 {变量名} 作为占位符
   * format() 方法填充变量
   */
  const simpleTemplate = PromptTemplate.fromTemplate(
    "请用{style}风格写一首关于{topic}的诗"
  );

  // 填充模板
  const formattedPrompt = await simpleTemplate.format({
    style: "李白",
    topic: "编程",
  });

  console.log("生成的 Prompt：");
  console.log(formattedPrompt);

  // 发送给模型
  const response1 = await model.invoke(formattedPrompt);
  console.log("\nAI 回复：");
  console.log(response1.content);

  // ========================================
  // 示例 2：ChatPromptTemplate（更适合对话）
  // ========================================
  console.log("\n\n📝 示例 2：对话模板");
  console.log("-".repeat(50));

  /**
   * ChatPromptTemplate：对话消息模板
   * 
   * 可以定义不同角色的消息：
   * - system: 系统提示（设定 AI 行为）
   * - human: 用户消息
   * - ai: AI 回复（用于 few-shot 示例）
   */
  const chatTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个{role}，用{tone}的语气回答问题"],
    ["human", "{question}"],
  ]);

  // 使用 pipe 串联模板和模型（推荐方式）
  const chain = chatTemplate.pipe(model);

  const response2 = await chain.invoke({
    role: "资深程序员",
    tone: "幽默风趣",
    question: "什么是 Bug？",
  });

  console.log("AI 回复：");
  console.log(response2.content);

  // ========================================
  // 示例 3：Few-shot 提示（给 AI 示例）
  // ========================================
  console.log("\n\n📝 示例 3：Few-shot 提示");
  console.log("-".repeat(50));

  /**
   * Few-shot：给 AI 一些示例，让它学习如何回答
   * 
   * 这是提高 AI 回答质量的重要技巧
   */
  const fewShotTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个翻译助手，将中文翻译成英文"],
    // 示例 1
    ["human", "你好"],
    ["ai", "Hello"],
    // 示例 2
    ["human", "谢谢"],
    ["ai", "Thank you"],
    // 真正的问题
    ["human", "{text}"],
  ]);

  const translateChain = fewShotTemplate.pipe(model);

  const response3 = await translateChain.invoke({
    text: "我爱你",
  });

  console.log("翻译结果：");
  console.log(response3.content);
  console.log("👆 AI 学会了翻译的模式！");

  // ========================================
  // 示例 4：模板复用
  // ========================================
  console.log("\n\n📝 示例 4：复用模板");
  console.log("-".repeat(50));

  /**
   * 模板的优势：可以复用
   * 同一个模板，不同的输入
   */
  const codeExplainTemplate = PromptTemplate.fromTemplate(
    "请用{level}的水平解释这段代码：\n\n{code}"
  );

  const code = `const arr = [1, 2, 3].map(x => x * 2);`;

  // 给初学者解释
  const beginnerPrompt = await codeExplainTemplate.format({
    level: "初学者",
    code: code,
  });

  console.log("给初学者解释：");
  const res1 = await model.invoke(beginnerPrompt);
  console.log(res1.content);

  console.log("\n" + "=".repeat(50) + "\n");

  // 给专家解释
  const expertPrompt = await codeExplainTemplate.format({
    level: "专家",
    code: code,
  });

  console.log("给专家解释：");
  const res2 = await model.invoke(expertPrompt);
  console.log(res2.content);

  console.log("\n✅ 示例完成！");
  console.log("💡 关键点：");
  console.log("   - PromptTemplate 用于字符串模板");
  console.log("   - ChatPromptTemplate 用于对话消息");
  console.log("   - pipe() 可以串联模板和模型");
  console.log("   - Few-shot 可以提高回答质量");
  console.log("\n下一步：运行 npm run chain 学习链式调用");
}

main().catch(console.error);
