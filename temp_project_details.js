// 新しい案件詳細データ（スカウトデータと一致）
const newProjectDetails = {
  '1': {
    id: '1',
    storeName: '焼肉 龍神',
    category: '焼肉',
    location: '恵比寿',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    story: '恵比寿で20年の実績を持つ老舗焼肉店。厳選されたA5ランクの和牛と、職人が手がける絶品のタレで、本格的な焼肉をお楽しみいただけます。落ち着いた店内で、特別な時間をお過ごしいただけます。',
    reward: { type: 'fixed', amount: 18000 },
    matchScore: 96,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '恵比寿駅から徒歩5分',
      postRequirements: 'フィード投稿1枚 + ストーリーズ3投稿',
      preApproval: true,
      performanceGoals: '来店者数15名以上、投稿エンゲージメント率4%以上',
      timeline: '投稿から1週間以内に来店効果測定',
      additionalNotes: '撮影時間は45分程度を想定しています'
    }
  },
  '2': {
    id: '2',
    storeName: 'スイーツカフェ Sweet',
    category: 'スイーツ',
    location: '原宿',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    story: '原宿の中心地にある、インスタ映えするスイーツが人気のカフェです。季節のフルーツを使った色鮮やかなパフェと、手作りケーキが自慢。可愛らしい店内で、特別な時間をお過ごしいただけます。若い女性を中心に多くのお客様に愛されています。',
    reward: { type: 'performance', amount: 12000, performanceRate: 8 },
    matchScore: 89,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '原宿駅から徒歩3分',
      postRequirements: 'フィード投稿1枚（スイーツ写真必須）',
      preApproval: false,
      performanceGoals: '来店者数8名以上で成果報酬発生',
      timeline: '投稿から2週間以内',
      additionalNotes: '午後の撮影を推奨します'
    }
  },
  '3': {
    id: '3',
    storeName: 'フィットネスジム POWER',
    category: 'フィットネス',
    location: '六本木',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    story: '六本木の最新設備を誇るフィットネスジム。初心者から上級者まで、一人ひとりの目標に合わせたパーソナルトレーニングを提供しています。清潔で開放的な空間と、経験豊富なトレーナーが皆様の健康とボディメイクをサポートします。',
    reward: { type: 'fixed', amount: 30000 },
    matchScore: 94,
    platforms: ['instagram', 'tiktok', 'twitter'],
    isFollowing: false,
    details: {
      travelTime: '六本木駅から徒歩2分',
      postRequirements: 'トレーニング動画1本 + ビフォーアフター写真2枚',
      preApproval: true,
      performanceGoals: '新規入会者5名以上、指名予約2名以上',
      timeline: '体験から1週間以内に投稿',
      additionalNotes: 'トレーニングウェアは貸し出し可能です'
    }
  }
};
