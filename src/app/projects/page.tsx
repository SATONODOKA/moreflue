'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ChatItem from '@/components/ChatItem';

// サンプルメッセージデータ
const sampleChats = {
  inbox: [
    {
      id: '1',
      storeName: 'カフェ・ド・パリ',
      lastMessage: '投稿内容についてご相談があります',
      timestamp: '10:30',
      unreadCount: 2,
      isUrgent: true,
      deadline: '2024/01/15',
    },
    {
      id: '2',
      storeName: 'ヘアサロン STYLE',
      lastMessage: '案件の詳細を確認させてください',
      timestamp: '09:15',
      unreadCount: 1,
      isUrgent: false,
    },
  ],
  inProgress: [
    {
      id: '3',
      storeName: 'イタリアン・ベラヴィスタ',
      lastMessage: '投稿ありがとうございました！',
      timestamp: '昨日',
      unreadCount: 0,
      isUrgent: false,
      deadline: '2024/01/20',
    },
    {
      id: '4',
      storeName: 'フィットネスジム POWER',
      lastMessage: '撮影お疲れ様でした',
      timestamp: '2日前',
      unreadCount: 1,
      isUrgent: false,
    },
  ],
  applied: [
    {
      id: '5',
      storeName: 'カフェ・ド・パリ',
      lastMessage: '応募ありがとうございます。確認中です',
      timestamp: '1時間前',
      unreadCount: 0,
      isUrgent: false,
      status: '審査中',
    },
    {
      id: '6',
      storeName: 'イタリアン・ベラヴィスタ',
      lastMessage: '応募を受け付けました',
      timestamp: '3時間前',
      unreadCount: 0,
      isUrgent: false,
      status: '審査中',
    },
  ],
  completed: [
    {
      id: '7',
      storeName: 'スイーツカフェ Sweet',
      lastMessage: '案件完了です。ありがとうございました！',
      timestamp: '1週間前',
      unreadCount: 0,
      isUrgent: false,
    },
  ],
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'inProgress' | 'applied' | 'completed'>('inbox');

  const tabs = [
    { key: 'inbox', label: 'Inbox', count: sampleChats.inbox.length },
    { key: 'inProgress', label: '進行中', count: sampleChats.inProgress.length },
    { key: 'applied', label: '応募済み', count: sampleChats.applied.length },
    { key: 'completed', label: '完了', count: sampleChats.completed.length },
  ];

  const getCurrentChats = () => {
    return sampleChats[activeTab] || [];
  };

  return (
    <div>
      <Header title="案件管理" />
      
      <div className="bg-white">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-shrink-0 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? 'text-salmon-coral bg-light-greige'
                  : 'text-gray-600 hover:text-smoky-navy'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.key
                    ? 'bg-salmon-coral text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-light-greige">
        {getCurrentChats().length > 0 ? (
          getCurrentChats().map((chat) => (
            <div key={chat.id} className="bg-white border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {/* アバター */}
                <div className="w-12 h-12 bg-salmon-coral rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {chat.storeName.charAt(0)}
                </div>

                {/* メッセージ内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-smoky-navy truncate">{chat.storeName}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {/* 応募済みタブの場合はステータス表示 */}
                      {activeTab === 'applied' && (chat as any).status && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          {(chat as any).status}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      {chat.unreadCount > 0 && (
                        <div className="bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm truncate">
                    {chat.unreadCount > 0 ? (
                      <span className="font-medium">{chat.lastMessage}</span>
                    ) : (
                      chat.lastMessage
                    )}
                  </p>
                  {chat.deadline && (
                    <p className="text-sunset-yellow text-xs font-medium mt-1">
                      期限: {chat.deadline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-lg font-medium text-smoky-navy mb-2">
              {activeTab === 'inbox' && '新しい案件はありません'}
              {activeTab === 'inProgress' && '進行中の案件はありません'}
              {activeTab === 'applied' && '応募済みの案件はありません'}
              {activeTab === 'completed' && '完了した案件はありません'}
            </h3>
            <p className="text-gray-600 text-sm">
              {activeTab === 'inbox' && '新着案件が届くとここに表示されます'}
              {activeTab === 'inProgress' && '案件を開始すると、ここで管理できます'}
              {activeTab === 'applied' && '応募した案件がここに表示されます'}
              {activeTab === 'completed' && '完了した案件の履歴が表示されます'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
