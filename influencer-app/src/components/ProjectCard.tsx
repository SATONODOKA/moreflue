'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  id?: string;
  storeName: string;
  reward: {
    type: 'fixed' | 'performance' | 'free_plus_commission';
    amount: number;
    performanceRate?: number;
    commission?: number;
  };
  matchScore: number;
  category: string;
  location: string;
  condition: string;
  imageUrl?: string;
  images?: string[];
  recommendationPoint?: string;
  platforms: ('instagram' | 'tiktok' | 'twitter' | 'youtube')[];
  isFollowing?: boolean;
  hasApplied?: boolean;
  transportation?: string;
  distance?: string;
}

const ProjectCard = ({
  id,
  storeName,
  reward,
  matchScore,
  category,
  location,
  condition,
  imageUrl,
  images,
  recommendationPoint,
  platforms,
  isFollowing = false,
  hasApplied = false,
}: ProjectCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const displayImages = images && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const hasMultipleImages = displayImages.length > 1;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <div className="w-6 h-6 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        );
      case 'tiktok':
        return (
          <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
        );
      case 'twitter':
        return (
          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
        );
      case 'youtube':
        return (
          <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const handleCardClick = () => {
    if (id) {
      // デモ投稿の場合、1番上のもの（demo-2）のみ動作
      if (id.startsWith('demo-') && id !== 'demo-2') {
        return;
      }
      router.push(`/project/${id}?source=home`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation(); // カードクリックイベントを阻止
    if (action === 'detail') {
      handleCardClick();
    }
  };

  const handleImageSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;

    const startX = e.touches[0]?.clientX;
    if (!startX) return;
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0]?.clientX;
      if (!endX) return;
      
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentImageIndex < displayImages.length - 1) {
          // 左スワイプ - 次の画像
          setCurrentImageIndex(prev => prev + 1);
        } else if (diffX < 0 && currentImageIndex > 0) {
          // 右スワイプ - 前の画像
          setCurrentImageIndex(prev => prev - 1);
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  };

  return (
    <div 
      className="bg-white mb-1 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleCardClick}
    >
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center flex-1">
          <div className="w-7 h-7 bg-salmon-coral rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
            {storeName.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-smoky-navy text-sm">{storeName}</h3>
            <p className="text-gray-500 text-xs">{category} • {location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* AIマッチ度 */}
          <div className="flex items-center gap-1">
            <div className="bg-gray-100 text-smoky-navy px-2 py-1 rounded-full text-xs font-bold">
              AIによるおすすめ度 {matchScore}%
            </div>
          </div>
          
          {/* フォローボタン */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // フォロー処理
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isFollowing 
                ? 'bg-gray-200 text-gray-600' 
                : 'bg-salmon-coral text-white hover:bg-opacity-90'
            }`}
          >
            {isFollowing ? 'フォロー中' : 'フォロー'}
          </button>
        </div>
      </div>

      {/* 画像部分 - 複数画像スワイプ対応 */}
      <div className="w-full h-48 bg-gray-200 relative overflow-hidden" onTouchStart={handleImageSwipe}>
        {displayImages.length > 0 ? (
          <>
            <img 
              src={displayImages[currentImageIndex]} 
              alt={storeName}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
            {/* インジケーター */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                {displayImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-salmon-coral to-sunset-yellow flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-1">🏪</div>
              <p className="text-xs font-medium">{storeName}</p>
            </div>
          </div>
        )}
        
        {/* 画像ナビゲーションボタン */}
        {hasMultipleImages && (
          <>
            {/* 前の画像ボタン（左側） */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentImageIndex > 0) {
                  setCurrentImageIndex(prev => prev - 1);
                }
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              style={{ display: currentImageIndex > 0 ? 'block' : 'none' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            {/* 次の画像ボタン（右側） */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentImageIndex < displayImages.length - 1) {
                  setCurrentImageIndex(prev => prev + 1);
                }
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              style={{ display: currentImageIndex < displayImages.length - 1 ? 'block' : 'none' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </>
        )}

        {/* オーバーレイ - 投稿媒体アイコンと保存ボタン */}
        <div className="absolute inset-0 flex justify-between items-start p-3 pointer-events-none">
          {/* 投稿媒体アイコン */}
          <div className="flex gap-2">
            {platforms.map((platform, index) => (
              <div key={index}>
                {getPlatformIcon(platform)}
              </div>
            ))}
          </div>
          
          {/* 保存ボタン */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // 保存処理
            }}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors pointer-events-auto"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 報酬と条件部分 */}
      <div className="p-3 pt-2">
        {/* おすすめポイント */}
        {recommendationPoint && (
          <div className="mb-2 p-2 bg-light-greige rounded-md">
            <div className="text-xs text-smoky-navy">
              <span className="text-salmon-coral font-medium">おすすめポイント：</span>
              {recommendationPoint}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-salmon-coral font-bold text-base">
            {reward.type === 'fixed' ? (
              <span>¥{reward.amount.toLocaleString()}</span>
            ) : reward.type === 'performance' ? (
              <span>
                ¥{reward.amount.toLocaleString()} + 成果報酬{reward.performanceRate}%
              </span>
            ) : reward.type === 'free_plus_commission' ? (
              <span>
                無償提供 + ¥{reward.commission?.toLocaleString()}/予約
              </span>
            ) : (
              <span>¥{reward.amount.toLocaleString()}</span>
            )}
          </div>
          <div className="text-gray-600 text-xs">
            {condition}
          </div>
        </div>

        {/* ボタン群 */}
        {hasApplied ? (
          <div className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium text-center border-0">
            応募済み
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // デモ投稿の場合、demo-2のみ動作
                if (id?.startsWith('demo-') && id !== 'demo-2') {
                  return;
                }
                console.log(`Detail button clicked for ${storeName}`); // デバッグ用
                handleButtonClick(e, 'detail');
              }}
              className="flex-1 bg-white border border-salmon-coral text-salmon-coral py-2 rounded-lg text-sm font-medium hover:bg-salmon-coral hover:text-white transition-colors"
              type="button"
            >
              詳細を見る
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // デモ投稿の場合、demo-2のみ動作
                if (id?.startsWith('demo-') && id !== 'demo-2') {
                  return;
                }
                console.log(`Apply button clicked for ${storeName}`); // デバッグ用
                // 直接応募処理
                if (confirm(`${storeName}の案件に応募しますか？`)) {
                  // 応募済みとして処理し、まずホームで除外してから応募済み一覧に移動
                  router.push(`/?applied=${id}&source=home-direct`);
                  setTimeout(() => {
                    router.push(`/projects?applied=${id}&source=home-direct&showApplied=true`);
                  }, 100);
                }
              }}
              className="flex-1 bg-salmon-coral text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
              type="button"
            >
              応募する
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
