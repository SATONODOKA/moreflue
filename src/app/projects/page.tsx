'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CompactProjectCard from '@/components/CompactProjectCard';

// サンプルデータ
const sampleProjects = {
  scout: [
    {
      id: '1',
      storeName: 'カフェ・ド・パリ',
      reward: { type: 'fixed' as const, amount: 15000 },
      matchScore: 95,
      category: 'カフェ',
      location: '渋谷',
      isUrgent: true,
      deadline: '2024/01/15',
    },
    {
      id: '2',
      storeName: 'イタリアン・ベラヴィスタ',
      reward: { type: 'performance' as const, amount: 8000, performanceRate: 5 },
      matchScore: 88,
      category: 'イタリアン',
      location: '新宿',
      isUrgent: false,
    },
    {
      id: '3',
      storeName: 'ヘアサロン STYLE',
      reward: { type: 'fixed' as const, amount: 25000 },
      matchScore: 92,
      category: 'ビューティー',
      location: '表参道',
      isUrgent: false,
    },
  ],
  inProgress: [
    {
      id: '4',
      storeName: 'フィットネスジム POWER',
      reward: { type: 'performance' as const, amount: 10000, performanceRate: 8 },
      matchScore: 85,
      category: 'フィットネス',
      location: '恵比寿',
      status: '投稿準備',
      deadline: '2024/01/20',
    },
    {
      id: '5',
      storeName: 'スイーツカフェ Sweet',
      reward: { type: 'fixed' as const, amount: 12000 },
      matchScore: 90,
      category: 'スイーツ',
      location: '原宿',
      status: '交渉中',
    },
  ],
  applied: [
    {
      id: '6',
      storeName: 'ラーメン 龍',
      reward: { type: 'fixed' as const, amount: 8000 },
      matchScore: 87,
      category: 'ラーメン',
      location: '池袋',
      appliedDate: '2024/01/10',
      status: '店舗確認中',
    },
    {
      id: '7',
      storeName: 'ブックカフェ READ',
      reward: { type: 'performance' as const, amount: 6000, performanceRate: 3 },
      matchScore: 83,
      category: 'カフェ',
      location: '下北沢',
      appliedDate: '2024/01/08',
      status: '店舗確認中',
    },
  ],
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'scout' | 'inProgress'>('scout');
  const [showApplied, setShowApplied] = useState(false);
  const router = useRouter();

  const tabs = [
    { key: 'scout', label: 'スカウト', count: sampleProjects.scout.length },
    { key: 'inProgress', label: '進行中', count: sampleProjects.inProgress.length },
  ];

  const getCurrentProjects = () => {
    return sampleProjects[activeTab] || [];
  };

  if (showApplied) {
    return (
      <div>
        <Header title="応募済み案件" />
        
        <div className="bg-white px-4 py-3">
          <button 
            onClick={() => setShowApplied(false)}
            className="text-salmon-coral hover:text-opacity-80 transition-colors text-sm font-medium"
          >
            ← 案件管理に戻る
          </button>
        </div>
        
        <div className="bg-light-greige">
          {sampleProjects.applied.length > 0 ? (
            sampleProjects.applied.map((project) => (
              <div key={project.id} className="bg-white p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-smoky-navy text-base mb-2">{project.storeName}</h3>
                    <div className="text-salmon-coral font-bold text-lg mb-2">
                      {project.reward.type === 'fixed' ? (
                        `¥${project.reward.amount.toLocaleString()}`
                      ) : (
                        `¥${project.reward.amount.toLocaleString()} + 成果報酬${project.reward.performanceRate}%`
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {project.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {project.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {project.status}
                      </span>
                      <span className="text-gray-500 text-xs">
                        応募日: {project.appliedDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 text-right">
                    <div className="bg-gray-100 text-smoky-navy px-3 py-1 rounded-full text-sm font-bold">
                      {project.matchScore}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-6xl mb-4">📭</span>
              <h3 className="text-lg font-medium text-smoky-navy mb-2">応募済みの案件はありません</h3>
              <p className="text-gray-600 text-sm">応募した案件がここに表示されます</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="案件管理" />
      
      {/* 応募済み案件ボタン */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => setShowApplied(true)}
          className="w-full bg-light-greige text-smoky-navy py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <span>📋</span>
          応募済み案件を見る
          <span className="bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {sampleProjects.applied.length}
          </span>
        </button>
      </div>
      
      {/* タブ */}
      <div className="bg-white">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'scout' | 'inProgress')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? 'text-salmon-coral bg-light-greige'
                  : 'text-gray-600 hover:text-smoky-navy'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.key
                    ? 'bg-salmon-coral text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* コンパクトカード一覧 */}
      <div className="bg-light-greige">
        {getCurrentProjects().length > 0 ? (
          getCurrentProjects().map((project) => (
            <CompactProjectCard key={project.id} {...project} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-lg font-medium text-smoky-navy mb-2">
              {activeTab === 'scout' && '新しいスカウトはありません'}
              {activeTab === 'inProgress' && '進行中の案件はありません'}
            </h3>
            <p className="text-gray-600 text-sm">
              {activeTab === 'scout' && 'スカウト案件が届くとここに表示されます'}
              {activeTab === 'inProgress' && '承認された案件がここで管理できます'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
