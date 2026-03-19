#!/usr/bin/env python3
"""
William 瞭望台 - RSS/网页聚合器
抓取多个头部平台的 RSS 或网页，提取真实图片
"""

import json
import feedparser
import hashlib
import re
import ssl
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
from html import unescape
import logging
import sys

# 添加 backend 目录到路径
sys.path.insert(0, str(Path(__file__).parent))
from cj_scraper import CJScraper

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# 禁用 SSL 验证
ssl._create_default_https_context = ssl._create_unverified_context

# RSS 源配置
RSS_SOURCES = {
    'impact.com': {
        'url': 'https://impact.com/feed/',
        'name': 'impact.com',
        'category': 'top'
    }
}

# 网页抓取配置（RSS 失效时使用）
WEB_SOURCES = {
    'CJ Affiliate': {
        'url': 'https://www.cj.com/affiliate-news',
        'name': 'CJ',
        'category': 'top',
        'selectors': {
            'article': 'article, .blog-post, .news-item',
            'title': 'h2, h3, .title',
            'link': 'a',
            'summary': 'p, .excerpt',
            'date': 'time, .date',
            'image': 'img'
        }
    }
}

class RSSAggregator:
    def __init__(self, output_dir: str = './data'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.news_items = []
    
    def generate_id(self, title: str, source: str) -> str:
        content = f"{source}:{title}"
        return hashlib.md5(content.encode()).hexdigest()[:8]
    
    def parse_date(self, published) -> str:
        try:
            if hasattr(published, 'tm_year'):
                dt = datetime(*published[:6])
                return dt.strftime('%Y-%m-%d')
        except:
            pass
        return datetime.now().strftime('%Y-%m-%d')
    
    def clean_html(self, html: str) -> str:
        if not html:
            return ''
        text = unescape(html)
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:200] + '...' if len(text) > 200 else text
    
    def extract_image(self, entry: Dict) -> Optional[str]:
        # 方法 1: RSS 的 media:content
        if 'media_content' in entry and entry['media_content']:
            for media in entry['media_content']:
                if 'url' in media:
                    return media['url']
        
        # 方法 2: RSS 的 media_thumbnail
        if 'media_thumbnail' in entry and entry['media_thumbnail']:
            return entry['media_thumbnail'][0].get('url')
        
        # 方法 3: 从内容中提取 <img>
        content = entry.get('summary', '') or entry.get('description', '') or ''
        if isinstance(entry.get('content'), list) and len(entry['content']) > 0:
            content = entry['content'][0].get('value', '') + content
        
        if content:
            img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if img_match:
                url = img_match.group(1)
                if url.startswith('http'):
                    return url
                if url.startswith('//'):
                    return 'https:' + url
        
        return None
    
    def fetch_feed(self, source_name: str, config: Dict) -> List[Dict]:
        items = []
        
        try:
            logger.info(f"抓取 {source_name}: {config['url']}")
            
            feed = feedparser.parse(config['url'], 
                request_headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                })
            
            if not feed.entries:
                logger.warning(f"{source_name}: 没有获取到任何条目")
                return items
            
            for entry in feed.entries[:10]:  # 每个源取前10条
                image_url = self.extract_image(entry)
                
                title = self.clean_html(entry.get('title', ''))
                summary = self.clean_html(entry.get('summary', '') or entry.get('description', ''))
                
                if not title:
                    continue
                
                items.append({
                    'id': self.generate_id(title, source_name),
                    'title': title,
                    'source': config['name'],
                    'date': self.parse_date(entry.get('published_parsed') or entry.get('updated_parsed')),
                    'summary': summary or title,
                    'url': entry.get('link', ''),
                    'category': config['category'],
                    'imageUrl': image_url
                })
                
                if image_url:
                    logger.info(f"  ✅ {title[:40]}... (有图片)")
                else:
                    logger.info(f"  ⚠️ {title[:40]}... (无图片)")
            
            logger.info(f"✅ {source_name}: 成功抓取 {len(items)} 条")
                    
        except Exception as e:
            logger.error(f"❌ {source_name} 失败: {str(e)}")
        
        return items
    
    def aggregate(self):
        logger.info("🚀 开始 RSS 聚合...")
        
        # 抓取 RSS 源
        for source_name, config in RSS_SOURCES.items():
            items = self.fetch_feed(source_name, config)
            self.news_items.extend(items)
        
        # 抓取 CJ Affiliate (Playwright)
        logger.info("🕷️  开始抓取 CJ Affiliate...")
        try:
            cj_scraper = CJScraper()
            cj_items = cj_scraper.scrape()
            self.news_items.extend(cj_items)
            logger.info(f"✅ CJ Affiliate: 成功添加 {len(cj_items)} 条")
        except Exception as e:
            logger.error(f"❌ CJ Affiliate 抓取失败: {str(e)}")
        
        # 去重（基于 URL）
        seen_urls = set()
        unique_items = []
        for item in self.news_items:
            if item['url'] not in seen_urls:
                seen_urls.add(item['url'])
                unique_items.append(item)
        self.news_items = unique_items
        
        # 按日期排序
        self.news_items.sort(key=lambda x: x['date'], reverse=True)
        
        # 统计
        with_images = sum(1 for item in self.news_items if item['imageUrl'])
        cj_count = sum(1 for item in self.news_items if item['source'] == 'CJ Affiliate')
        logger.info(f"📊 共聚合 {len(self.news_items)} 条新闻（去重后）")
        logger.info(f"   - impact.com: {len(self.news_items) - cj_count} 条")
        logger.info(f"   - CJ Affiliate: {cj_count} 条")
        logger.info(f"   - 有图片: {with_images} 条")
    
    def save_json(self, filename: str = 'top-news.json'):
        output_path = self.output_dir / filename
        
        data = {
            'updated_at': datetime.now().isoformat(),
            'total': len(self.news_items),
            'with_images': sum(1 for item in self.news_items if item['imageUrl']),
            'sources': list(set(item['source'] for item in self.news_items)),
            'items': self.news_items
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        logger.info(f"💾 数据已保存到: {output_path}")
        return output_path

def main():
    aggregator = RSSAggregator(output_dir='./data')
    
    try:
        aggregator.aggregate()
    except Exception as e:
        logger.error(f"聚合过程出错: {str(e)}")
    
    if aggregator.news_items:
        aggregator.save_json('top-news.json')
        logger.info(f"✅ RSS 聚合完成！共 {len(aggregator.news_items)} 条")
    else:
        logger.warning("⚠️ 未抓取到任何新闻")

if __name__ == '__main__':
    main()
