'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical } from 'lucide-react';

export default function ManageProjectContent() {
  const [projects, setProjects] = useState([
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

  const [filter, setFilter] = useState('all');

  // localStorageから案件を読み込み
  useEffect(() => {
    const loadProjects = () => {
      const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      if (storedProjects.length > 0) {
        // 既存のサンプルデータと結合
        const defaultProjects = [
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
    };

    loadProjects();

    // ページが表示されるたびに再読み込み
    const handleFocus = () => loadProjects();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
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
            { key: 'all', label: 'すべて' },
            { key: '進行中', label: '進行中' },
            { key: '完了', label: '完了' },
            { key: '募集中', label: '募集中' }
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
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-tertiary text-sm mb-1">{project.title}</h3>
                <p className="text-gray-600 text-xs">
                  {project.influencer ? `担当: ${project.influencer}` : '募集中'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === '完了' 
                    ? 'bg-green-100 text-green-700'
                    : project.status === '進行中'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} className="text-gray-500" />
                </button>
              </div>
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
            
            {project.status !== '募集中' && project.reach > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
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
            
            <div className="flex space-x-2 pt-3 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-tertiary transition-colors">
                <Eye size={16} />
                <span>詳細</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors">
                <Edit size={16} />
                <span>編集</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
} 