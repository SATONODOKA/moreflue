'use client';

import { useState } from 'react';
import { PlusCircle, MessageCircle, TrendingUp, Users, Eye, Heart, CheckCircle, Calendar, DollarSign, Play, Image, ExternalLink } from 'lucide-react';

interface DeliveryItem {
  id: number;
  projectTitle: string;
  influencerName: string;
  platform: string;
  postUrl: string;
  thumbnailUrl: string;
  submittedDate: string;
  reach?: number;
  engagement?: number;
  likes?: number;
}

export default function HomeContent() {
  // 月間成果データ
  const [monthlyStats] = useState({
    activeProjects: 8,
    totalProfit: 245000,
    totalReach: 325000,
    avgEngagement: 5.4,
    reachIncrease: 12.3, // %
    engagementIncrease: 8.7 // %
  });

  // 詳細成果データ（クリック時に表示）
  const [detailedStats] = useState([
    {
      id: 1,
      title: "新商品パンケーキのPRキャンペーン",
      influencer: "鈴木健太",
      platform: "Instagram",
      reach: 45000,
      engagement: 6.8,
      profit: 85000,
      roi: 340,
      status: "完了"
    },
    {
      id: 2,
      title: "季節限定スイーツの投稿キャンペーン",
      influencer: "高橋まい",
      platform: "TikTok",
      reach: 28000,
      engagement: 8.2,
      profit: 52000,
      roi: 260,
      status: "完了"
    },
    {
      id: 3,
      title: "カフェの新店舗オープン告知",
      influencer: "田中美咲",
      platform: "Instagram",
      reach: 62000,
      engagement: 4.9,
      profit: 108000,
      roi: 450,
      status: "進行中"
    }
  ]);

  // 納品物確認データ
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([
    {
      id: 1,
      projectTitle: "新商品パンケーキのPRキャンペーン",
      influencerName: "鈴木健太",
      platform: "Instagram",
      postUrl: "https://instagram.com/p/sample1",
      thumbnailUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop&auto=format",
      submittedDate: "2025-01-07",
      reach: 15000,
      engagement: 4.8,
      likes: 720
    },
    {
      id: 2,
      projectTitle: "季節限定スイーツの投稿キャンペーン",
      influencerName: "高橋まい",
      platform: "TikTok",
      postUrl: "https://tiktok.com/@sample2",
      thumbnailUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop&auto=format",
      submittedDate: "2025-01-06",
      reach: 8200,
      engagement: 6.2,
      likes: 508
    },
    {
      id: 3,
      projectTitle: "ランチメニューのグルメレビュー",
      influencerName: "田中美咲",
      platform: "Instagram",
      postUrl: "https://instagram.com/p/sample3",
      thumbnailUrl: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=300&h=200&fit=crop&auto=format",
      submittedDate: "2025-01-06",
      reach: 12500,
      engagement: 5.1,
      likes: 638
    },
    {
      id: 4,
      projectTitle: "コーヒー豆の紹介キャンペーン",
      influencerName: "佐藤ゆき",
      platform: "YouTube",
      postUrl: "https://youtube.com/watch?v=sample4",
      thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&auto=format",
      submittedDate: "2025-01-05",
      reach: 5800,
      engagement: 7.3,
      likes: 423
    },
    {
      id: 5,
      projectTitle: "新作ドリンクのインスタ投稿",
      influencerName: "伊藤かな",
      platform: "Instagram",
      postUrl: "https://instagram.com/p/sample5",
      thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&auto=format",
      submittedDate: "2025-01-05",
      reach: 9300,
      engagement: 4.6,
      likes: 428
    }
  ]);

  const [showDetailedStats, setShowDetailedStats] = useState(false);

  // 確認済み処理
  const handleMarkAsConfirmed = (id: number) => {
    setDeliveryItems(prev => prev.filter(item => item.id !== id));
  };

  // 各タブに移動する関数
  const switchToCreateProject = () => {
    window.dispatchEvent(new CustomEvent('switchToCreateTab'));
  };

  const switchToChat = () => {
    window.dispatchEvent(new CustomEvent('switchToChatTab'));
  };

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-[#FF8A8A] to-[#FFB5B5] text-white py-5 px-4 rounded-b-2xl mb-4">
        <h1 className="text-2xl font-bold mb-1">moreflue</h1>
        <p className="text-white/90 text-xs">店舗向けインフルエンサーマッチングシステム</p>
      </header>
      
      <div className="px-4 space-y-4">

      {/* 成果確認画面（上部） */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700">今月の成果</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="bg-white rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="text-[#FF8A8A] text-xl font-bold">{monthlyStats.activeProjects}</div>
            <div className="text-gray-500 text-xs mt-1">進行中の案件</div>
          </button>
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="bg-white rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="text-[#FF8A8A] text-xl font-bold">¥{(monthlyStats.totalProfit / 1000).toFixed(0)}K</div>
            <div className="text-gray-500 text-xs mt-1">今月の利益</div>
          </button>
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="bg-white rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 relative"
          >
            <div className="text-[#FF8A8A] text-xl font-bold">{(monthlyStats.totalReach / 1000).toFixed(0)}K</div>
            <div className="text-gray-500 text-xs mt-1">総リーチ数</div>
            <div className="absolute top-2 right-2 text-green-500 text-[10px] font-semibold">
              +{monthlyStats.reachIncrease}%↑
            </div>
          </button>
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="bg-white rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 relative"
          >
            <div className="text-[#FF8A8A] text-xl font-bold">{monthlyStats.avgEngagement}%</div>
            <div className="text-gray-500 text-xs mt-1">平均エンゲージメント</div>
            <div className="absolute top-2 right-2 text-green-500 text-[10px] font-semibold">
              +{monthlyStats.engagementIncrease}%↑
            </div>
          </button>
        </div>

      </section>


      {/* 納品物確認（下部） */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700">納品物確認</h2>
        {deliveryItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <CheckCircle size={32} className="mx-auto mb-2 text-gray-400" />
            <div className="text-sm text-gray-600">確認待ちの納品物はありません</div>
          </div>
        ) : (
          <div className="space-y-3">
            {deliveryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                    <img 
                      src={item.thumbnailUrl} 
                      alt="投稿画像" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <Image size={24} className="text-gray-400 absolute" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-tertiary line-clamp-1 mb-1">
                      {item.projectTitle}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Users size={12} />
                      <span>{item.influencerName}</span>
                      <span>•</span>
                      <span>{item.platform}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{item.reach?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} />
                        <span>{item.engagement}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{item.submittedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(item.postUrl, '_blank')}
                        className="text-xs text-[#FF8A8A] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                        投稿を確認
                      </button>
                      <button
                        onClick={() => handleMarkAsConfirmed(item.id)}
                        className="ml-auto px-3 py-1.5 bg-[#4CAF50] text-white text-xs rounded-lg hover:bg-[#45A049] transition-colors"
                      >
                        確認済みにする
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      </div>
      
      {/* 詳細成果モーダル */}
      {showDetailedStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary">詳細成果</h2>
              <button
                onClick={() => setShowDetailedStats(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
              {detailedStats.map((stat) => (
                <div key={stat.id} className="border rounded-xl p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{stat.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      stat.status === '完了' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {stat.status}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    {stat.influencer} • {stat.platform}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{stat.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      <span>{stat.engagement}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} />
                      <span>¥{stat.profit.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>ROI {stat.roi}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 