'use client';

import { useState } from 'react';
import Link from 'next/link';

// サンプルメッセージデータ
const sampleMessages = [
  {
    id: '1',
    storeName: 'カフェ・ド・パリ',
    lastMessage: '投稿内容についてご相談があります。写真の撮り方について教えてください。',
    timestamp: '10:30',
    unreadCount: 2,
    avatar: 'カ',
    isOnline: true,
  },
  {
    id: '2',
    storeName: 'ヘアサロン STYLE',
    lastMessage: '案件の詳細を確認させてください。来週の撮影について',
    timestamp: '09:15',
    unreadCount: 1,
    avatar: 'ヘ',
    isOnline: false,
  },
  {
    id: '3',
    storeName: 'イタリアン・ベラヴィスタ',
    lastMessage: '投稿ありがとうございました！素晴らしい写真ですね',
    timestamp: '昨日',
    unreadCount: 0,
    avatar: 'イ',
    isOnline: true,
  },
  {
    id: '4',
    storeName: 'フィットネスジム POWER',
    lastMessage: '撮影お疲れ様でした。来店数が増えています！',
    timestamp: '2日前',
    unreadCount: 1,
    avatar: 'フ',
    isOnline: false,
  },
  {
    id: '5',
    storeName: 'スイーツカフェ Sweet',
    lastMessage: '案件完了です。ありがとうございました！',
    timestamp: '1週間前',
    unreadCount: 0,
    avatar: 'ス',
    isOnline: false,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = sampleMessages.filter(message =>
    message.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-smoky-navy">チャット</h1>
          <button className="p-2 text-smoky-navy hover:text-salmon-coral transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* 検索バー */}
      <div className="px-4 py-3 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-salmon-coral"
          />
          <svg className="absolute left-3 top-2.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </div>

      {/* メッセージ一覧 */}
      <div className="bg-white pb-20">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <Link key={message.id} href={`/messages/${message.id}`}>
              <div className="bg-white p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {/* アバター */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-salmon-coral rounded-full flex items-center justify-center text-white font-bold">
                      {message.avatar}
                    </div>
                    {message.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* メッセージ内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-smoky-navy truncate">{message.storeName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.unreadCount > 0 && (
                          <div className="bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {message.unreadCount > 9 ? '9+' : message.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm truncate">
                      {message.unreadCount > 0 ? (
                        <span className="font-medium">{message.lastMessage}</span>
                      ) : (
                        message.lastMessage
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="mb-4" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <h3 className="text-lg font-medium text-smoky-navy mb-2">メッセージがありません</h3>
            <p className="text-gray-600 text-sm">新しいメッセージが届くとここに表示されます</p>
          </div>
        )}
      </div>
    </div>
  );
}
