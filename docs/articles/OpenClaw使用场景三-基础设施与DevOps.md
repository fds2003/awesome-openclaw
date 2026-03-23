---
layout: default
title: OpenClaw 使用场景（三）：基础设施与 DevOps
description: 用 n8n Webhook 把凭证隔离在可视化工作流里，以及家庭服务器自愈巡检类 OpenClaw 场景导读。
keywords: OpenClaw, n8n, DevOps, Webhook, 家庭服务器, SSH, 自动化运维, 龙虾教程
date: 2026-03-23
---

# OpenClaw 使用场景（三）：基础设施与 DevOps

> **本篇适合谁**：已经会一点运维、希望 **Agent 不直接碰密钥** 或希望家里 NAS/树莓派有个「常驻巡检员」的读者。  
> **系列导航**：[全景导读](OpenClaw使用场景全景-40个真实案例导读/) · （一）[社交媒体](OpenClaw使用场景一-社交媒体/) · （二）[创意与构建](OpenClaw使用场景二-创意与构建/) · （四）[生产力](OpenClaw使用场景四-生产力/) · （五）[研究学习](OpenClaw使用场景五-研究与学习/) · （六）[金融](OpenClaw使用场景六-金融与交易/)

---

## 一、这一类场景的核心思路

1. **n8n 编排**：敏感凭据留在 n8n，OpenClaw 只调 **Webhook**，集成可视化、可锁定、可审计。  
2. **自愈型家庭服务器**：长期运行的 Agent + SSH + 定时任务，对常见故障做自动修复或告警。

---

## 二、两大场景速览

| 场景 | 一句话价值 | 社区原文 |
|------|------------|----------|
| **n8n Workflow Orchestration** | API 调用委托给 n8n，Agent 不直接接触密钥 | [n8n-workflow-orchestration.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/n8n-workflow-orchestration.md) |
| **Self-Healing Home Server** | 常驻基础设施助手：SSH、cron、跨家庭网络自愈 | [self-healing-home-server.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/self-healing-home-server.md) |

---

## 三、安全提醒（比别的类更重要）

- **SSH 密钥与权限**：最小权限原则，生产与家庭网络建议分账户、分密钥。  
- **自动修复脚本**：先在沙箱/ staging 验证，避免「自愈变自毁」。  
- 更多安全配置见本教程 [安全指南](/docs/03-advanced/99-security-guide/)。

---

## 四、延伸阅读

- [API 集成](/docs/03-advanced/10-api-integration/) · [高级配置](/docs/03-advanced/11-advanced-configuration/)
