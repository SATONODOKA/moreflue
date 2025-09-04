'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { getCachedData, setCachedData, CACHE_KEYS } from '@/utils/cache';

// サンプルデータ
const sampleProjects = {
  recommended: [
    {
      id: '1',
      storeName: 'カフェ・ド・パリ',
      reward: { type: 'fixed' as const, amount: 15000 },
      matchScore: 95,
      category: 'カフェ',
      location: '渋谷',
      condition: '1投稿 + 3ストーリー',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      platforms: ['instagram', 'tiktok'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: false,
    },
    {
      id: '2',
      storeName: 'イタリアン・ベラヴィスタ',
      reward: { type: 'performance' as const, amount: 8000, performanceRate: 5 },
      matchScore: 88,
      category: 'イタリアン',
      location: '新宿',
      condition: '1投稿',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      platforms: ['instagram'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: false,
    },
    {
      id: '3',
      storeName: 'ヘアサロン STYLE',
      reward: { type: 'fixed' as const, amount: 25000 },
      matchScore: 92,
      category: 'ビューティー',
      location: '表参道',
      condition: '2投稿 + 5ストーリー',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      platforms: ['instagram', 'tiktok', 'twitter'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: false,
    },
  ],
  following: [
    {
      id: '4',
      storeName: 'フィットネスジム POWER',
      reward: { type: 'performance' as const, amount: 10000, performanceRate: 8 },
      matchScore: 85,
      category: 'フィットネス',
      location: '恵比寿',
      condition: '1投稿 + リール1本',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      platforms: ['instagram', 'tiktok'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: true,
    },
    {
      id: '5',
      storeName: 'スイーツカフェ Sweet',
      reward: { type: 'fixed' as const, amount: 12000 },
      matchScore: 90,
      category: 'スイーツ',
      location: '原宿',
      condition: '1投稿',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      platforms: ['instagram'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: true,
    },
    {
      id: '6',
      storeName: 'ラーメン 龍',
      reward: { type: 'fixed' as const, amount: 8000 },
      matchScore: 87,
      category: 'ラーメン',
      location: '池袋',
      condition: '1投稿 + 2ストーリー',
      imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      platforms: ['instagram', 'twitter'] as ('instagram' | 'tiktok' | 'twitter')[],
      isFollowing: true,
    },
  ],
};

function HomeContent() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'following'>('recommended');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [projects, setProjects] = useState(sampleProjects);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  // キャッシュから応募済み案件を復元
  useEffect(() => {
    const cachedAppliedProjects = getCachedData<string[]>(CACHE_KEYS.HOME_APPLIED_PROJECTS, []);
    setAppliedProjects(cachedAppliedProjects);
  }, []);

  // URLパラメータから応募情報を読み取る
  useEffect(() => {
    const applied = searchParams.get('applied');
    if (applied) {
      setAppliedProjects(prev => {
        if (prev.includes(applied)) {
          return prev; // 既に含まれている場合は変更なし
        }
        const newAppliedProjects = [...prev, applied];
        // キャッシュに保存
        setCachedData(CACHE_KEYS.HOME_APPLIED_PROJECTS, newAppliedProjects);
        return newAppliedProjects;
      });
    }
  }, [searchParams]);

  const tabs = [
    { key: 'recommended', label: 'おすすめ', icon: '✨' },
    { key: 'following', label: 'フォロー中', icon: '👥' },
  ];

  const getCurrentProjects = () => {
    const allProjects = projects[activeTab] || [];
    // 応募済み案件をフィードから除外
    return allProjects.filter(project => !appliedProjects.includes(project.id));
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // プルトゥリフレッシュのアニメーション
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // データを更新（実際のアプリではAPIから新しいデータを取得）
    setProjects(prev => ({
      ...prev,
      recommended: [...prev.recommended].reverse() // 順序を変更して更新感を演出
    }));
    
    setIsRefreshing(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    
    // 上端に近づいたらリフレッシュ
    if (scrollTop < -50 && !isRefreshing) {
      handleRefresh();
    }
  };

  const handleSwipeRight = () => {
    router.push('/messages');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-smoky-navy">moreflue</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/messages')}
              className="p-2 text-smoky-navy hover:text-salmon-coral transition-colors"
            >
              <span className="text-xl">💬</span>
            </button>
            <div className="relative">
              <button className="p-2 text-smoky-navy hover:text-salmon-coral transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <div className="absolute -top-1 -right-1 bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* タブ */}
      <div className="bg-white sticky top-[73px] z-30">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'recommended' | 'following')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? 'text-salmon-coral bg-white'
                  : 'text-gray-600 hover:text-smoky-navy bg-light-greige'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* プルトゥリフレッシュインジケーター */}
      {isRefreshing && (
        <div className="bg-white py-4 text-center">
          <div className="text-smoky-navy text-sm">更新中...</div>
        </div>
      )}

      {/* タイムライン */}
      <div 
        ref={scrollRef}
        className="bg-white"
        onScroll={handleScroll}
        onTouchStart={(e) => {
          const startX = e.touches[0].clientX;
          const startY = e.touches[0].clientY;
          
          const handleTouchEnd = (e: TouchEvent) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // 右スワイプの検出（横の移動が縦より大きく、左方向にスワイプ）
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
              handleSwipeRight();
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
          };
          
          document.addEventListener('touchend', handleTouchEnd);
        }}
      >
                         {getCurrentProjects().length > 0 ? (
                   getCurrentProjects().map((project) => (
                     <ProjectCard 
                       key={project.id} 
                       {...project} 
                       hasApplied={appliedProjects.includes(project.id)}
                     />
                   ))
                 ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-lg font-medium text-smoky-navy mb-2">
              {activeTab === 'recommended' && 'おすすめ案件はありません'}
              {activeTab === 'following' && 'フォロー中の店舗からの案件はありません'}
            </h3>
            <p className="text-gray-600 text-sm">
              {activeTab === 'recommended' && '新しいおすすめ案件をお待ちください'}
              {activeTab === 'following' && '店舗をフォローして案件を受け取りましょう'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
