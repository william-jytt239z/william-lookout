# William 瞭望台 - 部署指南

## 项目结构

```
william-lookout/
├── frontend/          # React + Vite 前端
├── backend/           # Python RSS 抓取
└── .github/workflows/ # 自动更新
```

## 部署到 Vercel

### 1. 准备代码

确保代码已推送到 GitHub 仓库。

### 2. Vercel 部署步骤

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "Add New Project"
3. 导入 GitHub 仓库
4. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 点击 "Deploy"

### 3. 自动更新配置

项目已配置 GitHub Actions，每天上午 9 点自动：
1. 运行 RSS 抓取脚本
2. 更新新闻数据
3. 重新部署网站

### 4. 数据源

- impact.com ✅
- CJ Junction ✅
- Awin ✅
- Rakuten ✅
- PartnerBoost ✅

## 本地开发

```bash
# 前端
cd frontend
npm install
npm run dev

# 后端
cd backend
pip install -r requirements.txt
python aggregator.py
```

## 访问地址

部署完成后，Vercel 会提供类似 `https://william-lookout.vercel.app` 的网址。
