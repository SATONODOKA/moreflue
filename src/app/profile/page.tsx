'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function ProfilePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  ];

  const socialLinks = [
    { platform: 'Instagram', handle: '@misaki_tanaka', followers: '12.5K', icon: '📷', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { platform: 'TikTok', handle: '@misaki_life', followers: '8.2K', icon: '🎵', color: 'bg-black' },
    { platform: 'Twitter', handle: '@misaki_tokyo', followers: '5.1K', icon: '🐦', color: 'bg-blue-500' },
  ];

  // サンプル投稿データ
  const samplePosts = {
    'カフェ': [
      { id: '1', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=300&fit=crop', caption: '素敵なカフェで午後のひととき☕️', likes: 1250, comments: 89 },
      { id: '2', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop', caption: 'ラテアートが美しい✨', likes: 980, comments: 67 },
      { id: '3', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop', caption: '居心地の良い空間でリラックス', likes: 1100, comments: 45 },
    ],
    'グルメ': [
      { id: '4', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop', caption: '本格イタリアンの絶品パスタ🍝', likes: 1420, comments: 112 },
      { id: '5', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop', caption: '美味しい料理に舌鼓', likes: 890, comments: 78 },
    ],
    'ビューティー': [
      { id: '6', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop', caption: '新しいヘアスタイルで気分転換💇‍♀️', likes: 2100, comments: 145 },
      { id: '7', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=300&fit=crop', caption: 'トレンドのヘアカラー', likes: 1650, comments: 98 },
    ],
  };

  // 円グラフ用データ
  const chartData = achievements.map((item, index) => {
    const colors = ['#FF6B8A', '#4ECDC4', '#45B7D1'];
    return {
      ...item,
      color: colors[index],
      percentage: (item.projectsCount / 28) * 100
    };
  });

  // SVG円グラフの描画
  const renderPieChart = () => {
    let cumulativePercentage = 0;
    const radius = 60;
    const centerX = 80;
    const centerY = 80;

    return (
      <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto">
        {chartData.map((item, index) => {
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360;
          
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;
          
          const x1 = centerX + radius * Math.cos(startAngleRad);
          const y1 = centerY + radius * Math.sin(startAngleRad);
          const x2 = centerX + radius * Math.cos(endAngleRad);
          const y2 = centerY + radius * Math.sin(endAngleRad);
          
          const largeArcFlag = item.percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          cumulativePercentage += item.percentage;
          
          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedCategory(item.category)}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div>
      <Header title="プロフィール" />
      
      <div className="px-4 py-4 bg-light-greige min-h-screen">
        {/* プロフィール基本情報 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="text-6xl mr-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-smoky-navy">{profile.name}</h2>
                
                {/* SNSアイコン */}
                <div className="flex gap-2">
                  <button
                    onClick={() => console.log('Instagram clicked')}
                    className="w-6 h-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => console.log('TikTok clicked')}
                    className="w-6 h-6 bg-black rounded-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => console.log('Twitter clicked')}
                    className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => console.log('YouTube clicked')}
                    className="w-6 h-6 bg-red-600 rounded-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>総フォロワー 約1.5万人</span>
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
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">実績サマリー</h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-smoky-navy">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ジャンル別案件数（円グラフ） */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">ジャンル別案件数</h3>
          
          <div className="flex items-center gap-4">
            {/* 円グラフ */}
            <div className="flex-shrink-0">
              {renderPieChart()}
            </div>
            
            {/* 凡例（コンパクト版） */}
            <div className="flex-1 space-y-2">
              {chartData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(item.category)}
                  className="flex items-center justify-between w-full p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-semibold text-smoky-navy text-sm">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-smoky-navy text-sm">{item.projectsCount}件</p>
                    <p className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 投稿例モーダル */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
            <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4">
                {/* ヘッダー */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-smoky-navy">{selectedCategory}の投稿例</h2>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 text-smoky-navy hover:text-salmon-coral"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* 投稿グリッド */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {samplePosts[selectedCategory as keyof typeof samplePosts]?.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.caption}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{post.caption}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>❤️ {post.likes.toLocaleString()}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full py-3 bg-salmon-coral text-white rounded-lg font-medium"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
} 