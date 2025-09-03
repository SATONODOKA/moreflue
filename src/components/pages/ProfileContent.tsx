'use client';

import { useState, useEffect } from 'react';
import { Settings, Bell, HelpCircle, LogOut, Edit, Camera, ChevronRight, Trophy, Clock, CheckCircle } from 'lucide-react';

export default function ProfileContent() {
  const [userInfo] = useState({
    name: "田中太郎",
    email: "tanaka@example.com",
    company: "株式会社サンプル",
    plan: "プロプラン",
    avatar: null
  });

  const [stats] = useState({
    totalProjects: 24,
    successRate: 92,
    totalSpent: 1250000,
    averageEngagement: 4.3
  });

  const [activeTab, setActiveTab] = useState('統計');
  const [completedProjects, setCompletedProjects] = useState([]);

  // 完了済み案件を取得
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const completed = projects.filter(p => p.status === '完了');
    setCompletedProjects(completed);
  }, []);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* ヘッダー */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-tertiary mb-2">マイページ</h1>
        <p className="text-gray-600 text-sm">アカウント情報と設定</p>
      </header>

      {/* タブ切り替え */}
      <div className="flex space-x-2 overflow-x-auto">
        {['統計', '実績', '設定'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 統計タブ */}
      {activeTab === '統計' && (
        <>
          {/* プロフィール情報 */}
          <section className="card">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  {userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-tertiary">
                      {userInfo.name.charAt(0)}
                    </span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-tertiary">{userInfo.name}</h2>
                <p className="text-gray-600 text-sm">{userInfo.email}</p>
                <p className="text-gray-600 text-sm">{userInfo.company}</p>
                <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded-full mt-2">
                  {userInfo.plan}
                </span>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded">
                <Edit size={20} className="text-gray-500" />
              </button>
            </div>
          </section>

          {/* 統計情報 */}
          <section className="card">
            <h2 className="text-lg font-semibold text-tertiary mb-4">活動実績</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-primary text-xl font-bold">{stats.totalProjects}</div>
                <div className="text-gray-600 text-xs mt-1">総案件数</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-xl font-bold">{stats.successRate}%</div>
                <div className="text-gray-600 text-xs mt-1">成功率</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-xl font-bold">¥{(stats.totalSpent / 10000).toFixed(0)}万</div>
                <div className="text-gray-600 text-xs mt-1">総支出額</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-xl font-bold">{stats.averageEngagement}%</div>
                <div className="text-gray-600 text-xs mt-1">平均エンゲージメント</div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 実績タブ */}
      {activeTab === '実績' && (
        <section className="space-y-3">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="text-primary" size={24} />
              <h2 className="text-lg font-semibold text-tertiary">完了案件</h2>
            </div>
            
            {completedProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだ完了した案件がありません</p>
            ) : (
              <div className="space-y-3">
                {completedProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-tertiary text-sm">{project.title}</h3>
                        <p className="text-gray-600 text-xs mt-1">
                          {project.description?.slice(0, 50)}...
                        </p>
                      </div>
                      <CheckCircle className="text-green-500" size={20} />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {project.deadline}
                      </span>
                      <span className="font-medium text-primary">
                        {project.budget}
                      </span>
                    </div>
                    
                    {project.reach > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">リーチ:</span>
                            <span className="font-medium ml-1">{project.reach.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">エンゲージ:</span>
                            <span className="font-medium ml-1">{project.engagement}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 設定タブ */}
      {activeTab === '設定' && (
        <section className="space-y-3">
        <div className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-4">設定</h2>
          
          <div className="space-y-3">
            {[
              { icon: Settings, label: "アカウント設定", description: "基本情報の変更" },
              { icon: Bell, label: "通知設定", description: "プッシュ通知の管理" },
              { icon: HelpCircle, label: "ヘルプ・サポート", description: "よくある質問" }
            ].map((item, index) => (
              <button key={index} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <item.icon className="text-gray-500" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-tertiary text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* プラン情報 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-4">プラン情報</h2>
          
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl text-white mb-4">
            <h3 className="font-semibold mb-2">{userInfo.plan}</h3>
            <p className="text-sm opacity-90">無制限の案件作成・高度な分析機能</p>
            <p className="text-sm opacity-90">月額 ¥9,800</p>
          </div>
          
          <button className="button-secondary w-full">
            プランを変更
          </button>
        </div>

        {/* ログアウト */}
        <div className="card">
          <button className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium">ログアウト</span>
          </button>
        </div>
      </section>
      )}
    </div>
  );
} 