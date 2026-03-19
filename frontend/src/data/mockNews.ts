import { NewsItem } from '../types/news';

// RSS 抓取的真实数据（目前只有 impact.com 可用）
export const RSS_NEWS: NewsItem[] = [];

// 静态数据 - 仅 impact.com 真实文章
export const MOCK_NEWS: NewsItem[] = [
  // 头部资讯 - impact.com 真实文章
  {
    id: 't1',
    title: 'Hakan Özal Joins impact.com to Drive Enterprise Partnership Growth in DACH',
    source: 'impact.com',
    date: '2026-03-17',
    summary: 'Partnership marketing platform strengthens its approach in the German-speaking region, helping brands integrate cross-channel partnerships.',
    url: 'https://impact.com/press-releases/impact-com-hakan-ozal-dach-enterprise/',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2022/05/Impact-Press-release.png'
  },
  {
    id: 't2',
    title: '2026 APAC affiliate travel marketing trends + key partnership strategies',
    source: 'impact.com',
    date: '2026-03-16',
    summary: 'APAC travellers are turning to trusted recommendations more than advertising when making travel decisions.',
    url: 'https://impact.com/affiliate/affiliate-travel-marketing/',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/travel-marketing-trends.webp'
  },
  {
    id: 't3',
    title: "Advertising's Not Dead, But the Balance is Shifting",
    source: 'impact.com',
    date: '2026-03-12',
    summary: "Advertising's Not Dead, But the Balance is Shifting, Says David Yovanno.",
    url: 'https://impact.com/?bylines=advertisings-not-dead-but-the-balance-is-shifting-says-david-yovanno',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2022/12/hello-partner.png'
  },
  {
    id: 't4',
    title: '12 highest-paying travel affiliate programs in 2026',
    source: 'impact.com',
    date: '2026-03-05',
    summary: 'Travel publishers drive more affiliate research traffic than almost any other content category.',
    url: 'https://impact.com/affiliate/travel-affiliate-programs/',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/travel-affiliate.webp'
  },
  {
    id: 't5',
    title: 'Knowing your partner: defense against affiliate marketing scams',
    source: 'impact.com',
    date: '2026-03-04',
    summary: 'Your affiliate marketing dashboards are lying to you. Sophisticated AI scams and attribution hijacking.',
    url: 'https://impact.com/partnerships/affiliate-marketing-scams/',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/affiliate-marketing-scams.webp'
  },
  {
    id: 't6',
    title: '5 social commerce examples: How real brands turn strategies into sales',
    source: 'impact.com',
    date: '2026-03-02',
    summary: 'Most brands treat social commerce as a content problem. These five examples show why the real lever.',
    url: 'https://impact.com/influencer/social-commerce-examples/',
    category: 'top',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/social-commerce-2-1.webp'
  },

  // 要闻 - impact.com 真实文章
  {
    id: 'b1',
    title: 'Hakan Özal Joins impact.com to Drive Enterprise Partnership Growth in DACH',
    source: 'impact.com',
    date: '2026-03-17',
    summary: 'Partnership marketing platform strengthens its approach in the German-speaking region, helping brands integrate cross-channel partnerships.',
    url: 'https://impact.com/press-releases/impact-com-hakan-ozal-dach-enterprise/',
    category: 'breaking',
    imageUrl: 'https://impact.com/wp-content/uploads/2022/05/Impact-Press-release.png'
  },
  {
    id: 'b2',
    title: '2026 APAC affiliate travel marketing trends + key partnership strategies',
    source: 'impact.com',
    date: '2026-03-16',
    summary: 'APAC travellers are turning to trusted recommendations more than advertising when making travel decisions.',
    url: 'https://impact.com/affiliate/affiliate-travel-marketing/',
    category: 'breaking',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/travel-marketing-trends.webp'
  },
  {
    id: 'b3',
    title: "Advertising's Not Dead, But the Balance is Shifting",
    source: 'impact.com',
    date: '2026-03-12',
    summary: "Advertising's Not Dead, But the Balance is Shifting, Says David Yovanno.",
    url: 'https://impact.com/?bylines=advertisings-not-dead-but-the-balance-is-shifting-says-david-yovanno',
    category: 'breaking',
    imageUrl: 'https://impact.com/wp-content/uploads/2022/12/hello-partner.png'
  },

  // AI知识库 - impact.com 真实文章
  {
    id: 'a1',
    title: '12 highest-paying travel affiliate programs in 2026',
    source: 'impact.com',
    date: '2026-03-05',
    summary: 'Travel publishers drive more affiliate research traffic than almost any other content category.',
    url: 'https://impact.com/affiliate/travel-affiliate-programs/',
    category: 'ai',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/travel-affiliate.webp'
  },
  {
    id: 'a2',
    title: 'Knowing your partner: defense against affiliate marketing scams',
    source: 'impact.com',
    date: '2026-03-04',
    summary: 'Your affiliate marketing dashboards are lying to you. Sophisticated AI scams and attribution hijacking.',
    url: 'https://impact.com/partnerships/affiliate-marketing-scams/',
    category: 'ai',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/affiliate-marketing-scams.webp'
  },
  {
    id: 'a3',
    title: '5 social commerce examples: How real brands turn strategies into sales',
    source: 'impact.com',
    date: '2026-03-02',
    summary: 'Most brands treat social commerce as a content problem. These five examples show why the real lever.',
    url: 'https://impact.com/influencer/social-commerce-examples/',
    category: 'ai',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/social-commerce-2-1.webp'
  },

  // 出海行情 - impact.com 真实文章
  {
    id: 'm1',
    title: 'Hakan Özal Joins impact.com to Drive Enterprise Partnership Growth in DACH',
    source: 'impact.com',
    date: '2026-03-17',
    summary: 'Partnership marketing platform strengthens its approach in the German-speaking region, helping brands integrate cross-channel partnerships.',
    url: 'https://impact.com/press-releases/impact-com-hakan-ozal-dach-enterprise/',
    category: 'market',
    imageUrl: 'https://impact.com/wp-content/uploads/2022/05/Impact-Press-release.png'
  },
  {
    id: 'm2',
    title: '2026 APAC affiliate travel marketing trends + key partnership strategies',
    source: 'impact.com',
    date: '2026-03-16',
    summary: 'APAC travellers are turning to trusted recommendations more than advertising when making travel decisions.',
    url: 'https://impact.com/affiliate/affiliate-travel-marketing/',
    category: 'market',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/travel-marketing-trends.webp'
  },
  {
    id: 'm3',
    title: '5 social commerce examples: How real brands turn strategies into sales',
    source: 'impact.com',
    date: '2026-03-02',
    summary: 'Most brands treat social commerce as a content problem. These five examples show why the real lever.',
    url: 'https://impact.com/influencer/social-commerce-examples/',
    category: 'market',
    imageUrl: 'https://impact.com/wp-content/uploads/2026/03/social-commerce-2-1.webp'
  },
];

// 合并数据（RSS + Mock）
export const ALL_NEWS: NewsItem[] = [...RSS_NEWS, ...MOCK_NEWS];
