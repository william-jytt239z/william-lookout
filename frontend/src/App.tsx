import { useState, useMemo } from 'react';
import { CATEGORIES, CategoryType } from './types/news';
import { MOCK_NEWS } from './data/news';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';

function App() {
  const [activeTab, setActiveTab] = useState<CategoryType>('breaking');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentCategory = CATEGORIES.find(cat => cat.id === activeTab)!;

  const filteredNews = useMemo(() => {
    const categoryNews = MOCK_NEWS.filter(news => news.category === activeTab);
    
    if (!searchKeyword.trim()) {
      return categoryNews;
    }
    
    const keyword = searchKeyword.toLowerCase();
    return categoryNews.filter(news => 
      news.title.toLowerCase().includes(keyword) ||
      news.summary.toLowerCase().includes(keyword) ||
      news.source.toLowerCase().includes(keyword)
    );
  }, [activeTab, searchKeyword]);

  const featuredNews = filteredNews[0];
  const regularNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff6b35]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff6b35]/3 rounded-full blur-[120px]" />
      </div>
      
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 md:px-6 py-8 relative z-10">
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
            <p className="text-[#888888] text-xl">没有找到相关新闻</p>
            <p className="text-[#888888]/60 mt-2">请尝试其他关键词</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1f1f] mt-20 relative z-10">
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
