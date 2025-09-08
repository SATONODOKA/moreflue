'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical, CheckCircle, Trash2, PlayCircle, Users, MessageCircle, Send, FileText, Bell, ChevronRight, Clock, UserCheck, UserX } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  status: string;
  budget: string;
  rewardRate: string;
  deadline: string;
  description: string;
  distributionType: 'public' | 'scout';
  selectedInfluencers?: number[];
  reach?: number;
  engagement?: number;
  createdAt: string;
  applicationsCount?: number;
  matchesCount?: number;
}

interface Applicant {
  id: number;
  name: string;
  username: string;
  followers: number;
  engagement: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  avatar?: string;
  matchScore?: number;
}

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

export default function ManageProjectContent() {
  const [activeTab, setActiveTab] = useState<'public' | 'scout'>('public');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [showApplicantsList, setShowApplicantsList] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const [showChatDetail, setShowChatDetail] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [showAllApplicants, setShowAllApplicants] = useState(false);

  // タブ切り替えイベントのリスナー
  useEffect(() => {
    const handleSwitchToManageTab = (event: CustomEvent) => {
      if (event.detail?.activeTab) {
        setActiveTab(event.detail.activeTab);
      }
    };
    
    window.addEventListener('switchToManageTab', handleSwitchToManageTab as EventListener);
    
    return () => {
      window.removeEventListener('switchToManageTab', handleSwitchToManageTab as EventListener);
    };
  }, []);

  // localStorageから案件を読み込み
  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
        
        // 全ての案件を取得（ダミーデータとユーザー作成案件の両方）
        setProjects(storedProjects);
        return;
        
        // 以下は初回のダミーデータ生成ロジック（コメントアウト）
        /*
        const hasDummyData = storedProjects.some((p: Project) => 
          p.title && p.title.includes('パンケーキ')
        );
        
        if (!hasDummyData) {
          // ダミーデータを追加
          const mockProjects: Project[] = [
            {
              id: 1,
              title: "新商品パンケーキのPRキャンペーン",
              status: "公募中",
              budget: "¥15,000",
              rewardRate: "5%",
              deadline: "2025-01-30",
              description: "新メニューのふわふわパンケーキをSNSでPRしてくださるインフルエンサーを募集中です！",
              distributionType: 'public',
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2日前
              applicationsCount: 3,
              matchesCount: 1
            },
            {
              id: 2,
              title: "季節限定スイーツの投稿キャンペーン",
              status: "公募中",
              budget: "¥12,000",
              rewardRate: "3%",
              deadline: "2025-02-15",
              description: "春の新作スイーツをInstagramストーリーズでご紹介ください。",
              distributionType: 'public',
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1日前
              applicationsCount: 5,
              matchesCount: 2
            },
            {
              id: 3,
              title: "カフェの新店舗オープン告知",
              status: "進行中",
              budget: "¥20,000",
              rewardRate: "7%",
              deadline: "2025-02-05",
              description: "渋谷の新店舗オープンを多くの方に知ってもらいたいです。",
              distributionType: 'scout',
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3日前
              selectedInfluencers: [1, 2, 3],
              matchesCount: 2
            },
            {
              id: 4,
              title: "ランチメニューのグルメレビュー",
              status: "公募中",
              budget: "¥8,000",
              rewardRate: "4%",
              deadline: "2025-01-25",
              description: "平日ランチメニューの魅力をTikTokで発信してくれる方を探しています。",
              distributionType: 'public',
              createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4日前
              applicationsCount: 2,
              matchesCount: 0
            },
            {
              id: 5,
              title: "コーヒー豆の紹介キャンペーン",
              status: "進行中",
              budget: "¥25,000",
              rewardRate: "6%",
              deadline: "2025-02-20",
              description: "こだわりのコーヒー豆の魅力をYouTubeショート動画で紹介してください。",
              distributionType: 'scout',
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5日前
              selectedInfluencers: [4, 5],
              matchesCount: 1
            },
            {
              id: 6,
              title: "新作ドリンクのインスタ投稿",
              status: "進行中", 
              budget: "¥18,000",
              rewardRate: "5%",
              deadline: "2025-02-10",
              description: "新発売のフルーツスムージーをおしゃれに撮影してInstagramに投稿してください。",
              distributionType: 'scout',
              createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6日前
              selectedInfluencers: [1, 3, 5],
              matchesCount: 3
            }
          ];
          
          // 既存のプロジェクトと統合
          const combinedProjects = [...storedProjects, ...mockProjects];
          localStorage.setItem('projects', JSON.stringify(combinedProjects));
          setProjects(combinedProjects);
        } else {
          setProjects(storedProjects);
        }
        */
      } catch (error) {
        console.error('プロジェクトの読み込みに失敗しました:', error);
        setProjects([]);
      }
    };

    loadProjects();
    
    // localStorage変更時の更新イベントリスナー
    const handleStorageChange = () => {
      loadProjects();
    };
    
    // 案件作成からのイベントリスナー
    const handleProjectCreated = () => {
      setTimeout(loadProjects, 100); // 少し遅延して確実に反映
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('projectCreated', handleProjectCreated);
    
    // 定期的に更新（バックアップとして）
    const interval = setInterval(loadProjects, 3000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectCreated', handleProjectCreated);
      clearInterval(interval);
    };
  }, [applicants, chatPreviews]);

  // フィルタリングされた案件リスト
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'public') {
      // 公募タブ：distributionTypeがpublicまたはstatusが公募中のものを表示
      return project.distributionType === 'public' || project.status === '公募中';
    } else {
      // スカウトタブ：distributionTypeがscoutまたはstatusが進行中のものを表示
      return project.distributionType === 'scout' || project.status === '進行中';
    }
  });

  // 強制的にダミーデータをリセット（開発時）
  const forceResetData = () => {
    localStorage.clear();
    
    // 新しいダミーデータを直接設定
    const mockProjects: Project[] = [
      {
        id: 1,
        title: "新商品パンケーキのPRキャンペーン",
        status: "公募中",
        budget: "¥15,000",
        rewardRate: "5%",
        deadline: "2025-01-30",
        description: "新メニューのふわふわパンケーキをSNSでPRしてくださるインフルエンサーを募集中です！",
        distributionType: 'public',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        applicationsCount: 3,
        matchesCount: 1
      },
      {
        id: 2,
        title: "季節限定スイーツの投稿キャンペーン",
        status: "公募中",
        budget: "¥12,000",
        rewardRate: "3%",
        deadline: "2025-02-15",
        description: "春の新作スイーツをInstagramストーリーズでご紹介ください。",
        distributionType: 'public',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        applicationsCount: 5,
        matchesCount: 2
      },
      {
        id: 3,
        title: "カフェの新店舗オープン告知",
        status: "進行中",
        budget: "¥20,000",
        rewardRate: "7%",
        deadline: "2025-02-05",
        description: "渋谷の新店舗オープンを多くの方に知ってもらいたいです。",
        distributionType: 'scout',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        selectedInfluencers: [1, 2, 3],
        matchesCount: 2
      },
      {
        id: 4,
        title: "ランチメニューのグルメレビュー",
        status: "公募中",
        budget: "¥8,000",
        rewardRate: "4%",
        deadline: "2025-01-25",
        description: "平日ランチメニューの魅力をTikTokで発信してくれる方を探しています。",
        distributionType: 'public',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        applicationsCount: 2,
        matchesCount: 0
      },
      {
        id: 5,
        title: "コーヒー豆の紹介キャンペーン",
        status: "進行中",
        budget: "¥25,000",
        rewardRate: "6%",
        deadline: "2025-02-20",
        description: "こだわりのコーヒー豆の魅力をYouTubeショート動画で紹介してください。",
        distributionType: 'scout',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        selectedInfluencers: [4, 5],
        matchesCount: 1
      },
      {
        id: 6,
        title: "新作ドリンクのインスタ投稿",
        status: "進行中", 
        budget: "¥18,000",
        rewardRate: "5%",
        deadline: "2025-02-10",
        description: "新発売のフルーツスムージーをおしゃれに撮影してInstagramに投稿してください。",
        distributionType: 'scout',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        selectedInfluencers: [1, 3, 5],
        matchesCount: 3
      }
    ];
    
    localStorage.setItem('projects', JSON.stringify(mockProjects));
    setProjects(mockProjects);
    
    // チャットデータも設定
    const initialChats = [
      {
        id: 1,
        influencerName: "鈴木健太",
        influencerUsername: "@kenta_tokyo_eats",
        lastMessage: "パンケーキの撮影、明日の午後2時頃お伺いします！",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        unreadCount: 2,
        projectTitle: "新商品パンケーキのPRキャンペーン"
      },
      {
        id: 2,
        influencerName: "高橋まい",
        influencerUsername: "@mai_sweets_tokyo",
        lastMessage: "新店舗の内装、とても素敵ですね！早速投稿させていただきます。",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        unreadCount: 1,
        projectTitle: "カフェの新店舗オープン告知"
      },
      {
        id: 3,
        influencerName: "田中美咲",
        influencerUsername: "@misaki_foodie",
        lastMessage: "コーヒー豆の香りがとても素晴らしいです。動画でしっかり魅力を伝えますね！",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        unreadCount: 0,
        projectTitle: "コーヒー豆の紹介キャンペーン"
      },
      {
        id: 4,
        influencerName: "佐藤ゆき",
        influencerUsername: "@yukicafe_life",
        lastMessage: "フルーツスムージー、色合いがとてもフォトジェニックで素敵です✨",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        unreadCount: 3,
        projectTitle: "新作ドリンクのインスタ投稿"
      }
    ];
    setChatPreviews(initialChats);
    localStorage.setItem('globalChats', JSON.stringify(initialChats));
  };

  // 初期データ設定
  useEffect(() => {
    const stored = localStorage.getItem('projects');
    
    // データが存在しない場合のみダミーデータを設定
    if (!stored || stored === '[]') {
      forceResetData();
    }
  }, []);

  // モックデータ初期化
  useEffect(() => {
    
    // モック応募者データを初期化
    setApplicants([
      {
        id: 1,
        name: "田中美咲",
        username: "@misaki_foodie",
        followers: 28500,
        engagement: 4.8,
        status: 'pending',
        appliedDate: "2025-01-05",
        matchScore: 94
      },
      {
        id: 2,
        name: "佐藤ゆき", 
        username: "@yukicafe_life",
        followers: 21300,
        engagement: 5.2,
        status: 'pending',
        appliedDate: "2025-01-06",
        matchScore: 91
      },
      {
        id: 3,
        name: "高橋まい",
        username: "@mai_sweets_tokyo", 
        followers: 35200,
        engagement: 4.1,
        status: 'pending',
        appliedDate: "2025-01-04",
        matchScore: 89
      },
      {
        id: 4,
        name: "伊藤かな",
        username: "@kana_gourmet",
        followers: 19800,
        engagement: 6.1,
        status: 'pending',
        appliedDate: "2025-01-07",
        matchScore: 87
      },
      {
        id: 5,
        name: "鈴木健太",
        username: "@kenta_tokyo_eats",
        followers: 42600,
        engagement: 3.9,
        status: 'approved',
        appliedDate: "2025-01-03",
        matchScore: 95
      }
    ]);

    // グローバルチャットデータを読み込み
    const storedChats = JSON.parse(localStorage.getItem('globalChats') || '[]') as ChatPreview[];
    if (storedChats.length === 0) {
      // 初期データがない場合はモックデータを設定
      const initialChats: ChatPreview[] = [
        {
          id: 1,
          influencerName: "鈴木健太",
          influencerUsername: "@kenta_tokyo_eats",
          lastMessage: "パンケーキの撮影、明日の午後2時頃お伺いします！",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2時間前
          unreadCount: 2,
          projectTitle: "新商品パンケーキのPRキャンペーン"
        },
        {
          id: 2,
          influencerName: "高橋まい",
          influencerUsername: "@mai_sweets_tokyo",
          lastMessage: "スイーツの投稿、ストーリーズでもシェアしますね✨",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5時間前
          unreadCount: 0,
          projectTitle: "季節限定スイーツの投稿キャンペーン"
        },
        {
          id: 3,
          influencerName: "田中美咲",
          influencerUsername: "@misaki_foodie",
          lastMessage: "新店舗の内装、とても素敵ですね！早速投稿させていただきます。",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1日前
          unreadCount: 1,
          projectTitle: "カフェの新店舗オープン告知"
        }
      ];
      setChatPreviews(initialChats);
      localStorage.setItem('globalChats', JSON.stringify(initialChats));
    } else {
      setChatPreviews(storedChats);
    }
  }, []);

  const handleApproveReject = (applicantId: number, action: 'approve' | 'reject') => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return;

    if (action === 'approve') {
      // 承認時はチャット欄に追加
      const newChat: ChatPreview = {
        id: Date.now(),
        influencerName: applicant.name,
        influencerUsername: applicant.username,
        lastMessage: "いつもありがとうございます！よろしくお願いします。",
        timestamp: new Date().toISOString(),
        unreadCount: 1,
        projectTitle: selectedProject?.title
      };
      
      const newChatPreviews = [newChat, ...chatPreviews];
      setChatPreviews(newChatPreviews);
      
      // グローバルチャットにlocalStorageで同期
      localStorage.setItem('globalChats', JSON.stringify(newChatPreviews));
      
      // 応募者を削除（承認済みになったら応募一覧から消える）
      setApplicants(prev => prev.filter(a => a.id !== applicantId));
      
      // 応募者一覧を閉じて、チャット詳細へ遷移
      setShowApplicantsList(false);
      setShowAllApplicants(false); // リセット
      setSelectedChatId(newChat.id);
      setShowChatDetail(true);
      
    } else {
      // 見送り時は応募者リストから削除
      setApplicants(prev => prev.filter(a => a.id !== applicantId));
      alert('見送りしました。');
    }
  };

  return (
    <div>
      {/* ヘッダー */}
      <div className="bg-primary border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">案件管理</h1>
          
          {/* 下書きボタン */}
          <button
            onClick={() => setShowDraftModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition"
          >
            <FileText size={16} />
            下書き
          </button>
        </div>
        
        {/* タブ切り替え */}
        <div className="px-4 pb-3">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('public')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition ${
                activeTab === 'public'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              公募
            </button>
            <button
              onClick={() => setActiveTab('scout')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition ${
                activeTab === 'scout'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              スカウト
            </button>
          </div>
        </div>
      </div>

      {/* 案件リスト */}
      <div className="px-4 py-4 space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">案件がありません</div>
            <div className="text-sm text-gray-500">
              {activeTab === 'public' ? '公募案件を作成してください' : 'スカウト案件を作成してください'}
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setShowProjectDetail(true);
              }}
              className="card cursor-pointer hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-tertiary">{project.title}</h3>
                    {/* 通知バッジ */}
                    {activeTab === 'public' && project.applicationsCount! > 0 && (
                      <div className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                        <span className="font-semibold">{project.applicationsCount}</span>
                        <span className="text-[11px]">応募</span>
                      </div>
                    )}
                    {project.matchesCount! > 0 && (
                      <div className="bg-primary text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                        <span className="font-semibold">{project.matchesCount}</span>
                        <span className="text-[11px]">チャット</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{project.budget}</span>
                    <span>成果報酬 {project.rewardRate}</span>
                    <span>〜 {project.deadline}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(project.createdAt).toLocaleDateString('ja-JP')} 作成
                  </div>
                  
                  {/* 応募者一覧ボタン（公募のみ） */}
                  {activeTab === 'public' && project.applicationsCount! > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setShowApplicantsList(true);
                      }}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Users size={14} />
                      応募者一覧を見る
                    </button>
                  )}
                </div>
                
                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setShowProjectDetail(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Edit size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('この案件を削除しますか？')) {
                        setProjects(prev => prev.filter(p => p.id !== project.id));
                        // localStorageからも削除
                        const updatedProjects = projects.filter(p => p.id !== project.id);
                        localStorage.setItem('projects', JSON.stringify(updatedProjects));
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 size={16} className="text-gray-500" />
                  </button>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 案件詳細モーダル */}
      {showProjectDetail && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full h-[85vh] overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary">{selectedProject.title}</h2>
              <button
                onClick={() => setShowProjectDetail(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              {/* 基本情報 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">予算</span>
                  <span className="font-medium">{selectedProject.budget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">成果報酬</span>
                  <span className="font-medium">{selectedProject.rewardRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">期限</span>
                  <span className="font-medium">{selectedProject.deadline}</span>
                </div>
              </div>

              {/* 応募者一覧セクション（公募の場合） */}
              {selectedProject.distributionType === 'public' && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">応募者一覧 ({applicants.filter(a => a.status !== 'rejected').length}件)</h3>
                  <div className="space-y-2">
                    {applicants
                      .filter(a => a.status !== 'rejected')
                      .slice(0, showAllApplicants ? undefined : 3)
                      .map((applicant) => (
                        <div key={applicant.id} className="border rounded-lg p-2.5 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-600">
                                  {applicant.name.charAt(0)}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-sm text-gray-900">{applicant.name}</div>
                                <div className="text-xs text-gray-500 truncate">{applicant.username}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {applicant.matchScore && (
                                <div className="text-xs font-semibold text-primary">
                                  {applicant.matchScore}%
                                </div>
                              )}
                              {applicant.status === 'pending' && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleApproveReject(applicant.id, 'approve')}
                                    className="px-2 py-1 bg-primary text-white rounded text-xs hover:bg-primary-dark transition-colors"
                                  >
                                    承認
                                  </button>
                                  <button
                                    onClick={() => handleApproveReject(applicant.id, 'reject')}
                                    className="px-2 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-100 transition-colors"
                                  >
                                    見送り
                                  </button>
                                </div>
                              )}
                              {applicant.status === 'approved' && (
                                <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                  承認済み
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {/* 「もっと見る」ボタン */}
                    {applicants.filter(a => a.status !== 'rejected').length > 3 && !showAllApplicants && (
                      <button
                        onClick={() => setShowAllApplicants(true)}
                        className="w-full py-2 text-sm text-primary hover:bg-gray-50 rounded-lg transition"
                      >
                        もっと見る ({applicants.filter(a => a.status !== 'rejected').length - 3}件)
                      </button>
                    )}
                    
                    {/* 「閉じる」ボタン */}
                    {showAllApplicants && (
                      <button
                        onClick={() => setShowAllApplicants(false)}
                        className="w-full py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition"
                      >
                        閉じる
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* スカウト一覧セクション（スカウトの場合） */}
              {selectedProject.distributionType === 'scout' && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">送付済み一覧 (4件)</h3>
                  <div className="space-y-2">
                    {[
                      { id: 1, name: "田中美咲", username: "@misaki_foodie", followers: 28500, engagement: 4.8 },
                      { id: 2, name: "佐藤ゆき", username: "@yukicafe_life", followers: 21300, engagement: 5.2 },
                      { id: 3, name: "高橋まい", username: "@mai_sweets_tokyo", followers: 35200, engagement: 4.1 },
                      { id: 4, name: "鈴木健太", username: "@kenta_tokyo_eats", followers: 42600, engagement: 3.9 }
                    ].map((influencer) => (
                      <div key={influencer.id} className="border rounded-lg p-2.5 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-600">
                                {influencer.name.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm text-gray-900">{influencer.name}</div>
                              <div className="text-xs text-gray-500 truncate">{influencer.username}</div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-600 text-right">
                            <div>{(influencer.followers / 1000).toFixed(1)}k</div>
                            <div>{influencer.engagement}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* チャット欄プレビュー */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">マッチ済みチャット ({chatPreviews.length}件)</h3>
                {chatPreviews.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center py-12">
                    <div className="text-center text-gray-400">
                      <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                      <div className="text-sm">チャットはまだありません</div>
                      <div className="text-xs mt-1">応募を承認するとチャットが開始されます</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pb-4">
                    {chatPreviews.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          setShowProjectDetail(false);
                          setShowChatDetail(true);
                        }}
                        className="p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {chat.influencerName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm text-gray-900">{chat.influencerName}</div>
                              <div className="text-xs text-gray-500">{chat.influencerUsername}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {chat.unreadCount > 0 && (
                              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                                {chat.unreadCount}
                              </div>
                            )}
                            <div className="text-xs text-gray-500">
                              {new Date(chat.timestamp).toLocaleTimeString('ja-JP', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-700 line-clamp-2">
                          {chat.lastMessage}
                        </div>
                        
                        {/* プロジェクト名表示 */}
                        {chat.projectTitle && (
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <span>案件:</span>
                            <span>{chat.projectTitle}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 応募者一覧モーダル */}
      {showApplicantsList && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary">
                {selectedProject.distributionType === 'public' ? '応募一覧' : '送付済み一覧'}
              </h2>
              <button
                onClick={() => setShowApplicantsList(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
              {selectedProject.distributionType === 'scout' ? (
                // スカウト：シンプルなプロフィール一覧
                [
                  { id: 1, name: "田中美咲", username: "@misaki_foodie", followers: 28500, engagement: 4.8 },
                  { id: 2, name: "佐藤ゆき", username: "@yukicafe_life", followers: 21300, engagement: 5.2 },
                  { id: 3, name: "高橋まい", username: "@mai_sweets_tokyo", followers: 35200, engagement: 4.1 },
                  { id: 4, name: "鈴木健太", username: "@kenta_tokyo_eats", followers: 42600, engagement: 3.9 }
                ].map((influencer) => (
                  <div key={influencer.id} className="border rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {influencer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{influencer.name}</div>
                        <div className="text-xs text-gray-500">{influencer.username}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{influencer.followers.toLocaleString()}フォロワー</span>
                      <span>エンゲージメント{influencer.engagement}%</span>
                    </div>
                  </div>
                ))
              ) : (
                // 公募：応募者一覧（承認・見送り機能付き）
                applicants.map((applicant) => (
                  <div key={applicant.id} className="border rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {applicant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{applicant.name}</div>
                          <div className="text-xs text-gray-500">{applicant.username}</div>
                        </div>
                      </div>
                      
                      {applicant.matchScore && (
                        <div className="text-sm font-semibold text-primary">
                          {applicant.matchScore}%
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                      <span>{applicant.followers.toLocaleString()}フォロワー</span>
                      <span>エンゲージメント{applicant.engagement}%</span>
                    </div>
                    
                    {applicant.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveReject(applicant.id, 'approve')}
                          className="flex-1 py-2 bg-primary text-white rounded-lg text-sm flex items-center justify-center gap-1"
                        >
                          <UserCheck size={16} />
                          承認
                        </button>
                        <button
                          onClick={() => handleApproveReject(applicant.id, 'reject')}
                          className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm flex items-center justify-center gap-1"
                        >
                          <UserX size={16} />
                          見送り
                        </button>
                      </div>
                    )}
                    
                    {applicant.status === 'approved' && (
                      <div className="text-center py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                        承認済み
                      </div>
                    )}
                    
                    {applicant.status === 'rejected' && (
                      <div className="text-center py-2 bg-gray-50 text-gray-500 rounded-lg text-sm">
                        見送り済み
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* チャット詳細モーダル */}
      {showChatDetail && selectedChatId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full h-[600px] flex flex-col overflow-hidden">
            {(() => {
              const currentChat = chatPreviews.find(chat => chat.id === selectedChatId);
              return (
                <>
                  {/* チャットヘッダー */}
                  <div className="bg-white border-b p-4 flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => setShowChatDetail(false)}
                      className="text-primary font-medium"
                    >
                      ← 戻る
                    </button>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        {currentChat?.influencerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-tertiary text-sm">{currentChat?.influencerName}</div>
                      <div className="text-xs text-gray-500">{currentChat?.influencerUsername}</div>
                      {currentChat?.projectTitle && (
                        <div className="text-xs text-gray-400">{currentChat.projectTitle}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* メッセージ一覧 */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="max-w-[70%] px-3 py-2 rounded-2xl bg-gray-100 text-tertiary">
                        <p className="text-sm">いつもありがとうございます！よろしくお願いします。</p>
                        <p className="text-xs text-gray-500 mt-1">14:30</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="max-w-[70%] px-3 py-2 rounded-2xl bg-primary text-white">
                        <p className="text-sm">こちらこそ、よろしくお願いいたします！</p>
                        <p className="text-xs text-primary-light mt-1">14:35</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="max-w-[70%] px-3 py-2 rounded-2xl bg-gray-100 text-tertiary">
                        <p className="text-sm">{currentChat?.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'})}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* メッセージ入力 */}
                  <div className="bg-white border-t p-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="メッセージを入力..."
                        className="flex-1 p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <button className="p-2.5 bg-primary text-white rounded-xl">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 下書きモーダル */}
      {showDraftModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[60vh] overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary">下書き一覧</h2>
              <button
                onClick={() => setShowDraftModal(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="text-center py-8 text-gray-500">
                <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                下書きはありません
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}