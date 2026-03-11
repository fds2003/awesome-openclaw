# 本站 SEO 说明与检查清单

本仓库已做基础 SEO 配置，便于搜索引擎收录与社交分享。部署后按下面步骤核对即可。

---

## 一、你需要在配置里完成的事

### 1. 填写站点地址（必做）

- **Eleventy**：在 **`_data/site.json`** 中把 `url` 改成你的真实访问地址（如 Vercel 域名）。
- **Jekyll**：在 **`_config.yml`** 中填写 `url`。

否则 canonical、sitemap、OG 链接都会错。

### 2. 修改 robots.txt 里的 Sitemap 地址

打开 **`robots.txt`**，把最后一行改成你的站点根地址：

```
Sitemap: https://你的域名/sitemap.xml
```

### 3. 可选：社交分享图与 Twitter

- **分享图**：在 `_config.yml` 里取消注释并填写 `image` 或 `og_image`，指向一张约 1200×630 的图片（如 `/assets/og-image.png`），用于微信/微博/推特等预览。
- **Twitter**：若有账号，填写 `twitter.username: 你的用户名`（不要带 `@`）。

---

## 二、已实现的 SEO 项

| 项目 | 说明 |
|------|------|
| **jekyll-seo-tag** | 自动输出每页的 title、meta description、canonical、Open Graph、Twitter Card |
| **jekyll-sitemap** | 构建时生成 `sitemap.xml`，需在 `_config.yml` 填好 `url` |
| **robots.txt** | 已添加，允许全站抓取；部署后记得改 Sitemap 那一行 |
| **Schema.org** | 全站输出 WebSite（含站内搜索），文档页输出 TechArticle |
| **语言与主题色** | `lang="zh-CN"`、`locale: zh_CN`、`theme-color` 已设，利于移动端与地域识别 |
| **sitemap.xml** | Eleventy 构建时由 `sitemap.xml.njk` 自动生成，包含全站页面；`_data/site.json` 的 `url` 为空时使用 `https://example.com` 作为 base |

---

## 三、部署后建议操作

1. **Google Search Console**  
   添加资源并提交 `sitemap.xml` 的 URL（如 `https://你的域名/sitemap.xml`）。
2. **Bing Webmaster Tools**  
   同样提交 sitemap，可选。
3. **检查效果**  
   - [Google 富媒体结果测试](https://search.google.com/test/rich-results) 输入首页或文档页 URL，看结构化数据是否正常。  
   - [Facebook 分享调试](https://developers.facebook.com/tools/debug/) 看 OG 标题、描述、图片是否正确。

---

## 四、已配置关键词（基于站内内容提取）

站点在 **`_data/site.json`**（Eleventy）或 **`_config.yml`**（Jekyll）中配置了以下关键词，来源于全站标题与核心章节：

| 类型 | 关键词 |
|------|--------|
| **品牌/热门** | 龙虾, 大龙虾, claw, openclaw, OpenClaw, OpenClaw教程, 龙虾教程 |
| **产品与能力** | AI助手, 飞书机器人, 飞书Bot, Skills, Gateway, ClawHub |
| **教程主题** | 安装配置, 快速上手, 文件管理, 知识库, 日程管理, 自动化工作流 |
| **进阶** | 多平台集成, 企微, 钉钉, API集成, 命令速查, 实战案例, 超级个体, 中文教程 |

- **全站 description** 已融入「龙虾 / 大龙虾 / 飞书 / 企微 / 知识库 / 自动化」等词，便于长尾搜索。
- 单页可在 front matter 中设置 `keywords:` 覆盖或补充。

**按内容可补充的页级关键词（可选）**：

| 页面/章节 | 建议补充关键词 |
|-----------|----------------|
| 第2章 环境搭建 | 安装教程, Mac 部署, 云端部署, Docker |
| 第4章 文件管理 | 本地文件, 读写文件, 搜索文件 |
| 第5章 知识库 | 知识管理, 网页存档, 笔记整理 |
| 第8章 Skills | ClawHub, 技能市场, 自定义 Skills |
| 第9章 多平台 | 飞书 Bot, 企业微信, 钉钉, QQ |
| 第10章 API | 绘图 API, Notion, 视频生成, 语音合成 |
| 附录A 命令速查 | openclaw 命令, 命令行 |
| 安全指南 | 安全配置, Gateway 认证 |

## 五、可选：每页独立描述与图片

在任意页的 front matter 里可写：

```yaml
---
title: 本页标题
description: 本页简短描述（建议 150 字内，用于搜索结果与分享）
keywords: "龙虾, openclaw, 本页相关词"   # 可选，不写则用站点的 keywords
image: /assets/本页分享图.png   # 可选
---
```

不写则使用站点默认的 `description`、`keywords` 和（若配置了）默认图。

---

## 六、简要检查清单

- [ ] `_config.yml` 中 `url` 已填写
- [ ] `robots.txt` 中 `Sitemap:` 已改为你的域名
- [ ] 部署后能访问 `/sitemap.xml`
- [ ] 部署后在 Search Console 提交了 sitemap
- [ ] （可选）配置了默认 `image` 或每页 `image` 用于分享

完成以上项后，本站的 SEO 基础即就绪，后续可专注内容与外链。

---

## 七、Google SEO 规范：Awesome OpenClaw Tutorial 推荐写什么

按 Google 搜索质量与 SEO 要求，本站适合重点做以下内容与优化。

### 1. 标题（Title）规范

- **长度**：中文约 25–35 字（或 50–60 字符），含主关键词且不堆砌。
- **首页**：建议包含「OpenClaw」「中文教程」及一个场景词（如「从零上手」「安装」）。已用：`OpenClaw 中文教程首页`，最终展示为「OpenClaw 中文教程首页 - Awesome OpenClaw Tutorial」。
- **内页**：每页唯一标题，如「OpenClaw 飞书接入教程」「OpenClaw 命令速查表」，便于区分与点击。

### 2. 描述（Meta Description）规范

- **长度**：约 150–160 字符（中文约 70–80 字），概括页面内容并带一点行动意图。
- **首页**：已写清「谁用、能做什么、有什么」（OpenClaw/龙虾、安装/飞书/Skills/实战/命令速查）。
- **内页**：每篇用 1–2 句说明「本章解决什么问题、读者能学到什么」，可自然带出「龙虾」「OpenClaw」「飞书」等词。

### 3. 推荐写的正文内容（满足搜索意图 + E-E-A-T）

| 类型 | 推荐内容 | 说明 |
|------|----------|------|
| **入门/安装** | 分平台步骤（Mac/Windows/云端）、常见报错与解决、版本选择建议 | 对应「OpenClaw 安装」「龙虾 教程」等检索 |
| **飞书/企微** | 从零配置、截图步骤、Bot 不回复/收不到消息等排查 | 对应「OpenClaw 飞书」「大龙虾 企微」 |
| **Skills** | 必装列表、ClawHub 使用、自己写 Skill 的 minimal 示例 | 对应「OpenClaw Skills」「ClawHub」 |
| **实战与案例** | 具体场景：日报、知识库、日程、自动化流程，带步骤与配置片段 | 体现经验、可操作，利于 E-E-A-T |
| **命令与速查** | 常用命令表、参数说明、与官方文档的对应关系 | 对应「OpenClaw 命令」「openclaw 命令行」 |
| **故障与升级** | 升级后不工作、Gateway 认证、profile 配置等，现象 + 原因 + 修复 | 对应「OpenClaw 升级」「龙虾 不回复」等 |

### 4. 页面结构建议（Google 友好）

- **H1**：每页一个，含本页主关键词（如「OpenClaw 飞书 Bot 配置」）。
- **H2/H3**：按逻辑分节，标题简洁、可扫读；避免用纯「第一节」而无主题词。
- **首段**：前 100–150 字概括本页要解决的问题和结论，便于摘要与理解。
- **内链**：相关章节互相链接（如「安装」连「快速上手」「飞书接入」），锚文字用关键词或描述性短语。

### 5. 已有优势与可加强点

- **已有**：全站关键词、description、sitemap、Schema.org、中文 locale、移动端适配；首页与全站描述已含「龙虾」「OpenClaw」「飞书」「实战」等。
- **可加强**：重要章节（安装、飞书、Skills、命令速查）补上唯一且具体的 `title` 与 `description`；适当增加「常见问题」「错误码/报错」类小节，便于长尾检索。

按上述规范写与改，既能更好满足 Google 对标题、描述、内容与结构的建议，又利于「OpenClaw 教程」「龙虾 大龙虾」等目标词的展现与点击。
