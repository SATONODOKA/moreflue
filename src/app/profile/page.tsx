import Header from '@/components/Header';

export default function ProfilePage() {
  // サンプルデータ
  const profile = {
    name: '田中 美咲',
    username: '@misaki_tanaka',
    bio: 'カフェ巡り・グルメ・ライフスタイル系インフルエンサー。東京を中心に活動中。素敵なお店を見つけるのが得意です！',
    avatar: '👩‍💼',
    followers: '12.5K',
    engagement: '4.2%',
    categories: ['カフェ', 'グルメ', 'ライフスタイル', 'ビューティー'],
  };

  const achievements = [
    {
      category: 'カフェ',
      projectsCount: 15,
      totalReach: '250K',
      avgEngagement: '4.5%',
      topPerformance: '来店数 +35%',
    },
    {
      category: 'グルメ',
      projectsCount: 8,
      totalReach: '180K',
      avgEngagement: '3.8%',
      topPerformance: '予約数 +28%',
    },
    {
      category: 'ビューティー',
      projectsCount: 5,
      totalReach: '95K',
      avgEngagement: '5.2%',
      topPerformance: '来店数 +42%',
    },
  ];

  const stats = [
    { label: '総案件数', value: '28' },
    { label: '完了率', value: '96%' },
    { label: '平均マッチ度', value: '91%' },
    { label: '総報酬', value: '¥485K' },
  ];

  const socialLinks = [
    { platform: 'Instagram', handle: '@misaki_tanaka', followers: '12.5K' },
    { platform: 'TikTok', handle: '@misaki_life', followers: '8.2K' },
    { platform: 'Twitter', handle: '@misaki_tokyo', followers: '5.1K' },
  ];

  return (
    <div>
      <Header title="プロフィール" />
      
      <div className="px-4 py-4 bg-light-greige min-h-screen">
        {/* プロフィール基本情報 */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">{profile.avatar}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-smoky-navy">{profile.name}</h2>
              <p className="text-salmon-coral font-medium">{profile.username}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>フォロワー {profile.followers}</span>
                <span>エンゲージメント {profile.engagement}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{profile.bio}</p>
          <div className="flex flex-wrap gap-2">
            {profile.categories.map((category, index) => (
              <span
                key={index}
                className="bg-light-greige text-smoky-navy px-3 py-1 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">実績サマリー</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-smoky-navy">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* カテゴリ別実績 */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">カテゴリ別実績</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-smoky-navy">{achievement.category}</h4>
                  <span className="bg-sunset-yellow text-smoky-navy px-2 py-1 rounded-full text-sm font-medium">
                    {achievement.projectsCount}件
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">総リーチ</p>
                    <p className="font-bold text-smoky-navy">{achievement.totalReach}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">平均エンゲージメント</p>
                    <p className="font-bold text-smoky-navy">{achievement.avgEngagement}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600">最高成果</p>
                  <p className="text-sm font-medium text-salmon-coral">{achievement.topPerformance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SNSリンク */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">SNSアカウント</h3>
          <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-smoky-navy">{social.platform}</p>
                  <p className="text-sm text-gray-600">{social.handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-smoky-navy">{social.followers}</p>
                  <p className="text-xs text-gray-500">フォロワー</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 