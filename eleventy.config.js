const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // 直接复制到输出目录
  eleventyConfig.addPassthroughCopy("search-index.json");
  eleventyConfig.addPassthroughCopy("search-index-expanded.json");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("docs/images");

  // 使用 Nunjucks 处理 Markdown 中的 Liquid 布局名（保留 layout: default）
  eleventyConfig.setLibrary("md", require("markdown-it")({ html: true }));

  // 排除与 Jekyll 一致，不参与构建
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("Gemfile");
  eleventyConfig.ignores.add("Gemfile.lock");
  eleventyConfig.ignores.add("*.sh");
  eleventyConfig.ignores.add("backups");
  eleventyConfig.ignores.add(".claude");
  eleventyConfig.ignores.add(".vscode");
  eleventyConfig.ignores.add(".git");
  eleventyConfig.ignores.add("node_modules");
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
