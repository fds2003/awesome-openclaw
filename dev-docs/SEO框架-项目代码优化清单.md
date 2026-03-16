# SEO 框架 — 项目代码优化清单

围绕「关键词、外链/内链、产品体验」对本站（awesome-openclaw-tutorial）的代码级优化项与实施记录。目标：向 Google 证明网站价值，移动端性能争取 PageSpeed 90+。

---

## 一、关键词（一页一词、长尾包围主词）

### 1.1 已做

- 首页、第9章、飞书检查清单等关键页已设独立 `title`、`description`、`keywords`（见 [GSC 热门查询优化清单](./GSC热门查询-页面与标题描述优化清单.md)）。
- 全站与单页关键词在 `_data/site.json` 及 front matter 中配置。

### 1.2 建议持续做

- **新文档/新文章**：每页一个主关键词 + 若干长尾，在 front matter 写清 `title`、`description`、`keywords`。
- **避免多词争一页**：同一主词不要分散在多个 URL，用规范 canonical 指向首选 URL。
- 重要章节（安装、飞书、Skills、命令速查等）保持唯一且具体的 title/description，便于长尾匹配。

---

## 二、外链与内链

### 2.1 外链

- 代码无法「发外链」，需站外执行。可参考：[外链列表 Notion](https://potent-measure-31f.notion.site/14368f418f50804ba419d3ce7a333fa8?v=14368f418f508191a695000c6fcd329a)、提交 TAAFT 等（见 [新站 SEO 与 TAAFT 获客心得](./新站SEO与TAAFT获客心得.md)）。

### 2.2 内链（代码可做）

- **导航与入口**：`_includes/default.njk` 已含首页、安装、快速开始、命令速查等内链，保证关键节点可被爬虫与用户发现。
- **首页**：`index.md` 中「最新文章」「新手快速通道」等已链向核心章节与文章，利于权重传递与停留。
- **建议**：在长文档末尾或侧栏增加「相关章节」链接（如飞书章链向飞书检查清单、Skills 章链向命令速查），可后续在模板或 front matter 中加 `related` 列表并渲染。

---

## 三、产品体验（含移动端性能 90+）

### 3.1 已实施的代码优化

| 项 | 说明 | 位置 |
|----|------|------|
| **图片懒加载** | 内容中 `<img>` 自动加 `loading="lazy"`、`decoding="async"`，减轻首屏与移动端负担，利于 LCP/CLS | `eleventy.config.js` → transform `imgLazy` |
| **静态资源缓存** | JS/CSS/SVG/ico/字体等长期缓存（1 年），搜索索引 JSON 短期缓存（1 小时） | `vercel.json` → `headers` |
| **预连接** | 对 analytics 使用的 `esm.sh` 做 `preconnect`，减少第三方脚本延迟 | `_includes/default.njk` → `<link rel="preconnect" href="https://esm.sh">` |
| **首屏样式内联** | 主样式写在 layout 的 `<style>` 中，无首屏阻塞的外链 CSS | `_includes/default.njk` |
| **Analytics 异步** | 使用 `type="module"` 加载 Vercel Analytics，默认 defer，不阻塞解析 | `_includes/default.njk` |

### 3.2 建议你本地/部署后做的

- **用 PageSpeed 检测**：  
  [https://pagespeed.web.dev/](https://pagespeed.web.dev/) 输入 `https://claw.oucloud.top`，分别测桌面与移动端，目标各项 90+。
- **根据报告再优化**：若提示「 Largest Contentful Paint 」「 Cumulative Layout Shift 」等，可继续：
  - 首屏关键图若有，可加 `fetchpriority="high"`（本主题首屏图少，当前以懒加载为主即可）；
  - 外链图片（如教程内引用的图床）尽量用 HTTPS、合适尺寸，必要时在 Markdown 或模板里为重要图加宽高，减少 CLS。
- **移动端 viewport**：已在 layout 中设置 `viewport`、`theme-color`，无需改代码。

### 3.3 可选进阶

- 若后续引入外链 CSS/JS（如统计、评论）：尽量 `async`/`defer`，或放 `</body>` 前，避免阻塞首屏。
- 若新增大量图片：考虑用 Eleventy 的 Image 插件或构建阶段生成 srcset，进一步优化 LCP。

---

## 四、检查与发布流程建议

1. **内容/关键词**：新页或重要修改后，检查该页 front matter 的 `title`、`description`、`keywords` 是否符合「一页一词」与长尾策略。
2. **内链**：确认首页与导航是否链到新页；长文档是否可加 1～2 条「相关阅读」内链。
3. **性能**：部署后对主要 URL 跑 PageSpeed（含移动端），确保 90+，再根据建议迭代（图片、缓存、第三方脚本等）。

---

*与 [SEO 核心框架：关键词、外链与产品体验](./SEO核心框架-关键词外链与产品体验.md) 配套使用；代码改动以本清单为准。*
