import React from 'react';
import { NewsItem } from '../types/news';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, isFeatured = false }) => {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col bg-card hover:bg-card/80 border border-border/50 hover:border-primary/40 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,53,0.1)] ${
        isFeatured ? "md:flex-row min-h-[400px]" : "h-full"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className={`relative overflow-hidden bg-muted flex items-center justify-center shrink-0 ${
        isFeatured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-heading font-bold uppercase tracking-widest rounded-full shadow-lg">
            {isFeatured ? '精选推荐' : '行业资讯'}
          </span>
        </div>
      </div>

      <div className={`relative flex flex-col p-6 md:p-8 ${
        isFeatured ? "md:w-1/2 justify-center" : "flex-1"
      }`}>
        <div className="flex items-center gap-4 mb-4 text-muted text-xs md:text-sm font-sans">
          <span className="flex items-center gap-1 hover:text-primary transition-colors duration-300">
            <BookOpen className="w-4 h-4" />
            {news.source}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {news.date}
          </span>
        </div>

        <h3 className={`font-heading font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 ${
          isFeatured ? "text-3xl md:text-4xl lg:text-5xl tracking-tighter" : "text-xl md:text-2xl"
        }`}>
          {news.title}
        </h3>

        <p className={`text-muted font-sans leading-relaxed mb-6 line-clamp-3 ${
          isFeatured ? "text-lg md:text-xl" : "text-sm md:text-base"
        }`}>
          {news.summary}
        </p>

        <div className="mt-auto flex items-center text-primary font-heading font-bold text-sm tracking-widest uppercase gap-2">
          <span>阅读全文</span>
          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
