// ホームフィードのデータを案件詳細と一致させる
const homeDataFix = {
  recommended: [
    {
      id: '1',
      storeName: 'カフェ・ド・パリ',
      reward: { type: 'fixed', amount: 15000 },
      matchScore: 95,
      category: 'カフェ',
      location: '渋谷',
      condition: '1投稿 + 3ストーリー',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      platforms: ['instagram', 'tiktok'],
      isFollowing: false,
    },
    {
      id: '2',
      storeName: 'イタリアン・ベラヴィスタ',
      reward: { type: 'performance', amount: 8000, performanceRate: 5 },
      matchScore: 88,
      category: 'イタリアン',
      location: '新宿',
      condition: '1投稿',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      platforms: ['instagram'],
      isFollowing: false,
    },
    {
      id: '3',
      storeName: 'ヘアサロン STYLE',
      reward: { type: 'fixed', amount: 25000 },
      matchScore: 92,
      category: 'ビューティー',
      location: '表参道',
      condition: '2投稿 + 5ストーリー',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      platforms: ['instagram', 'tiktok', 'twitter'],
      isFollowing: false,
    },
  ]
};
