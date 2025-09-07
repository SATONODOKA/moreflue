'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProjectManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const [selectedTab, setSelectedTab] = useState<'progress' | 'upcoming' | 'completed'>('progress');

  const progressProjects = [
    {
      id: '3',
      storeName: 'ヘアサロン STYLE',
      status: '来店予約済み',
      visitDate: '2024/01/25 14:00',
      postDeadline: '2024/01/30',
      reward: '¥25,000',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop'
    },
    {
      id: '1',
      storeName: 'カフェ・ド・パリ',
      status: '撮影完了',
      visitDate: '2024/01/20 11:00',
      postDeadline: '2024/01/27',
      reward: '¥15,000',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop'
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <div className="bg-salmon-coral px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-white hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-white">案件進行管理</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* タブ */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setSelectedTab('progress')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              selectedTab === 'progress'
                ? 'text-salmon-coral border-b-2 border-salmon-coral'
                : 'text-gray-600 hover:text-smoky-navy'
            }`}
          >
            進行中
            <span className="ml-2 bg-salmon-coral text-white text-xs rounded-full px-2 py-1">2</span>
          </button>
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              selectedTab === 'upcoming'
                ? 'text-salmon-coral border-b-2 border-salmon-coral'
                : 'text-gray-600 hover:text-smoky-navy'
            }`}
          >
            予定
            <span className="ml-2 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">3</span>
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              selectedTab === 'completed'
                ? 'text-salmon-coral border-b-2 border-salmon-coral'
                : 'text-gray-600 hover:text-smoky-navy'
            }`}
          >
            完了
            <span className="ml-2 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">8</span>
          </button>
        </div>
      </div>

      {/* 進行中案件リスト */}
      {selectedTab === 'progress' && (
        <div className="p-4 space-y-4">
          {progressProjects.map((project) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <img 
                  src={project.image} 
                  alt={project.storeName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-smoky-navy">{project.storeName}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === '来店予約済み' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-salmon-coral font-bold text-sm">{project.reward}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {project.status === '来店予約済み' ? '来店予定' : '撮影日'}: {project.visitDate}
                    </p>
                    <p className="text-xs text-gray-600">
                      投稿納期: {project.postDeadline}
                    </p>
                  </div>
                  
                  {/* アクションボタン */}
                  <div className="mt-3 flex gap-2">
                    {project.status === '来店予約済み' ? (
                      <>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200">
                          予約詳細
                        </button>
                        <button className="flex-1 bg-salmon-coral text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-opacity-90">
                          チャット
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => router.push('/project/submit')}
                          className="flex-1 bg-salmon-coral text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-opacity-90"
                        >
                          投稿納品
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200">
                          詳細確認
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* カレンダー表示 */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-smoky-navy mb-3">今月のスケジュール</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">1/25 14:00</span>
                </div>
                <span className="text-sm text-gray-600">ヘアサロン STYLE 来店</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">1/27</span>
                </div>
                <span className="text-sm text-gray-600">カフェ・ド・パリ 投稿納期</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">1/30</span>
                </div>
                <span className="text-sm text-gray-600">ヘアサロン STYLE 投稿納期</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* その他のタブ内容 */}
      {selectedTab === 'upcoming' && (
        <div className="p-4 text-center py-20">
          <span className="text-4xl mb-3 block">📅</span>
          <p className="text-gray-600">予定案件が表示されます</p>
        </div>
      )}

      {selectedTab === 'completed' && (
        <div className="p-4 text-center py-20">
          <span className="text-4xl mb-3 block">✅</span>
          <p className="text-gray-600">完了案件が表示されます</p>
        </div>
      )}
    </div>
  );
}