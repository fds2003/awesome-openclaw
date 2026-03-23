const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

/** 《使用场景》系列在文章列表中的固定顺序（全景 → 一至六），不依赖 date，避免线上列表乱序 */
const OPENCLAW_SCENARIO_SLUGS = [
  "OpenClaw使用场景全景-40个真实案例导读",
  "OpenClaw使用场景一-社交媒体",
  "OpenClaw使用场景二-创意与构建",
  "OpenClaw使用场景三-基础设施与DevOps",
  "OpenClaw使用场景四-生产力",
  "OpenClaw使用场景五-研究与学习",
  "OpenClaw使用场景六-金融与交易",
];

function articleSlug(page) {
  const p = (page.inputPath || "").replace(/\\/g, "/");
  return path.basename(p, ".md");
}

function scenarioListIndex(page) {
  const i = OPENCLAW_SCENARIO_SLUGS.indexOf(articleSlug(page));
  return i === -1 ? null : i;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // 文章集合：docs/articles/ 下的 .md，排除 index.md；《使用场景》系列固定顺序，其余按日期倒序
  eleventyConfig.addCollection("articles", function (collectionApi) {
    const all = collectionApi.getAll();
    const norm = (p) => (p.inputPath || "").replace(/\\/g, "/");
    const articles = all.filter(
      (p) => norm(p).includes("docs/articles") && !norm(p).endsWith("index.md") && !norm(p).endsWith("README.md")
    );
    return articles.sort((a, b) => {
      const ia = scenarioListIndex(a);
      const ib = scenarioListIndex(b);
      const aIn = ia !== null;
      const bIn = ib !== null;
      if (aIn && bIn) return ia - ib;
      if (aIn && !bIn) return -1;
      if (!aIn && bIn) return 1;
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  });

  // 为内容中的图片添加懒加载与异步解码，利于 LCP/移动端性能（SEO 框架：产品体验 90+）
  eleventyConfig.addTransform("imgLazy", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    return content.replace(
      /<img(\s)(?![^>]*\bloading=)/gi,
      "<img$1loading=\"lazy\" decoding=\"async\" "
    );
  });

  // Sitemap 日期格式 YYYY-MM-DD
  eleventyConfig.addFilter("sitemapDate", (date) => {
    if (!date) return "2026-01-01";
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? "2026-01-01" : d.toISOString().slice(0, 10);
  });

  // JSON-LD / SEO 用 YYYY-MM-DD（Nunjucks 无 htmlDateString）
  eleventyConfig.addFilter("seoDate", (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  });

  // 直接复制到输出目录
  eleventyConfig.addPassthroughCopy("search-index.json");
  eleventyConfig.addPassthroughCopy("search-index-expanded.json");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("googlea535c453d9fb9a0b.html");
  eleventyConfig.addPassthroughCopy("BingSiteAuth.xml");
  eleventyConfig.addPassthroughCopy("baidu_verify_codeva-8m6t0H0SUb.html");
  eleventyConfig.addPassthroughCopy("docs/images");

  // 使用 Nunjucks 处理 Markdown 中的 Liquid 布局名（保留 layout: default）
  eleventyConfig.setLibrary("md", require("markdown-it")({ html: true }));

  // 排除与 Jekyll 一致，不参与构建
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("Gemfile");
  eleventyConfig.ignores.add("Gemfile.lock");
  eleventyConfig.ignores.add("*.sh");
  eleventyConfig.ignores.add("scripts");
  eleventyConfig.ignores.add("backups");
  eleventyConfig.ignores.add("dev-docs");  // 开发/内部文档，不参与站点构建
  eleventyConfig.ignores.add(".cursor");   // Cursor/ECC 规则与技能，不参与站点构建
  eleventyConfig.ignores.add(".claude");
  eleventyConfig.ignores.add(".vscode");
  eleventyConfig.ignores.add(".git");
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("vendor");
  eleventyConfig.ignores.add("_layouts");
  eleventyConfig.ignores.add("preview.html");
  eleventyConfig.ignores.add("_config.yml");
  eleventyConfig.ignores.add("search-index.json");
  eleventyConfig.ignores.add("search-index-expanded.json");
  // 排除各类报告/总结 md，只保留主站内容
  [
    "SEO.md", "PROJECT-SUMMARY.md", "PROGRESS.md", "CHANGELOG.md", "NODE-MIGRATION.md"
  ].forEach((name) => eleventyConfig.ignores.add(name));
  eleventyConfig.ignores.add("ALL-*.md");
  eleventyConfig.ignores.add("CHAPTER-*.md");
  eleventyConfig.ignores.add("*-COMPLETED.md");
  eleventyConfig.ignores.add("*-REPORT.md");
  eleventyConfig.ignores.add("*-SUMMARY.md");
  eleventyConfig.ignores.add("*-FIXES.md");
  eleventyConfig.ignores.add("*-FIX.md");
  eleventyConfig.ignores.add("*-PLAN.md");
  eleventyConfig.ignores.add("demo.md");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "",
  };
};
