import { NewsItem } from '../types/news';

// RSS 抓取的真实数据
export const RSS_NEWS: NewsItem[] = [];

// 静态 Mock 数据（其他平台）- 带主题相关图片
export const MOCK_NEWS: NewsItem[] = [
  // 头部资讯 - CJ (带图片)
  {
    id: 'cj1',
    title: 'CJ 发布 2026 合作伙伴营销趋势报告',
    source: 'CJ',
    date: '2026-03-18',
    summary: '报告显示，跨渠道归因和实时数据分析正在成为合作伙伴营销的核心能力。CJ 平台已升级其 AI 驱动的匹配算法。',
    url: 'https://www.cj.com/press-releases/2026-trends-report/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop'
  },
  {
    id: 'cj2',
    title: 'CJ 与 Snapchat 达成战略合作，拓展社交电商生态',
    source: 'CJ',
    date: '2026-03-15',
    summary: '此次合作将允许品牌通过 CJ 平台直接对接 Snapchat 的创作者资源，实现从内容到转化的完整链路追踪。',
    url: 'https://www.cj.com/news/cj-snapchat-partnership/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop'
  },
  {
    id: 'cj3',
    title: 'CJ 推出全新归因模型：多触点旅程可视化',
    source: 'CJ',
    date: '2026-03-12',
    summary: '新功能让广告主能够清晰看到消费者从首次接触到最终转化的完整路径，优化预算分配。',
    url: 'https://www.cj.com/product-updates/attribution-model/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'
  },

  // 头部资讯 - Awin (带图片)
  {
    id: 'awin1',
    title: 'Awin 收购 Green Tag，强化可持续营销能力',
    source: 'Awin',
    date: '2026-03-17',
    summary: '通过这次收购，Awin 将能够为品牌提供更全面的碳中和营销解决方案，追踪合作伙伴的环境影响。',
    url: 'https://www.awin.com/news/green-tag-acquisition/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop'
  },
  {
    id: 'awin2',
    title: 'Awin 欧洲市场报告：电商联盟支出增长 23%',
    source: 'Awin',
    date: '2026-03-14',
    summary: '2026 年 Q1 数据显示，欧洲市场的联盟营销支出同比增长 23%，其中时尚和美妆品类领跑。',
    url: 'https://www.awin.com/reports/europe-q1-2026/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=450&fit=crop'
  },

  // 头部资讯 - Rakuten (带图片)
  {
    id: 'rak1',
    title: 'Rakuten Advertising 推出亚太创作者网络',
    source: 'Rakuten',
    date: '2026-03-16',
    summary: '新网络覆盖日本、韩国、东南亚等地的 5,000+ 创作者，帮助品牌打入亚洲消费市场。',
    url: 'https://rakutenadvertising.com/news/apac-creator-network/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&h=450&fit=crop'
  },
  {
    id: 'rak2',
    title: 'Rakuten 积分联盟：忠诚度营销的新玩法',
    source: 'Rakuten',
    date: '2026-03-10',
    summary: '将联盟营销与忠诚度积分结合，消费者通过合作伙伴购物可获得 Rakuten 积分，提升复购率。',
    url: 'https://rakutenadvertising.com/blog/loyalty-affiliate/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop'
  },

  // 头部资讯 - PartnerBoost (带图片)
  {
    id: 'pb1',
    title: 'PartnerBoost 获 3000 万美元 B 轮融资',
    source: 'PartnerBoost',
    date: '2026-03-13',
    summary: '本轮融资由红杉资本领投，资金将用于技术研发和亚太市场扩张，特别是中国和印度市场。',
    url: 'https://partnerboost.com/news/series-b-funding/',
    category: 'top',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=450&fit=crop'
  },

  // 要闻 (带图片)
  {
    id: 'b1',
    title: '2026年全球联盟营销支出预计将突破180亿美元',
    source: 'Performance Insider',
    date: '2026-03-18',
    summary: '随着数字化转型的深入，品牌方在效果营销领域的投入持续增长。最新报告指出，合作伙伴营销已成为企业获取高质量流量的核心途径。',
    url: 'https://example.com/news1',
    category: 'breaking',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop'
  },
  {
    id: 'b2',
    title: 'Google 隐私沙盒全面推行，Cookies 时代正式终结',
    source: 'TechCrunch',
    date: '2026-03-15',
    summary: '联盟营销人员面临归因挑战，新的第一方数据解决方案正在成为行业标准。如何平衡用户隐私与营销效果是当前最大的课题。',
    url: 'https://example.com/news2',
    category: 'breaking',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop'
  },
  {
    id: 'b3',
    title: '影响者营销与效果营销的深度融合：2026年新趋势',
    source: 'Marketing Dive',
    date: '2026-03-12',
    summary: '越来越多的品牌开始按效果向影响者支付佣金，而非传统的一次性费用。这种模式正在改变创作者经济的运作方式。',
    url: 'https://example.com/news3',
    category: 'breaking',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop'
  },

  // AI知识库 (带图片)
  {
    id: 'a1',
    title: '生成式 AI 正在改变营销人员的日常创作流程',
    source: 'AI Marketing Hub',
    date: '2026-03-19',
    summary: '从个性化邮件主题到实时 Banner 图片，AI 正在将营销人员从繁琐的基础工作中解放出来，让他们更专注于策略与创意。',
    url: 'https://example.com/ai1',
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop'
  },
  {
    id: 'a2',
    title: '利用 LLM 构建智能客服机器人实现销售转化',
    source: 'The AI Journal',
    date: '2026-03-16',
    summary: '探索如何将大语言模型集成到官网客服系统中，通过自然语言对话解答用户疑问，实现 24/7 的自动化转化。',
    url: 'https://example.com/ai2',
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop'
  },
  {
    id: 'a3',
    title: 'AI 预测性分析在效果营销中的实践前沿',
    source: 'Data Science Daily',
    date: '2026-03-13',
    summary: '通过历史数据和实时信号，机器学习模型可以准确预测哪些点击最有可能转化，帮助营销人员提前调整资源分配。',
    url: 'https://example.com/ai3',
    category: 'ai',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop'
  },

  // 出海行情 (带图片)
  {
    id: 'm1',
    title: '中国出海应用席卷欧美市场：2026 年新贵品类分析',
    source: 'Global Commerce Report',
    date: '2026-03-19',
    summary: 'Temu, SHEIN 和 TikTok Shop 等应用正在改变欧美消费者的购物习惯，全托管模式正在改变跨境电商的游戏规则。',
    url: 'https://example.com/market1',
    category: 'market',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop'
  },
  {
    id: 'm2',
    title: '中东市场成为出海新热土：本地支付习惯是关键',
    source: 'Middle East Tech',
    date: '2026-03-17',
    summary: '沙特和阿联酋市场消费力强劲，但本地化支付偏好和宗教文化合规仍是出海企业需要重点关注的问题。',
    url: 'https://example.com/market2',
    category: 'market',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=450&fit=crop'
  },
  {
    id: 'm3',
    title: '短剧出海爆发：中国内容产业的全球化新路径',
    source: 'Content Export News',
    date: '2026-03-14',
    summary: '短剧应用在北美和欧洲市场迅速崛起，通过精准的内容投放和创新的变现模式，中国内容产业正在开辟新蓝海。',
    url: 'https://example.com/market3',
    category: 'market',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=450&fit=crop'
  },
];

// 合并数据（RSS + Mock）
export const ALL_NEWS: NewsItem[] = [...RSS_NEWS, ...MOCK_NEWS];
