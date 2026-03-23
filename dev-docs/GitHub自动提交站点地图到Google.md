# GitHub：部署成功后再向 Google 提交站点地图

> **完整分步教程**（GCP、GSC、Secrets、Vercel 联动与验证）：见同目录 [GitHub与Vercel部署后自动提交站点地图到Google.md](./GitHub与Vercel部署后自动提交站点地图到Google.md)。  
> 本文档为开发侧速查与架构说明（不参与站点构建，仅供克隆仓库者在本地阅读）。

Google 已弃用「ping?sitemap=」；本仓库在 **生产环境部署成功**（GitHub 收到 `deployment_status: success`）后，再轮询线上 `sitemap.xml` 可用，最后调用 **Search Console API** 提交站点地图。

---

## 零、典型架构：代码在 GitHub，站点在 Vercel

若你的流程是 **GitHub 存代码 → Vercel 连该仓库自动部署**，则与当前 Workflow **完全匹配**：

1. **Vercel**：Dashboard → 你的项目 → **Settings → Git** → 确认已连接 **正确的 GitHub 仓库**与 **Production Branch**（多为 `main`）。  
2. **GitHub**：仓库页 **Deployments**（或某个 commit 旁的火箭图标）里，应能看到 Vercel 创建的部署记录；部署成功后状态为 **Success**。  
3. 此时 GitHub 会触发 **`deployment_status`**，本 Action 才会在 **部署成功 + 线上 sitemap 可读** 后向 Google 提交。

若 **从未**在 GitHub 上看到 Deployments，说明 Vercel 与 GitHub 的部署集成未写入 Deployment API，需先在 Vercel 侧检查集成；在此之前可用 **Actions → 手动 Run workflow** 提交 sitemap。

---

## 一、触发时机（重要）

| 触发方式 | 何时执行 |
|----------|----------|
| **`deployment_status`** | 关联的 GitHub Deployment 变为 **success**，且环境名为 **`Production`** 或 **`production`**（与 Vercel 生产环境一致） |
| **`workflow_dispatch`** | 你在 Actions 里手动「Run workflow」，**不等待**部署（适合补提交） |

**已不再**在每次 `push` 到 `main` 时自动运行，避免「代码已推送但站点尚未构建完成」就提交旧 sitemap。

---

## 二、前置条件：Vercel ↔ GitHub Deployment

本 Workflow 依赖 **GitHub 的 Deployments API** 收到成功状态。使用 **Vercel** 并绑定 GitHub 仓库时，一般会自动创建 Deployment。

请在 Vercel 确认：

1. 项目已 **Import** 该 GitHub 仓库。  
2. **Production Branch** 为 `main`（或你实际用的生产分支）。  
3. 若从未在 GitHub 上看到「Deployments」页签有记录，可在 Vercel **Project Settings → Git** 查看集成是否正常。

> 若托管商**不会**向 GitHub 回写 Deployment，则 `deployment_status` **不会触发**。此时只能使用 **`workflow_dispatch`** 手动提交，或改为在托管商侧用 Webhook 调自定义端点（需自行实现）。

---

## 三、执行流程（自动）

1. Vercel 完成 **Production** 部署 → GitHub 收到 `deployment_status` = `success`。  
2. Action **checkout** 到本次部署的 **commit**（`github.event.deployment.sha`）。  
3. **`Wait for live sitemap`**：最多约 **6 分钟**内每 5 秒请求一次线上 `sitemap.xml`，直到内容含 `<urlset` 或 `<url>`（应对 CDN/边缘延迟）。  
4. 运行 **`submit-sitemap-search-console.mjs`** 向 Google 提交站点地图。

---

## 四、Google 与 GitHub 配置（与此前相同）

1. GCP 启用 **Google Search Console API**，创建**服务账号**，下载 JSON。  
2. GSC **用户和权限**中加入该服务账号邮箱（拥有者/完整）。  
3. GitHub **Secrets**：`GOOGLE_SERVICE_ACCOUNT_KEY` = JSON 全文。

---

## 五、可选 Variables

| 变量名 | 说明 |
|--------|------|
| `GSC_SITE_URL` | 与 GSC 资源完全一致（含末尾 `/` 或 `sc-domain:`） |
| `SITEMAP_URL` | 线上 sitemap 完整 URL，默认 `https://claw.oucloud.top/sitemap.xml`；**仅**影响「等待线上 sitemap」步骤 |

---

## 六、生产环境名不一致时

若 Vercel 在 GitHub 里显示的环境名**不是** `Production` / `production`（例如自定义为 `prod`），请修改 `.github/workflows/submit-sitemap.yml` 中 `if:` 条件，把你的环境名加进去。

查看方式：任意一次部署完成后，在仓库 **Actions** 里点开由 Vercel 触发的 run，查看 **deployment_status** 的 payload，或 GitHub API `GET /repos/{owner}/{repo}/deployments`。

---

## 七、相关文件

- Workflow：`.github/workflows/submit-sitemap.yml`  
- 脚本：`scripts/submit-sitemap-search-console.mjs`
