import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
  // サンプルデータ
  const monthlyStats = [
    {
      title: '今月の報酬',
      value: '¥128,000',
      change: { value: 15, type: 'increase' as const },
      icon: '💰',
    },
    {
      title: '進行中案件',
      value: '4',
      icon: '📋',
    },
    {
      title: '完了案件',
      value: '12',
      change: { value: 8, type: 'increase' as const },
      icon: '✅',
    },
    {
      title: 'マッチ率',
      value: '89%',
      change: { value: 3, type: 'increase' as const },
      icon: '🎯',
    },
  ];

  const funnelData = [
    { label: 'インプレッション', value: '125,000', percentage: 100 },
    { label: 'クリック', value: '8,750', percentage: 70 },
    { label: '来店', value: '1,250', percentage: 50 },
    { label: '報酬発生', value: '875', percentage: 35 },
  ];

  const recentProjects = [
    {
      name: 'カフェ・ド・パリ',
      status: '承認済み',
      reward: '¥15,000',
      performance: { impressions: 12500, clicks: 890, visits: 125 },
    },
    {
      name: 'イタリアン・ベラヴィスタ',
      status: '進行中',
      reward: '¥8,000 + 成果報酬',
      performance: { impressions: 8200, clicks: 650, visits: 89 },
    },
  ];

  return (
    <div>
      <Header title="ダッシュボード" />
      
      <div className="px-4 py-4 bg-light-greige min-h-screen">
        {/* 統計カード */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {monthlyStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* 成果ファネル */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">成果ファネル（今月）</h3>
          <div className="space-y-3">
            {funnelData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-sm font-medium text-gray-700 w-24">
                    {item.label}
                  </span>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sunset-yellow rounded-full h-2 transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-smoky-navy w-16 text-right">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近の案件 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">最近の案件成果</h3>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-smoky-navy">{project.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === '承認済み' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-salmon-coral font-medium mb-2">{project.reward}</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">インプレッション</p>
                    <p className="font-bold text-smoky-navy">
                      {project.performance.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">クリック</p>
                    <p className="font-bold text-smoky-navy">
                      {project.performance.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">来店</p>
                    <p className="font-bold text-smoky-navy">
                      {project.performance.visits}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 