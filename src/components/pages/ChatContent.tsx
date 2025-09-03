'use client';

import { useState } from 'react';
import { Send, Search, MoreVertical, Circle } from 'lucide-react';

export default function ChatContent() {
  const [chatList] = useState([
    {
      id: 1,
      name: "田中美咲",
      lastMessage: "素材の確認をお願いします",
      timestamp: "10:30",
      unread: 2,
      online: true,
      project: "新商品プロモーション"
    },
    {
      id: 2,
      name: "佐藤ゆき",
      lastMessage: "投稿完了しました！",
      timestamp: "昨日",
      unread: 0,
      online: false,
      project: "季節限定メニュー"
    },
    {
      id: 3,
      name: "山田花子",
      lastMessage: "撮影日程について相談したいです",
      timestamp: "昨日",
      unread: 1,
      online: true,
      project: "店舗オープン告知"
    },
    {
      id: 4,
      name: "鈴木まり",
      lastMessage: "案件の詳細を教えてください",
      timestamp: "2日前",
      unread: 0,
      online: false,
      project: "春のキャンペーン"
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const [messages] = useState([
    {
      id: 1,
      sender: "田中美咲",
      content: "こんにちは！新商品プロモーションの件でご連絡しました。",
      timestamp: "10:15",
      isMe: false
    },
    {
      id: 2,
      sender: "あなた",
      content: "お疲れ様です！ご連絡ありがとうございます。",
      timestamp: "10:20",
      isMe: true
    },
    {
      id: 3,
      sender: "田中美咲",
      content: "素材の確認をお願いします",
      timestamp: "10:30",
      isMe: false
    }
  ]);

  if (selectedChat) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* チャットヘッダー */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="text-primary font-medium"
            >
              ← 戻る
            </button>
            <div>
              <h1 className="font-semibold text-tertiary">田中美咲</h1>
              <p className="text-xs text-gray-500">新商品プロモーション</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <MoreVertical size={20} className="text-gray-500" />
          </button>
        </header>

        {/* メッセージ一覧 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.isMe 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-tertiary'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isMe ? 'text-primary-light' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* メッセージ入力 */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="メッセージを入力..."
            />
            <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* ヘッダー */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-tertiary mb-2">チャット</h1>
        <p className="text-gray-600 text-sm">インフルエンサーとのやり取り</p>
      </header>

      {/* 検索 */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="チャットを検索..."
          />
        </div>
      </section>

      {/* チャット一覧 */}
      <section className="space-y-3">
        {chatList.map((chat) => (
          <div 
            key={chat.id} 
            className="card cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-tertiary font-medium">
                    {chat.name.charAt(0)}
                  </span>
                </div>
                {chat.online && (
                  <Circle className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 text-green-500 rounded-full border-2 border-white" fill="currentColor" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-tertiary text-sm truncate">
                    {chat.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">{chat.project}</p>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
} 