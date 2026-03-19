import { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, CategoryType, NewsItem } from './types/news';
import { MOCK_NEWS } from './data/mockNews';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';

function App() {
  const [activeTab, setActiveTab] = useState<CategoryType>('top');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rssData, setRssData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载真实 RSS 数据
  useEffect(() => {
    // 添加随机参数绕过缓存
    const cacheBuster = `?t=${Date.now()}`;
    fetch(`/data/top-news.json${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        setRssData(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('加载 RSS 数据失败:', err);
        setLoading(false);
      });
  }, []);

  // 合并数据：RSS 数据 + Mock 数据
  const allNews = useMemo(() => {
    // RSS 数据优先，去重
    const rssUrls = new Set(rssData.map(n => n.url));
    const uniqueMockNews = MOCK_NEWS.filter(n => !rssUrls.has(n.url));
    return [...rssData, ...uniqueMockNews];
  }, [rssData]);

  const currentCategory = CATEGORIES.find(cat => cat.id === activeTab)!;

  const filteredNews = useMemo(() => {
    const categoryNews = allNews.filter(news => news.category === activeTab);
    
    // 按日期排序（最新的在前）
    const sortedNews = categoryNews.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    if (!searchKeyword.trim()) {
      return sortedNews;
    }
    
    const keyword = searchKeyword.toLowerCase();
    return sortedNews.filter(news => 
      news.title.toLowerCase().includes(keyword) ||
      news.summary.toLowerCase().includes(keyword) ||
      news.source.toLowerCase().includes(keyword)
    );
  }, [activeTab, searchKeyword, allNews]);

  const featuredNews = filteredNews[0];
  const regularNews = filteredNews.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#888888]">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#fafafa] mb-2 tracking-tight">
            {currentCategory.label}
          </h2>
          <p className="text-xl md:text-2xl text-[#888888] font-heading">
            {activeTab === 'breaking' && '把握行业脉动'}
            {activeTab === 'top' && '洞察头部动态'}
            {activeTab === 'ai' && '探索AI前沿'}
            {activeTab === 'market' && '掌握出海趋势'}
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          placeholder={currentCategory.searchPlaceholder}
          value={searchKeyword}
          onChange={setSearchKeyword}
        />

        {/* News List */}
        {filteredNews.length > 0 ? (
          <div className="space-y-6">
            {/* Featured News */}
            {featuredNews && (
              <NewsCard news={featuredNews} isFeatured={true} />
            )}
            
            {/* Regular News Grid */}
            {regularNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map(news => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#888888] text-xl">暂无相关新闻</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] mt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-heading font-bold text-[#fafafa] mb-2">
                William 瞭望台
              </h3>
              <p className="text-[#888888] max-w-md">
                深耕 Performance Marketing 行业，为您带来最有价值的新闻聚合与见解分享。
              </p>
            </div>
            <div className="text-[#888888] text-sm">
              © 2026 William Observatory. Built for Marketing Professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
