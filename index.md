---
layout: default
title: OpenClaw 中文教程首页
description: OpenClaw（龙虾/大龙虾）从零上手：安装配置、飞书企微接入、Skills 扩展、知识库与自动化，70+ 实战案例，最全中文教程与命令速查。
---

# 🦞 一本书玩转 OpenClaw：超级个体实战指南

> 龙虾 / 大龙虾 Claw 从零到上手：OpenClaw 中文教程，安装配置、飞书接入、Skills 扩展与实战案例，打造你的 AI 助手。

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-2026.3.8-orange.svg)](https://openclaw.ai)

---

## 📝 最新文章

更多内容见 [文章列表](docs/articles/)：

| 文章 | 简介 |
|------|------|
| [OpenClaw 企业微信：自动销售接待解决方案](docs/articles/OpenClaw企业微信：自动销售接待解决方案/) | 7×24 智能接待、线索入 CRM、预约与人工转接 |
| [OpenClaw 在微信平台的应用场景与接入方案](docs/articles/OpenClaw在微信平台的应用场景与接入方案/) | 微信生态应用场景与合规接入方案对比 |

---

## 🎯 新手快速通道

根据你的情况选择路径：

**有 Mac 电脑**：
1. [第1章：认识 OpenClaw](docs/01-basics/01-introduction/) — 了解它能做什么
2. [第2章：Mac 本地部署](docs/01-basics/02-installation/#mac本地部署推荐) — 一行命令安装
3. [第9章：接入飞书](docs/03-advanced/09-multi-platform-integration/#91-飞书bot配置) — 手机随时对话
4. [第3章：快速上手](docs/01-basics/03-quick-start/) — 发送第一条消息

**没有 Mac / 想 24 小时运行**：
1. [第1章：认识 OpenClaw](docs/01-basics/01-introduction/) — 了解它能做什么
2. [第2章：云端部署](docs/01-basics/02-installation/#云端一键部署) — 5 分钟完成
3. [第9章：接入飞书](docs/03-advanced/09-multi-platform-integration/#91-飞书bot配置) — 手机随时对话
4. [第3章：快速上手](docs/01-basics/03-quick-start/) — 发送第一条消息

---

## 🚨 版本升级重要提示

### ⚠️ 2026.3.7 版本：Gateway认证要求（Breaking Change）

**OpenClaw 2026.3.7 Breaking Change**：Gateway认证现在要求显式设置 `gateway.auth.mode`。你必须明确选择 `token` 或 `password` 认证方式，不再有「无认证」的默认选项。

**配置方法**：

在 `~/.openclaw/openclaw.json` 中添加以下配置：

```json
{
  "gateway": {
    "auth": {
      "mode": "token",  // 或 "password"
      "token": "your-secret-token"
    }
  }
}
```

**⚠️ 重要提示**：如果你从旧版本升级到 v2026.3.7 且没有配置认证，Gateway将拒绝启动。

**快速修复（命令行）**：

```bash
# 设置token认证
openclaw config set gateway.auth.mode token
openclaw config set gateway.auth.token "your-secret-token"

# 重启Gateway
openclaw gateway restart
```

---

### 🔧 2026.3.2 版本：AI变"哑巴"了？

**问题现象**：升级到 2026.3.2 后，OpenClaw只能聊天不能干活（文件管理、命令执行等工具功能全部失效）

**问题原因**：该版本将工具权限和聊天能力做了隔离，默认 profile 改为 `messaging`（纯聊天模式）

**5种 profile 说明**：

| Profile | 功能说明 |
|---------|---------|
| `messaging` | 只能发消息、管理会话（光聊天不干活） |
| `default` | 默认工具集（不含命令执行） |
| `coding` | 编程相关工具 |
| `full` | 完整工具集，包含命令执行（**推荐**） |
| `all` | 所有工具全开 |

**快速修复方法**：

#### 方法1：命令行修复（推荐）

适用于：有命令行环境（本地/虚拟机/云服务器）

```bash
# 查看当前profile
openclaw config get tools

# 如果不是full，切换为full
openclaw config set tools.profile full

# 重启Gateway生效
openclaw gateway restart
```

#### 方法2：Web UI修复（无需编程）

适用于：不方便使用编程工具的环境（手机版等）

1. 访问 `http://127.0.0.1:18789`（或你的服务器IP）
2. 点击左侧「配置」
3. 切换到 **Raw** 格式
4. 找到 `tools` 配置项
5. 将 `profile` 改为 `"full"`

```json
{
  "tools": {
    "profile": "full"
  }
}
```

6. 保存配置并重启Gateway

---

## 📖 关于本教程

> ⚠️ **版本说明**：本教程基于 **OpenClaw 2026.3.8** 版本编写（已验证）。

> 💡 **重要前提**：OpenClaw 预装了 **49 个内置技能（Skills）**，开箱即用，无需额外安装即可完成本教程大部分演示。

| 内容 | 数量 |
|------|------|
| 正文章节 | 15 章，约 267,000 字 |
| 基础附录 | 6 个（A-F），约 86,000 字 |
| 高级附录 | 8 个（G-N），约 65,000 字 |
| 安全指南 | 1 个，约 15,000 字 |
| 实战案例 | 70+ 个，可直接复用 |
| 配置截图 | 50+ 张，手把手教学 |
| 命令参考 | 100+ 条，完整速查表 |

---

## 📚 教程目录

### 第一部分：零基础入门

| 章节 | 核心内容 |
|------|---------|
| [第1章：认识 OpenClaw](docs/01-basics/01-introduction/) | OpenClaw 是什么、能做什么、和 ChatGPT 的区别 |
| [第2章：环境搭建](docs/01-basics/02-installation/) | Mac/Windows/Linux 本地部署、云端一键部署、Docker 部署 |
| [第3章：快速上手](docs/01-basics/03-quick-start/) | 第一次对话、10 个常用命令、人设配置、模型选择 |

### 第二部分：4 大核心功能

| 章节 | 核心内容 |
|------|---------|
| [第4章：本地文件管理](docs/02-core-features/04-file-management/) | 智能搜索、批量处理、自动整理、硬盘清理 |
| [第5章：个人知识库](docs/02-core-features/05-knowledge-management/) | 网页剪藏、PDF 解析、GitHub 追踪、跨设备同步 |
| [第6章：日程管理](docs/02-core-features/06-schedule-management/) | 截图识别、日历创建、批量导入、智能提醒 |
| [第7章：自动化工作流](docs/02-core-features/07-automation-workflow/) | 定时任务、网站监控、AI 日报、循环任务 |

### 第三部分：进阶技能

| 章节 | 核心内容 |
|------|---------|
| [第8章：Skills 扩展](docs/03-advanced/08-skills-extension/) | ClawHub 市场、必装 Top10、Skills 双幻神、自定义开发 |
| [第9章：多平台集成](docs/03-advanced/09-multi-platform-integration/) | 飞书、企微、钉钉、QQ 接入；多机器人、多 Agent 配置 |
| [第10章：API 服务集成](docs/03-advanced/10-api-integration/) | AI 绘图、Notion 同步、视频生成、语音合成 |
| [第11章：高级配置](docs/03-advanced/11-advanced-configuration/) | 多模型切换、成本优化、性能调优 |

### 第四部分：实战案例

| 章节 | 核心内容 |
|------|---------|
| [第12章：5 类人群效率提升](docs/04-practical-cases/12-personal-productivity/) | 知识工作者、程序员、创作者、学生、超级个体实战 |
| [第13章：高级自动化工作流](docs/04-practical-cases/13-advanced-automation/) | 多 Skills 组合、知识图谱、Coding Agent、多 Agent 头脑风暴 |
| [第14章：创意应用探索](docs/04-practical-cases/14-creative-applications/) | AI 绘画、视频脚本、多语言翻译、数据分析 |
| [第15章：超级个体实战](docs/04-practical-cases/15-solo-entrepreneur-cases/) | 一人公司运营、自由职业、个人品牌、成本控制 |

### 附录：速查手册

#### 基础附录（A-F）
| 附录 | 内容 |
|------|------|
| [附录A：命令速查表](appendix/A-command-reference/) | 100+ 常用命令，5 大类快速查找 |
| [附录B：必装 Skills 清单](appendix/B-skills-catalog/) | Top10 必装技能，附安装教程 |
| [附录C：API 服务商对比](appendix/C-api-comparison/) | 10+ 服务商价格对比，帮你省钱 |
| [附录D：社区资源导航](appendix/D-community-resources/) | 官方文档、视频教程、交流群 |
| [附录E：常见问题速查](appendix/E-common-problems/) | 安装/API/Skills/性能问题解决 |
| [附录F：避坑指南与最佳实践](appendix/F-best-practices/) | 新手必看，前人经验总结 |

#### 高级附录（G-N）
| 附录 | 内容 |
|------|------|
| [附录G：文档链接验证](appendix/G-links-validation/) | 所有链接状态检查 |
| [附录H：配置文件模板](appendix/H-config-templates/) | 开箱即用的配置示例 |
| [附录I：思考题参考答案](appendix/I-thinking-questions-answers/) | 各章节思考题详解 |
| [附录J：飞书配置检查清单](appendix/J-feishu-checklist/) | 确保飞书Bot配置完整，避免常见问题 |
| [附录K：API Key 配置完整指南](appendix/K-api-key-config-guide/) | 多种API Key配置方式详解 |
| [附录L：配置文件结构完整指南](appendix/L-config-file-structure/) | 全局配置、Agent配置、认证配置详解 |
| [附录M：搜索功能使用指南](appendix/M-search-guide/) | 搜索功能使用技巧和常见问题 |
| [附录N：Skills 生态说明](appendix/N-skills-ecosystem/) | 内置49个、官方93个、社区1715+个Skills介绍 |

#### 安全指南
| 附录 | 内容 |
|------|------|
| [安全指南](docs/03-advanced/99-security-guide/) | 安全模型、已知安全事件、Skills安全与最佳实践 |

---

## 💰 成本参考

| 方案 | 月费用 | 适用场景 |
|------|--------|---------|
| 本地部署（有 Mac） | 0 元 | 隐私优先，功能最全 |
| 云端（火山引擎） | 9.9 元起 | 飞书用户首选 |
| 云端（腾讯云） | 20 元起 | 新手推荐 |
| API（DeepSeek） | 5—30 元 | 日常使用，性价比最高 |
| API（Kimi） | 10—50 元 | 长文档处理 |

💡 使用国产大模型（DeepSeek、Kimi）可节省 **50%—70%** 成本。

---

## 🔗 官方资源

- [OpenClaw 官网](https://openclaw.ai)
- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [ClawHub 技能市场](https://clawhub.ai)

---

## 💖 支持项目

如果这个教程对你有帮助：
- ⭐ 给项目点个 Star
- 🔄 分享给需要的人
- 💬 提交 Issue 反馈问题
- 🤝 贡献你的经验和案例

---

<div align="center">
  <p>🎉 完全免费 | 持续更新 | 社区驱动 🎉</p>
  <p>🚀 一个人 + OpenClaw = 无限可能 🚀</p>
</div>

**最后更新**：2026年3月10日
**教程版本**：v1.5
**总字数**：418,000字（正文267,000字 + 附录151,000字）
**章节数**：15章正文 + 14个附录 + 1个安全指南
**适用 OpenClaw 版本**：2026.3.7（推荐稳定版）
