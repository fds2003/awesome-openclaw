# GSC 热门查询 — 页面与标题/描述优化清单

基于 Google Search Console「热门查询」（近 3 个月）整理的落地页与 title/description 优化建议，便于直接改站内并提升点击率。

---

## 一、热门查询与对应页面

| 查询 | 点击 | 展示 | 建议主落地页 |
|------|------|------|--------------|
| openclaw 中文网站 | 1 | 1 | 首页 `/` |
| openclaw 飞书流式输出 streaming | 0 | 1 | 第9章 多平台集成（飞书） |
| kimi claw lark 集成 | 0 | 1 | 第9章 多平台集成（飞书/Lark） |
| openclaw 飞书流式输出 | 0 | 1 | 第9章 多平台集成（飞书） |
| openclaw 飞书多agent | 0 | 1 | 第9章 多平台集成（飞书 · 多 Agent） |

---

## 二、按页面列出的优化项

### 1. 首页 `/`（对应：openclaw 中文网站）

**当前（index.md）**

- **title**: `OpenClaw 中文教程首页`
- **description**: `OpenClaw（龙虾/大龙虾）从零上手：安装配置、飞书企微接入、Skills 扩展、知识库与自动化，70+ 实战案例，最全中文教程与命令速查。`

**建议**

- **title**：在保留「OpenClaw 中文」的前提下，可略强化「网站/教程」以贴合「openclaw 中文网站」检索意图，例如：  
  `OpenClaw 中文网站 | 从零上手教程（飞书/企微/Skills）`  
  或保持现有亦可，已有一次点击。
- **description**：保持现状即可；若想更贴「中文网站」，可在句首加一句：  
  `OpenClaw 中文网站与教程：…`（其余不变）。
- **canonical**：保持根路径 `https://claw.oucloud.top/`。

---

### 2. 第9章 多平台集成 `/docs/03-advanced/09-multi-platform-integration/`

**对应查询**：openclaw 飞书流式输出、openclaw 飞书流式输出 streaming、openclaw 飞书多agent、kimi claw lark 集成。

**当前**

- 无独立 front matter，标题由首行 `# 第9章 多平台集成` 生成，多为「第9章 多平台集成」或类似。
- 正文已包含：飞书 Bot、流式输出、多 Agent、Lark（飞书国际版）相关内容。

**建议**

- **title**（在 09 的 front matter 或模板中设置）：  
  `OpenClaw 飞书/企微/钉钉/QQ 接入教程（含流式输出与多 Agent）`  
  或较短：  
  `OpenClaw 飞书配置与流式输出、多 Agent 配置`
- **description**（约 150 字内）：  
  `OpenClaw 飞书 Bot 配置步骤、流式输出（streaming）设置、多 Agent 配置与 Lark 集成说明。含企微、钉钉、QQ 接入，最全中文教程。`
- **canonical**：  
  `https://claw.oucloud.top/docs/03-advanced/09-multi-platform-integration/`

**实施方式**：在 `docs/03-advanced/09-multi-platform-integration.md` 顶部增加 front matter，例如：

```yaml
---
title: OpenClaw 飞书/企微/钉钉/QQ 接入（流式输出与多 Agent）
description: OpenClaw 飞书 Bot 配置、流式输出(streaming)与多 Agent 配置，Lark 集成说明。含企微、钉钉、QQ 接入，最全中文教程。
---
```

（若项目用 Eleventy 且标题由首行 H1 生成，可保留 H1 不变，仅用 front matter 的 `title`/`description` 覆盖 SEO 输出。）

---

### 3. 飞书配置检查清单 `/docs/03-advanced/feishu-checklist/`

**当前**：标题多为「飞书Bot配置检查清单」，无独立 description。

**建议**

- **title**：  
  `OpenClaw 飞书 Bot 配置检查清单（创建应用、流式、多 Agent）`
- **description**：  
  `OpenClaw 飞书机器人配置步骤检查清单：创建应用、权限、流式输出与多 Agent 配置，避免常见问题。`
- **canonical**：  
  `https://claw.oucloud.top/docs/03-advanced/feishu-checklist/`

---

### 4. 「kimi claw lark 集成」说明

- 检索意图多为：Kimi、Claw（OpenClaw）、Lark（飞书国际版）一起用或集成方式。
- 本站已有：OpenClaw + 飞书/Lark 接入（第9章）；Lark 与飞书同源，配置思路一致。

**建议**

- 在第9章「飞书」小节或文末加一句说明：  
  「Lark 为飞书国际版，配置方式与飞书一致，同一套 OpenClaw 飞书插件即可对接 Lark。」
- 若后续有单独「Kimi + OpenClaw」或「多产品集成」章节，可在该页 title/description 中加入「Kimi、Lark 集成」等词。

---

## 三、可选的站内锚点/小节标题

为便于长页内跳转和结果摘要，建议在第9章中保留或补充这些小节标题（与查询对应）：

- `## 飞书流式输出` 或 `## 流式输出（streaming）`
- `## 飞书多 Agent 配置` 或 `## 多 Agent 配置`
- 在飞书小节中一句带过「Lark（飞书国际版）集成方式同飞书」

---

## 四、实施顺序建议

| 优先级 | 操作 | 预期影响的查询 |
|--------|------|----------------|
| 1 | 为第9章增加 title/description（含「飞书」「流式输出」「多 Agent」） | 飞书流式输出、飞书多agent |
| 2 | 为飞书检查清单页增加 title/description | 飞书相关查询 |
| 3 | 首页 description 首句加「OpenClaw 中文网站」 | openclaw 中文网站 |
| 4 | 第9章内补充 Lark 一句说明 + 小节标题 | kimi claw lark 集成 |

---

## 五、改完后在 GSC 的验证

- **效果 → 网页**：看「第9章」「飞书」「首页」等 URL 的展示与点击是否提升。
- **效果 → 查询**：观察「openclaw 飞书流式输出」「openclaw 飞书多agent」等排名与 CTR 变化。
- **网址检查**：抽查上述 URL，确认 Google 抓到的 title/description 与 canonical 是否符合预期。

---

*数据来源：GSC 效果报告 — 热门查询（3 个月），claw.oucloud.top。*
