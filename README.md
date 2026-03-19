# William 瞭望台 - 本地版

Performance Marketing 新闻聚合网站

## 项目结构

```
william-lookout/
├── frontend/          # React + Vite 前端
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Python RSS 抓取
│   ├── aggregator.py
│   └── requirements.txt
└── .github/
    └── workflows/     # 自动更新
```

## 数据源

- impact.com
- CJ Affiliate
- Awin
- Rakuten Advertising
- PartnerBoost

## 部署

Vercel (前端) + GitHub Actions (定时更新)
