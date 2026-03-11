# 文章目录

将写好的 **Markdown 文章** 放到本目录（`docs/articles/`），即可自动进入站点并对外提供访问。

## 流程

1. **写文章**：新建一个 `.md` 文件，放在本目录下。  
   - 至少保留一个一级标题（`# 标题`），正文随意。  
   - 可选：在文件开头手写 front matter（`layout`、`title`、`description`、`keywords`、`date`）。

2. **生成 SEO**（推荐）：在项目根目录执行  
   ```bash
   node scripts/article-seo.js docs/articles
   ```  
   或只处理单篇：  
   ```bash
   node scripts/article-seo.js docs/articles/你的文章.md
   ```  
   脚本会为每篇补全或生成：`layout`、`title`、`description`、`keywords`、`date`（未填时从正文首段和标题推断，并复用站点关键词）。

3. **构建与访问**：在项目根执行 `npm run build` 或 `npm start`。  
   - 文章会出现在 **网站「文章」页**：`/docs/articles/`  
   - 单篇文章地址形如：`/docs/articles/你的文章/`

## 说明

- 本目录下的 `index.md` 是文章列表页，请勿改名或删除。  
- 列表按 **日期倒序**；未写 `date` 时由脚本用当天日期补全。  
- 新文章放入后记得运行一次 `node scripts/article-seo.js docs/articles`，再构建，即可在站内展示并参与 SEO。
