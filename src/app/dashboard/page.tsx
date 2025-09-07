'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function DashboardPage() {
  const [showDetailedEarnings, setShowDetailedEarnings] = useState(false);

  // サンプルデータ


  // 詳細報酬データ（月別案件明細）
  const monthlyEarnings = [
    {
      projectId: '1',
      name: 'カフェ・ド・パリ',
      completedDate: '2024-09-05',
      baseReward: 15000,
      performanceReward: 0,
      totalReward: 15000,
      category: 'カフェ',
      performance: { impressions: 12500, clicks: 890, visits: 125, conversionRate: 14.0 },
    },
    {
      projectId: '2', 
      name: 'ヘアサロン STYLE',
      completedDate: '2024-09-12',
      baseReward: 25000,
      performanceReward: 3200,
      totalReward: 28200,
      category: 'ビューティー',
      performance: { impressions: 18400, clicks: 1200, visits: 180, conversionRate: 15.0 },
    },
    {
      projectId: '3',
      name: 'スイーツカフェ Sweet',
      completedDate: '2024-09-18',
      baseReward: 12000,
      performanceReward: 1800,
      totalReward: 13800,
      category: 'スイーツ',
      performance: { impressions: 9600, clicks: 720, visits: 95, conversionRate: 13.2 },
    },
    {
      projectId: '4',
      name: 'フィットネスジム POWER',
      completedDate: '2024-09-22',
      baseReward: 10000,
      performanceReward: 4500,
      totalReward: 14500,
      category: 'フィットネス',
      performance: { impressions: 15200, clicks: 950, visits: 142, conversionRate: 14.9 },
    },
    {
      projectId: '5',
      name: 'ラーメン 龍',
      completedDate: '2024-09-25',
      baseReward: 8000,
      performanceReward: 2100,
      totalReward: 10100,
      category: 'ラーメン',
      performance: { impressions: 11300, clicks: 680, visits: 88, conversionRate: 12.9 },
    }
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
        {/* 今月の報酬概要カード */}
        <div 
          className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowDetailedEarnings(true)}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-smoky-navy">今月の報酬</h2>
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
            </svg>
          </div>
          
          {/* 今月の報酬（一行目） */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💰</span>
              <span className="text-sm font-medium text-gray-600">今月の報酬</span>
            </div>
            <div className="text-3xl font-bold text-smoky-navy mb-1">¥128,000</div>
            <div className="text-sm font-medium text-green-600 flex items-center gap-1">
              ↗ 15%
              <span className="text-gray-500">前月比 +¥17,000</span>
            </div>
          </div>
          
          {/* 3つの統計（横並び） */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-lg">📋</span>
                <span className="text-xs font-medium text-gray-600">進行中案件</span>
              </div>
              <div className="text-xl font-bold text-smoky-navy">4</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-lg">✅</span>
                <span className="text-xs font-medium text-gray-600">完了案件</span>
              </div>
              <div className="text-xl font-bold text-smoky-navy">12</div>
              <div className="text-xs font-medium text-green-600">↗ 8%</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-lg">🎯</span>
                <span className="text-xs font-medium text-gray-600">マッチ率</span>
              </div>
              <div className="text-xl font-bold text-smoky-navy">89%</div>
              <div className="text-xs font-medium text-green-600">↗ 3%</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            クリックして詳細を表示
          </div>
        </div>



        {/* ポートフォリオ分析 */}
        <div className="grid grid-cols-1 gap-4 mb-4">

          {/* 強みとレコメンド */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-smoky-navy mb-3">分析とレコメンド</h3>
            
            {/* 強いジャンル */}
            <div className="mb-4">
              <h4 className="font-semibold text-smoky-navy text-sm mb-2">💪 あなたの強いジャンル</h4>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-purple-800">ビューティー</span>
                  <span className="text-xs text-purple-600">平均CV率 15.0%</span>
                </div>
                <p className="text-purple-700 text-xs">高いエンゲージメントと成果を記録</p>
              </div>
            </div>

            {/* レコメンド */}
            <div>
              <h4 className="font-semibold text-smoky-navy text-sm mb-2">🎯 チャレンジ推奨ジャンル</h4>
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-orange-800">ファッション</span>
                    <span className="text-xs text-orange-600">平均報酬 ¥22k</span>
                  </div>
                  <p className="text-orange-700 text-xs">あなたのフォロワー層にマッチ度高</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-green-800">レストラン</span>
                    <span className="text-xs text-green-600">需要増加中 📈</span>
                  </div>
                  <p className="text-green-700 text-xs">成長ジャンルで先行者優位を獲得</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 月別収益推移（縦棒グラフ） */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">月別収益推移</h3>
          <div className="flex items-end justify-between h-40 px-4 py-2">
            {[
              { month: '6月', amount: 45000, projects: 3 },
              { month: '7月', amount: 78000, projects: 5 },
              { month: '8月', amount: 92000, projects: 6 },
              { month: '9月', amount: 128000, projects: 7 },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* 棒グラフ */}
                <div className="flex flex-col items-center justify-end h-32 w-full max-w-12">
                  <div
                    className="bg-gradient-to-t from-salmon-coral to-sunset-yellow rounded-t-md w-full flex items-end justify-center pb-1"
                    style={{ 
                      height: `${(data.amount / 128000) * 100}%`,
                      minHeight: '20px'
                    }}
                  >
                    <span className="text-white text-xs font-bold">
                      ¥{(data.amount / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
                {/* 月とプロジェクト数 */}
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-700">{data.month}</div>
                  <div className="text-xs text-gray-500">{data.projects}件</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 詳細報酬モーダル */}
      {showDetailedEarnings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-smoky-navy">今月の報酬詳細</h2>
                <button 
                  onClick={() => setShowDetailedEarnings(false)}
                  className="p-2 text-smoky-navy hover:text-salmon-coral"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              {/* 合計報酬サマリー */}
              <div className="bg-salmon-coral/10 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">基本報酬</p>
                    <p className="text-xl font-bold text-smoky-navy">
                      ¥{monthlyEarnings.reduce((sum, item) => sum + item.baseReward, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">成果報酬</p>
                    <p className="text-xl font-bold text-salmon-coral">
                      ¥{monthlyEarnings.reduce((sum, item) => sum + item.performanceReward, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">合計</p>
                    <p className="text-2xl font-bold text-smoky-navy">
                      ¥{monthlyEarnings.reduce((sum, item) => sum + item.totalReward, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* 報酬推移グラフ（簡易版積み上げ棒グラフ） */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-smoky-navy mb-4">案件別報酬推移</h3>
                <div className="space-y-3">
                  {monthlyEarnings.map((project, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-smoky-navy text-sm">{project.name}</h4>
                        <span className="text-xs text-gray-500">{project.completedDate}</span>
                      </div>
                      
                      {/* 積み上げバー */}
                      <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
                        <div className="h-full flex">
                          <div 
                            className="bg-smoky-navy flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(project.baseReward / project.totalReward) * 100}%` }}
                          >
                            {project.baseReward > 0 && `¥${(project.baseReward / 1000).toFixed(0)}k`}
                          </div>
                          {project.performanceReward > 0 && (
                            <div 
                              className="bg-salmon-coral flex items-center justify-center text-white text-xs font-medium"
                              style={{ width: `${(project.performanceReward / project.totalReward) * 100}%` }}
                            >
                              +¥{(project.performanceReward / 1000).toFixed(0)}k
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">{project.category}</span>
                        <span className="font-bold text-smoky-navy">¥{project.totalReward.toLocaleString()}</span>
                      </div>

                      {/* パフォーマンス指標 */}
                      <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
                        <div className="text-center">
                          <p className="text-gray-500">インプ</p>
                          <p className="font-medium text-smoky-navy">
                            {(project.performance.impressions / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">クリック</p>
                          <p className="font-medium text-smoky-navy">{project.performance.clicks}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">来店</p>
                          <p className="font-medium text-smoky-navy">{project.performance.visits}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">CV率</p>
                          <p className="font-medium text-salmon-coral">{project.performance.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* カテゴリ別集計 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-smoky-navy mb-4">カテゴリ別実績</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from(new Set(monthlyEarnings.map(p => p.category))).map(category => {
                    const categoryProjects = monthlyEarnings.filter(p => p.category === category);
                    const totalEarnings = categoryProjects.reduce((sum, p) => sum + p.totalReward, 0);
                    const avgConversion = categoryProjects.reduce((sum, p) => sum + p.performance.conversionRate, 0) / categoryProjects.length;
                    
                    return (
                      <div key={category} className="bg-white rounded-lg p-3 border border-gray-100">
                        <h4 className="font-semibold text-smoky-navy text-sm mb-2">{category}</h4>
                        <p className="text-lg font-bold text-salmon-coral mb-1">¥{totalEarnings.toLocaleString()}</p>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{categoryProjects.length}件</span>
                          <span>平均CV率 {avgConversion.toFixed(1)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 閉じるボタン */}
              <button
                onClick={() => setShowDetailedEarnings(false)}
                className="w-full py-3 bg-salmon-coral text-white rounded-lg font-medium"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 