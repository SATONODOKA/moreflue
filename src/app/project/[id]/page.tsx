'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// サンプル詳細データ
const projectDetails: { [key: string]: any } = {
  '1': {
    id: '1',
    storeName: 'カフェ・ド・パリ',
    category: 'カフェ',
    location: '渋谷',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    story: '創業30年の老舗カフェです。毎朝手作りのパンと、こだわりの自家焙煎コーヒーで、お客様に温かいひとときを提供しています。Instagram映えする店内と美味しいコーヒーで、多くの方に愛されるお店を目指しています。',
    reward: { type: 'fixed', amount: 15000 },
    matchScore: 95,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '渋谷駅から徒歩8分',
      postRequirements: 'フィード投稿1枚 + ストーリーズ3投稿',
      preApproval: true,
      performanceGoals: '来店者数10名以上、投稿エンゲージメント率3%以上',
      timeline: '投稿から1週間以内に来店効果測定',
      additionalNotes: '撮影時間は30分程度を想定しています'
    }
  },
  '2': {
    id: '2',
    storeName: 'イタリアン・ベラヴィスタ',
    category: 'イタリアン',
    location: '新宿',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    story: '本格的なイタリア料理を気軽に楽しめるトラットリアです。シェフが厳選した食材で作る手作りパスタと、ワインとの絶妙なマリアージュをお楽しみください。アットホームな雰囲気の中で、特別な時間をお過ごしいただけます。',
    reward: { type: 'performance', amount: 8000, performanceRate: 5 },
    matchScore: 88,
    platforms: ['instagram'],
    isFollowing: false,
    details: {
      travelTime: '新宿駅から徒歩12分',
      postRequirements: 'フィード投稿1枚（料理写真必須）',
      preApproval: false,
      performanceGoals: '来店者数5名以上で成果報酬発生',
      timeline: '投稿から2週間以内',
      additionalNotes: 'ディナータイムの撮影を推奨します'
    }
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const project = projectDetails[params.id as string];
  
  if (!project) {
    return (
      <div className="min-h-screen bg-light-greige flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-smoky-navy mb-4">案件が見つかりません</h2>
          <Link href="/" className="text-salmon-coral">ホームに戻る</Link>
        </div>
      </div>
    );
  }

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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-greige">
      {/* ヘッダー */}
      <header className="bg-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="text-smoky-navy hover:text-salmon-coral transition-colors text-lg"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-smoky-navy">案件詳細</h1>
        </div>
      </header>

      {/* メイン画像 */}
      <div className="w-full h-64 relative">
        <img 
          src={project.imageUrl} 
          alt={project.storeName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* 画像上のプラットフォームアイコン */}
        <div className="absolute top-4 left-4 flex gap-2">
          {project.platforms.map((platform: string, index: number) => (
            <div key={index}>
              {getPlatformIcon(platform)}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {/* 基本情報 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-smoky-navy mb-1">{project.storeName}</h2>
              <p className="text-gray-600 text-sm mb-2">{project.category} • {project.location}</p>
              
              {/* 報酬とマッチ度 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="text-salmon-coral font-bold text-lg">
                  {project.reward.type === 'fixed' ? (
                    <span>¥{project.reward.amount.toLocaleString()}</span>
                  ) : (
                    <span>¥{project.reward.amount.toLocaleString()} + 成果報酬{project.reward.performanceRate}%</span>
                  )}
                </div>
                <div className="bg-sunset-yellow text-smoky-navy px-3 py-1 rounded-full text-sm font-bold">
                  AIによるおすすめ度 {project.matchScore}%
                </div>
              </div>
            </div>
            
            {/* フォローボタン */}
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isFollowing 
                  ? 'bg-gray-200 text-gray-600' 
                  : 'bg-salmon-coral text-white hover:bg-opacity-90'
              }`}
            >
              {isFollowing ? 'フォロー中' : 'フォロー'}
            </button>
          </div>
        </div>

        {/* 店舗ストーリー */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold text-smoky-navy mb-3">店舗のこだわり</h3>
          <p className="text-gray-700 leading-relaxed">{project.story}</p>
        </div>

        {/* 詳細条件 */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold text-smoky-navy mb-4">詳細条件</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">移動時間</span>
              <span className="font-medium text-smoky-navy">{project.details.travelTime}</span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <span className="text-gray-600">投稿内容</span>
              <span className="font-medium text-smoky-navy text-right">{project.details.postRequirements}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">事前確認</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.details.preApproval 
                  ? 'bg-sunset-yellow text-smoky-navy' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {project.details.preApproval ? '要承認' : '不要'}
              </span>
            </div>
            
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <span className="text-gray-600">成果条件</span>
              <span className="font-medium text-smoky-navy text-right">{project.details.performanceGoals}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">実施期間</span>
              <span className="font-medium text-smoky-navy">{project.details.timeline}</span>
            </div>
            
            {project.details.additionalNotes && (
              <div className="mt-4 p-3 bg-light-greige rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">補足：</span>
                  {project.details.additionalNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/messages')}
            className="w-full bg-salmon-coral text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors border-0"
          >
            この案件に応募する
          </button>
          
          <button 
            onClick={() => router.push('/messages')}
            className="w-full bg-white border-2 border-smoky-navy text-smoky-navy py-3 rounded-lg font-medium hover:bg-smoky-navy hover:text-white transition-colors"
          >
            チャットで問い合わせ
          </button>
        </div>
      </div>
    </div>
  );
}
