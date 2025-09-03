'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCachedData, setCachedData, CACHE_KEYS } from '@/utils/cache';

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
      },
  '3': {
    id: '3',
    storeName: 'ヘアサロン STYLE',
    category: 'ビューティー',
    location: '表参道',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    story: '表参道で20年の実績を持つ、トレンドを牽引するヘアサロン。お客様一人ひとりの骨格や髪質に合わせたパーソナルな提案と、再現性の高いカット技術が強みです。最新のヘアケア製品も取り揃え、髪の悩みを根本から解決します。洗練された空間で、新しい自分に出会える体験を提供します。',
    reward: { type: 'fixed', amount: 25000 },
    matchScore: 92,
    platforms: ['instagram', 'tiktok', 'twitter'],
    isFollowing: false,
    details: {
      travelTime: '表参道駅から徒歩3分',
      postRequirements: 'ビフォーアフター写真2枚 + ストーリーズ5投稿',
      preApproval: true,
      performanceGoals: '新規顧客来店数3名以上、指名予約1名以上',
      timeline: '施術から1週間以内に投稿',
      additionalNotes: '施術内容については事前に打ち合わせが必要です'
    }
  },
  '4': {
    id: '4',
    storeName: 'フィットネスジム POWER',
    category: 'フィットネス',
    location: '恵比寿',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    story: '恵比寿駅直結の最新設備を誇るフィットネスジム。初心者から上級者まで、一人ひとりの目標に合わせたパーソナルトレーニングを提供しています。清潔で開放的な空間と、経験豊富なトレーナーが皆様の健康とボディメイクをサポートします。',
    reward: { type: 'performance', amount: 10000, performanceRate: 8 },
    matchScore: 85,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '恵比寿駅から徒歩1分',
      postRequirements: 'トレーニング動画1本 + ビフォーアフター写真',
      preApproval: false,
      performanceGoals: '新規入会者3名以上で成果報酬発生',
      timeline: '体験から2週間以内',
      additionalNotes: 'トレーニングウェアは貸し出し可能です'
    }
  },
  '5': {
    id: '5',
    storeName: 'スイーツカフェ Sweet',
    category: 'スイーツ',
    location: '原宿',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    story: '原宿の中心地にある、インスタ映えするスイーツが人気のカフェです。季節のフルーツを使った色鮮やかなパフェと、手作りケーキが自慢。可愛らしい店内で、特別な時間をお過ごしいただけます。若い女性を中心に多くのお客様に愛されています。',
    reward: { type: 'fixed', amount: 12000 },
    matchScore: 90,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '原宿駅から徒歩5分',
      postRequirements: 'スイーツの写真2枚 + ストーリーズ3投稿',
      preApproval: true,
      performanceGoals: '来店者数8名以上、投稿いいね数500以上',
      timeline: '投稿から10日以内',
      additionalNotes: '撮影用の小道具もご用意しています'
    }
  }
  };

// チャットメッセージの型定義
interface ChatMessage {
  id: string;
  sender: 'store' | 'user';
  message: string;
  timestamp: string;
  isRead: boolean;
}

// サンプルチャットデータ（初期は空）
const sampleChatMessages: ChatMessage[] = [];

// モック返信パターン
const mockReplies = [
  'ありがとうございます！詳細について確認させていただきます。',
  'かしこまりました。少々お時間をいただけますでしょうか。',
  'ご連絡いただきありがとうございます。確認いたします。',
  '承知いたしました。後ほど詳細をお送りします。',
  'お疲れ様です！内容を確認させていただきました。',
  'ご質問ありがとうございます。回答いたします。',
  'お忙しい中ありがとうございます。検討いたします。',
  'ご提案いただきありがとうございます！',
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URLパラメータからタブ情報とソース情報を取得
  const tab = searchParams.get('tab') || 'scout'; // デフォルトはスカウト
  const source = searchParams.get('source') || 'scout'; // デフォルトはスカウト
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<'approve' | 'decline' | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(sampleChatMessages);
  
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

  const handleApprove = () => {
    setShowConfirmDialog(null);
    // 承認された案件IDを渡して進行中タブに移動
    router.push(`/projects?tab=inProgress&approved=${params.id}`);
  };

  const handleDecline = () => {
    setShowConfirmDialog(null);
    // 辞退された案件IDを渡してスカウトタブに戻る
    router.push(`/projects?tab=scout&declined=${params.id}`);
  };

  const handleApply = () => {
    setHasApplied(true);
    setShowSuccessMessage(true);
    
    // ホーム画面の応募済み状態を即座に更新
    const currentApplied = getCachedData<string[]>(CACHE_KEYS.HOME_APPLIED_PROJECTS, []);
    if (!currentApplied.includes(params.id as string)) {
      const newApplied = [...currentApplied, params.id as string];
      setCachedData(CACHE_KEYS.HOME_APPLIED_PROJECTS, newApplied);
    }
    
    // 成功メッセージを3秒後に非表示にして案件管理の応募済み欄に移動
    setTimeout(() => {
      setShowSuccessMessage(false);
      // 応募情報を案件管理に渡して応募済み欄を表示
      router.push(`/projects?applied=${params.id}&showApplied=true`);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      
      // ユーザーメッセージを追加
      const updatedMessages = [...chatMessages, userMsg];
      setChatMessages(updatedMessages);
      setNewMessage('');
      
      // 1-3秒後にモック返信を追加
      const replyDelay = Math.random() * 2000 + 1000; // 1-3秒のランダム遅延
      setTimeout(() => {
        const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
        const storeMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'store',
          message: randomReply,
          timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          isRead: true
        };
        setChatMessages(prev => [...prev, storeMsg]);
      }, replyDelay);
    }
  };

  return (
    <div className="min-h-screen bg-light-greige">
      {/* 成功メッセージ（ホームからの応募時のみ表示） */}
      {showSuccessMessage && source === 'home' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white p-4 text-center">
          <p className="font-medium">応募ありがとうございます！店舗からのリアクションがあればお知らせします</p>
        </div>
      )}

      {/* 確認ダイアログ */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-smoky-navy mb-4 text-center">
              {showConfirmDialog === 'approve' ? '本当に承認しますか？' : '本当に辞退しますか？'}
            </h3>
            <p className="text-gray-600 text-sm mb-6 text-center">
              {showConfirmDialog === 'approve' 
                ? 'この案件を承認すると、進行中タブに移動し、店舗とのチャットが開始されます。'
                : 'この案件を辞退すると、リストから削除され、元に戻すことはできません。'
              }
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={showConfirmDialog === 'approve' ? handleApprove : handleDecline}
                className={`flex-1 py-3 rounded-lg font-medium text-white transition-colors ${
                  showConfirmDialog === 'approve'
                    ? 'bg-salmon-coral hover:bg-opacity-90'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {showConfirmDialog === 'approve' ? '承認する' : '辞退する'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ヘッダー */}
      <header className="bg-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="text-smoky-navy hover:text-salmon-coral transition-colors text-lg"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-smoky-navy">
            {tab === 'inProgress' ? '進行中案件' : '案件詳細'}
          </h1>
        </div>
      </header>

      {tab === 'inProgress' ? (
        // 進行中案件の表示（案件概要＋チャット）
        <div className="flex flex-col h-screen">
          {/* 案件概要（固定） */}
          <div className="bg-white p-4 border-b border-gray-300 flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-salmon-coral rounded-full flex items-center justify-center text-white text-lg font-bold">
                {project.storeName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-smoky-navy">{project.storeName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{project.category} • {project.location}</span>
                  <span className="text-salmon-coral font-bold">
                    ¥{project.reward.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                交渉中
              </span>
              <span className="bg-sunset-yellow text-smoky-navy text-xs px-2 py-1 rounded-full">
                要事前確認
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                締切: 1/31
              </span>
            </div>
          </div>

                     {/* チャット欄 */}
           <div className="flex-1 flex flex-col bg-white">
             {/* メッセージリスト */}
             <div className="flex-1 overflow-y-auto p-4 space-y-3">
               {chatMessages.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full text-center py-20">
                   <span className="text-6xl mb-4">💬</span>
                   <h3 className="text-lg font-medium text-smoky-navy mb-2">
                     チャットを開始しましょう
                   </h3>
                   <p className="text-gray-600 text-sm">
                     店舗とのやり取りがここに表示されます
                   </p>
                 </div>
               ) : (
                 chatMessages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                       msg.sender === 'user'
                         ? 'bg-salmon-coral text-white'
                         : 'bg-white text-smoky-navy'
                     }`}>
                       <p className="text-sm">{msg.message}</p>
                       <p className={`text-xs mt-1 ${
                         msg.sender === 'user' ? 'text-white opacity-70' : 'text-gray-500'
                       }`}>
                         {msg.timestamp}
                       </p>
                     </div>
                   </div>
                 ))
               )}
             </div>

                         {/* メッセージ入力欄 */}
             <div className="bg-white p-4 border-t border-gray-300">
              <div className="flex gap-2">
                                 <input
                   type="text"
                   value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                   placeholder="メッセージを入力..."
                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-salmon-coral"
                   onKeyPress={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleSendMessage();
                     }
                   }}
                 />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-salmon-coral text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // スカウト案件の表示（従来の詳細＋承認・辞退ボタン）
        <>
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
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-smoky-navy mb-1">{project.storeName}</h2>
                  <p className="text-gray-600 text-sm mb-3">{project.category} • {project.location}</p>
                  
                  {/* 報酬とマッチ度 - レイアウト改善 */}
                  <div className="space-y-2">
                    <div className="text-salmon-coral font-bold text-lg">
                      {project.reward.type === 'fixed' ? (
                        <span>¥{project.reward.amount.toLocaleString()}</span>
                      ) : (
                        <span>¥{project.reward.amount.toLocaleString()} + 成果報酬{project.reward.performanceRate}%</span>
                      )}
                    </div>
                    <div className="bg-gray-100 text-smoky-navy px-3 py-1 rounded-full text-sm font-medium inline-block">
                      おすすめ度 {project.matchScore}%
                    </div>
                  </div>
                </div>
                
                {/* フォローボタン */}
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ml-3 ${
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
                
                <div className="py-2 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 flex-shrink-0 mr-4">投稿内容</span>
                    <span className="font-medium text-smoky-navy text-right">{project.details.postRequirements}</span>
                  </div>
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
                
                <div className="py-2 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 flex-shrink-0 mr-4">成果条件</span>
                    <span className="font-medium text-smoky-navy text-right">{project.details.performanceGoals}</span>
                  </div>
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

                         {/* ボタン表示（ソースに応じて切り替え） */}
             {source === 'home' ? (
               // ホームから来た場合：応募ボタン
               <div className="mb-6">
                 {hasApplied ? (
                   <div className="w-full bg-gray-200 text-gray-600 py-4 rounded-lg font-bold text-lg text-center">
                     応募済み
                   </div>
                 ) : (
                   <button 
                     onClick={handleApply}
                     className="w-full bg-salmon-coral text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors border-0"
                   >
                     この案件に応募する
                   </button>
                 )}
               </div>
             ) : (
               // スカウトから来た場合：承認・辞退ボタン
               <div className="flex gap-3 mb-6">
                 <button 
                   onClick={() => setShowConfirmDialog('decline')}
                   className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-300 transition-colors"
                 >
                   辞退する
                 </button>
                 <button 
                   onClick={() => setShowConfirmDialog('approve')}
                   className="flex-1 bg-salmon-coral text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
                 >
                   承認する
                 </button>
               </div>
             )}
          </div>
        </>
      )}
    </div>
  );
}
