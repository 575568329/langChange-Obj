/**
 * ============================================
 * LangChain 入门示例 - 主入口
 * ============================================
 * 
 * 这个文件会依次运行所有示例，帮助你快速了解 LangChain 的核心功能
 */

import * as dotenv from "dotenv";
dotenv.config();

console.log("🦜 LangChain 入门项目");
console.log("=".repeat(50));

// 检查环境变量
if (!process.env.ZHIPU_API_KEY) {
  console.error("❌ 错误：请先配置 ZHIPU_API_KEY");
  console.log("📝 步骤：");
  console.log("   1. 复制 .env.example 为 .env");
  console.log("   2. 在 .env 中填入你的智谱 API Key");
  console.log("   3. 重新运行");
  process.exit(1);
}

console.log("✅ 环境变量已配置\n");

console.log("📚 可用示例：");
console.log("   npm run chat   - 基础对话");
console.log("   npm run memory - 带记忆的对话");
console.log("   npm run prompt - Prompt 模板");
console.log("   npm run chain  - Chain 链式调用");
console.log("   npm run agent  - Agent 智能代理");
console.log("\n先运行 npm run chat 开始第一个示例吧！🚀");
