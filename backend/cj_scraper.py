#!/usr/bin/env python3
"""
CJ Affiliate 文章抓取器
使用 Playwright Stealth 模式抓取 junction.cj.com
"""

import json
import subprocess
import re
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class CJScraper:
    """CJ Affiliate 文章抓取器"""
    
    def __init__(self):
        self.url = "https://junction.cj.com/most-recent"
        self.source_name = "CJ Affiliate"
        self.category = "top"  # 头部资讯
        
    def scrape_with_playwright(self) -> Optional[str]:
        """使用 Playwright Stealth 抓取页面"""
        try:
            # 调用 playwright-scraper-skill 的 stealth 脚本
            skill_path = Path("C:/Users/t2390/.openclaw/workspace/agent-elsa/skills/playwright-scraper-skill")
            script_path = skill_path / "scripts" / "playwright-stealth.js"
            
            logger.info(f"🕷️  启动 Playwright 抓取 CJ...")
            
            result = subprocess.run(
                ["node", str(script_path), self.url],
                capture_output=True,
                timeout=120,
                cwd=str(skill_path)
            )
            
            # 使用 UTF-8 解码输出
            stdout = result.stdout.decode('utf-8', errors='ignore') if result.stdout else ""
            stderr = result.stderr.decode('utf-8', errors='ignore') if result.stderr else ""
            
            if result.returncode != 0:
                logger.error(f"Playwright 执行失败: {stderr}")
                return None
            
            # 解析 JSON 输出
            # Playwright 输出包含日志和 JSON，需要提取 JSON 部分
            json_start = stdout.find('{')
            json_end = stdout.rfind('}')
            
            if json_start != -1 and json_end != -1 and json_end > json_start:
                json_str = stdout[json_start:json_end+1]
                try:
                    data = json.loads(json_str)
                    if 'contentPreview' in data:
                        return data.get('contentPreview', '')
                except json.JSONDecodeError as e:
                    logger.warning(f"JSON 解析失败: {e}")
            
            # 如果没找到 JSON，返回原始输出
            return stdout
            
        except subprocess.TimeoutExpired:
            logger.error("Playwright 抓取超时")
            return None
        except Exception as e:
            logger.error(f"Playwright 抓取出错: {str(e)}")
            return None
    
    def parse_articles(self, content: str) -> List[Dict]:
        """解析 contentPreview 提取文章列表"""
        articles = []
        
        if not content:
            return articles
        
        try:
            # contentPreview 格式示例：
            # ARTICLE
            # Plug into Growth with CJ's Ecommerce Plugins
            # 
            # Brands are always looking for easy ways to expand...
            # 
            # Innovation ,
            # Mar 16, 2026
            
            lines = content.split('\n')
            i = 0
            
            while i < len(lines):
                line = lines[i].strip()
                
                # 检测文章类型
                if line in ['ARTICLE', 'CASE STUDY', 'NEWS', 'REPORT']:
                    # 下一行是标题
                    if i + 1 < len(lines):
                        title = lines[i + 1].strip()
                        
                        # 跳过空行找到摘要
                        summary = ""
                        j = i + 2
                        while j < len(lines):
                            s_line = lines[j].strip()
                            # 遇到下一个标记或日期格式就停止
                            if s_line in ['ARTICLE', 'CASE STUDY', 'NEWS', 'REPORT', 'Read more', 'Read article']:
                                break
                            if re.match(r'^[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}$', s_line):
                                break
                            if re.match(r'^([A-Z][a-z]+\s*,\s*)+[A-Z][a-z]+\s*,?$', s_line):
                                break
                            if s_line and not s_line.startswith('toggle') and not s_line.startswith('Most Recent'):
                                summary += s_line + " "
                            j += 1
                        
                        summary = summary.strip()
                        
                        # 查找标签和日期
                        tags = []
                        date_formatted = datetime.now().strftime('%Y-%m-%d')
                        
                        for k in range(j, min(j + 5, len(lines))):
                            k_line = lines[k].strip()
                            
                            # 匹配标签行: "Innovation ," 或 "Travel , Content Commerce"
                            tag_match = re.match(r'^((?:[A-Z][a-z]+\s*,\s*)+[A-Z][a-z]+)\s*,?$', k_line)
                            if tag_match:
                                tags = [t.strip() for t in tag_match.group(1).split(',')]
                                continue
                            
                            # 匹配日期: "Mar 16, 2026"
                            date_match = re.match(r'^([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})$', k_line)
                            if date_match:
                                try:
                                    date_obj = datetime.strptime(date_match.group(1), '%b %d, %Y')
                                    date_formatted = date_obj.strftime('%Y-%m-%d')
                                except:
                                    pass
                                break
                        
                        # 确保有标题和摘要
                        if title and len(title) > 5 and summary and len(summary) > 10:
                            article_id = f"cj_{hash(title) % 10000000:07d}"
                            articles.append({
                                'id': article_id,
                                'title': title,
                                'source': self.source_name,
                                'date': date_formatted,
                                'summary': summary[:200] + '...' if len(summary) > 200 else summary,
                                'url': "https://junction.cj.com/most-recent",
                                'category': self.category,
                                'imageUrl': None,
                                'tags': tags
                            })
                            logger.info(f"  ✅ 解析文章: {title[:50]}... ({date_formatted})")
                        
                        i = j
                        continue
                
                i += 1
                
        except Exception as e:
            logger.error(f"解析文章出错: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
        
        return articles
    
    def _parse_fallback(self, content: str) -> List[Dict]:
        """备用解析方案"""
        articles = []
        lines = content.split('\n')
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            # 检测文章类型标记
            if line in ['ARTICLE', 'CASE STUDY', 'NEWS', 'REPORT']:
                if i + 1 < len(lines):
                    title = lines[i + 1].strip()
                    
                    # 查找摘要（接下来的非空行）
                    summary = ""
                    j = i + 2
                    while j < len(lines) and lines[j].strip() and not lines[j].strip().startswith('Read'):
                        summary += lines[j].strip() + " "
                        j += 1
                    
                    # 查找日期
                    date_formatted = datetime.now().strftime('%Y-%m-%d')
                    for k in range(i, min(i + 10, len(lines))):
                        date_match = re.search(r'([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})', lines[k])
                        if date_match:
                            try:
                                date_obj = datetime.strptime(date_match.group(1), '%b %d, %Y')
                                date_formatted = date_obj.strftime('%Y-%m-%d')
                            except:
                                pass
                            break
                    
                    if title and len(title) > 10:
                        article_id = f"cj_{hash(title) % 10000000:07d}"
                        articles.append({
                            'id': article_id,
                            'title': title,
                            'source': self.source_name,
                            'date': date_formatted,
                            'summary': summary[:200] + '...' if len(summary) > 200 else summary,
                            'url': "https://junction.cj.com/most-recent",
                            'category': self.category,
                            'imageUrl': None,
                            'tags': []
                        })
                        logger.info(f"  ✅ 解析文章: {title[:50]}... ({date_formatted})")
                    
                    i = j
                    continue
            
            i += 1
        
        return articles
    
    def scrape(self) -> List[Dict]:
        """主抓取函数"""
        logger.info(f"🚀 开始抓取 {self.source_name}...")
        
        # 抓取页面内容
        content = self.scrape_with_playwright()
        
        if not content:
            logger.error("❌ 抓取失败，无内容返回")
            return []
        
        # 解析文章
        articles = self.parse_articles(content)
        
        logger.info(f"✅ {self.source_name}: 成功抓取 {len(articles)} 条")
        return articles

def main():
    """测试脚本"""
    scraper = CJScraper()
    articles = scraper.scrape()
    
    if articles:
        # 保存到文件
        output_dir = Path('./data')
        output_dir.mkdir(exist_ok=True)
        
        output_file = output_dir / 'cj-news.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'updated_at': datetime.now().isoformat(),
                'total': len(articles),
                'items': articles
            }, f, ensure_ascii=False, indent=2)
        
        logger.info(f"💾 数据已保存到: {output_file}")
        
        # 打印预览
        logger.info("\n📰 抓取结果预览:")
        for i, article in enumerate(articles[:5], 1):
            logger.info(f"\n{i}. {article['title']}")
            logger.info(f"   日期: {article['date']}")
            logger.info(f"   摘要: {article['summary'][:80]}...")
    else:
        logger.warning("⚠️ 未抓取到任何文章")

if __name__ == '__main__':
    main()
