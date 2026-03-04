/**
 * ============================================
 * 示例 4：Chain 链式调用
 * ============================================
 * 
 * 学习目标：
 * - 什么是 Chain
 * - 如何用 pipe 创建链
 * - 如何用 LLMChain 组合多个步骤
 */

import { ChatZhipuAI } from "@langchain/community/chat_models/zhipu";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
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
  console.log("🔗 Chain 链式调用示例");
  console.log("=".repeat(50));

  // ========================================
  // 示例 1：最简单的链 - pipe
  // ========================================
  console.log("\n📝 示例 1：pipe 创建简单链");
  console.log("-".repeat(50));

  /**
   * pipe：串联操作
   * 
   * 数据流向：模板 → 模型 → 输出解析
   * 
   * 优点：
   * - 代码简洁
   * - 易于组合
   * - 类型安全
   */
  const simpleChain = PromptTemplate.fromTemplate(
    "用一句话解释什么是{concept}"
  ).pipe(model);

  const result1 = await simpleChain.invoke({ concept: "量子力学" });
  console.log("AI：" + result1.content);

  // ========================================
  // 示例 2：添加输出解析器
  // ========================================
  console.log("\n\n📝 示例 2：添加输出解析器");
  console.log("-".repeat(50));

  /**
   * StringOutputParser：提取字符串内容
   * 
   * 默认情况下，model.invoke() 返回的是 AIMessage 对象
   * 加上 StringOutputParser 后，直接返回字符串
   */
  const chainWithParser = PromptTemplate.fromTemplate(
    "给一个学习{topic}的建议"
  ).pipe(model).pipe(new StringOutputParser());

  const result2 = await chainWithParser.invoke({ topic: "TypeScript" });
  console.log("AI：" + result2);
  console.log("👆 注意：这次直接是字符串，不是对象");

  // ========================================
  // 示例 3：RunnableSequence（显式创建链）
  // ========================================
  console.log("\n\n📝 示例 3：RunnableSequence 创建链");
  console.log("-".repeat(50));

  /**
   * RunnableSequence：显式定义链的每个步骤
   * 
   * 适合：
   * - 更复杂的流程
   * - 需要明确每个步骤
   */
  const prompt = PromptTemplate.fromTemplate(
    "将以下文本翻译成{language}：\n\n{text}"
  );

  const sequence = RunnableSequence.from([
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result3 = await sequence.invoke({
    language: "英文",
    text: "今天天气真好",
  });

  console.log("翻译结果：" + result3);

  // ========================================
  // 示例 4：多步骤链 - 翻译 → 总结 → 改写
  // ========================================
  console.log("\n\n📝 示例 4：多步骤处理");
  console.log("-".repeat(50));

  /**
   * 场景：一篇文章需要经过多个处理步骤
   * 
   * 步骤：
   * 1. 翻译成中文
   * 2. 总结要点
   * 3. 改写成简单语言
   */

  // 步骤 1：翻译
  const translatePrompt = PromptTemplate.fromTemplate(
    "将以下文本翻译成中文：\n\n{text}"
  );

  // 步骤 2：总结
  const summarizePrompt = PromptTemplate.fromTemplate(
    "用 3 个要点总结以下内容：\n\n{text}"
  );

  // 步骤 3：改写
  const simplifyPrompt = PromptTemplate.fromTemplate(
    "用小学生能懂的语言改写以下内容：\n\n{text}"
  );

  const originalText = "LangChain is a framework for developing applications powered by language models. It provides a standardized interface for chains, agents, and memory.";

  console.log("原文：");
  console.log(originalText);
  console.log("\n" + "-".repeat(50));

  // 执行步骤 1：翻译
  console.log("\n步骤 1：翻译成中文");
  const step1Chain = translatePrompt.pipe(model).pipe(new StringOutputParser());
  const translated = await step1Chain.invoke({ text: originalText });
  console.log(translated);

  // 执行步骤 2：总结
  console.log("\n步骤 2：总结要点");
  const step2Chain = summarizePrompt.pipe(model).pipe(new StringOutputParser());
  const summarized = await step2Chain.invoke({ text: translated });
  console.log(summarized);

  // 执行步骤 3：改写
  console.log("\n步骤 3：改写成简单语言");
  const step3Chain = simplifyPrompt.pipe(model).pipe(new StringOutputParser());
  const simplified = await step3Chain.invoke({ text: summarized });
  console.log(simplified);

  console.log("\n✅ 示例完成！");
  console.log("💡 关键点：");
  console.log("   - pipe() 可以串联模板、模型、解析器");
  console.log("   - RunnableSequence 显式定义链");
  console.log("   - StringOutputParser 提取字符串内容");
  console.log("   - 多步骤链可以实现复杂处理流程");
  console.log("\n下一步：运行 npm run agent 学习智能代理");
}

main().catch(console.error);
