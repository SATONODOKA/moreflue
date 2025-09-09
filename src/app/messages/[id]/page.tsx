'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface MessageData {
  id: string;
  sender: 'user' | 'store';
  message: string;
  timestamp: string;
}

interface ChatData {
  storeName: string;
  avatar: string;
  isOnline: boolean;
  messages: MessageData[];
  category?: string;
  location?: string;
  reward?: string;
  matchScore?: string;
  access?: string;
}

// サンプルメッセージデータ
const messageDetails: { [key: string]: ChatData } = {
  '1': {
    storeName: 'カフェ・ド・パリ',
    avatar: 'カ',
    isOnline: true,
    category: 'カフェ',
    location: '渋谷',
    reward: '¥15,000',
    matchScore: '95',
    access: '渋谷駅から徒歩8分',
    messages: [
      {
        id: '1',
        sender: 'store',
        message: 'こんにちは！案件についてご相談があります。',
        timestamp: '10:00',
      },
      {
        id: '2',
        sender: 'user',
        message: 'こんにちは！どのようなご相談でしょうか？',
        timestamp: '10:05',
      },
      {
        id: '3',
        sender: 'store',
        message: '投稿内容についてご相談があります。写真の撮り方について教えてください。',
        timestamp: '10:30',
      },
    ],
  },
  '2': {
    storeName: 'ヘアサロン STYLE',
    avatar: 'ヘ',
    isOnline: false,
    category: 'ビューティー',
    location: '表参道',
    reward: '¥25,000',
    matchScore: '92',
    access: '表参道駅から徒歩3分',
    messages: [
      {
        id: '1',
        sender: 'store',
        message: '案件の詳細を確認させてください。来週の撮影について',
        timestamp: '09:15',
      },
    ],
  },
  '3': {
    storeName: 'イタリアン・ベラヴィスタ',
    avatar: 'イ',
    isOnline: true,
    category: 'イタリアン',
    location: '新宿',
    reward: '¥8,000',
    matchScore: '88',
    access: '新宿駅から徒歩12分',
    messages: [
      {
        id: '1',
        sender: 'user',
        message: '投稿完了しました！',
        timestamp: '昨日',
      },
      {
        id: '2',
        sender: 'store',
        message: '投稿ありがとうございました！素晴らしい写真ですね',
        timestamp: '昨日',
      },
    ],
  },
  '4': {
    storeName: 'フィットネスジム POWER',
    avatar: 'フ',
    isOnline: false,
    category: 'フィットネス',
    location: '恵比寿',
    reward: '¥30,000',
    matchScore: '94',
    access: '恵比寿駅から徒歩1分',
    messages: [
      {
        id: '1',
        sender: 'store',
        message: '撮影お疲れ様でした。来店数が増えています！',
        timestamp: '2日前',
      },
    ],
  },
  '5': {
    storeName: 'スイーツカフェ Sweet',
    avatar: 'ス',
    isOnline: false,
    category: 'スイーツ',
    location: '原宿',
    reward: '¥12,000',
    matchScore: '90',
    access: '原宿駅から徒歩5分',
    messages: [
      {
        id: '1',
        sender: 'store',
        message: '案件完了です。ありがとうございました！',
        timestamp: '1週間前',
      },
    ],
  },
};

const mockReplies = [
  'ありがとうございます！詳細を確認させていただきます。',
  '承知いたしました。撮影日時の調整をさせていただきますね。',
  '素晴らしいですね！ぜひお越しください。',
  'ご質問ありがとうございます。お答えさせていただきます。',
  'お待ちしております！',
];

export default function ChatDetail() {
  const params = useParams();
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatData = messageDetails[params.id as string];

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages);
    }
    // ページ遷移時に最上部にスクロール
    window.scrollTo(0, 0);
  }, [chatData]);

  useEffect(() => {
    // 新しいメッセージが追加された時のみ下にスクロール
    if (messages.length > (chatData?.messages.length || 0)) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatData]);

  if (!chatData) {
    return (
      <div className="min-h-screen bg-light-greige">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-smoky-navy mb-4">チャットが見つかりません</h1>
            <Link href="/messages" className="text-salmon-coral hover:text-opacity-80">
              チャット一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: MessageData = {
      id: Date.now().toString(),
      sender: 'user' as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // モック返信を追加
    setTimeout(() => {
      const storeMessage: MessageData = {
        id: (Date.now() + 1).toString(),
        sender: 'store' as const,
        message: mockReplies[Math.floor(Math.random() * mockReplies.length)],
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, storeMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-smoky-navy hover:text-opacity-80"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-smoky-navy">{chatData.storeName}</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* 案件情報（コンパクト表示） */}
      <div className="bg-white p-4 border-b border-gray-100">
        <div className="mb-3">
          <h2 className="text-lg font-bold text-smoky-navy mb-2">{chatData.storeName}</h2>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {chatData.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {chatData.location}
            </span>
            <div className="text-salmon-coral font-bold text-lg">
              {chatData.reward}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">マッチ度:</span> {chatData.matchScore}% | 
            <span className="font-medium ml-2">アクセス:</span> {chatData.access}
          </div>
        </div>
      </div>

      {/* チャット */}
      <div className="bg-white p-4">
        <h3 className="font-bold text-smoky-navy mb-4">チャット</h3>
        
        <div className="bg-white border border-gray-200 rounded-lg h-96 overflow-y-auto p-4 mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm">
              まだメッセージがありません
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
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
          <div ref={messagesEndRef} />
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

      {/* 来店予約セクション */}
      <div className="bg-white border-t border-gray-100 p-4 mb-16">
        <h3 className="font-bold text-smoky-navy mb-4 flex items-center gap-2">
          <span className="text-xl">📅</span>
          来店予約
        </h3>
        
        <div className="space-y-3">
          {/* ホットペッパー予約ボタン */}
          <button
            onClick={() => {
              const hotpepperUrl = `https://www.hotpepper.jp/`;
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
              window.location.href = `tel:03-0000-0000`;
            }}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">📞</span>
            電話で予約する
          </button>
        </div>
      </div>
    </div>
  );
}