# William 瞭望台 - RSS 聚合器 MVP

## 📁 项目结构

```
rss-aggregator/
├── aggregator.py       # 主抓取脚本
├── requirements.txt    # Python 依赖
├── README.md          # 说明文档
└── data/              # 输出数据目录
    └── top-news.json  # 生成的 JSON 数据
```

## 🚀 使用方法

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 运行抓取脚本

```bash
python aggregator.py
```

### 3. 查看输出

抓取完成后，数据会保存到 `data/top-news.json`

## 📊 输出格式

```json
{
  "updated_at": "2026-03-19T11:30:00",
  "total": 12,
  "items": [
    {
      "id": "abc123",
      "title": "新闻标题",
      "source": "impact.com",
      "date": "2026-03-19",
      "summary": "摘要...",
      "url": "https://...",
      "category": "top",
      "imageUrl": "placeholder-top-1.jpg"
    }
  ]
}
```

## ⏰ 设置定时任务

### Windows (任务计划程序)

创建 `run.bat`:
```batch
cd /d C:\Users\t2390\.openclaw\workspace\agent-nicole\projects\william-lookout\rss-aggregator
python aggregator.py
```

然后在任务计划程序中创建每天 9:00 运行的任务。

### macOS/Linux (Cron)

```bash
# 编辑 crontab
crontab -e

# 添加每天 9:00 运行的任务
0 9 * * * cd /path/to/rss-aggregator && python aggregator.py
```

## 🔌 与秒哒前端集成

方案 1：静态 JSON 托管
- 将 `data/top-news.json` 上传到静态托管（如 GitHub Pages、Vercel）
- 秒哒前端通过 HTTP 请求获取 JSON

方案 2：API 服务
- 使用 Flask/FastAPI 提供 API 接口
- 秒哒前端调用 API 获取数据

## 📡 支持的 RSS 源

| 平台 | RSS 地址 | 状态 |
|------|----------|------|
| impact.com | https://impact.com/feed/ | ✅ 已验证 |
| CJ Junction | https://junction.cj.com/rss.xml | ⚠️ 需验证 |
| Awin | https://www.awin.com/blog/rss | ⚠️ 待添加 |
| Rakuten | https://rakutenadvertising.com/blog/feed/ | ⚠️ 待添加 |
| PartnerBoost | - | ❌ 需爬虫 |

## 📝 下一步优化

1. 添加更多 RSS 源
2. 实现去重逻辑
3. 添加内容摘要 AI 生成
4. 接入数据库持久化
5. 添加 Webhook 通知秒哒更新
