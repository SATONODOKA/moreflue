'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ChatItem from '@/components/ChatItem';

// サンプルデータ
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
  completed: [
    {
      id: '5',
      storeName: 'スイーツカフェ Sweet',
      lastMessage: '案件完了です。ありがとうございました！',
      timestamp: '1週間前',
      unreadCount: 0,
      isUrgent: false,
    },
  ],
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'inProgress' | 'completed'>('inbox');

  const tabs = [
    { key: 'inbox', label: 'Inbox', count: sampleChats.inbox.length },
    { key: 'inProgress', label: '進行中', count: sampleChats.inProgress.length },
    { key: 'completed', label: '完了', count: sampleChats.completed.length },
  ];

  const getCurrentChats = () => {
    return sampleChats[activeTab] || [];
  };

  return (
    <div>
      <Header title="案件管理" />
      
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'inbox' | 'inProgress' | 'completed')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-salmon-coral border-b-2 border-salmon-coral'
                  : 'text-gray-600 hover:text-smoky-navy'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
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
      
      <div className="bg-light-greige min-h-screen">
        {getCurrentChats().length > 0 ? (
          getCurrentChats().map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📭</span>
            <h3 className="text-lg font-medium text-smoky-navy mb-2">
              {activeTab === 'inbox' && '新しい案件はありません'}
              {activeTab === 'inProgress' && '進行中の案件はありません'}
              {activeTab === 'completed' && '完了した案件はありません'}
            </h3>
            <p className="text-gray-600 text-sm">
              {activeTab === 'inbox' && '新着案件が届くとここに表示されます'}
              {activeTab === 'inProgress' && '案件を開始すると、ここで管理できます'}
              {activeTab === 'completed' && '完了した案件の履歴が表示されます'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 