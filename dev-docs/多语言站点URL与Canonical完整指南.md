# 多语言站点 URL 与 Canonical 完整指南

本指南整理「默认语言放根目录、子目录放其他语言」的 URL 结构与 canonical 写法，符合主流搜索引擎（Google/Bing）的推荐实践。

---

## 一、核心结论（先记这三点）

| 要点 | 正确做法 |
|------|----------|
| **默认语言放哪** | 放在**根路径** `/`，例如英文站：`abc.com/`、`abc.com/dex` |
| **要不要把根全导向 /en** | **不要**。应把 `/en` 做 **301 重定向到 /**，而不是把 `/` 全导向 `/en` |
| **Canonical** | 默认语言页的 canonical 写**根路径**，例如 `https://abc.com/dex` |

---

## 二、为什么默认语言要放根目录？

1. **根路径权重与信任度更高**  
   搜索引擎对根路径的信任和权重分配通常更好，默认语言作为主版本放在根目录更利于 SEO。

2. **URL 更短、更易传播**  
   `abc.com/dex` 比 `abc.com/en/dex` 更简洁，分享、外链、品牌记忆都更友好。

3. **符合常见约定**  
   多数多语言站点（如 Apple、MDN、GitHub Docs）都把默认语言放在根目录，用户与爬虫预期一致。

4. **避免重复与选错主版本**  
   若根路径 301 到 `/en`，则所有「根级」链接最终都变成 `/en/...`，容易造成认知混乱；且若某处漏做 301，会出现根与 /en 两套 URL，增加重复内容风险。

因此：**默认语言 = 根路径；其他语言 = 子目录**，是推荐做法。

---

## 三、推荐的 URL 结构

假设默认语言是**英文**，另有中文、日文等。

### 3.1 结构表

| 语言 | URL 示例 | 说明 |
|------|----------|------|
| 英文（默认） | `abc.com/` | 首页在根 |
| 英文（默认） | `abc.com/dex` | 内容页在根，**不带** `/en` |
| 中文 | `abc.com/zh/` | 中文首页 |
| 中文 | `abc.com/zh/dex` | 中文内容页 |
| 日文 | `abc.com/ja/dex` | 其他语言同理 |

要点：

- **英文（默认）**：`/`、`/dex`、`/docs/xxx`，**不再使用** `/en` 作为 canonical。
- **其他语言**：统一用语言子目录，如 `/zh/`、`/ja/`。

### 3.2 错误做法 vs 正确做法

| 做法 | 错误 ❌ | 正确 ✅ |
|------|---------|---------|
| 根路径 | 全站 `abc.com/` 301 → `abc.com/en/` | 内容放在 `abc.com/`，`abc.com/en/` 301 → `abc.com/` |
| 英文页 | `abc.com/en/dex` 作为主 URL | `abc.com/dex` 作为主 URL，canonical 写 `/dex` |
| 中文页 | `abc.com/dex?lang=zh` 或根路径混用 | `abc.com/zh/dex`，canonical 写 `/zh/dex` |

---

## 四、301 重定向怎么设？

目标：**只保留一套「主 URL」**，其余统一 301 过去。

- **若历史上有 `/en/xxx`**：  
  - 将 `abc.com/en` 和 `abc.com/en/*` 做 **301 重定向** 到 `abc.com/` 和 `abc.com/*`。  
  - 例如：`abc.com/en/dex` → `abc.com/dex`。

- **不要**把 `abc.com/` 或 `abc.com/dex` 重定向到 `abc.com/en/` 或 `abc.com/en/dex`。

配置示例（Nginx）：

```nginx
# /en 及 /en/* 永久重定向到根
location /en {
    return 301 $scheme://$host${request_uri#/en};
}
```

Vercel / Netlify 等可在配置中写：`/en` → `/`，`/en/:path*` → `/:path*`（301）。

---

## 五、Canonical 怎么写？

Canonical 用来告诉搜索引擎「这一页的主版本 URL 是哪一个」，避免多版本被当成重复内容。

### 5.1 规则小结

| 页面 | Canonical 应写 |
|------|----------------|
| 英文首页 `abc.com/` | `https://abc.com/` |
| 英文内容页 `abc.com/dex` | `https://abc.com/dex` |
| 中文页 `abc.com/zh/dex` | `https://abc.com/zh/dex` |
| 日文页 `abc.com/ja/dex` | `https://abc.com/ja/dex` |

即：**每页的 canonical 指向该页自己的主 URL**；默认语言用根路径，所以 canonical 就是根路径（如 `/dex`），**不要**写成 `/en/dex`。

### 5.2 HTML 示例

```html
<!-- 英文页 abc.com/dex -->
<link rel="canonical" href="https://abc.com/dex" />

<!-- 中文页 abc.com/zh/dex -->
<link rel="canonical" href="https://abc.com/zh/dex" />
```

### 5.3 注意

- 英文页的 canonical 写 **`/dex`**（根路径），不写 `/en/dex`。
- 各语言版本之间用 **hreflang** 关联，不用 canonical 互相指；canonical 只指「当前语言下的主 URL」。

---

## 六、hreflang 与多语言关联（可选但推荐）

在每页的 `<head>` 里声明各语言版本，便于搜索引擎展示正确语言结果：

```html
<!-- 在英文页 abc.com/dex -->
<link rel="alternate" hreflang="en" href="https://abc.com/dex" />
<link rel="alternate" hreflang="zh-Hans" href="https://abc.com/zh/dex" />
<link rel="alternate" hreflang="x-default" href="https://abc.com/dex" />

<!-- 在中文页 abc.com/zh/dex -->
<link rel="alternate" hreflang="en" href="https://abc.com/dex" />
<link rel="alternate" hreflang="zh-Hans" href="https://abc.com/zh/dex" />
<link rel="alternate" hreflang="x-default" href="https://abc.com/dex" />
```

- `x-default` 一般指向默认语言（如英文）的 URL，即根路径。
- 每个语言版本页面上都要有一套完整的 hreflang（包含所有语言 + x-default），且 URL 一致。

---

## 七、Sitemap 建议

- **默认语言（根路径）**：用主 sitemap，例如 `https://abc.com/sitemap.xml`，其中 URL 为 `https://abc.com/`、`https://abc.com/dex` 等。
- **其他语言**：可放在同一 sitemap 中，或单独 `sitemap-zh.xml`、`sitemap-ja.xml`，按实际规模选择。
- 每个 URL 在 sitemap 中只出现一次，且与 canonical 及 hreflang 中的 URL 一致。

---

## 八、若默认语言是中文

若站点以**中文**为主、英文为辅（例如中文教程站）：

- **根路径放中文**：`abc.com/`、`abc.com/dex` 为中文。
- **英文用子目录**：`abc.com/en/`、`abc.com/en/dex`。
- 中文页 canonical 写 `https://abc.com/dex`，英文页写 `https://abc.com/en/dex`。
- `x-default` 指向中文根路径。

逻辑与上面一致，只是「默认语言」从英文换成中文。

---

## 九、检查清单

部署或改版后，可逐项核对：

- [ ] 默认语言内容在根路径（如 `/`、`/dex`），未使用 `/en` 作为主 URL。
- [ ] 存在 `/en` 时，已做 301 到 `/` 或对应根路径，且未把根路径 301 到 `/en`。
- [ ] 各页 `<link rel="canonical">` 指向当前页面的主 URL；默认语言页 canonical 为根路径（如 `/dex`）。
- [ ] 多语言时已加 hreflang，且每页的 hreflang 集合一致，含 x-default。
- [ ] Sitemap 中 URL 与 canonical、hreflang 一致，无重复、无错误语言路径。
- [ ] 用 GSC/Bing 站长工具检查「覆盖率」「国际定向」无异常。

---

## 十、参考与延伸

- [Google：多区域、多语言站点](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google：hreflang 注解](https://developers.google.com/search/docs/specialty/international/localized-versions#html)

---

**总结**：默认语言放根目录（如英文用 `abc.com/dex`），`/en` 做 301 到根；其他语言用子目录（如 `abc.com/zh/dex`）；canonical 写根路径（如 `/dex`）。按此执行即可符合「默认语言在根、子目录仅用于非默认语言」的推荐做法。
