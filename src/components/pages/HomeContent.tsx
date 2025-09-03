'use client';

import { useState } from 'react';
import { PlusCircle, TrendingUp, Users, Eye, Heart } from 'lucide-react';

export default function HomeContent() {
  const [stats] = useState({
    activeProjects: 12,
    totalInfluencers: 45,
    totalReach: 125000,
    engagementRate: 4.2
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title: "新商品プロモーション",
      influencer: "田中美咲",
      status: "進行中",
      reach: 15000,
      engagement: 4.8
    },
    {
      id: 2,
      title: "季節限定メニュー",
      influencer: "佐藤ゆき",
      status: "完了",
      reach: 22000,
      engagement: 5.2
    },
    {
      id: 3,
      title: "店舗オープン告知",
      influencer: "山田花子",
      status: "進行中",
      reach: 18500,
      engagement: 3.9
    }
  ]);

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* ヘッダー */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-tertiary mb-2">MoreFlue</h1>
        <p className="text-gray-600 text-sm">店舗向けインフルエンサーマーケティング</p>
      </header>

      {/* 統計カード */}
      <section className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <div className="text-primary text-2xl font-bold">{stats.activeProjects}</div>
          <div className="text-gray-600 text-xs mt-1">進行中の案件</div>
        </div>
        <div className="card text-center">
          <div className="text-primary text-2xl font-bold">{stats.totalInfluencers}</div>
          <div className="text-gray-600 text-xs mt-1">提携インフルエンサー</div>
        </div>
        <div className="card text-center">
          <div className="text-primary text-2xl font-bold">{(stats.totalReach / 1000).toFixed(0)}K</div>
          <div className="text-gray-600 text-xs mt-1">総リーチ数</div>
        </div>
        <div className="card text-center">
          <div className="text-primary text-2xl font-bold">{stats.engagementRate}%</div>
          <div className="text-gray-600 text-xs mt-1">平均エンゲージメント</div>
        </div>
      </section>

      {/* クイックアクション */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-tertiary">クイックアクション</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="card flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
            <PlusCircle className="text-primary" size={24} />
            <div className="text-left">
              <div className="font-medium text-tertiary text-sm">新規案件作成</div>
              <div className="text-gray-500 text-xs">インフルエンサーを募集</div>
            </div>
          </button>
          <button className="card flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
            <TrendingUp className="text-accent" size={24} />
            <div className="text-left">
              <div className="font-medium text-tertiary text-sm">分析レポート</div>
              <div className="text-gray-500 text-xs">成果を確認</div>
            </div>
          </button>
        </div>
      </section>

      {/* 最近の案件 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-tertiary">最近の案件</h2>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div key={project.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-tertiary text-sm">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === '完了' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>{project.influencer}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Eye size={12} />
                  <span>{project.reach.toLocaleString()}リーチ</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Heart size={12} />
                  <span>{project.engagement}%エンゲージメント</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* お知らせ */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-tertiary">お知らせ</h2>
        <div className="card">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-medium text-tertiary text-sm mb-1">新機能リリース</h3>
              <p className="text-gray-600 text-xs">AIによる最適なインフルエンサー提案機能を追加しました。</p>
              <p className="text-gray-500 text-xs mt-1">2024年1月15日</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-medium text-tertiary text-sm mb-1">システムメンテナンス</h3>
              <p className="text-gray-600 text-xs">1月20日 2:00-4:00にシステムメンテナンスを実施します。</p>
              <p className="text-gray-500 text-xs mt-1">2024年1月10日</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 