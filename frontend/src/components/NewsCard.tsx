import { NewsItem } from '../types/news';
import { ExternalLink, Calendar, BookOpen, Newspaper } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

// 生成基于ID的渐变色（用于CSS假图片）
const getGradientById = (id: string) => {
  const gradients = [
    'from-[#ff6b35]/40 via-[#ff8c5a]/20 to-[#ff6b35]/10',
    'from-[#4ecdc4]/40 via-[#44a08d]/20 to-[#4ecdc4]/10',
    'from-[#667eea]/40 via-[#764ba2]/20 to-[#667eea]/10',
    'from-[#f093fb]/40 via-[#f5576c]/20 to-[#f093fb]/10',
    'from-[#4facfe]/40 via-[#00f2fe]/20 to-[#4facfe]/10',
    'from-[#43e97b]/40 via-[#38f9d7]/20 to-[#43e97b]/10',
  ];
  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
};

// 根据分类获取图标颜色
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'breaking': '#ff6b35',
    'top': '#4ecdc4',
    'ai': '#667eea',
    'market': '#43e97b'
  };
  return colors[category] || '#ff6b35';
};

const NewsCard = ({ news, isFeatured = false }: NewsCardProps) => {
  const gradientClass = getGradientById(news.id);
  const categoryColor = getCategoryColor(news.category);
  const hasRealImage = !!news.imageUrl;

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

      {/* Image Area - 真实图片 或 CSS 假图片 */}
      <div className={`relative overflow-hidden flex items-center justify-center shrink-0 ${
        isFeatured ? "md:w-1/2 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"
      }`}>
        
        {hasRealImage ? (
          // ✅ 有真实图片：显示真实图片
          <>
            <img
              src={news.imageUrl}
              alt={news.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // 图片加载失败时，隐藏 img 显示 fallback
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* 图片上的微妙渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
          </>
        ) : (
          // ✅ 无真实图片：CSS 生成的假图片
          <>
            {/* 1. 渐变背景层 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
            
            {/* 2. 网格纹理层 */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${news.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${news.id})`} />
            </svg>
            
            {/* 3. 中心装饰：图标 + 光晕 */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* 模糊光晕背景 */}
              <div 
                className="absolute w-24 h-24 rounded-full blur-2xl opacity-30"
                style={{ backgroundColor: categoryColor }}
              />
              {/* 图标 */}
              <Newspaper className="relative w-16 h-16 text-white/40" />
            </div>
            
            {/* 4. 底部装饰线 */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
              style={{ backgroundColor: categoryColor }}
            />
          </>
        )}
        
        {/* 分类标签（毛玻璃效果） */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-[#0a0a0a]/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
            {isFeatured ? 'Featured' : news.source}
          </span>
        </div>

        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-[#0a0a0a]/5 transition-colors duration-500" />
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
