#!/usr/bin/env python3
"""
William 瞭望台 - RSS 聚合器 MVP
抓取头部资讯平台 RSS，生成 JSON 数据供前端使用
"""

import json
import feedparser
import hashlib
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
import logging

# 配置日志
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
        'url': 'https://junction.cj.com/rss.xml',  # 尝试标准 RSS 地址
        'name': 'CJ',
        'category': 'top',
        'fallback': 'https://junction.cj.com/feed/'  # 备用地址
    }
}

class RSSAggregator:
    def __init__(self, output_dir: str = './data'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.news_items = []
    
    def generate_id(self, title: str, source: str) -> str:
        """生成唯一ID"""
        content = f"{source}:{title}"
        return hashlib.md5(content.encode()).hexdigest()[:8]
    
    def parse_date(self, published: str) -> str:
        """解析并格式化日期"""
        try:
            # feedparser 返回的是 time.struct_time
            dt = datetime(*published[:6])
            return dt.strftime('%Y-%m-%d')
        except:
            # 如果解析失败，返回今天
            return datetime.now().strftime('%Y-%m-%d')
    
    def clean_html(self, html: str) -> str:
        """去除 HTML 标签，提取纯文本"""
        import re
        # 移除 HTML 标签
        text = re.sub(r'<[^>]+>', '', html)
        # 移除多余空白
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def fetch_feed(self, source_name: str, config: Dict) -> List[Dict]:
        """抓取单个 RSS 源"""
        items = []
        urls_to_try = [config['url']]
        
        if 'fallback' in config:
            urls_to_try.append(config['fallback'])
        
        for url in urls_to_try:
            try:
                logger.info(f"正在抓取 {source_name}: {url}")
                feed = feedparser.parse(url)
                
                if feed.bozo:
                    logger.warning(f"{source_name} 解析警告: {feed.bozo_exception}")
                
                for entry in feed.entries[:10]:  # 每个源取前10条
                    news_item = {
                        'id': self.generate_id(entry.get('title', ''), source_name),
                        'title': entry.get('title', ''),
                        'source': config['name'],
                        'date': self.parse_date(entry.get('published_parsed') or entry.get('updated_parsed')),
                        'summary': self.clean_html(entry.get('summary', '') or entry.get('description', ''))[:200] + '...',
                        'url': entry.get('link', ''),
                        'category': config['category'],
                        'imageUrl': self.extract_image(entry)
                    }
                    items.append(news_item)
                
                if items:
                    logger.info(f"✅ {source_name}: 成功抓取 {len(items)} 条新闻")
                    return items
                    
            except Exception as e:
                logger.error(f"❌ {source_name} 抓取失败 ({url}): {str(e)}")
                continue
        
        return items
    
    def extract_image(self, entry: Dict) -> Optional[str]:
        """从 entry 中提取图片 URL"""
        # 尝试不同的字段获取图片
        if 'media_content' in entry:
            return entry['media_content'][0].get('url', '')
        if 'media_thumbnail' in entry:
            return entry['media_thumbnail'][0].get('url', '')
        
        # 从内容中提取
        import re
        content = entry.get('summary', '') + entry.get('description', '')
        img_match = re.search(r'src="([^"]+\.(?:jpg|jpeg|png|gif|webp))"', content, re.IGNORECASE)
        if img_match:
            return img_match.group(1)
        
        # 返回占位图
        return 'placeholder-news.jpg'
    
    def aggregate(self):
        """聚合所有 RSS 源"""
        logger.info("🚀 开始 RSS 聚合...")
        
        for source_name, config in RSS_SOURCES.items():
            items = self.fetch_feed(source_name, config)
            self.news_items.extend(items)
        
        # 按日期排序（最新的在前）
        self.news_items.sort(key=lambda x: x['date'], reverse=True)
        
        logger.info(f"📊 共聚合 {len(self.news_items)} 条新闻")
    
    def save_json(self, filename: str = 'top-news.json'):
        """保存为 JSON 文件"""
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
    
    def generate_mock_data(self, count: int = 6) -> List[Dict]:
        """当 RSS 抓取失败时，生成 Mock 数据作为备用"""
        mock_titles = [
            "impact.com 发布 2026 全球合作伙伴经济展望报告",
            "CJ Affiliate 推出 AI 驱动的合作伙伴发现工具",
            "Awin 宣布全新品牌升级，聚焦可持续发展联盟营销",
            "Rakuten Advertising 2026 年 Q1 业绩创历史新高",
            "PartnerBoost 获得 B 轮融资，加速亚太市场扩张",
            "TikTok Shop 与 CJ 达成战略合作，开放联盟接口"
        ]
        
        mock_items = []
        for i in range(min(count, len(mock_titles))):
            mock_items.append({
                'id': f'mock-{i}',
                'title': mock_titles[i],
                'source': ['impact.com', 'CJ', 'Awin', 'Rakuten', 'PartnerBoost'][i % 5],
                'date': datetime.now().strftime('%Y-%m-%d'),
                'summary': f'这是一则来自头部平台的最新资讯，展示了 {mock_titles[i][:20]}...',
                'url': 'https://example.com',
                'category': 'top',
                'imageUrl': f'placeholder-top-{i+1}.jpg'
            })
        
        return mock_items

def main():
    """主函数"""
    aggregator = RSSAggregator(output_dir='./data')
    
    try:
        # 尝试抓取 RSS
        aggregator.aggregate()
        
        # 如果抓取失败，使用 Mock 数据
        if not aggregator.news_items:
            logger.warning("⚠️ RSS 抓取失败，使用 Mock 数据")
            aggregator.news_items = aggregator.generate_mock_data(6)
    
    except Exception as e:
        logger.error(f"❌ 聚合过程出错: {str(e)}")
        aggregator.news_items = aggregator.generate_mock_data(6)
    
    # 保存数据
    output_path = aggregator.save_json('top-news.json')
    
    logger.info(f"✅ RSS 聚合完成！输出文件: {output_path}")
    
    # 打印前 3 条新闻预览
    print("\n📰 最新头部资讯预览:")
    print("-" * 80)
    for i, item in enumerate(aggregator.news_items[:3], 1):
        print(f"{i}. {item['title']}")
        print(f"   来源: {item['source']} | 日期: {item['date']}")
        print(f"   摘要: {item['summary'][:100]}...")
        print()

if __name__ == '__main__':
    main()
