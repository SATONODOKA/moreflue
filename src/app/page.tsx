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
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', // カフェ外観
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', // ラテアート
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', // 店内の様子
      ],
      recommendationPoint: '隠れ家的な雰囲気とフォトジェニックなラテアートが魅力',
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
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', // イタリアン外観
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', // パスタ料理
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', // 夜景テラス席
      ],
      recommendationPoint: '本格イタリアンと絶景夜景が楽しめる大人の隠れ家',
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
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', // サロン外観
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop', // ヘアカット風景
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', // 洗練された店内
      ],
      recommendationPoint: '最新トレンドヘアと洗練された店内で映え度抜群',
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
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', // ジム外観
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', // トレーニング風景
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop', // 最新機器
      ],
      recommendationPoint: '最新機器とパーソナルトレーナーで理想のボディへ',
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
      images: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', // カフェ外観
        'https://images.unsplash.com/photo-1587736975494-4e5a7dac70f5?w=400&h=300&fit=crop', // 手作りケーキ
        'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop', // 可愛い店内
      ],
      recommendationPoint: '手作りスイーツと可愛い店内でインスタ映え最高',
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
      images: [
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', // ラーメン外観
        'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400&h=300&fit=crop', // 美味しいラーメン
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop', // アットホームな店内
      ],
      recommendationPoint: '伝統的な製法の絶品ラーメンとアットホームな空間',
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
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [homeAddress, setHomeAddress] = useState({
    prefecture: '',
    city: '',
    town: '',
    address: '',
  });
  const [filters, setFilters] = useState({
    // SNS媒体
    platforms: [] as string[],
    
    // 場所
    locationType: '' as 'nearby' | 'area' | '',
    nearbyTransport: '' as 'walk' | 'train' | 'car' | '',
    nearbyMinutes: '',
    prefectures: [] as string[],
    cities: [] as string[],
    
    // カテゴリー
    categoryType: '' as 'food' | 'beauty' | 'travel' | '',
    foodCategories: [] as string[],
    beautyCategories: [] as string[],
    travelCategories: [] as string[],
    
    // 報酬形態
    rewardType: '' as 'free_only' | 'free_plus_commission' | '',
    commissionPerBooking: '',
    
    // 交通費支給
    transportationCovered: '' as 'yes' | 'no' | '',
    
    // 従来のフィルター（互換性のため残す）
    areas: [] as string[],
    categories: [] as string[],
    rewardTypes: [] as string[],
    minAmount: '',
    maxAmount: '',
  });
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'approval',
      title: '案件が承認されました',
      message: 'カフェ・ド・パリの案件が承認されました。来店予約をしてください。',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
      isRead: false,
      projectId: '1',
      actionType: 'chat',
      chatId: '1',
    },
    {
      id: '2',
      type: 'deadline',
      title: '投稿納品期限が近づいています',
      message: 'イタリアン・ベラヴィスタの投稿納品まであと2日です。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
      isRead: false,
      projectId: '2',
      actionType: 'chat',
      chatId: '3',
    },
    {
      id: '3',
      type: 'progress',
      title: '来店予約が完了しました',
      message: 'ヘアサロン STYLEの来店予約が完了しました。案件管理で詳細を確認してください。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
      isRead: true,
      projectId: '3',
      actionType: 'manage',
    },
  ]);
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

  // ページ読み込み時に最上部にスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    // ブラウザのスクロール位置もリセット
    window.scrollTo(0, 0);
  }, []);

  // フィルター変更時に最上部にスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [filters]);

  const tabs = [
    { key: 'recommended', label: 'おすすめ', icon: '✨' },
    { key: 'following', label: 'フォロー中', icon: '👥' },
  ];

  const getCurrentProjects = () => {
    const allProjects = projects[activeTab] || [];
    // 応募済み案件をフィードから除外
    let filteredProjects = allProjects.filter(project => !appliedProjects.includes(project.id));
    
    // フィルタリング適用
    if (filters.areas.length > 0) {
      filteredProjects = filteredProjects.filter(project => filters.areas.includes(project.location));
    }
    if (filters.categories.length > 0) {
      filteredProjects = filteredProjects.filter(project => filters.categories.includes(project.category));
    }
    if (filters.rewardTypes.length > 0) {
      filteredProjects = filteredProjects.filter(project => filters.rewardTypes.includes(project.reward.type));
    }
    if (filters.minAmount) {
      const minAmount = parseInt(filters.minAmount);
      filteredProjects = filteredProjects.filter(project => project.reward.amount >= minAmount);
    }
    if (filters.maxAmount) {
      const maxAmount = parseInt(filters.maxAmount);
      filteredProjects = filteredProjects.filter(project => project.reward.amount <= maxAmount);
    }
    
    return filteredProjects;
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

  const handleNotificationClick = (notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    projectId: string;
    actionType: string;
    chatId?: string;
  }) => {
    // 未読を既読にする
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );

    // アクションタイプに応じてページ遷移
    switch (notification.actionType) {
      case 'chat':
        router.push(`/messages/${notification.chatId}`);
        break;
      case 'reservation':
        router.push(`/project/${notification.projectId}/reservation`);
        break;
      case 'submit':
        router.push(`/project/submit`);
        break;
      case 'manage':
        router.push(`/project/manage?status=progress`);
        break;
      default:
        router.push(`/project/${notification.projectId}`);
    }
    
    setShowNotifications(false);
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <header className="bg-salmon-coral px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">moreflue</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Filter button clicked'); // デバッグ用
                setShowFilter(true);
              }}
              className="p-2 text-white hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="フィルター設定"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
            </button>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Notification button clicked'); // デバッグ用
                  setShowNotifications(true);
                }}
                className="p-2 text-white hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="通知"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              {getUnreadCount() > 0 && (
                <div className="absolute -top-1 -right-1 bg-white text-salmon-coral text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getUnreadCount()}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* タブ */}
      <div className="bg-white sticky top-[61px] z-30">
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

      {/* フィルターモーダル */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 pb-6">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-smoky-navy">フィルター設定</h2>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Filter close button clicked'); // デバッグ用
                    setShowFilter(false);
                  }}
                  className="p-2 text-smoky-navy hover:text-salmon-coral"
                  type="button"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              {/* SNS媒体 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-smoky-navy mb-3">SNS媒体</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'youtube', label: 'YouTube' },
                    { key: 'instagram', label: 'Instagram' },
                    { key: 'x', label: 'X' },
                    { key: 'tiktok', label: 'TikTok' },
                    { key: 'threads', label: 'Threads' }
                  ].map(platform => (
                    <button
                      key={platform.key}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          platforms: prev.platforms.includes(platform.key)
                            ? prev.platforms.filter(p => p !== platform.key)
                            : [...prev.platforms, platform.key]
                        }));
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        filters.platforms.includes(platform.key)
                          ? 'bg-salmon-coral text-white'
                          : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                      }`}
                    >
                      {platform.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 場所 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-smoky-navy">場所</h3>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-xs text-salmon-coral hover:text-smoky-navy transition-colors"
                  >
                    自宅の位置を設定（非公開）
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, locationType: 'nearby', prefectures: [], cities: [] }))}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        filters.locationType === 'nearby'
                          ? 'bg-salmon-coral text-white'
                          : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                      }`}
                    >
                      自宅からの距離で選ぶ
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, locationType: 'area', nearbyTransport: '', nearbyMinutes: '' }))}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        filters.locationType === 'area'
                          ? 'bg-salmon-coral text-white'
                          : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                      }`}
                    >
                      エリア指定
                    </button>
                  </div>

                  {filters.locationType === 'nearby' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 mb-2 block">交通手段</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { key: 'walk', label: '徒歩' },
                            { key: 'train', label: '電車' },
                            { key: 'car', label: '車' }
                          ].map(transport => (
                            <button
                              key={transport.key}
                              onClick={() => setFilters(prev => ({ ...prev, nearbyTransport: transport.key }))}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                filters.nearbyTransport === transport.key
                                  ? 'bg-salmon-coral text-white'
                                  : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                              }`}
                            >
                              {transport.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {filters.nearbyTransport && (
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">時間（分）</label>
                          <input
                            type="number"
                            value={filters.nearbyMinutes}
                            onChange={(e) => setFilters(prev => ({ ...prev, nearbyMinutes: e.target.value }))}
                            placeholder="30"
                            className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {filters.locationType === 'area' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 mb-2 block">都道府県</label>
                        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                          {['東京都', '神奈川県', '千葉県', '埼玉県', '大阪府', '京都府', '兵庫県', '愛知県'].map(prefecture => (
                            <button
                              key={prefecture}
                              onClick={() => {
                                setFilters(prev => ({
                                  ...prev,
                                  prefectures: prev.prefectures.includes(prefecture)
                                    ? prev.prefectures.filter(p => p !== prefecture)
                                    : [...prev.prefectures, prefecture]
                                }));
                              }}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                filters.prefectures.includes(prefecture)
                                  ? 'bg-salmon-coral text-white'
                                  : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                              }`}
                            >
                              {prefecture}
                            </button>
                          ))}
                        </div>
                      </div>

                      {filters.prefectures.includes('東京都') && (
                        <div>
                          <label className="text-xs text-gray-600 mb-2 block">東京都内市区町村</label>
                          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                            {['渋谷区', '新宿区', '港区', '千代田区', '中央区', '品川区', '目黒区', '世田谷区', '杉並区', '中野区', '練馬区', '板橋区'].map(city => (
                              <button
                                key={city}
                                onClick={() => {
                                  setFilters(prev => ({
                                    ...prev,
                                    cities: prev.cities.includes(city)
                                      ? prev.cities.filter(c => c !== city)
                                      : [...prev.cities, city]
                                  }));
                                }}
                                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                                  filters.cities.includes(city)
                                    ? 'bg-salmon-coral text-white'
                                    : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                                }`}
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* カテゴリー */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-smoky-navy mb-3">カテゴリー</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'food', label: '食事' },
                      { key: 'beauty', label: '美容' },
                      { key: 'travel', label: '旅行' }
                    ].map(category => (
                      <button
                        key={category.key}
                        onClick={() => setFilters(prev => ({ ...prev, categoryType: category.key }))}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          filters.categoryType === category.key
                            ? 'bg-salmon-coral text-white'
                            : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>

                  {filters.categoryType === 'food' && (
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {['居酒屋', 'ダイニングバー・バル', '創作料理', '和食', '洋食', 'イタリアン・フレンチ', '中華', '焼肉・ホルモン', 
                        '韓国料理', 'アジア・エスニック料理', '各国料理', 'カラオケ・パーティ', 'バー・カクテル', 'ラーメン', 
                        'お好み焼き・もんじゃ', 'カフェ・スイーツ', 'その他グルメ'].map(food => (
                        <button
                          key={food}
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              foodCategories: prev.foodCategories.includes(food)
                                ? prev.foodCategories.filter(f => f !== food)
                                : [...prev.foodCategories, food]
                            }));
                          }}
                          className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                            filters.foodCategories.includes(food)
                              ? 'bg-salmon-coral text-white'
                              : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                          }`}
                        >
                          {food}
                        </button>
                      ))}
                    </div>
                  )}

                  {filters.categoryType === 'beauty' && (
                    <div className="grid grid-cols-3 gap-2">
                      {['ヘア', 'アイ', 'ネイル', 'リラク', '美容医療'].map(beauty => (
                        <button
                          key={beauty}
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              beautyCategories: prev.beautyCategories.includes(beauty)
                                ? prev.beautyCategories.filter(b => b !== beauty)
                                : [...prev.beautyCategories, beauty]
                            }));
                          }}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            filters.beautyCategories.includes(beauty)
                              ? 'bg-salmon-coral text-white'
                              : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                          }`}
                        >
                          {beauty}
                        </button>
                      ))}
                    </div>
                  )}

                  {filters.categoryType === 'travel' && (
                    <div className="grid grid-cols-2 gap-2">
                      {['ホテル', '旅館'].map(travel => (
                        <button
                          key={travel}
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              travelCategories: prev.travelCategories.includes(travel)
                                ? prev.travelCategories.filter(t => t !== travel)
                                : [...prev.travelCategories, travel]
                            }));
                          }}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            filters.travelCategories.includes(travel)
                              ? 'bg-salmon-coral text-white'
                              : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                          }`}
                        >
                          {travel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 報酬形態 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-smoky-navy mb-3">報酬形態</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, rewardType: 'free_only', commissionPerBooking: '' }))}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        filters.rewardType === 'free_only'
                          ? 'bg-salmon-coral text-white'
                          : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                      }`}
                    >
                      無償提供のみ
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, rewardType: 'free_plus_commission' }))}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        filters.rewardType === 'free_plus_commission'
                          ? 'bg-salmon-coral text-white'
                          : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                      }`}
                    >
                      無償提供＋成果報酬
                    </button>
                  </div>

                  {filters.rewardType === 'free_plus_commission' && (
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">1予約あたりの報酬額（円）</label>
                      <input
                        type="number"
                        value={filters.commissionPerBooking}
                        onChange={(e) => setFilters(prev => ({ ...prev, commissionPerBooking: e.target.value }))}
                        placeholder="1000"
                        className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 交通費支給 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-smoky-navy mb-3">交通費支給</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, transportationCovered: 'yes' }))}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      filters.transportationCovered === 'yes'
                        ? 'bg-salmon-coral text-white'
                        : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                    }`}
                  >
                    あり
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, transportationCovered: 'no' }))}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      filters.transportationCovered === 'no'
                        ? 'bg-salmon-coral text-white'
                        : 'bg-light-greige text-smoky-navy hover:bg-salmon-coral hover:text-white'
                    }`}
                  >
                    なし
                  </button>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-3 mt-8 mb-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Filter reset button clicked'); // デバッグ用
                    setFilters({
                      platforms: [],
                      locationType: '',
                      nearbyTransport: '',
                      nearbyMinutes: '',
                      prefectures: [],
                      cities: [],
                      categoryType: '',
                      foodCategories: [],
                      beautyCategories: [],
                      travelCategories: [],
                      rewardType: '',
                      commissionPerBooking: '',
                      transportationCovered: '',
                      areas: [],
                      categories: [],
                      rewardTypes: [],
                      minAmount: '',
                      maxAmount: '',
                    });
                  }}
                  className="flex-1 py-3 border border-light-greige text-smoky-navy rounded-lg font-medium"
                  type="button"
                >
                  リセット
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Filter apply button clicked'); // デバッグ用
                    setShowFilter(false);
                  }}
                  className="flex-1 py-3 bg-salmon-coral text-white rounded-lg font-medium"
                  type="button"
                >
                  適用
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 自宅住所設定モーダル */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 pb-6">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-smoky-navy">自宅住所設定</h2>
                <button 
                  onClick={() => setShowAddressModal(false)}
                  className="p-2 text-smoky-navy hover:text-salmon-coral"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              <div className="mb-4 p-3 bg-light-greige rounded-lg">
                <p className="text-xs text-gray-600">
                  この情報は非公開で、距離計算のためにのみ使用されます。他のユーザーには表示されません。
                </p>
              </div>

              {/* 都道府県 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-smoky-navy mb-2 block">都道府県</label>
                <select
                  value={homeAddress.prefecture}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, prefecture: e.target.value }))}
                  className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
                >
                  <option value="">選択してください</option>
                  <option value="東京都">東京都</option>
                  <option value="神奈川県">神奈川県</option>
                  <option value="千葉県">千葉県</option>
                  <option value="埼玉県">埼玉県</option>
                  <option value="大阪府">大阪府</option>
                  <option value="京都府">京都府</option>
                  <option value="兵庫県">兵庫県</option>
                  <option value="愛知県">愛知県</option>
                </select>
              </div>

              {/* 市区町村 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-smoky-navy mb-2 block">市区町村</label>
                <input
                  type="text"
                  value={homeAddress.city}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="渋谷区"
                  className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
                />
              </div>

              {/* 町名 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-smoky-navy mb-2 block">町名</label>
                <input
                  type="text"
                  value={homeAddress.town}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, town: e.target.value }))}
                  placeholder="神南"
                  className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
                />
              </div>

              {/* 番地 */}
              <div className="mb-6">
                <label className="text-sm font-medium text-smoky-navy mb-2 block">番地</label>
                <input
                  type="text"
                  value={homeAddress.address}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="1-2-3"
                  className="w-full px-3 py-2 border border-light-greige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
                />
              </div>

              {/* アクションボタン */}
              <div className="flex gap-3 mt-8 mb-4">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-3 border border-light-greige text-smoky-navy rounded-lg font-medium"
                  type="button"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    // 住所を保存（実際のアプリではローカルストレージやAPIに保存）
                    console.log('Saving address:', homeAddress);
                    setShowAddressModal(false);
                  }}
                  className="flex-1 py-3 bg-salmon-coral text-white rounded-lg font-medium"
                  type="button"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 通知モーダル */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl sm:rounded-2xl max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-smoky-navy">通知</h2>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-2 text-smoky-navy hover:text-salmon-coral"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              {/* 通知一覧 */}
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-2 block">🔕</span>
                    <p className="text-gray-600">通知はありません</p>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${
                        notification.isRead ? 'border-gray-200' : 'border-salmon-coral bg-salmon-coral/5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* アイコンとタイトル */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">
                              {notification.type === 'approval' && '✅'}
                              {notification.type === 'deadline' && '⏰'}
                              {notification.type === 'progress' && '📋'}
                            </span>
                            <h3 className="font-medium text-smoky-navy text-sm">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-salmon-coral rounded-full"></div>
                            )}
                          </div>
                          
                          {/* メッセージ */}
                          <p className="text-gray-600 text-xs mb-2">
                            {notification.message}
                          </p>
                          
                          {/* タイムスタンプ */}
                          <p className="text-gray-400 text-xs">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        
                        {/* 矢印アイコン */}
                        <svg className="w-4 h-4 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
                        </svg>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 全て既読にするボタン */}
              {notifications.some(n => !n.isRead) && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                    }}
                    className="w-full py-2 text-sm text-salmon-coral hover:text-smoky-navy transition-colors"
                  >
                    全ての通知を既読にする
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏠</div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
