#!/usr/bin/env python3
"""
William 瞭望台 - RSS 聚合器
抓取多个头部平台的 RSS，提取真实图片，生成 JSON 数据
"""

import json
import feedparser
import hashlib
import re
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
        text = re.sub(r'<[^>]+>', '', html)
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:200] + '...' if len(text) > 200 else text
    
    def extract_image(self, entry: Dict) -> Optional[str]:
        """从 RSS entry 中提取图片 URL"""
        # 方法 1: RSS 的 media:content
        if 'media_content' in entry and entry['media_content']:
            for media in entry['media_content']:
                if 'url' in media:
                    return media['url']
        
        # 方法 2: RSS 的 media_thumbnail
        if 'media_thumbnail' in entry and entry['media_thumbnail']:
            return entry['media_thumbnail'][0].get('url')
        
        # 方法 3: 从 summary/content 中提取 <img>
        content = entry.get('summary', '') or entry.get('description', '') or entry.get('content', [{}])[0].get('value', '')
        if content:
            # 查找 <img src="...">
            img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if img_match:
                url = img_match.group(1)
                # 确保是绝对 URL
                if url.startswith('http'):
                    return url
        
        # 方法 4: 从 enclosures 中提取
        if 'enclosures' in entry and entry['enclosures']:
            for enc in entry['enclosures']:
                if enc.get('type', '').startswith('image/'):
                    return enc.get('href')
        
        return None
    
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
                    # 提取图片
                    image_url = self.extract_image(entry)
                    
                    news_item = {
                        'id': self.generate_id(entry.get('title', ''), source_name),
                        'title': entry.get('title', ''),
                        'source': config['name'],
                        'date': self.parse_date(entry.get('published_parsed') or entry.get('updated_parsed')),
                        'summary': self.clean_html(entry.get('summary', '') or entry.get('description', '')),
                        'url': entry.get('link', ''),
                        'category': config['category'],
                        'imageUrl': image_url  # 可能为 None
                    }
                    items.append(news_item)
                    
                    if image_url:
                        logger.info(f"  ✅ 找到图片: {image_url[:60]}...")
                    else:
                        logger.info(f"  ⚠️ 无图片")
                
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
        
        # 统计
        with_images = sum(1 for item in self.news_items if item['imageUrl'])
        logger.info(f"📊 共聚合 {len(self.news_items)} 条新闻，其中 {with_images} 条有图片")
    
    def save_json(self, filename: str = 'top-news.json'):
        output_path = self.output_dir / filename
        
        data = {
            'updated_at': datetime.now().isoformat(),
            'total': len(self.news_items),
            'with_images': sum(1 for item in self.news_items if item['imageUrl']),
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
