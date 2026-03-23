#!/usr/bin/env node
/**
 * 通过 Google Search Console API 提交站点地图（幂等，可重复调用）。
 *
 * 前置条件：
 * 1. GCP 项目启用「Google Search Console API」
 * 2. 创建服务账号，下载 JSON 密钥
 * 3. 在 Search Console → 设置 → 用户和权限 中，将该服务账号邮箱加入为「拥有者」或「完整」权限
 * 4. GitHub 仓库 Secrets：GOOGLE_SERVICE_ACCOUNT_KEY = 密钥 JSON 全文（单行粘贴）
 *
 * 环境变量：
 * - GOOGLE_SERVICE_ACCOUNT_KEY（必填，否则跳过并 exit 0）
 * - SITE_URL（可选，默认 https://claw.oucloud.top/，须与 GSC 资源 URL 完全一致，含末尾斜杠）
 * - SITEMAP_URL（可选，默认 SITE_URL + sitemap.xml）
 */

import { google } from "googleapis";

const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim();
if (!keyJson) {
  console.log(
    "[submit-sitemap] 未设置 GOOGLE_SERVICE_ACCOUNT_KEY，跳过（本地或未配置 Secrets 时正常）"
  );
  process.exit(0);
}

const siteUrl = (process.env.SITE_URL || "https://claw.oucloud.top/").replace(
  /\/?$/,
  "/"
);
const sitemapUrl =
  process.env.SITEMAP_URL || `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;

let credentials;
try {
  credentials = JSON.parse(keyJson);
} catch (e) {
  console.error("[submit-sitemap] GOOGLE_SERVICE_ACCOUNT_KEY 不是合法 JSON");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/webmasters"],
});

const webmasters = google.webmasters({ version: "v3", auth });

try {
  await webmasters.sitemaps.submit({
    siteUrl,
    feedpath: sitemapUrl,
  });
  console.log(`[submit-sitemap] 已提交: ${sitemapUrl}（资源: ${siteUrl}）`);
} catch (err) {
  const msg = err.response?.data?.error?.message || err.message;
  console.error("[submit-sitemap] API 错误:", msg);
  process.exit(1);
}
