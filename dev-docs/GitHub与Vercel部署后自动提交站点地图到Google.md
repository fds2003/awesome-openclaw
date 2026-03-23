# 教程：GitHub + Vercel 部署成功后，自动向 Google 提交站点地图

> **适合谁**：代码放在 **GitHub**，网站用 **Vercel** 部署，希望 **每次生产环境部署成功** 后自动通知 **Google Search Console** 抓取最新 `sitemap.xml`，而不用每次手动在 GSC 里点「提交」。  
> **实现方式**：在仓库中启用 **GitHub Actions**；利用 Vercel 写入 GitHub 的 **Deployment** 状态；部署成功后由 Action 轮询线上 sitemap，再调用 **Google Search Console API** 提交站点地图。  
> **说明**：Google 已不推荐用旧的 `ping?sitemap=` 地址；官方能力以 **Search Console / API** 为准。  
> **架构速查**（触发条件、Variables、改环境名）：见同目录 [GitHub自动提交站点地图到Google.md](./GitHub自动提交站点地图到Google.md)。

---

## 一、整体流程（先看懂再动手）

```text
你 push 到 main
    → Vercel 拉代码构建并发布
    → Vercel 在 GitHub 上标记「部署成功」（Deployment status: success）
    → 触发本仓库的 GitHub Workflow
    → 等待线上 https://你的域名/sitemap.xml 可访问且内容正常
    → 使用服务账号调用 Google API，提交该 sitemap URL
```

密钥与脚本都放在 **GitHub**（Secrets + 仓库内 `scripts/`），**Vercel 只负责建站**，不参与调用 Google。

---

## 二、开始前请确认

| 项 | 说明 |
|----|------|
| **GitHub 仓库** | 已包含本站构建方式（如 `npm run build`、`vercel.json` 的 `outputDirectory` 等） |
| **Vercel** | 已绑定该仓库，**Production Branch** 一般为 `main`（或与你实际一致） |
| **域名与 sitemap** | 线上能访问 `https://你的域名/sitemap.xml`（本教程默认以 `https://claw.oucloud.top` 为例，请替换成你的域名） |
| **Search Console** | 已添加网站资源（**网址前缀**或**网域**均可），且你有权限添加用户 |

---

## 三、第一步：Google Cloud — 启用 API 并创建服务账号

1. 打开 [Google Cloud Console](https://console.cloud.google.com/)，创建或选择一个项目。  
2. 左侧 **「API 和服务」→「库」**，搜索 **「Google Search Console API」**，进入后点击 **「启用」**。  
3. **「IAM 和管理」→「服务账号」→「创建服务账号」**，名称随意（如 `gsc-sitemap-submit`），创建完成。  
4. 进入该服务账号 → **「密钥」** → **「添加密钥」→「创建新密钥」**，类型选 **JSON**，下载到本地（**勿提交到 Git**）。  
5. 打开 JSON，记下 **`client_email`**（形如 `xxx@你的项目.iam.gserviceaccount.com`），下一步要用。

---

## 四、第二步：Google Search Console — 授权服务账号

1. 打开 [Google Search Console](https://search.google.com/search-console)，选中你的资源。  
2. 左下角 **「设置」→「用户和权限」→「添加用户」**。  
3. 填入上一步的 **服务账号邮箱**，权限选 **「拥有者」** 或 **「完整」**。  
4. **资源类型要与后续脚本中的站点 URL 一致**：  
   - **网址前缀**：例如 `https://claw.oucloud.top/`（注意是否带 **末尾斜杠** `/`，须与 API 里 `siteUrl` 完全一致）。  
   - **网域资源**：形式为 `sc-domain:example.com`，则不能使用 `https://...` 作为 `siteUrl`，需在 GitHub Variables 里单独配置（见下文）。

---

## 五、第三步：GitHub 仓库 — 配置 Secrets（与可选 Variables）

### 5.1 必填 Secret

1. 打开 GitHub 仓库 → **Settings → Secrets and variables → Actions**。  
2. **New repository secret**：  
   - **Name**：`GOOGLE_SERVICE_ACCOUNT_KEY`  
   - **Secret**：把下载的 **整份 JSON** 原样粘贴进去（多行即可，保持合法 JSON）。

> 若未配置该 Secret，仓库里的脚本会 **直接跳过提交**（退出码 0），不会把 CI 标红，方便本地或未启用自动化的 fork。

### 5.2 可选 Variables（与 GSC 资源不一致时再用）

在 **Settings → Secrets and variables → Actions → Variables** 中可添加：

| Name | 用途 |
|------|------|
| `GSC_SITE_URL` | 与 Search Console **完全一致** 的资源地址，例如 `https://claw.oucloud.top/` 或 `sc-domain:oucloud.top` |
| `SITEMAP_URL` | 线上 sitemap 完整地址，默认脚本按 `站点根/sitemap.xml`；若路径不同可在此覆盖 |

---

## 六、第四步：确认仓库内 Workflow 与脚本（本教程站已内置）

本仓库已包含：

- **Workflow**：`.github/workflows/submit-sitemap.yml`  
  - 在 **`deployment_status`** 且 **生产环境成功**（环境名 `Production` 或 `production`）时运行；  
  - 支持 **`workflow_dispatch`** 手动运行。  
- **脚本**：`scripts/submit-sitemap-search-console.mjs`（依赖 `googleapis`，由 `npm ci` 安装）

若你是 **从零复制到自己的仓库**，请一并复制上述文件，并保证 `package.json` 的 `devDependencies` 中含 **`googleapis`**。

---

## 七、第五步：Vercel — 与 GitHub 联动（触发 Deployment）

1. Vercel Dashboard → 你的项目 → **Settings → Git**。  
2. 确认 **Connected Git Repository** 为当前 GitHub 仓库，**Production Branch** 正确。  
3. 保存后，对 `main` 做一次推送或 Redeploy，完成后到 **GitHub 仓库页**查看是否出现 **Deployments**（或某个 commit 旁的部署状态）。

只有 GitHub 能收到 **成功的 Deployment 状态**，`deployment_status` 才会触发本 Workflow。若始终看不到 Deployments，请检查 Vercel 集成；在此之前可用 **Actions 里手动 Run workflow** 先验证 Google 端是否提交成功。

---

## 八、第六步：验证是否生效

### 8.1 手动试跑（推荐先做）

1. GitHub → **Actions** → 选择 **「Submit sitemap to Google Search Console」**。  
2. 右上角 **「Run workflow」** → 选分支 **main** → **Run workflow**。  
3. 进入本次运行，展开步骤：应看到 **Install dependencies**、**Submit sitemap**，日志中有 `已提交: https://.../sitemap.xml`。

### 8.2 看 Search Console

1. 打开 GSC → **站点地图**。  
2. 确认列表中有你提交的地址，状态会随抓取更新（非即时全部成功属正常）。

### 8.3 自动触发（部署成功后）

向 `main` 推送会触发 Vercel 部署；部署成功后应自动再跑一遍本 Action。若失败，在 **Actions** 里查看 **Wait for live sitemap** 是否超时（例如 CDN 过慢），可适当拉长脚本中的重试次数，或检查 `SITEMAP_URL` 是否正确。

---

## 九、常见问题

**Q：Workflow 根本没跑？**  
- 确认是 **生产环境** 部署成功，且环境名是 **Production** / **production**（若 Vercel 显示为 `prod` 等，需改 `.github/workflows/submit-sitemap.yml` 里 `if` 条件）。  
- 未连接 GitHub Deployment 的托管方式不会触发 `deployment_status`，请用手动 **workflow_dispatch** 或改托管集成。

**Q：API 报错 403 / permission？**  
- 服务账号邮箱是否已加入 **同一资源**？资源是「网址前缀」时，`GSC_SITE_URL` 必须与 GSC 里显示的 URL **逐字符一致**（含 `https`、末尾 `/`）。

**Q：想和百度一起自动推送？**  
- 百度站长有 **主动推送接口**，需另写步骤与密钥，本教程仅覆盖 **Google Search Console**。

---

## 十、安全提醒

- **永远不要**把服务账号 JSON 提交进仓库或写在公开 Issue 里。  
- 仅使用 **最小权限**：该密钥只用于 Search Console API；若泄露，应在 GCP 中 **作废密钥** 并轮换。

---

## 十一、相关链接

- [Google Search Console API 文档](https://developers.google.com/webmaster-tools/v1/api_reference_index)  
- [GitHub deployment_status 事件](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#deployment_status)

---

*本教程适用于静态站点（如 Eleventy）在 Vercel 上的典型部署；若你的构建命令或输出目录不同，只需保证线上 `sitemap.xml` 的 URL 与 Variables 一致即可。*
