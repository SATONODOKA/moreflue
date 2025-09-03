'use client';

import { useRouter } from 'next/navigation';

interface CompactProjectCardProps {
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
  status?: string; // 進行中タブの場合のステータス
  isUrgent?: boolean;
  deadline?: string;
}

const CompactProjectCard = ({
  id,
  storeName,
  reward,
  matchScore,
  category,
  location,
  status,
  isUrgent = false,
  deadline,
}: CompactProjectCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${id}`);
  };

  return (
    <div 
      className="bg-white p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        {/* 左側：基本情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-smoky-navy text-base truncate">{storeName}</h3>
            {isUrgent && (
              <span className="bg-salmon-coral text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                急ぎ
              </span>
            )}
          </div>
          
          {/* 報酬表示 */}
          <div className="mb-2">
            <span className="text-salmon-coral font-bold text-lg">
              {reward.type === 'fixed' ? (
                `¥${reward.amount.toLocaleString()}`
              ) : (
                `¥${reward.amount.toLocaleString()} + 成果報酬${reward.performanceRate}%`
              )}
            </span>
          </div>
          
          {/* 条件タグ */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {location}
            </span>
          </div>
          
          {/* ステータス表示（進行中タブの場合） */}
          {status && (
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {status}
              </span>
            </div>
          )}
          
          {/* 期限表示 */}
          {deadline && (
            <div className="mt-1">
              <span className="text-sunset-yellow text-xs font-medium">
                期限: {deadline}
              </span>
            </div>
          )}
        </div>
        
        {/* 右側：マッチ度 */}
        <div className="flex-shrink-0 ml-4 text-right">
          <div className="bg-gray-100 text-smoky-navy px-3 py-1 rounded-full text-sm font-bold mb-2">
            {matchScore}%
          </div>
          <div className="text-gray-400 text-xs">
            マッチ度
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactProjectCard;
