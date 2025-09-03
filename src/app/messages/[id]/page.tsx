'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// サンプルメッセージデータ
const messageDetails: { [key: string]: any } = {
  '1': {
    storeName: 'カフェ・ド・パリ',
    avatar: 'カ',
    isOnline: true,
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

export default function ChatDetail() {
  const params = useParams();
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatData = messageDetails[params.id as string];

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages);
    }
  }, [chatData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // モック返信を追加
    setTimeout(() => {
      const mockReplies = [
        'ありがとうございます！詳細を確認させていただきます。',
        '承知いたしました。撮影日時の調整をさせていただきますね。',
        'ご質問ありがとうございます。お答えさせていただきます。',
      ];
      const storeMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'store',
        message: mockReplies[Math.floor(Math.random() * mockReplies.length)],
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, storeMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-light-greige flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="text-smoky-navy hover:text-salmon-coral transition-colors"
          >
            ←
          </button>
          <div className="relative">
            <div className="w-10 h-10 bg-salmon-coral rounded-full flex items-center justify-center text-white font-bold">
              {chatData.avatar}
            </div>
            {chatData.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-smoky-navy">{chatData.storeName}</h1>
            <span className="text-xs text-gray-500">
              {chatData.isOnline ? 'オンライン' : '最終ログイン: 1時間前'}
            </span>
          </div>
        </div>
      </header>

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-salmon-coral text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
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
        <div ref={messagesEndRef} />
      </div>

      {/* メッセージ入力欄 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
    </div>
  );
}