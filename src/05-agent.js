/**
 * ============================================
 * 示例 5：Agent 智能代理
 * ============================================
 * 
 * 学习目标：
 * - 什么是 Agent
 * - 如何定义 Tool（工具）
 * - 如何让 AI 自主决定调用哪个工具
 */

import { ChatZhipuAI } from "@langchain/community/chat_models/zhipu";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { DynamicTool } from "@langchain/core/tools";
import * as dotenv from "dotenv";

dotenv.config();

const model = new ChatZhipuAI({
  model: "glm-4-flash",
  temperature: 0,
});

/**
 * 主函数
 */
async function main() {
  console.log("🤖 Agent 智能代理示例");
  console.log("=".repeat(50));

  // ========================================
  // 步骤 1：定义工具（Tools）
  // ========================================
  console.log("\n📝 步骤 1：定义工具");
  console.log("-".repeat(50));

  /**
   * Tool：给 Agent 用的工具
   * 
   * Agent 可以根据用户问题，自主决定：
   * - 是否需要调用工具
   * - 调用哪个工具
   * - 如何使用工具的结果
   */

  // 工具 1：计算器
  const calculatorTool = new DynamicTool({
    name: "calculator",
    description: "用于数学计算。输入应该是一个数学表达式，如 '2 + 2' 或 '10 * 5'",
    func: async (input: string) => {
      console.log(`  🔧 调用计算器：${input}`);
      try {
        // 注意：eval 有安全风险，生产环境不要用
        const result = eval(input);
        return `计算结果是：${result}`;
      } catch (e) {
        return "计算错误，请检查表达式";
      }
    },
  });

  // 工具 2：天气查询（模拟）
  const weatherTool = new DynamicTool({
    name: "weather",
    description: "查询城市天气。输入城市名称，如 '北京' 或 '上海'",
    func: async (input: string) => {
      console.log(`  🔧 查询天气：${input}`);
      
      // 模拟天气数据
      const weatherData: Record<string, string> = {
        "北京": "晴天，温度 15°C",
        "上海": "多云，温度 18°C",
        "深圳": "小雨，温度 22°C",
      };
      
      const weather = weatherData[input] || "未找到该城市的天气信息";
      return `${input}的天气：${weather}`;
    },
  });

  // 工具 3：单位转换
  const converterTool = new DynamicTool({
    name: "unit_converter",
    description: "单位转换工具。输入格式：'数值 原单位 转 目标单位'，如 '100 千米 转 米'",
    func: async (input: string) => {
      console.log(`  🔧 单位转换：${input}`);
      
      // 简单的单位转换逻辑
      if (input.includes("千米") && input.includes("米")) {
        const match = input.match(/(\d+)/);
        if (match) {
          const value = parseInt(match[1]);
          return `${value} 千米 = ${value * 1000} 米`;
        }
      }
      
      if (input.includes("公斤") && input.includes("克")) {
        const match = input.match(/(\d+)/);
        if (match) {
          const value = parseInt(match[1]);
          return `${value} 公斤 = ${value * 1000} 克`;
        }
      }
      
      return "暂不支持这种转换";
    },
  });

  const tools = [calculatorTool, weatherTool, converterTool];

  console.log("已定义 3 个工具：");
  console.log("  - calculator：计算器");
  console.log("  - weather：天气查询");
  console.log("  - unit_converter：单位转换");

  // ========================================
  // 步骤 2：创建 Agent
  // ========================================
  console.log("\n\n📝 步骤 2：创建 Agent");
  console.log("-".repeat(50));

  /**
   * Agent：智能代理
   * 
   * 创建方式有多种：
   * - createOpenAIFunctionsAgent：使用 function calling
   * - createReactAgent：使用 ReAct 模式
   * 
   * 这里使用 OpenAI Functions 方式（智谱也支持）
   */

  // 拉取预定义的 prompt（包含 agent 的系统提示）
  const prompt = await pull("hwchase17/openai-functions-agent");

  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools: tools,
    prompt: prompt,
  });

  // ========================================
  // 步骤 3：创建 AgentExecutor
  // ========================================
  console.log("\n📝 步骤 3：创建 AgentExecutor");
  console.log("-".repeat(50));

  /**
   * AgentExecutor：Agent 执行器
   * 
   * 负责：
   * - 执行 agent
   * - 管理工具调用
   * - 处理循环直到完成任务
   */
  const agentExecutor = new AgentExecutor({
    agent: agent,
    tools: tools,
    verbose: false,  // 设为 true 可以看到详细过程
  });

  // ========================================
  // 步骤 4：测试 Agent
  // ========================================
  console.log("\n📝 步骤 4：测试 Agent");
  console.log("=".repeat(50));

  // 测试 1：需要计算
  console.log("\n测试 1：数学计算");
  console.log("-".repeat(50));
  const result1 = await agentExecutor.invoke({
    input: "帮我计算 123 * 456",
  });
  console.log("用户：帮我计算 123 * 456");
  console.log("AI：" + result1.output);

  // 测试 2：需要查天气
  console.log("\n\n测试 2：查询天气");
  console.log("-".repeat(50));
  const result2 = await agentExecutor.invoke({
    input: "北京今天天气怎么样？",
  });
  console.log("用户：北京今天天气怎么样？");
  console.log("AI：" + result2.output);

  // 测试 3：需要单位转换
  console.log("\n\n测试 3：单位转换");
  console.log("-".repeat(50));
  const result3 = await agentExecutor.invoke({
    input: "5 千米等于多少米？",
  });
  console.log("用户：5 千米等于多少米？");
  console.log("AI：" + result3.output);

  // 测试 4：不需要工具的普通对话
  console.log("\n\n测试 4：普通对话（不需要工具）");
  console.log("-".repeat(50));
  const result4 = await agentExecutor.invoke({
    input: "你好，请介绍一下你自己",
  });
  console.log("用户：你好，请介绍一下你自己");
  console.log("AI：" + result4.output);

  console.log("\n✅ 示例完成！");
  console.log("\n💡 关键点：");
  console.log("   - Agent 能自主决定是否调用工具");
  console.log("   - Tool 需要清晰的 name 和 description");
  console.log("   - AgentExecutor 管理 agent 的执行循环");
  console.log("   - 可以定义自己的工具（API、数据库等）");
  console.log("\n🎉 恭喜！你已经学完所有基础示例！");
  console.log("📚 下一步建议：");
  console.log("   - 尝试修改工具，添加自己的功能");
  console.log("   - 学习 RAG（检索增强生成）");
  console.log("   - 用 Next.js 做一个 Web 界面");
}

main().catch(console.error);
