'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import CompactProjectCard from '@/components/CompactProjectCard';
import ClearCacheButton from '@/components/ClearCacheButton';
import { getCachedData, setCachedData, CACHE_KEYS, cleanupAppliedProjects } from '@/utils/cache';

// サンプルデータ
const sampleProjects = {
  scout: [
    {
      id: '7',
      storeName: '焼肉 龍神',
      reward: { type: 'fixed' as const, amount: 18000 },
      matchScore: 96,
      category: '焼肉',
      location: '恵比寿',
      isUrgent: true,
      deadline: '2024/01/20',
    },
    {
      id: '8',
      storeName: 'スイーツカフェ Sweet',
      reward: { type: 'performance' as const, amount: 12000, performanceRate: 8 },
      matchScore: 89,
      category: 'スイーツ',
      location: '原宿',
      isUrgent: false,
    },
    {
      id: '9',
      storeName: 'フィットネスジム POWER',
      reward: { type: 'fixed' as const, amount: 30000 },
      matchScore: 94,
      category: 'フィットネス',
      location: '六本木',
      isUrgent: false,
    },
  ],
  inProgress: [
    // 初期状態では空、スカウト承認時に動的に追加される
  ] as Array<{
    id: string;
    storeName: string;
    reward: {
      type: 'fixed' | 'performance';
      amount: number;
      performanceRate?: number;
    };
    matchScore: number;
    category: string;
    location: string;
    status: string;
    deadline?: string;
  }>,
  applied: [] as Array<{
    id: string;
    storeName: string;
    reward: {
      type: 'fixed' | 'performance';
      amount: number;
      performanceRate?: number;
    };
    matchScore: number;
    category: string;
    location: string;
    appliedDate: string;
    status: string;
  }>,
};

function ProjectsContent() {
  const [activeTab, setActiveTab] = useState<'scout' | 'inProgress'>('scout');
  const [showApplied, setShowApplied] = useState(false);
  const [declinedProjects, setDeclinedProjects] = useState<string[]>([]);
  const [approvedProjects, setApprovedProjects] = useState<string[]>([]);
  const [projects, setProjects] = useState(sampleProjects);
  const searchParams = useSearchParams();

  // キャッシュからデータを復元
  useEffect(() => {
    // 重複データをクリーンアップ
    cleanupAppliedProjects();
    
    const cachedDeclined = getCachedData<string[]>(CACHE_KEYS.DECLINED_PROJECTS, []);
    const cachedApproved = getCachedData<string[]>(CACHE_KEYS.APPROVED_PROJECTS, []);
    const cachedAppliedProjects = getCachedData<Array<{
      id: string;
      storeName: string;
      reward: { type: 'fixed' | 'performance'; amount: number; performanceRate?: number; };
      matchScore: number;
      category: string;
      location: string;
      appliedDate: string;
      status: string;
    }>>(CACHE_KEYS.APPLIED_PROJECTS, []);
    const cachedInProgressProjects = getCachedData<Array<{
      id: string;
      storeName: string;
      reward: { type: 'fixed' | 'performance'; amount: number; performanceRate?: number; };
      matchScore: number;
      category: string;
      location: string;
      status: string;
    }>>(CACHE_KEYS.IN_PROGRESS_PROJECTS, []);
    
    setDeclinedProjects(cachedDeclined);
    setApprovedProjects(cachedApproved);
    
    if (cachedAppliedProjects.length > 0) {
      setProjects(prev => ({
        ...prev,
        applied: cachedAppliedProjects
      }));
    }
    
    if (cachedInProgressProjects.length > 0) {
      setProjects(prev => ({
        ...prev,
        inProgress: cachedInProgressProjects
      }));
    }
  }, []);

  // URLパラメータからタブ情報を読み取って初期表示を設定
  useEffect(() => {
    const tab = searchParams.get('tab');
    const declined = searchParams.get('declined');
    const approved = searchParams.get('approved');
    const applied = searchParams.get('applied');
    const showAppliedParam = searchParams.get('showApplied');
    
    if (tab === 'inProgress') {
      setActiveTab('inProgress');
    } else if (tab === 'scout') {
      setActiveTab('scout');
    }
    
    // ホームから応募された場合は応募済み欄を表示
    if (showAppliedParam === 'true') {
      setShowApplied(true);
    }
    
    // 辞退された案件をリストから削除
    if (declined) {
      setDeclinedProjects(prev => {
        if (prev.includes(declined)) return prev; // 既に存在する場合は何もしない
        const newDeclined = [...prev, declined];
        setCachedData(CACHE_KEYS.DECLINED_PROJECTS, newDeclined);
        return newDeclined;
      });
    }
    
    // 承認された案件を進行中に移動
    if (approved) {
      setApprovedProjects(prev => {
        if (prev.includes(approved)) return prev; // 既に存在する場合は何もしない
        const newApproved = [...prev, approved];
        setCachedData(CACHE_KEYS.APPROVED_PROJECTS, newApproved);
        return newApproved;
      });
      
      // 承認された案件を進行中リストに追加
      const approvedProject = sampleProjects.scout.find(p => p.id === approved);
      if (approvedProject) {
        setProjects(prev => {
          // 既に進行中に存在するかチェック
          const isAlreadyInProgress = prev.inProgress.some(p => p.id === approved);
          if (isAlreadyInProgress) {
            return prev; // 既に存在する場合は何もしない
          }
          
          const inProgressProject = {
            ...approvedProject,
            status: '交渉中'
          };
          
          const newInProgress = [...prev.inProgress, inProgressProject];
          const newProjects = {
            ...prev,
            inProgress: newInProgress
          };
          // 進行中案件をキャッシュに保存
          setCachedData(CACHE_KEYS.IN_PROGRESS_PROJECTS, newInProgress);
          return newProjects;
        });
      }
    }
    
    // ホームから応募された案件を応募済みに追加
    if (applied) {
      // 応募済み案件のデータを動的に作成
      const appliedProject = findProjectById(applied);
      if (appliedProject) {
        setProjects(prev => {
          // 既に存在する案件かチェック
          const isAlreadyApplied = prev.applied.some(p => p.id === applied);
          if (isAlreadyApplied) {
            return prev; // 既に存在する場合は何もしない
          }
          
          const newAppliedProject = {
            ...appliedProject,
            appliedDate: new Date().toLocaleDateString('ja-JP', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit' 
            }).replace(/\//g, '/'),
            status: '店舗確認中'
          };
          
          const newProjects = {
            ...prev,
            applied: [...prev.applied, newAppliedProject]
          };
          // キャッシュに保存
          setCachedData(CACHE_KEYS.APPLIED_PROJECTS, newProjects.applied);
          return newProjects;
        });
      }
    }
  }, [searchParams]);

  // プロジェクトIDから案件データを検索する関数
  const findProjectById = (id: string) => {
    // ホーム画面のサンプルデータから検索（ID 1-6がホーム画面の案件）
    const homeProjects = [
      {
        id: '1',
        storeName: 'カフェ・ド・パリ',
        reward: { type: 'fixed' as const, amount: 15000 },
        matchScore: 95,
        category: 'カフェ',
        location: '渋谷',
      },
      {
        id: '2',
        storeName: 'イタリアン・ベラヴィスタ',
        reward: { type: 'performance' as const, amount: 8000, performanceRate: 5 },
        matchScore: 88,
        category: 'イタリアン',
        location: '新宿',
      },
      {
        id: '3',
        storeName: 'ヘアサロン STYLE',
        reward: { type: 'fixed' as const, amount: 25000 },
        matchScore: 92,
        category: 'ビューティー',
        location: '表参道',
      },
      {
        id: '4',
        storeName: 'フィットネスジム POWER',
        reward: { type: 'performance' as const, amount: 10000, performanceRate: 8 },
        matchScore: 85,
        category: 'フィットネス',
        location: '恵比寿',
      },
      {
        id: '5',
        storeName: 'スイーツカフェ Sweet',
        reward: { type: 'fixed' as const, amount: 12000 },
        matchScore: 90,
        category: 'スイーツ',
        location: '原宿',
      },
      {
        id: '6',
        storeName: 'ラーメン 龍',
        reward: { type: 'fixed' as const, amount: 8000 },
        matchScore: 87,
        category: 'ラーメン',
        location: '池袋',
      },
    ];
    
    // スカウト案件からも検索（ID 7-9）
    const scoutProjects = sampleProjects.scout;
    const allProjects = [...homeProjects, ...scoutProjects];
    
    return allProjects.find(project => project.id === id);
  };

  const getCurrentProjects = () => {
    if (activeTab === 'scout') {
      // スカウトタブでは辞退された案件と承認された案件を除外
      return projects.scout.filter(project => 
        !declinedProjects.includes(project.id) && !approvedProjects.includes(project.id)
      );
    } else if (activeTab === 'inProgress') {
      // 進行中タブでは承認された案件のみを表示
      return projects.inProgress || [];
    }
    return [];
  };

  const tabs = [
    { key: 'scout', label: 'スカウト', count: projects.scout.filter(p => !declinedProjects.includes(p.id) && !approvedProjects.includes(p.id)).length },
    { key: 'inProgress', label: '進行中', count: projects.inProgress.length },
  ];

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
        
        <div className="bg-white">
          {projects.applied.length > 0 ? (
            projects.applied.map((project, index) => (
              <div key={`${project.id}-${index}`} className="bg-white p-4 border-b border-gray-100">
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
      <ClearCacheButton />
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
                   {projects.applied.length}
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
                  ? 'text-salmon-coral bg-white'
                  : 'text-gray-600 hover:text-smoky-navy bg-light-greige'
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
      <div className="bg-white pb-20">
        {getCurrentProjects().length > 0 ? (
          getCurrentProjects().map((project, index) => (
            <CompactProjectCard key={`${project.id}-${index}-${activeTab}`} {...project} tab={activeTab} />
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

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
