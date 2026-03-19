import { NewsItem } from '../types/news';

export const MOCK_NEWS: NewsItem[] = [
  // 要闻 (breaking)
  {
    id: 'b1',
    title: '2026年全球联盟营销支出预计将突破180亿美元',
    source: 'Performance Insider',
    date: '2026-03-18',
    summary: '随着数字化转型的深入，品牌方在效果营销领域的投入持续增长。最新报告指出，合作伙伴营销已成为企业获取高质量流量的核心途径。',
    url: 'https://impact.com/press-releases/impact-com-hakan-ozal-dach-enterprise/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-1.jpg'
  },
  {
    id: 'b2',
    title: 'Google 隐私沙盒全面推行，Cookies 时代正式终结',
    source: 'TechCrunch',
    date: '2026-03-15',
    summary: '联盟营销人员面临归因挑战，新的第一方数据解决方案正在成为行业标准。如何平衡用户隐私与营销效果是当前最大的课题。',
    url: 'https://impact.com/affiliate/affiliate-travel-marketing/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-2.jpg'
  },
  {
    id: 'b3',
    title: '影响者营销与效果营销的深度融合：2026年新趋势',
    source: 'Marketing Dive',
    date: '2026-03-12',
    summary: '越来越多的品牌开始按效果向影响者支付佣金，而非传统的一次性费用。这种模式正在改变创作者经济的运作方式。',
    url: 'https://impact.com/partnerships/affiliate-marketing-scams/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-3.jpg'
  },
  {
    id: 'b4',
    title: '零售媒体网络（RMN）正在蚕食传统搜索广告份额',
    source: 'AdWeek',
    date: '2026-03-10',
    summary: '亚马逊和沃尔玛等零售巨头的广告平台正在吸引大量效果类广告主，其转化率优势明显。',
    url: 'https://impact.com/influencer/social-commerce-examples/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-4.jpg'
  },
  {
    id: 'b5',
    title: '反欺诈技术升级：联盟营销中的AI实时监测系统',
    source: 'Partnership Weekly',
    date: '2026-03-08',
    summary: '点击注入和虚假转化正在被更加智能的监测系统所拦截。新的技术标准正在提升整个行业的透明度。',
    url: 'https://impact.com/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-5.jpg'
  },
  {
    id: 'b6',
    title: 'B2B 联盟营销模式兴起：软件服务商的增长新引擎',
    source: 'SaaS Report',
    date: '2026-03-05',
    summary: 'SaaS 企业发现合作伙伴推荐的客户留存率比直接搜索广告高出 30%。B2B 领域的伙伴营销正进入爆发期。',
    url: 'https://impact.com/affiliate/travel-affiliate-programs/',
    category: 'breaking',
    imageUrl: '/placeholder-breaking-6.jpg'
  },

  // 头部资讯 (top)
  {
    id: 't1',
    title: 'Hakan Özal Joins impact.com to Drive Enterprise Partnership Growth in DACH',
    source: 'impact.com',
    date: '2026-03-17',
    summary: 'Partnership marketing platform strengthens its approach in the German-speaking region, helping brands integrate cross-channel partnerships...',
    url: 'https://impact.com/press-releases/impact-com-hakan-ozal-dach-enterprise/',
    category: 'top',
    imageUrl: '/placeholder-top-1.jpg'
  },
  {
    id: 't2',
    title: '2026 APAC affiliate travel marketing trends + key partnership strategies',
    source: 'impact.com',
    date: '2026-03-16',
    summary: 'APAC travellers are turning to trusted recommendations more than advertising when making travel decisions...',
    url: 'https://impact.com/affiliate/affiliate-travel-marketing/',
    category: 'top',
    imageUrl: '/placeholder-top-2.jpg'
  },
  {
    id: 't3',
    title: "Advertising's Not Dead, But the Balance is Shifting",
    source: 'impact.com',
    date: '2026-03-12',
    summary: "Advertising's Not Dead, But the Balance is Shifting, Says David Yovanno...",
    url: 'https://impact.com/',
    category: 'top',
    imageUrl: '/placeholder-top-3.jpg'
  },
  {
    id: 't4',
    title: '12 highest-paying travel affiliate programs in 2026 (up to 40% commission)',
    source: 'impact.com',
    date: '2026-03-05',
    summary: 'Travel publishers drive more affiliate research traffic than almost any other content category...',
    url: 'https://impact.com/affiliate/travel-affiliate-programs/',
    category: 'top',
    imageUrl: '/placeholder-top-4.jpg'
  },
  {
    id: 't5',
    title: 'Knowing your partner: defense against affiliate marketing scams in 2026',
    source: 'impact.com',
    date: '2026-03-04',
    summary: 'Your affiliate marketing dashboards are lying to you. Sophisticated AI scams and attribution hijacking...',
    url: 'https://impact.com/partnerships/affiliate-marketing-scams/',
    category: 'top',
    imageUrl: '/placeholder-top-5.jpg'
  },
  {
    id: 't6',
    title: '5 social commerce examples: How real brands turn strategies into sales',
    source: 'impact.com',
    date: '2026-03-02',
    summary: 'Most brands treat social commerce as a content problem. These five examples show why the real lever...',
    url: 'https://impact.com/influencer/social-commerce-examples/',
    category: 'top',
    imageUrl: '/placeholder-top-6.jpg'
  },

  // AI知识库 (ai)
  {
    id: 'a1',
    title: '生成式 AI 正在改变营销人员的日常创作流程',
    source: 'AI Marketing Hub',
    date: '2026-03-19',
    summary: '从个性化邮件主题到实时 Banner 图片，AI 正在将营销人员从繁琐的基础工作中解放出来，让他们更专注于策略与创意。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-1.jpg'
  },
  {
    id: 'a2',
    title: '利用 LLM 构建智能客服机器人实现销售转化',
    source: 'The AI Journal',
    date: '2026-03-16',
    summary: '探索如何将大语言模型集成到官网客服系统中，通过自然语言对话解答用户疑问，实现 24/7 的自动化转化。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-2.jpg'
  },
  {
    id: 'a3',
    title: 'AI 预测性分析在效果营销中的实践前沿',
    source: 'Data Science Daily',
    date: '2026-03-13',
    summary: '通过历史数据和实时信号，机器学习模型可以准确预测哪些点击最有可能转化，帮助营销人员提前调整资源分配。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-3.jpg'
  },
  {
    id: 'a4',
    title: '多模态 AI 在短视频效果营销中的应用实践',
    source: 'Video AI Insider',
    date: '2026-03-10',
    summary: '自动剪辑、智能配音、实时生成多版本视频内容，AI 正在帮助品牌高效生产 TikTok 和 Reels 上的爆款素材。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-4.jpg'
  },
  {
    id: 'a5',
    title: 'AI 营销工具箱：2026年营销人员必备的 10 款神器',
    source: 'Tool Master',
    date: '2026-03-07',
    summary: '从 SEO 优化到视频内容生成，这些精选的 AI 工具将显著提升你的工作效率，让效果营销工作变得事半功倍。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-5.jpg'
  },
  {
    id: 'a6',
    title: '探讨 AI 算法透明度与营销效果归因的伦理边界',
    source: 'Ethical Tech Review',
    date: '2026-03-04',
    summary: '当算法决策越来越复杂，如何确保营销效果归因的公平性？本文探讨 AI 透明原则与商业利益之间的平衡。',
    url: 'https://impact.com/',
    category: 'ai',
    imageUrl: '/placeholder-ai-6.jpg'
  },

  // 出海行情 (market)
  {
    id: 'm1',
    title: '中国出海应用席卷欧美市场：2026 年新贵品类分析',
    source: 'Global Commerce Report',
    date: '2026-03-19',
    summary: 'Temu, SHEIN 和 TikTok Shop 等应用正在改变欧美消费者的购物习惯，全托管模式正在改变跨境电商的游戏规则。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-1.jpg'
  },
  {
    id: 'm2',
    title: '中东市场成为出海新热土：本地支付习惯是关键',
    source: 'Middle East Tech',
    date: '2026-03-17',
    summary: '沙特和阿联酋市场消费力强劲，但本地化支付偏好和宗教文化合规仍是出海企业需要重点关注的问题。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-2.jpg'
  },
  {
    id: 'm3',
    title: '短剧出海爆发：中国内容产业的全球化新路径',
    source: 'Content Export News',
    date: '2026-03-14',
    summary: '短剧应用在北美和欧洲市场迅速崛起，通过精准的内容投放和创新的变现模式，中国内容产业正在开辟新蓝海。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-3.jpg'
  },
  {
    id: 'm4',
    title: '东南亚市场观察：印度与印尼的 Z 世代消费洞察',
    source: 'SEA Business Insights',
    date: '2026-03-11',
    summary: '庞大的人口基数和年轻化趋势让东南亚成为全球品牌必争之地，社交媒体驱动的消费习惯正在重塑电商格局。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-4.jpg'
  },
  {
    id: 'm5',
    title: '拉美市场爆发前夜：墨西哥成为出海首选站',
    source: 'LatAm Retail Today',
    date: '2026-03-08',
    summary: '随着物流基础设施完善，墨西哥已成为中国企业进军拉美市场的桥头堡，电商和金融科技是热门赛道。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-5.jpg'
  },
  {
    id: 'm6',
    title: '全球数据合规指南：欧盟数据保护新规详解',
    source: 'Global Compliance Watch',
    date: '2026-03-05',
    summary: '随着监管框架的加强，出海企业需要高度重视用户数据隐私和合规，违反 GDPR 等法规的处罚力度正在加大。',
    url: 'https://impact.com/',
    category: 'market',
    imageUrl: '/placeholder-market-6.jpg'
  },
];
