'use client';

import { useState, useEffect } from 'react';
import { Send, Search, MoreVertical, Circle } from 'lucide-react';

interface ChatPreview {
  id: number;
  influencerName: string;
  influencerUsername: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
  projectTitle?: string;
}

export default function ChatContent() {
  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  // localStorageからチャットデータを読み込み（ManageProjectContentと同期）
  useEffect(() => {
    const loadChats = () => {
      try {
        const storedChats = JSON.parse(localStorage.getItem('globalChats') || '[]') as ChatPreview[];
        setChatList(storedChats);
      } catch (error) {
        console.error('チャットの読み込みに失敗しました:', error);
        setChatList([]);
      }
    };

    loadChats();

    // 定期的に更新（ManageProjectContentからの変更を反映）
    const interval = setInterval(loadChats, 1000);
    return () => clearInterval(interval);
  }, []);

  const [messages] = useState([
    {
      id: 1,
      sender: "田中美咲",
      content: "こんにちは！案件の件でご連絡しました。",
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
      content: "詳細について確認させてください。",
      timestamp: "10:30",
      isMe: false
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // メッセージ送信処理（実際の実装では、ここでAPIを呼び出す）
      console.log('送信:', message);
      setMessage('');
    }
  };

  if (selectedChat) {
    const currentChat = chatList.find(chat => chat.id === selectedChat);
    
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* チャットヘッダー */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="text-primary font-medium"
            >
              ← 戻る
            </button>
            <div>
              <h1 className="font-semibold text-tertiary">{currentChat?.influencerName}</h1>
              <p className="text-xs text-gray-500">{currentChat?.influencerUsername}</p>
              {currentChat?.projectTitle && (
                <p className="text-xs text-gray-400">{currentChat.projectTitle}</p>
              )}
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <MoreVertical size={20} className="text-gray-500" />
          </button>
        </header>

        {/* メッセージ一覧 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
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
        <div className="bg-white border-t border-gray-200 p-4 fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="メッセージを入力..."
            />
            <button 
              onClick={handleSendMessage}
              className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* ヘッダー */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-tertiary text-center">チャット</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 検索 */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="チャットを検索..."
          />
        </div>

        {/* チャット一覧 */}
        <div className="space-y-3">
          {chatList.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">チャットがありません</div>
              <div className="text-sm text-gray-500">
                案件管理から承認すると、チャットが開始されます
              </div>
            </div>
          ) : (
            chatList.map((chat) => (
              <div 
                key={chat.id} 
                className="card cursor-pointer hover:shadow-md transition"
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-tertiary font-medium">
                        {chat.influencerName.charAt(0)}
                      </span>
                    </div>
                    <Circle className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 text-green-500 rounded-full border-2 border-white" fill="currentColor" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-tertiary text-sm truncate">
                        {chat.influencerName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(chat.timestamp).toLocaleTimeString('ja-JP', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {chat.unreadCount > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{chat.influencerUsername}</p>
                    {chat.projectTitle && (
                      <p className="text-xs text-gray-400 mb-1">{chat.projectTitle}</p>
                    )}
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}