'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical, CheckCircle, Trash2, PlayCircle, Users, MessageCircle, Send } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  influencer?: string;
  status: string;
  budget: string;
  reach: number;
  engagement: number;
  deadline: string;
  description?: string;
  rewardRate?: string;
}

interface Candidate {
  id: number;
  name: string;
  username: string;
  followers: number;
  engagement: number;
  status: string;
  sentDate: string;
}

interface MatchedUser {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'influencer';
  message: string;
  timestamp: string;
}

export default function ManageProjectContent() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "新商品プロモーション",
      influencer: "田中美咲",
      status: "進行中",
      budget: "50,000円",
      reach: 15000,
      engagement: 4.8,
      deadline: "2024-01-25"
    },
    {
      id: 2,
      title: "季節限定メニュー",
      influencer: "佐藤ゆき",
      status: "完了",
      budget: "75,000円",
      reach: 22000,
      engagement: 5.2,
      deadline: "2024-01-15"
    },
    {
      id: 3,
      title: "店舗オープン告知",
      influencer: "山田花子",
      status: "進行中",
      budget: "30,000円",
      reach: 18500,
      engagement: 3.9,
      deadline: "2024-01-30"
    }
  ]);

  const [filter, setFilter] = useState<string>('下書き');
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCandidatesModal, setShowCandidatesModal] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');

  // localStorageから案件を読み込み
  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
        if (storedProjects.length > 0) {
          // 既存のサンプルデータと結合
          const defaultProjects: Project[] = [
            {
              id: 1,
              title: "新商品プロモーション",
              influencer: "田中美咲",
              status: "進行中",
              budget: "50,000円",
              reach: 15000,
              engagement: 4.8,
              deadline: "2024-01-25"
            },
            {
              id: 2,
              title: "季節限定メニュー",
              influencer: "佐藤ゆき",
              status: "完了",
              budget: "75,000円",
              reach: 22000,
              engagement: 5.2,
              deadline: "2024-01-15"
            },
            {
              id: 3,
              title: "店舗オープン告知",
              influencer: "山田花子",
              status: "進行中",
              budget: "30,000円",
              reach: 18500,
              engagement: 3.9,
              deadline: "2024-01-30"
            }
          ];
          
          // 新しく作成された案件を上に表示
          setProjects([...storedProjects, ...defaultProjects]);
        }
      } catch (error) {
        console.error('Error loading projects from localStorage:', error);
      }
    };

    loadProjects();

    // ページが表示されるたびに再読み込み
    const handleFocus = () => loadProjects();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleCompleteProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowCompleteModal(true);
  };

  const confirmCompleteProject = () => {
    if (selectedProjectId === null) return;
    
    // 案件を完了に変更
    const updatedProjects = projects.map(project => 
      project.id === selectedProjectId 
        ? { ...project, status: '完了' }
        : project
    );
    setProjects(updatedProjects);
    
    try {
      // localStorageも更新
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      const updatedStoredProjects = storedProjects.map(project => 
        project.id === selectedProjectId 
          ? { ...project, status: '完了' }
          : project
      );
      localStorage.setItem('projects', JSON.stringify(updatedStoredProjects));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
    
    setShowCompleteModal(false);
    setSelectedProjectId(null);
  };

  const handleDeleteProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = () => {
    if (selectedProjectId === null) return;
    
    // 案件を削除
    const updatedProjects = projects.filter(project => project.id !== selectedProjectId);
    setProjects(updatedProjects);
    
    try {
      // localStorageも更新
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
      const updatedStoredProjects = storedProjects.filter(project => project.id !== selectedProjectId);
      localStorage.setItem('projects', JSON.stringify(updatedStoredProjects));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
    
    setShowDeleteModal(false);
    setSelectedProjectId(null);
  };

  const handleResumeEdit = (project: Project) => {
    // 編集再開のロジック（後で実装）
    console.log('編集再開:', project);
    alert('編集再開機能は後で実装予定です');
  };

  const handleShowDetail = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const handleShowCandidates = () => {
    setShowCandidatesModal(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // メッセージ送信のロジック（後で実装）
    console.log('メッセージ送信:', newMessage);
    setNewMessage('');
  };

  // サンプル候補者データ
  const candidates: Candidate[] = [
    {
      id: 1,
      name: '田中美咲',
      username: '@misaki_tanaka',
      followers: 25000,
      engagement: 4.8,
      status: 'pending',
      sentDate: '2024-01-20'
    },
    {
      id: 2,
      name: '佐藤ゆき',
      username: '@yuki_sato',
      followers: 18500,
      engagement: 5.2,
      status: 'pending',
      sentDate: '2024-01-19'
    }
  ];

  // サンプルマッチ済みユーザー
  const matchedUsers: MatchedUser[] = [
    {
      id: 1,
      name: '山田花子',
      username: '@hanako_yamada',
      avatar: null,
      lastMessage: 'よろしくお願いします！',
      timestamp: '10:30'
    }
  ];

  // サンプルチャットメッセージ
  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      sender: 'user',
      message: 'こんにちは！案件についてご相談があります。',
      timestamp: '10:25'
    },
    {
      id: 2,
      sender: 'influencer',
      message: 'こんにちは！よろしくお願いします。',
      timestamp: '10:28'
    },
    {
      id: 3,
      sender: 'influencer',
      message: 'どのような内容でしょうか？',
      timestamp: '10:30'
    }
  ];

  const filteredProjects = projects.filter(project => {
    return project.status === filter;
  });

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* ヘッダー */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-tertiary mb-2">案件管理</h1>
        <p className="text-gray-600 text-sm">進行中の案件を管理</p>
      </header>

      {/* 検索・フィルター */}
      <section className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="案件を検索..."
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: '下書き', label: '下書き' },
            { key: '進行中', label: '進行中' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === filterOption.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </section>

      {/* 案件リスト */}
      <section className="space-y-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card">
            {/* 進行中の案件はクリックで詳細表示 */}
            {project.status === '進行中' ? (
              <div 
                onClick={() => handleShowDetail(project)}
                className="cursor-pointer hover:bg-gray-50 -m-4 p-4 rounded-xl transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-tertiary text-sm mb-1">{project.title}</h3>
                    <p className="text-gray-600 text-xs mb-2">
                      {project.description ? project.description.slice(0, 60) + '...' : '案件の概要'}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {project.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                  <div>
                    <p className="text-gray-500">予算</p>
                    <p className="font-medium text-tertiary">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">締切</p>
                    <p className="font-medium text-tertiary">{project.deadline}</p>
                  </div>
                </div>
                
                {project.reach > 0 && (
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-500">リーチ数</p>
                      <p className="font-medium text-tertiary">{project.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">エンゲージメント</p>
                      <p className="font-medium text-tertiary">{project.engagement}%</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 下書きの案件 */
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-tertiary text-sm mb-1">{project.title}</h3>
                    <p className="text-gray-600 text-xs">
                      下書き保存済み
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    {project.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                  <div>
                    <p className="text-gray-500">予算</p>
                    <p className="font-medium text-tertiary">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">締切</p>
                    <p className="font-medium text-tertiary">{project.deadline}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleResumeEdit(project)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <PlayCircle size={16} />
                    <span>編集再開</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>削除</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* 完了確認モーダル */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-tertiary mb-3">案件を完了にしますか？</h3>
            <p className="text-gray-600 mb-6 text-sm">
              この案件を完了にすると、実績タブに移動します。
              この操作は取り消すことができません。
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button 
                onClick={confirmCompleteProject}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                完了にする
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-tertiary mb-3">案件を削除しますか？</h3>
            <p className="text-gray-600 mb-6 text-sm">
              この案件を削除します。
              この操作は取り消すことができません。
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button 
                onClick={confirmDeleteProject}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 案件詳細モーダル */}
      {showDetailModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-tertiary">案件詳細</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-tertiary mb-2">{selectedProject.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {selectedProject.description && selectedProject.description.length > 100 
                    ? selectedProject.description.slice(0, 100) + '...' 
                    : selectedProject.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">ステータス</p>
                  <p className="font-medium">{selectedProject.status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">予算</p>
                  <p className="font-medium">{selectedProject.budget}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">成果報酬率</p>
                  <p className="font-medium">{selectedProject.rewardRate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">締切</p>
                  <p className="font-medium">{selectedProject.deadline}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleShowCandidates}
                  className="flex items-center justify-center space-x-1 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Users size={16} />
                  <span>候補者一覧</span>
                </button>
                
                <button 
                  onClick={() => handleCompleteProject(selectedProject.id)}
                  className="flex items-center justify-center space-x-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <CheckCircle size={16} />
                  <span>案件完了</span>
                </button>
              </div>
              
              {/* マッチ成立済みユーザーとのチャット */}
              {matchedUsers.length > 0 && (
                <div className="pt-2">
                  <h5 className="font-medium text-tertiary mb-3 flex items-center">
                    <MessageCircle size={16} className="mr-2" />
                    マッチ成立済み
                  </h5>
                  
                  <div className="h-80 border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                    {/* チャット相手リスト */}
                    <div className="bg-gray-50 p-2 border-b border-gray-200">
                      {matchedUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-tertiary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-tertiary">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.username}</p>
                          </div>
                          <span className="text-xs text-gray-400">{user.timestamp}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* チャットメッセージ */}
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'user' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 text-tertiary'
                          }`}>
                            <p>{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* メッセージ入力 */}
                    <div className="p-2 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="メッセージを入力..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 候補者一覧モーダル */}
      {showCandidatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-md w-full max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-tertiary">候補者一覧</h3>
              <button 
                onClick={() => setShowCandidatesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-tertiary">
                          {candidate.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-tertiary text-sm">{candidate.name}</h4>
                        <p className="text-xs text-gray-500">{candidate.username}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      未返信
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div>
                      <p className="text-gray-500">フォロワー</p>
                      <p className="font-medium">{candidate.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">エンゲージメント</p>
                      <p className="font-medium">{candidate.engagement}%</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    送信日: {candidate.sentDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 