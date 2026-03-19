export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  category: 'breaking' | 'top' | 'ai' | 'market';
}

export type CategoryType = 'breaking' | 'top' | 'ai' | 'market';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  searchPlaceholder: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'breaking', label: '要闻', searchPlaceholder: '搜索行业要闻...' },
  { id: 'top', label: '头部资讯', searchPlaceholder: '搜索头部平台资讯...' },
  { id: 'ai', label: 'AI知识库', searchPlaceholder: '搜索 AI 资讯...' },
  { id: 'market', label: '出海行情', searchPlaceholder: '搜索出海资讯...' },
];
