interface ProjectCardProps {
  id?: string;
  storeName: string;
  reward: {
    type: 'fixed' | 'performance';
    amount: number;
    performanceRate?: number;
  };
  matchScore: number;
  category: string;
  location: string;
  condition: string;
  imageUrl?: string;
  platforms: ('instagram' | 'tiktok' | 'twitter')[];
  isFollowing?: boolean;
}

const ProjectCard = ({
  id: _id,
  storeName,
  reward,
  matchScore,
  category,
  location,
  condition,
  imageUrl,
  platforms,
  isFollowing = false,
}: ProjectCardProps) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="bg-white mb-1">
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
            <div className="bg-sunset-yellow text-smoky-navy px-2 py-1 rounded-full text-xs font-bold">
              AIによるおすすめ度 {matchScore}%
            </div>
          </div>
          
          {/* フォローボタン */}
          <button 
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

      {/* 画像部分 - オーバーレイ付き */}
      <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={storeName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-salmon-coral to-sunset-yellow flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-3xl mb-1">🏪</div>
              <p className="text-xs font-medium">{storeName}</p>
            </div>
          </div>
        )}
        
        {/* オーバーレイ - 投稿媒体アイコンと保存ボタン */}
        <div className="absolute inset-0 flex justify-between items-start p-3">
          {/* 投稿媒体アイコン */}
          <div className="flex gap-2">
            {platforms.map((platform, index) => (
              <div key={index}>
                {getPlatformIcon(platform)}
              </div>
            ))}
          </div>
          
          {/* 保存ボタン */}
          <button className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 報酬と条件部分 - 白いラインなし */}
      <div className="p-3 pt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-salmon-coral font-bold text-base">
            {reward.type === 'fixed' ? (
              <span>¥{reward.amount.toLocaleString()}</span>
            ) : (
              <span>
                ¥{reward.amount.toLocaleString()} + 成果報酬{reward.performanceRate}%
              </span>
            )}
          </div>
          <div className="text-gray-600 text-xs">
            {condition}
          </div>
        </div>

        {/* 詳細ボタン */}
        <button className="w-full bg-salmon-coral text-white py-1.5 rounded-lg text-xs font-medium hover:bg-opacity-90 transition-colors border-0">
          案件詳細を見る
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 