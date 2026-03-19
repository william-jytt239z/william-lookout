import { NewsItem } from '../types/news';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

// 生成基于ID的渐变色
const getGradientById = (id: string) => {
  const gradients = [
    'from-[#ff6b35]/30 via-[#ff8c5a]/20 to-[#ff6b35]/10',
    'from-[#4ecdc4]/30 via-[#44a08d]/20 to-[#4ecdc4]/10',
    'from-[#667eea]/30 via-[#764ba2]/20 to-[#667eea]/10',
    'from-[#f093fb]/30 via-[#f5576c]/20 to-[#f093fb]/10',
    'from-[#4facfe]/30 via-[#00f2fe]/20 to-[#4facfe]/10',
    'from-[#43e97b]/30 via-[#38f9d7]/20 to-[#43e97b]/10',
  ];
  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
};

const NewsCard = ({ news, isFeatured = false }: NewsCardProps) => {
  const gradientClass = getGradientById(news.id);

  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col bg-[#141414] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff6b35]/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,53,0.15)] ${
        isFeatured ? "md:flex-row min-h-[420px]" : "h-full"
      }`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Area */}
      <div className={`relative overflow-hidden flex items-center justify-center shrink-0 ${
        isFeatured ? "md:w-1/2 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"
      }`}>
        {/* Gradient background with pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm text-[#ff6b35] text-xs font-bold uppercase tracking-wider rounded-full border border-[#ff6b35]/30">
            {isFeatured ? 'Featured' : news.source}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/30 group-hover:bg-[#0a0a0a]/10 transition-colors duration-500" />
      </div>

      {/* Content Area */}
      <div className={`relative flex flex-col p-6 md:p-8 ${
        isFeatured ? "md:w-1/2 justify-center" : "flex-1"
      }`}>
        {/* Meta info */}
        <div className="flex items-center gap-3 mb-4 text-[#888888] text-xs md:text-sm">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {news.source}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#444444]" />
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {news.date}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-heading font-bold text-[#fafafa] mb-4 leading-tight group-hover:text-[#ff6b35] transition-colors duration-300 line-clamp-2 ${
          isFeatured ? "text-2xl md:text-4xl lg:text-5xl tracking-tight" : "text-lg md:text-xl"
        }`}>
          {news.title}
        </h3>

        {/* Summary */}
        <p className={`text-[#aaaaaa] leading-relaxed mb-6 line-clamp-3 ${
          isFeatured ? "text-base md:text-lg" : "text-sm"
        }`}>
          {news.summary}
        </p>

        {/* Read more */}
        <div className="mt-auto flex items-center text-[#ff6b35] font-semibold text-sm tracking-wide gap-2">
          <span className="relative">
            阅读全文
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#ff6b35] transition-all duration-300 group-hover:w-full" />
          </span>
          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
