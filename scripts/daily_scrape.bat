@echo off
chcp 65001 >nul
REM William 瞭望台 - 每天早上 9 点自动抓取新闻

echo [%date% %time%] 开始执行新闻抓取...

cd /d "C:\Users\t2390\.openclaw\workspace\agent-nicole\projects\william-lookout\backend"

REM 激活虚拟环境（如果有）
REM call ..\venv\Scripts\activate.bat

REM 运行聚合器
python aggregator.py

REM 如果有更新，推送到 GitHub（触发 Vercel 重新部署）
cd /d "C:\Users\t2390\.openclaw\workspace\agent-nicole\projects\william-lookout"
git add data/top-news.json
git commit -m "Auto-update news: %date% %time%"
git push origin main

echo [%date% %time%] 新闻抓取完成！
