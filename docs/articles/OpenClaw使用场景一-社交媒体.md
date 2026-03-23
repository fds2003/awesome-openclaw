---
layout: default
title: OpenClaw 使用场景（一）：社交媒体
description: Reddit/YouTube 每日摘要、X 账户分析、多源科技资讯、TweetClaw 自动化等 5 类 OpenClaw 社交媒体场景，附社区文档链接与上手提示。
keywords: OpenClaw, 社交媒体, Reddit, YouTube, X, Twitter, 资讯摘要, 龙虾教程, Skills
date: 2026-03-23
---

# OpenClaw 使用场景（一）：社交媒体

> **本篇适合谁**：信息源多、不想每天手动刷 Reddit/YouTube/X，又希望用**自然语言**定制「看什么、怎么总结、何时推送」的读者。  
> **系列导航**：[全景导读](OpenClaw使用场景全景-40个真实案例导读/) · （二）[创意与构建](OpenClaw使用场景二-创意与构建/) · （三）[DevOps](OpenClaw使用场景三-基础设施与DevOps/) · （四）[生产力](OpenClaw使用场景四-生产力/) · （五）[研究学习](OpenClaw使用场景五-研究与学习/) · （六）[金融](OpenClaw使用场景六-金融与交易/)

---

## 一、这一类场景解决什么问题？

- **信息过载**：订阅多、通知乱，容易错过真正关心的创作者与话题。  
- **平台分析浅**：官方统计多、**定性总结少**（例如「什么内容更容易爆」）。  
- **跨源聚合难**：RSS、X、GitHub、搜索要分别打开。

OpenClaw 的做法通常是：**定时拉取 → 用 Skill 读内容 → 按你的规则摘要 → 推到飞书/Telegram/邮件等你已接入的渠道**。

---

## 二、五大场景速览

| 场景 | 一句话价值 | 社区原文 |
|------|------------|----------|
| **Daily Reddit Digest** | 按你关注的 subreddit 做每日热门摘要，并可结合记忆迭代偏好 | [daily-reddit-digest.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/daily-reddit-digest.md) |
| **Daily YouTube Digest** | 订阅频道新视频 + 字幕要点摘要，减少「漏看」 | [daily-youtube-digest.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/daily-youtube-digest.md) |
| **X Account Analysis** | 对账号做定性分析（爆款模式、话题互动等），不仅是数字 | [x-account-analysis.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/x-account-analysis.md) |
| **Multi-Source Tech News Digest** | 多源（RSS/X/GitHub/搜索等）科技资讯聚合与质量打分 | [multi-source-tech-news-digest.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/multi-source-tech-news-digest.md) |
| **X/Twitter Automation** | 发推、回复、点赞、抽奖监控等（常依赖 TweetClaw 等插件） | [x-twitter-automation.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/x-twitter-automation.md) |

---

## 三、上手建议（极简版）

1. **先定一个「主战场」**：只做一个 Digest 或只做一个分析，跑通再扩展。  
2. **定时任务**：结合本教程 [自动化工作流](/docs/02-core-features/07-automation-workflow/) 理解心跳与定时。  
3. **X 相关**：务必阅读社区文档中的**账号隔离与 Cookie 安全**说明，避免主号风险。

---

## 四、和本教程怎么衔接？

- 国内读者多走 **飞书/企微**：把「摘要推送」落到 [第9章 多平台集成](/docs/03-advanced/09-multi-platform-integration/)。  
- **装 Skill**：参考 [Skills 扩展](/docs/03-advanced/08-skills-extension/) 与 [ClawHub](https://clawhub.ai)。

---

## 五、免责声明

场景中所列第三方 Skill、插件及 API **非本教程站审计**；使用前请自行评估安全与合规。详见 [全景导读](OpenClaw使用场景全景-40个真实案例导读/) 安全章节。
