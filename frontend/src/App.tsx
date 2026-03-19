import React, { useState, useMemo } from 'react';
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
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-2">
            {currentCategory.label}
          </h2>
          <p className="text-xl md:text-2xl text-muted font-heading">
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
            <p className="text-muted text-xl">没有找到相关新闻</p>
            <p className="text-muted/60 mt-2">请尝试其他关键词</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                William 瞭望台
              </h3>
              <p className="text-muted max-w-md">
                深耕 Performance Marketing 行业，为您带来最有价值的新闻聚合与见解分享。
              </p>
            </div>
            <div className="text-muted text-sm">
              © 2026 William Observatory. Built for Marketing Professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
