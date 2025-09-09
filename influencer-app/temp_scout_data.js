// 新しいスカウトデータ
const newScoutData = [
  {
    id: '1',
    storeName: '焼肉 龍神',
    reward: { type: 'fixed' as const, amount: 18000 },
    matchScore: 96,
    category: '焼肉',
    location: '恵比寿',
    isUrgent: true,
    deadline: '2024/01/20',
  },
  {
    id: '2',
    storeName: 'スイーツカフェ Sweet',
    reward: { type: 'performance' as const, amount: 12000, performanceRate: 8 },
    matchScore: 89,
    category: 'スイーツ',
    location: '原宿',
    isUrgent: false,
  },
  {
    id: '3',
    storeName: 'フィットネスジム POWER',
    reward: { type: 'fixed' as const, amount: 30000 },
    matchScore: 94,
    category: 'フィットネス',
    location: '六本木',
    isUrgent: false,
  },
];
