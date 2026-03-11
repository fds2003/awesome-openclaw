# 迁移到 Node.js（Eleventy）说明

本站已支持用 **Eleventy (11ty)** 在 Node 环境下构建，无需 Ruby/Jekyll。

## 快速开始

```bash
# 安装依赖
npm install

# 构建静态站点到 _site
npm run build

# 本地预览（带热更新）
npm start
```

## 目录与配置

| 说明       | Jekyll        | Eleventy           |
|------------|----------------|---------------------|
| 配置       | `_config.yml`  | `_data/site.json` + `eleventy.config.js` |
| 布局       | `_layouts/default.html` (Liquid) | `_includes/default.njk` (Nunjucks) |
| 数据       | `site.xxx` 来自 _config | `site.xxx` 来自 `_data/site.json` |
| 输出       | `_site`        | `_site`（相同）     |
| 搜索索引   | 使用现有 `search-index.json` / `search-index-expanded.json`（复制到 _site） |

## 注意事项

1. **站点 URL**：在 `_data/site.json` 中填写 `url`、`baseurl`、`repository`，用于 SEO 与页脚链接。
2. **Jekyll 保留**：仍可继续用 `bundle exec jekyll serve` 构建；`_layouts/` 与 `_config.yml` 未删除。
3. **忽略列表**：`eleventy.config.js` 中已忽略 README、报告类 md 等，与 Jekyll 行为一致。

## 部署

将 `_site` 目录部署到任意静态托管（GitHub Pages、Netlify、Vercel 等）即可。

### 部署到 Vercel

1. 把本仓库推送到 GitHub，在 [Vercel](https://vercel.com) 里 **Import** 该仓库。
2. 无需改设置：项目根目录已有 `vercel.json`，会执行 `npm run build` 并发布 `_site`。
3. 部署完成后，在 **Settings → Environment Variables** 无需配置即可运行；若要做 SEO，在 `_data/site.json` 里把 `url` 改成你的 Vercel 域名（如 `https://xxx.vercel.app`），重新部署一次即可。
4. 自定义域名：在 Vercel 项目 **Settings → Domains** 里添加自己的域名。
