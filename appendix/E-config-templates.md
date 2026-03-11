# 附录E：配置文件模板与示例

> 💡 **开箱即用**：复制这些配置模板，快速完成OpenClaw配置

---

## 📋 目录

- [基础配置模板](#基础配置模板)
- [多模型配置](#多模型配置)
- [多平台集成配置](#多平台集成配置)
- [Skills配置](#skills配置)
- [自动化配置](#自动化配置)
- [高级配置](#高级配置)

---

## 🎯 基础配置模板

### 1. 最小化配置（新手推荐）

**文件位置**：`~/.openclaw/config.json`

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789,
    "bind": "127.0.0.1"
  },
  "models": {
    "default": "deepseek-chat",
    "providers": {
      "deepseek": {
        "apiKey": "sk-your-deepseek-api-key",
        "baseURL": "https://api.deepseek.com"
      }
    }
  },
  "workspace": {
    "path": "~/Documents/openclaw"
  }
}
```

**使用说明**：
1. 替换 `sk-your-deepseek-api-key` 为你的实际API密钥
2. 保存到 `~/.openclaw/config.json`
3. 运行 `openclaw gateway run`

---

### 2. 完整基础配置

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789,
    "bind": "127.0.0.1",
    "cors": {
      "enabled": true,
      "origins": ["http://localhost:3000"]
    },
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    }
  },
  "models": {
    "default": "deepseek-chat",
    "timeout": 30000,
    "maxTokens": 4096,
    "temperature": 0.7,
    "streaming": true,
    "providers": {
      "deepseek": {
        "apiKey": "sk-your-api-key",
        "baseURL": "https://api.deepseek.com",
        "models": ["deepseek-chat", "deepseek-coder"]
      }
    }
  },
  "workspace": {
    "path": "~/Documents/openclaw",
    "autoSave": true,
    "backupEnabled": true
  },
  "logging": {
    "level": "info",
    "file": "~/.openclaw/logs/gateway.log",
    "maxSize": "10m",
    "maxFiles": 5
  }
}
```

---

## 🤖 多模型配置

### 1. 国产模型组合（省钱方案）

```json
{
  "models": {
    "default": "deepseek-chat",
    "providers": {
      "deepseek": {
        "apiKey": "sk-deepseek-key",
        "baseURL": "https://api.deepseek.com",
        "models": ["deepseek-chat", "deepseek-coder"]
      },
      "kimi": {
        "apiKey": "your-kimi-key",
        "baseURL": "https://api.moonshot.cn/v1",
        "models": ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"]
      },
      "glm": {
        "apiKey": "your-glm-key",
        "baseURL": "https://open.bigmodel.cn/api/paas/v4",
        "models": ["glm-4", "glm-4-flash"]
      }
    },
    "routing": {
      "rules": [
        {
          "condition": "message.length > 10000",
          "model": "moonshot-v1-128k",
          "reason": "长文档处理"
        },
        {
          "condition": "message.includes('代码')",
          "model": "deepseek-coder",
          "reason": "代码相关任务"
        },
        {
          "condition": "default",
          "model": "deepseek-chat",
          "reason": "日常对话"
        }
      ]
    }
  }
}
```

**成本估算**：
- 日常对话：DeepSeek（0.001元/1K tokens）
- 长文档：Kimi（0.012元/1K tokens）
- 代码任务：DeepSeek Coder（0.001元/1K tokens）
- 月均成本：5-30元

---

### 2. 国际模型配置

```json
{
  "models": {
    "default": "gpt-4o-mini",
    "providers": {
      "openai": {
        "apiKey": "sk-your-openai-key",
        "baseURL": "https://api.openai.com/v1",
        "models": ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"]
      },
      "anthropic": {
        "apiKey": "sk-ant-your-key",
        "baseURL": "https://api.anthropic.com",
        "models": ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"]
      },
      "google": {
        "apiKey": "your-google-key",
        "baseURL": "https://generativelanguage.googleapis.com/v1beta",
        "models": ["gemini-2.0-flash-exp", "gemini-1.5-pro"]
      }
    },
    "routing": {
      "rules": [
        {
          "condition": "task.type === 'complex'",
          "model": "claude-3-5-sonnet-20241022"
        },
        {
          "condition": "task.type === 'simple'",
          "model": "gpt-4o-mini"
        }
      ]
    }
  }
}
```

---

### 3. 中转API配置（推荐）

```json
{
  "models": {
    "default": "gpt-4o-mini",
    "providers": {
      "relay": {
        "apiKey": "your-relay-api-key",
        "baseURL": "https://api.relay-service.com/v1",
        "models": [
          "gpt-4o",
          "gpt-4o-mini",
          "claude-3-5-sonnet-20241022",
          "deepseek-chat",
          "moonshot-v1-8k",
          "glm-4"
        ]
      }
    }
  }
}
```

**优势**：
- ✅ 一个API密钥访问所有模型
- ✅ 统一计费，成本更低
- ✅ 国内访问速度快
- ✅ 自动负载均衡

---

## 📱 多平台集成配置

### 1. 飞书Bot配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_your_app_id",
      "appSecret": "your_app_secret",
      "verificationToken": "your_verification_token",
      "encryptKey": "your_encrypt_key",
      "webhookUrl": "https://your-domain.com/webhook/feishu",
      "features": {
        "streaming": true,
        "fileUpload": true,
        "imageGeneration": true
      },
      "permissions": [
        "im:message",
        "im:message.group_at_msg",
        "im:message.p2p_msg",
        "contact:user.base:readonly"
      ]
    }
  }
}
```

**获取参数步骤**：
1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 App ID 和 App Secret
4. 配置事件订阅和权限
5. 设置回调地址

---

### 2. 企业微信Bot配置

```json
{
  "channels": {
    "wecom": {
      "enabled": true,
      "corpId": "ww1234567890abcdef",
      "agentId": "1000001",
      "secret": "your_agent_secret",
      "token": "your_token",
      "encodingAESKey": "your_aes_key",
      "webhookUrl": "https://your-domain.com/webhook/wecom",
      "features": {
        "fileUpload": true,
        "cardMessage": true
      }
    }
  }
}
```

---

### 3. 钉钉Bot配置

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "appKey": "your_app_key",
      "appSecret": "your_app_secret",
      "agentId": "your_agent_id",
      "webhookUrl": "https://your-domain.com/webhook/dingtalk",
      "features": {
        "markdown": true,
        "actionCard": true
      }
    }
  }
}
```

---

### 4. Telegram Bot配置

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
      "allowedUsers": [123456789, 987654321],
      "features": {
        "inlineKeyboard": true,
        "fileUpload": true,
        "voiceMessage": true
      }
    }
  }
}
```

---

### 5. 多平台同时配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_feishu_app_id",
      "appSecret": "feishu_secret"
    },
    "wecom": {
      "enabled": true,
      "corpId": "ww_corp_id",
      "agentId": "1000001",
      "secret": "wecom_secret"
    },
    "telegram": {
      "enabled": true,
      "botToken": "telegram_bot_token"
    }
  },
  "routing": {
    "defaultChannel": "feishu",
    "rules": [
      {
        "channel": "telegram",
        "users": ["user_telegram_id"]
      },
      {
        "channel": "wecom",
        "users": ["user_wecom_id"]
      }
    ]
  }
}
```

---

## 🧩 Skills配置

### 1. 必装Skills配置

```json
{
  "skills": {
    "enabled": true,
    "autoUpdate": true,
    "path": "~/.openclaw/skills",
    "installed": [
      {
        "name": "@openclaw/skill-file-search",
        "version": "latest",
        "enabled": true,
        "config": {
          "searchPaths": ["~/Documents", "~/Desktop", "~/Downloads"],
          "excludePatterns": ["node_modules", ".git", "*.tmp"],
          "maxResults": 50
        }
      },
      {
        "name": "@openclaw/skill-web-search",
        "version": "latest",
        "enabled": true,
        "config": {
          "provider": "brave",
          "apiKey": "your-brave-api-key",
          "maxResults": 10
        }
      },
      {
        "name": "@openclaw/skill-calendar",
        "version": "latest",
        "enabled": true,
        "config": {
          "provider": "apple",
          "defaultCalendar": "Work",
          "timezone": "Asia/Shanghai"
        }
      },
      {
        "name": "@openclaw/skill-notion",
        "version": "latest",
        "enabled": true,
        "config": {
          "apiKey": "your-notion-api-key",
          "databaseId": "your-database-id"
        }
      }
    ]
  }
}
```

---

### 2. Skills双幻神配置

```json
{
  "skills": {
    "installed": [
      {
        "name": "@openclaw/skill-find-skills",
        "version": "latest",
        "enabled": true,
        "config": {
          "autoSuggest": true,
          "threshold": 0.7
        }
      },
      {
        "name": "@openclaw/skill-proactive-agent",
        "version": "latest",
        "enabled": true,
        "config": {
          "proactiveMode": true,
          "contextAware": true,
          "suggestionFrequency": "medium"
        }
      }
    ]
  }
}
```

---

## ⚙️ 自动化配置

### 1. 定时任务配置

```json
{
  "automation": {
    "enabled": true,
    "tasks": [
      {
        "name": "daily-ai-report",
        "schedule": "0 9 * * *",
        "action": {
          "type": "message",
          "content": "生成今天的AI行业日报，包括：1. 最新AI新闻 2. 技术突破 3. 产品发布",
          "channel": "feishu"
        },
        "enabled": true
      },
      {
        "name": "weekly-summary",
        "schedule": "0 18 * * 5",
        "action": {
          "type": "message",
          "content": "总结本周工作，生成周报",
          "channel": "feishu"
        },
        "enabled": true
      },
      {
        "name": "backup-notes",
        "schedule": "0 2 * * *",
        "action": {
          "type": "command",
          "command": "openclaw backup --type notes --destination ~/Backups"
        },
        "enabled": true
      }
    ]
  }
}
```

**Cron表达式说明**：
- `0 9 * * *` - 每天9:00
- `0 18 * * 5` - 每周五18:00
- `0 2 * * *` - 每天2:00
- `*/30 * * * *` - 每30分钟
- `0 */2 * * *` - 每2小时

---

### 2. 网站监控配置

```json
{
  "automation": {
    "monitoring": [
      {
        "name": "claude-updates",
        "url": "https://www.anthropic.com/news",
        "interval": 3600,
        "selector": ".news-item",
        "action": {
          "type": "notify",
          "channel": "feishu",
          "message": "Claude有新更新：{{title}}"
        },
        "enabled": true
      },
      {
        "name": "github-releases",
        "url": "https://api.github.com/repos/openclaw/openclaw/releases/latest",
        "interval": 7200,
        "action": {
          "type": "notify",
          "channel": "telegram",
          "message": "OpenClaw发布新版本：{{tag_name}}"
        },
        "enabled": true
      }
    ]
  }
}
```

---

### 3. 工作流自动化

```json
{
  "workflows": {
    "content-creation": {
      "name": "内容创作工作流",
      "steps": [
        {
          "name": "topic-research",
          "action": "web_search",
          "params": {
            "query": "{{topic}}",
            "maxResults": 10
          }
        },
        {
          "name": "outline-generation",
          "action": "generate",
          "params": {
            "prompt": "根据以下资料生成文章大纲：{{research_results}}"
          }
        },
        {
          "name": "content-writing",
          "action": "generate",
          "params": {
            "prompt": "根据大纲撰写完整文章：{{outline}}"
          }
        },
        {
          "name": "save-to-notion",
          "action": "skill",
          "skill": "@openclaw/skill-notion",
          "params": {
            "action": "create_page",
            "content": "{{article}}"
          }
        }
      ],
      "enabled": true
    }
  }
}
```

---

## 🔧 高级配置

### 1. 多Agent配置

```json
{
  "agents": {
    "list": [
      {
        "id": "main-assistant",
        "name": "主助理",
        "model": "gpt-4o",
        "systemPrompt": "你是一个专业的AI助手，擅长处理各类任务。",
        "workspace": "~/Documents/openclaw/main",
        "skills": ["file-search", "web-search", "calendar"],
        "channels": ["feishu"]
      },
      {
        "id": "content-creator",
        "name": "内容创作助手",
        "model": "claude-3-5-sonnet-20241022",
        "systemPrompt": "你是一个专业的内容创作者，擅长写作和创意。",
        "workspace": "~/Documents/openclaw/content",
        "skills": ["web-search", "notion", "image-generation"],
        "channels": ["telegram"]
      },
      {
        "id": "tech-expert",
        "name": "技术专家",
        "model": "deepseek-coder",
        "systemPrompt": "你是一个资深的技术专家，擅长编程和技术问题。",
        "workspace": "~/Documents/openclaw/tech",
        "skills": ["file-search", "github"],
        "channels": ["wecom"]
      }
    ],
    "routing": {
      "rules": [
        {
          "condition": "message.includes('写文章')",
          "agent": "content-creator"
        },
        {
          "condition": "message.includes('代码')",
          "agent": "tech-expert"
        },
        {
          "condition": "default",
          "agent": "main-assistant"
        }
      ]
    }
  }
}
```

---

### 2. 代理和网络配置

```json
{
  "network": {
    "proxy": {
      "enabled": true,
      "http": "http://127.0.0.1:7890",
      "https": "http://127.0.0.1:7890",
      "bypass": ["localhost", "127.0.0.1", "*.local"]
    },
    "dns": {
      "servers": ["8.8.8.8", "1.1.1.1"],
      "timeout": 5000
    },
    "retry": {
      "enabled": true,
      "maxAttempts": 3,
      "backoff": "exponential"
    }
  }
}
```

---

### 3. 安全和隐私配置

```json
{
  "security": {
    "encryption": {
      "enabled": true,
      "algorithm": "aes-256-gcm",
      "keyPath": "~/.openclaw/keys/encryption.key"
    },
    "authentication": {
      "enabled": true,
      "type": "jwt",
      "secret": "your-jwt-secret",
      "expiresIn": "7d"
    },
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000,
      "blockDuration": 300000
    },
    "allowlist": {
      "enabled": true,
      "ips": ["127.0.0.1", "192.168.1.0/24"],
      "users": ["user_id_1", "user_id_2"]
    }
  },
  "privacy": {
    "dataRetention": {
      "messages": 30,
      "logs": 7,
      "cache": 1
    },
    "anonymization": {
      "enabled": true,
      "fields": ["email", "phone", "address"]
    }
  }
}
```

---

### 4. 性能优化配置

```json
{
  "performance": {
    "cache": {
      "enabled": true,
      "type": "redis",
      "host": "localhost",
      "port": 6379,
      "ttl": 3600,
      "maxSize": "1gb"
    },
    "concurrency": {
      "maxConcurrentRequests": 10,
      "queueSize": 100,
      "timeout": 30000
    },
    "optimization": {
      "compression": true,
      "minify": true,
      "lazyLoad": true
    }
  }
}
```

---

## 📦 完整配置示例

### 超级个体完整配置

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789,
    "bind": "0.0.0.0"
  },
  "models": {
    "default": "deepseek-chat",
    "providers": {
      "deepseek": {
        "apiKey": "sk-your-deepseek-key",
        "baseURL": "https://api.deepseek.com"
      },
      "kimi": {
        "apiKey": "your-kimi-key",
        "baseURL": "https://api.moonshot.cn/v1"
      }
    },
    "routing": {
      "rules": [
        {
          "condition": "message.length > 10000",
          "model": "moonshot-v1-128k"
        },
        {
          "condition": "default",
          "model": "deepseek-chat"
        }
      ]
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_your_app_id",
      "appSecret": "your_app_secret",
      "features": {
        "streaming": true,
        "fileUpload": true
      }
    }
  },
  "skills": {
    "enabled": true,
    "installed": [
      "@openclaw/skill-file-search",
      "@openclaw/skill-web-search",
      "@openclaw/skill-calendar",
      "@openclaw/skill-notion",
      "@openclaw/skill-find-skills",
      "@openclaw/skill-proactive-agent"
    ]
  },
  "automation": {
    "enabled": true,
    "tasks": [
      {
        "name": "daily-report",
        "schedule": "0 9 * * *",
        "action": {
          "type": "message",
          "content": "生成今日AI行业日报",
          "channel": "feishu"
        }
      }
    ]
  },
  "workspace": {
    "path": "~/Documents/openclaw",
    "autoSave": true
  }
}
```

---

## 🚀 快速部署脚本

### 一键配置脚本

```bash
#!/bin/bash
# OpenClaw 快速配置脚本

# 创建配置目录
mkdir -p ~/.openclaw/skills
mkdir -p ~/.openclaw/logs
mkdir -p ~/Documents/openclaw

# 下载配置模板
curl -o ~/.openclaw/config.json https://raw.githubusercontent.com/你的用户名/本教程仓库/main/examples/configs/basic-config.json

# 提示用户输入API密钥
echo "请输入你的DeepSeek API密钥："
read -r DEEPSEEK_KEY

# 更新配置文件
sed -i '' "s/sk-your-deepseek-api-key/$DEEPSEEK_KEY/g" ~/.openclaw/config.json

# 安装必备Skills
clawhub install @openclaw/skill-file-search
clawhub install @openclaw/skill-web-search
clawhub install @openclaw/skill-calendar

# 启动Gateway
openclaw gateway run

echo "✅ OpenClaw配置完成！"
echo "访问 http://localhost:18789 开始使用"
```

---

## 📚 相关资源

- [第2章：环境搭建](/docs/01-basics/02-installation/)
- [第11章：高级配置](/docs/03-advanced/11-advanced-configuration/)
- [附录A：命令速查表](/appendix/A-command-reference/)
- [附录G：文档链接验证](/appendix/G-links-validation/)

---

**最后更新**：2026年2月14日
