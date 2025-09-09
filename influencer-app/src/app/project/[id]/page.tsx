'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCachedData, setCachedData, CACHE_KEYS } from '@/utils/cache';

// 静的生成用のパラメータを提供
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: 'demo-2' },
  ];
}

interface ProjectDetails {
  id: string;
  storeName: string;
  category: string;
  location: string;
  imageUrl: string;
  story: string;
  reward: {
    type: 'fixed' | 'performance' | 'free_plus_commission';
    amount: number;
    performanceRate?: number;
    commission?: number;
  };
  matchScore: number;
  platforms: string[];
  isFollowing: boolean;
  details: {
    travelTime: string;
    postRequirements: string;
    preApproval: boolean;
    performanceGoals: string;
    timeline: string;
    additionalNotes: string;
  };
}

// サンプル詳細データ
const projectDetails: { [key: string]: ProjectDetails } = {
  // ホームフィード用の店舗データ（ID 1-3）
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
  // ホームフィードのフォロー中店舗（ID 4-6）
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
  },
  '6': {
    id: '6',
    storeName: 'ラーメン 龍',
    category: 'ラーメン',
    location: '池袋',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
    story: '池袋で15年の歴史を持つ老舗ラーメン店。店主が厳選した食材で作る濃厚なスープと、自家製麺の絶妙なバランスが自慢です。地元の方々に愛され続ける、本格的な味をお楽しみください。',
    reward: { type: 'fixed', amount: 8000 },
    matchScore: 87,
    platforms: ['instagram', 'twitter'],
    isFollowing: false,
    details: {
      travelTime: '池袋駅から徒歩7分',
      postRequirements: 'ラーメン写真1枚 + ストーリーズ2投稿',
      preApproval: false,
      performanceGoals: '来店者数6名以上',
      timeline: '投稿から1週間以内',
      additionalNotes: 'ランチタイムの撮影を推奨します'
    }
  },
  // スカウト用の店舗データ（ID 7-9）
  '7': {
    id: '7',
    storeName: '焼肉 龍神',
    category: '焼肉',
    location: '恵比寿',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    story: '恵比寿で20年の実績を持つ老舗焼肉店。厳選されたA5ランクの和牛と、職人が手がける絶品のタレで、本格的な焼肉をお楽しみいただけます。落ち着いた店内で、特別な時間をお過ごしいただけます。',
    reward: { type: 'fixed', amount: 18000 },
    matchScore: 96,
    platforms: ['instagram', 'tiktok'],
    isFollowing: false,
    details: {
      travelTime: '恵比寿駅から徒歩5分',
      postRequirements: 'フィード投稿1枚 + ストーリーズ3投稿',
      preApproval: true,
      performanceGoals: '来店者数15名以上、投稿エンゲージメント率4%以上',
      timeline: '投稿から1週間以内に来店効果測定',
      additionalNotes: '撮影時間は45分程度を想定しています'
    }
  },
  '8': {
    id: '8',
    storeName: 'スイーツカフェ Sweet',
    category: 'スイーツ',
    location: '原宿',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    story: '原宿の中心地にある、インスタ映えするスイーツが人気のカフェです。季節のフルーツを使った色鮮やかなパフェと、手作りケーキが自慢。可愛らしい店内で、特別な時間をお過ごしいただけます。若い女性を中心に多くのお客様に愛されています。',
    reward: { type: 'performance', amount: 12000, performanceRate: 8 },
    matchScore: 89,
    platforms: ['instagram'],
    isFollowing: false,
    details: {
      travelTime: '原宿駅から徒歩3分',
      postRequirements: 'フィード投稿1枚（スイーツ写真必須）',
      preApproval: false,
      performanceGoals: '来店者数8名以上で成果報酬発生',
      timeline: '投稿から2週間以内',
      additionalNotes: '午後の撮影を推奨します'
    }
  },
  // デモ用詳細データ
  'demo-2': {
    id: 'demo-2',
    storeName: 'ビストロ・ル・コワン 表参道',
    category: 'イタリアン・フレンチ',
    location: '表参道',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    story: 'パリの雰囲気漂うビストロで本格フレンチを。厳選されたフランス産食材と、熟練シェフの技が織りなす極上の料理体験をお楽しみください。表参道の洗練された空間で、特別なひとときをご提供いたします。',
    reward: { type: 'free_plus_commission' as const, amount: 0, commission: 600 },
    matchScore: 95,
    platforms: ['youtube'],
    isFollowing: false,
    details: {
      travelTime: '表参道駅から徒歩3分',
      postRequirements: 'YouTube投稿1本',
      preApproval: true,
      performanceGoals: '投稿経由での来店1組につき600円の成果報酬',
      timeline: '撮影から1週間以内に投稿',
      additionalNotes: 'ランチタイムまたはディナータイムでの撮影を推奨'
    }
  },
  '9': {
    id: '9',
    storeName: 'フィットネスジム POWER',
    category: 'フィットネス',
    location: '六本木',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    story: '六本木の最新設備を誇るフィットネスジム。初心者から上級者まで、一人ひとりの目標に合わせたパーソナルトレーニングを提供しています。清潔で開放的な空間と、経験豊富なトレーナーが皆様の健康とボディメイクをサポートします。',
    reward: { type: 'fixed', amount: 30000 },
    matchScore: 94,
    platforms: ['instagram', 'tiktok', 'twitter'],
    isFollowing: false,
    details: {
      travelTime: '六本木駅から徒歩2分',
      postRequirements: 'トレーニング動画1本 + ビフォーアフター写真2枚',
      preApproval: true,
      performanceGoals: '新規入会者5名以上、指名予約2名以上',
      timeline: '体験から1週間以内に投稿',
      additionalNotes: 'トレーニングウェアは貸し出し可能です'
    }
  }
};

interface ChatMessage {
  id: string;
  sender: 'user' | 'store';
  message: string;
  timestamp: string;
}

const mockReplies = [
  'ありがとうございます！詳細を確認させていただきます。',
  '承知いたしました。撮影日時の調整をさせていただきますね。',
  '素晴らしいですね！ぜひお越しください。',
  'ご質問ありがとうございます。お答えさせていただきます。',
  'お待ちしております！',
];

// 店舗の電話番号マッピング（実際の実装では店舗データベースから取得）
const getPhoneNumber = (projectId: string): string => {
  const phoneNumbers: { [key: string]: string } = {
    '1': '03-1234-5678', // カフェ・ド・パリ
    '2': '03-2345-6789', // イタリアン・ベラヴィスタ
    '3': '03-3456-7890', // ヘアサロン STYLE
    '4': '03-4567-8901', // フィットネスジム POWER
    '5': '03-5678-9012', // スイーツカフェ Sweet
    '6': '03-6789-0123', // ラーメン 龍
    '7': '03-7890-1234', // 焼肉 龍神
    '8': '03-8901-2345', // スイーツカフェ Sweet（スカウト版）
    '9': '03-9012-3456', // フィットネスジム POWER（スカウト版）
    'demo-2': '03-5555-0002', // ビストロ・ル・コワン 表参道
  };
  return phoneNumbers[projectId] || '03-0000-0000';
};

function ProjectDetailContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || 'scout';
  const tab = searchParams.get('tab') || 'scout';
  
  const project = projectDetails[params.id as string];
  const [sampleChatMessages, setSampleChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  if (!project) {
    return (
      <div className="min-h-screen bg-light-greige">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-smoky-navy mb-4">案件が見つかりません</h1>
            <Link href="/" className="text-salmon-coral hover:text-opacity-80">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    // 承認された案件を進行中に移動
    const newApproved = [...getCachedData<string[]>(CACHE_KEYS.APPROVED_PROJECTS, []), params.id as string];
    setCachedData(CACHE_KEYS.APPROVED_PROJECTS, newApproved);
    
    // 進行中案件に追加
    const inProgressProjects = getCachedData<Array<ProjectDetails & { status: string }>>(CACHE_KEYS.IN_PROGRESS_PROJECTS, []);
    const newInProgressProject = {
      ...project,
      status: '交渉中'
    } as ProjectDetails & { status: string };
    const newInProgress = [...inProgressProjects, newInProgressProject];
    setCachedData(CACHE_KEYS.IN_PROGRESS_PROJECTS, newInProgress);
    
    router.push(`/projects?tab=inProgress&approved=${params.id}`);
  };

  const handleDecline = () => {
    // 辞退された案件をリストから削除
    const newDeclined = [...getCachedData<string[]>(CACHE_KEYS.DECLINED_PROJECTS, []), params.id as string];
    setCachedData(CACHE_KEYS.DECLINED_PROJECTS, newDeclined);
    
    router.push(`/projects?tab=scout&declined=${params.id}`);
  };

  const handleApply = () => {
    // ホームから応募された案件を応募済みに追加
    const newApplied = [...getCachedData<string[]>(CACHE_KEYS.HOME_APPLIED_PROJECTS, []), params.id as string];
    setCachedData(CACHE_KEYS.HOME_APPLIED_PROJECTS, newApplied);
    
    // まずホームに戻って応募済みを反映してから案件管理に移動
    router.push(`/?applied=${params.id}&source=detail`);
    setTimeout(() => {
      router.push(`/projects?applied=${params.id}&source=detail&showApplied=true`);
    }, 100);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };
    
    setSampleChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // モック返信を追加
    setTimeout(() => {
      const storeMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'store',
        message: mockReplies[Math.floor(Math.random() * mockReplies.length)],
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setSampleChatMessages(prev => [...prev, storeMessage]);
    }, 1000);
  };

  const isApplied = getCachedData<string[]>(CACHE_KEYS.HOME_APPLIED_PROJECTS, []).includes(params.id as string);

  return (
    <div className="min-h-screen bg-light-greige">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-smoky-navy hover:text-opacity-80"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-smoky-navy">{project.storeName}</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* 案件詳細（進行中案件の場合はコンパクトに表示） */}
      {tab === 'inProgress' ? (
        <div className="bg-white p-4 mb-4">
          <div className="mb-3">
            <h2 className="text-lg font-bold text-smoky-navy mb-2">{project.storeName}</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {project.category}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {project.location}
              </span>
              <div className="text-salmon-coral font-bold text-lg">
                {project.reward.type === 'fixed' ? (
                  `¥${project.reward.amount.toLocaleString()}`
                ) : project.reward.type === 'performance' ? (
                  `¥${project.reward.amount.toLocaleString()} + 成果報酬${project.reward.performanceRate}%`
                ) : project.reward.type === 'free_plus_commission' ? (
                  `無償提供 + ¥${project.reward.commission?.toLocaleString()}/予約`
                ) : (
                  `¥${project.reward.amount.toLocaleString()}`
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">マッチ度:</span> {project.matchScore}% | 
              <span className="font-medium ml-2">アクセス:</span> {project.details.travelTime}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4">
          <div className="mb-4">
            <img 
              src={project.imageUrl} 
              alt={project.storeName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-smoky-navy mb-2">{project.storeName}</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {project.category}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {project.location}
              </span>
            </div>
            <div className="text-salmon-coral font-bold text-2xl mb-4">
              {project.reward.type === 'fixed' ? (
                `¥${project.reward.amount.toLocaleString()}`
              ) : project.reward.type === 'performance' ? (
                `¥${project.reward.amount.toLocaleString()} + 成果報酬${project.reward.performanceRate}%`
              ) : project.reward.type === 'free_plus_commission' ? (
                `無償提供 + ¥${project.reward.commission?.toLocaleString()}/予約`
              ) : (
                `¥${project.reward.amount.toLocaleString()}`
              )}
            </div>
            <div className="bg-gray-100 text-smoky-navy px-3 py-2 rounded-lg text-center text-sm font-bold">
              マッチ度: {project.matchScore}%
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-smoky-navy mb-2">店舗ストーリー</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{project.story}</p>
            </div>

            <div>
              <h3 className="font-bold text-smoky-navy mb-2">詳細情報</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">アクセス:</span> {project.details.travelTime}</div>
                <div><span className="font-medium">投稿要件:</span> {project.details.postRequirements}</div>
                <div><span className="font-medium">事前承認:</span> {project.details.preApproval ? '必要' : '不要'}</div>
                <div><span className="font-medium">目標:</span> {project.details.performanceGoals}</div>
                <div><span className="font-medium">期限:</span> {project.details.timeline}</div>
                <div><span className="font-medium">備考:</span> {project.details.additionalNotes}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* アクションボタン（進行中案件では非表示） */}
      {tab !== 'inProgress' && (
        <div className="bg-white p-4 mb-4">
          {source === 'home' ? (
            <div className="space-y-3">
              {isApplied ? (
                <div className="w-full bg-gray-200 text-gray-600 py-3 rounded-lg text-center font-medium">
                  応募済み
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  className="w-full bg-salmon-coral text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  この案件に応募する
                </button>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleDecline}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                辞退する
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 bg-salmon-coral text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                承認する
              </button>
            </div>
          )}
        </div>
      )}

      {/* チャット */}
      {tab === 'inProgress' && (
        <div className="bg-white p-4">
          <h3 className="font-bold text-smoky-navy mb-4">チャット</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg h-96 overflow-y-auto p-4 mb-4">
            {sampleChatMessages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                まだメッセージがありません
              </div>
            ) : (
              <div className="space-y-3">
                {sampleChatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-salmon-coral text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div>{message.message}</div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white opacity-70' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="メッセージを入力..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
            />
            <button
              onClick={handleSendMessage}
              className="bg-salmon-coral text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-colors"
            >
              送信
            </button>
          </div>
        </div>
      )}

      {/* 来店予約セクション（進行中案件のみ） */}
      {tab === 'inProgress' && (
        <div className="bg-white border-t border-gray-100 p-4 mb-16">
          <h3 className="font-bold text-smoky-navy mb-4 flex items-center gap-2">
            <span className="text-xl">📅</span>
            来店予約
          </h3>
          
          <div className="space-y-3">
            {/* ホットペッパー予約ボタン */}
            <button
              onClick={() => {
                // ホットペッパーのURL（実際の実装では店舗IDを使用）
                const hotpepperUrl = `https://www.hotpepper.jp/strJ${project.id}/`;
                window.open(hotpepperUrl, '_blank');
              }}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">🍽️</span>
              ホットペッパーで予約する
            </button>
            
            {/* 電話予約ボタン */}
            <button
              onClick={() => {
                // 店舗の電話番号（実際の実装では各店舗の電話番号を設定）
                const phoneNumber = getPhoneNumber(project.id);
                window.location.href = `tel:${phoneNumber}`;
              }}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">📞</span>
              電話で予約する
            </button>
            
            {/* 店舗情報 */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">{project.storeName}</p>
                  <p className="text-gray-600">{project.details.travelTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">営業時間</p>
                  <p className="font-medium text-gray-700">11:00-22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <ProjectDetailContent />
    </Suspense>
  );
}
