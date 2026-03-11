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
