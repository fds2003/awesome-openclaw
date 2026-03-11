#!/usr/bin/env node
/**
 * 为 docs/articles/ 下的 Markdown 文章自动补全或生成 SEO 用 front matter（title、description、keywords）。
 * 用法：node scripts/article-seo.js [文件或目录]
 * 示例：node scripts/article-seo.js docs/articles
 *       node scripts/article-seo.js docs/articles/我的文章.md
 */

const fs = require("fs");
const path = require("path");

const SITE_KEYWORDS =
  "龙虾, 大龙虾, claw, openclaw, OpenClaw, OpenClaw教程, 龙虾教程, AI助手, 飞书机器人, Skills, 安装配置, 快速上手, 实战案例, 中文教程";
const DEFAULT_LAYOUT = "default";
const DESC_MAX_LEN = 80;

function loadSiteKeywords() {
  const sitePath = path.join(__dirname, "..", "_data", "site.json");
  if (fs.existsSync(sitePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(sitePath, "utf-8"));
      if (data.keywords) return data.keywords;
    } catch (_) {}
  }
  return SITE_KEYWORDS;
}

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const front = match[1];
  const body = match[2];
  const data = {};
  const lines = front.split(/\r?\n/);
  let key = null;
  let valueLines = [];
  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (kv) {
      if (key) data[key] = valueLines.join("\n").trim() || kv[2];
      key = kv[1];
      valueLines = [kv[2]];
    } else if (key && (line.startsWith(" ") || line.startsWith("\t"))) {
      valueLines.push(line);
    } else if (key) {
      data[key] = valueLines.join("\n").trim();
      key = null;
      valueLines = [];
    }
  }
  if (key) data[key] = valueLines.join("\n").trim();
  return { data, body };
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s*/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

function firstParagraph(body) {
  const m = body.match(/^(?:#.*\n)?\s*([^\n#]+)/);
  return m ? stripMarkdown(m[1]) : "";
}

function firstHeading(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "";
}

function slugToTitle(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateDescription(body, existing) {
  if (existing && existing.length >= 10) return existing;
  const p = firstParagraph(body);
  if (p.length <= DESC_MAX_LEN) return p;
  return p.slice(0, DESC_MAX_LEN - 1).replace(/\s+\S*$/, "") + "…";
}

function generateKeywords(title, existing) {
  if (existing && existing.length >= 3) return existing;
  const fromTitle = title ? title.replace(/[、，,]/g, " ").trim() : "";
  const combined = [fromTitle, SITE_KEYWORDS].filter(Boolean).join(", ");
  return combined.slice(0, 200);
}

function escapeYamlValue(v) {
  const s = String(v).trim();
  if (s.includes("\n")) return "|\n  " + s.replace(/\n/g, "\n  ");
  if (s.includes(":") || s.includes("#") || s.startsWith("'") || s.startsWith('"')) return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  return s;
}

function buildFrontMatter(data) {
  const order = ["layout", "title", "description", "keywords", "date"];
  const lines = ["---"];
  for (const k of order) {
    if (data[k] != null && data[k] !== "") lines.push(`${k}: ${escapeYamlValue(data[k])}`);
  }
  const rest = Object.keys(data).filter((k) => !order.includes(k));
  for (const k of rest) {
    if (data[k] != null && data[k] !== "") lines.push(`${k}: ${escapeYamlValue(data[k])}`);
  }
  lines.push("---");
  return lines.join("\n");
}

function processFile(filePath, siteKeywords) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath) || !fullPath.endsWith(".md")) {
    console.warn("跳过（非 .md 或不存在）:", fullPath);
    return;
  }
  const name = path.basename(fullPath, ".md");
  if (name === "index" || name === "README") return;

  let content = fs.readFileSync(fullPath, "utf-8");
  const { data, body } = parseFrontMatter(content);
  const next = { ...data };

  next.layout = next.layout || DEFAULT_LAYOUT;
  next.title = next.title || firstHeading(body) || slugToTitle(name);
  next.description = generateDescription(body, next.description);
  next.keywords = generateKeywords(next.title, next.keywords);
  if (!next.date) next.date = new Date().toISOString().slice(0, 10);

  const newFront = buildFrontMatter(next);
  const newContent = newFront + "\n" + body;
  fs.writeFileSync(fullPath, newContent, "utf-8");
  console.log("已更新:", path.relative(process.cwd(), fullPath), "| title:", next.title);
}

function main() {
  const siteKeywords = loadSiteKeywords();
  const arg = process.argv[2] || "docs/articles";
  const base = path.isAbsolute(arg) ? arg : path.join(process.cwd(), arg);

  if (!fs.existsSync(base)) {
    console.error("路径不存在:", base);
    process.exit(1);
  }

  const stat = fs.statSync(base);
  if (stat.isFile()) {
    processFile(base, siteKeywords);
    return;
  }

  const files = fs.readdirSync(base).filter((f) => f.endsWith(".md") && f !== "index.md" && f !== "README.md");
  for (const f of files) processFile(path.join(base, f), siteKeywords);
  if (files.length === 0) console.log("未找到可处理的 .md 文件");
}

main();
