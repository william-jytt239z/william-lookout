#!/usr/bin/env python3
"""
William 瞭望台 - RSS 聚合器
抓取多个头部平台的 RSS，生成 JSON 数据
"""

import json
import feedparser
import hashlib
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# RSS 源配置
RSS_SOURCES = {
    'impact.com': {
        'url': 'https://impact.com/feed/',
        'name': 'impact.com',
        'category': 'top'
    },
    'CJ Junction': {
        'url': 'https://junction.cj.com/rss.xml',
        'name': 'CJ',
        'category': 'top',
        'fallback': 'https://junction.cj.com/feed/'
    },
    'Awin': {
        'url': 'https://www.awin.com/blog/rss',
        'name': 'Awin',
        'category': 'top'
    },
    'Rakuten': {
        'url': 'https://rakutenadvertising.com/blog/feed/',
        'name': 'Rakuten',
        'category': 'top'
    },
    'PartnerBoost': {
        'url': 'https://partnerboost.com/feed/',
        'name': 'PartnerBoost',
        'category': 'top'
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
        import re
        text = re.sub(r'<[^>]+>', '', html)
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:200] + '...' if len(text) > 200 else text
    
    def fetch_feed(self, source_name: str, config: Dict) -> List[Dict]:
        items = []
        urls_to_try = [config['url']]
        if 'fallback' in config:
            urls_to_try.append(config['fallback'])
        
        for url in urls_to_try:
            try:
                logger.info(f"抓取 {source_name}: {url}")
                feed = feedparser.parse(url)
                
                if feed.bozo:
                    logger.warning(f"{source_name} 解析警告: {feed.bozo_exception}")
                
                for entry in feed.entries[:5]:  # 每个源取前5条
                    news_item = {
                        'id': self.generate_id(entry.get('title', ''), source_name),
                        'title': entry.get('title', ''),
                        'source': config['name'],
                        'date': self.parse_date(entry.get('published_parsed') or entry.get('updated_parsed')),
                        'summary': self.clean_html(entry.get('summary', '') or entry.get('description', '')),
                        'url': entry.get('link', ''),
                        'category': config['category']
                    }
                    items.append(news_item)
                
                if items:
                    logger.info(f"✅ {source_name}: 成功抓取 {len(items)} 条")
                    return items
                    
            except Exception as e:
                logger.error(f"❌ {source_name} 失败 ({url}): {str(e)}")
                continue
        
        return items
    
    def aggregate(self):
        logger.info("🚀 开始 RSS 聚合...")
        
        for source_name, config in RSS_SOURCES.items():
            items = self.fetch_feed(source_name, config)
            self.news_items.extend(items)
        
        # 按日期排序（最新的在前）
        self.news_items.sort(key=lambda x: x['date'], reverse=True)
        
        logger.info(f"📊 共聚合 {len(self.news_items)} 条新闻")
    
    def save_json(self, filename: str = 'top-news.json'):
        output_path = self.output_dir / filename
        
        data = {
            'updated_at': datetime.now().isoformat(),
            'total': len(self.news_items),
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
