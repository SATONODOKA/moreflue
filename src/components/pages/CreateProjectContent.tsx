'use client';

import { useState } from 'react';
import { Upload, Target, Calendar, Users, Mic, Play, Pause, TrendingUp, AlertCircle, CheckCircle, Sparkles, Search, Heart, Eye, UserCheck, Send, Save, X, ChevronLeft, ChevronRight, Instagram, Music2, Youtube, DollarSign, ImagePlus, Trash2 } from 'lucide-react';

interface ProjectFormData {
  // Step1: 詳細設定
  title: string;
  startDate: string;
  endDate: string;
  snsPlatforms: string[];
  hasReward: boolean;
  hasTransportation: boolean;
  confirmationFlow: 'pre-check' | 'no-check' | 'post-check';
  images: File[];
  
  // Step2: 報酬設定
  unitPrice: number;
  rewardRate: number;
  costPrice: number;
  paymentAmount: number;
  
  // Step3: ストーリー生成
  storyText: string;
  chatHistory: Array<{role: 'ai' | 'user', message: string}>;
}

interface InfluencerData {
  id: number;
  name: string;
  username: string;
  followers: number;
  engagement: number;
  category: string;
  avatar: string;
  matchScore: number;
  recentPosts: number;
  specialtyTags: string[];
  location: string;
}

export default function CreateProjectContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [imagePreviewIndex, setImagePreviewIndex] = useState(0);
  const [chatStep, setChatStep] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [tempStoryText, setTempStoryText] = useState('');
  const [showInfluencerModal, setShowInfluencerModal] = useState(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchByTag, setSearchByTag] = useState('');
  
  // モックインフルエンサーデータ
  const mockInfluencers: InfluencerData[] = [
    {
      id: 1,
      name: "田中美咲",
      username: "@misaki_tanaka",
      followers: 25000,
      engagement: 4.2,
      category: "フード・グルメ",
      avatar: "",
      matchScore: 92,
      recentPosts: 15,
      specialtyTags: ["カフェ", "スイーツ", "グルメ"],
      location: "東京"
    },
    {
      id: 2,
      name: "佐藤ゆき",
      username: "@yuki_lifestyle",
      followers: 18500,
      engagement: 5.1,
      category: "ライフスタイル",
      avatar: "",
      matchScore: 89,
      recentPosts: 22,
      specialtyTags: ["カフェ", "ライフスタイル", "おしゃれ"],
      location: "神奈川"
    },
    {
      id: 3,
      name: "山田花子",
      username: "@hanako_eats",
      followers: 32000,
      engagement: 3.8,
      category: "フード・グルメ",
      avatar: "",
      matchScore: 87,
      recentPosts: 18,
      specialtyTags: ["グルメ", "レストラン", "デザート"],
      location: "大阪"
    },
    {
      id: 4,
      name: "鈴木健太",
      username: "@kenta_foodie",
      followers: 41000,
      engagement: 4.5,
      category: "フード・グルメ",
      avatar: "",
      matchScore: 85,
      recentPosts: 12,
      specialtyTags: ["カフェ", "コーヒー", "グルメ"],
      location: "東京"
    },
    {
      id: 5,
      name: "高橋まい",
      username: "@mai_sweets",
      followers: 28000,
      engagement: 4.9,
      category: "スイーツ",
      avatar: "",
      matchScore: 90,
      recentPosts: 20,
      specialtyTags: ["スイーツ", "デザート", "カフェ"],
      location: "福岡"
    }
  ];
  
  const [formData, setFormData] = useState<ProjectFormData>({
    // Step1: 詳細設定
    title: '',
    startDate: '',
    endDate: '',
    snsPlatforms: [],
    hasReward: false,
    hasTransportation: false,
    confirmationFlow: 'pre-check',
    images: [],
    
    // Step2: 報酬設定
    unitPrice: 5000,
    rewardRate: 5,
    costPrice: 2000,
    paymentAmount: 10000,
    
    // Step3: ストーリー生成
    storyText: '',
    chatHistory: []
  });

  const steps = [
    { id: 1, title: '詳細設定' },
    { id: 2, title: '報酬設定' },
    { id: 3, title: 'ストーリー生成' },
    { id: 4, title: '確認・配信' }
  ];

  // 利益シミュレーション計算
  const calculateSimulation = () => {
    const expectedCustomers = 100; // モック値
    const revenue = formData.unitPrice * expectedCustomers;
    const rewardCost = revenue * formData.rewardRate / 100;
    const totalCost = formData.paymentAmount + rewardCost + (formData.costPrice * expectedCustomers);
    const netProfit = revenue - totalCost;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const breakEvenPoint = formData.paymentAmount / (formData.unitPrice - formData.costPrice - (formData.unitPrice * formData.rewardRate / 100));
    
    return {
      revenue,
      rewardCost,
      totalCost,
      netProfit,
      profitMargin,
      breakEvenPoint: Math.ceil(breakEvenPoint),
      isProfit: netProfit > 0
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - formData.images.length);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
    if (imagePreviewIndex >= formData.images.length - 1) {
      setImagePreviewIndex(Math.max(0, formData.images.length - 2));
    }
  };

  const toggleSNSPlatform = (platform: string) => {
    setFormData({
      ...formData,
      snsPlatforms: formData.snsPlatforms.includes(platform)
        ? formData.snsPlatforms.filter(p => p !== platform)
        : [...formData.snsPlatforms, platform]
    });
  };

  // 案件を保存して案件管理タブに遷移
  const saveProjectAndRedirect = (status: string) => {
    const distributionType = status === '公募中' ? 'public' : 'scout';
    
    const newProject = {
      id: Date.now(),
      title: formData.title,
      status: status,
      budget: `¥${formData.paymentAmount.toLocaleString()}`,
      rewardRate: `${formData.rewardRate}%`,
      deadline: formData.endDate,
      description: formData.storyText,
      distributionType: distributionType,
      selectedInfluencers: distributionType === 'scout' ? selectedInfluencers : undefined,
      reach: 0,
      engagement: 0,
      createdAt: new Date().toISOString(),
      applicationsCount: distributionType === 'public' ? 0 : undefined,
      matchesCount: 0
    };

    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    existingProjects.unshift(newProject);
    localStorage.setItem('projects', JSON.stringify(existingProjects));

    // 案件管理画面にデータ更新を通知
    window.dispatchEvent(new CustomEvent('projectCreated', { detail: newProject }));
    
    // 案件管理タブに移動
    window.dispatchEvent(new CustomEvent('switchToManageTab'));
  };

  // フィルタリングされたインフルエンサーリスト
  const filteredInfluencers = mockInfluencers.filter(influencer => {
    const matchesName = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       influencer.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = searchByTag === '' || 
                      influencer.specialtyTags.some(tag => tag.includes(searchByTag));
    return matchesName && matchesTag;
  });

  const toggleInfluencerSelection = (id: number) => {
    setSelectedInfluencers(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // Step1: 詳細設定
  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-semibold text-tertiary mb-4">
          案件の詳細設定
        </h2>
        
        <div className="space-y-4">
          {/* 案件タイトル */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              案件タイトル
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="例：新メニューのPRキャンペーン"
              className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 実施期間 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                開始日
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                終了日
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* SNS媒体選択 */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              配信媒体（複数選択可）
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => toggleSNSPlatform('instagram')}
                className={`p-3 rounded-xl border-2 transition ${
                  formData.snsPlatforms.includes('instagram')
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Instagram size={20} className="mx-auto mb-1" />
                <div className="text-xs">Instagram</div>
              </button>
              <button
                onClick={() => toggleSNSPlatform('tiktok')}
                className={`p-3 rounded-xl border-2 transition ${
                  formData.snsPlatforms.includes('tiktok')
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Music2 size={20} className="mx-auto mb-1" />
                <div className="text-xs">TikTok</div>
              </button>
              <button
                onClick={() => toggleSNSPlatform('youtube')}
                className={`p-3 rounded-xl border-2 transition ${
                  formData.snsPlatforms.includes('youtube')
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Youtube size={20} className="mx-auto mb-1" />
                <div className="text-xs">YouTube</div>
              </button>
            </div>
          </div>

          {/* オプション設定 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-tertiary mb-2">
              オプション設定
            </label>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm">成果報酬あり</span>
              <button
                onClick={() => setFormData({...formData, hasReward: !formData.hasReward})}
                className={`w-12 h-6 rounded-full transition ${
                  formData.hasReward ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  formData.hasReward ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm">交通費支給あり</span>
              <button
                onClick={() => setFormData({...formData, hasTransportation: !formData.hasTransportation})}
                className={`w-12 h-6 rounded-full transition ${
                  formData.hasTransportation ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  formData.hasTransportation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* 投稿確認フロー */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              投稿確認フロー
            </label>
            <select
              value={formData.confirmationFlow}
              onChange={(e) => setFormData({...formData, confirmationFlow: e.target.value as 'pre-check' | 'no-check' | 'post-check'})}
              className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="pre-check">事前確認あり</option>
              <option value="no-check">確認なし</option>
              <option value="post-check">納品後確認</option>
            </select>
          </div>

          {/* 画像アップロード */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              案件用画像（最大5枚）
            </label>
            
            {/* 画像プレビュー */}
            {formData.images.length > 0 && (
              <div className="mb-3">
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={URL.createObjectURL(formData.images[imagePreviewIndex])}
                    alt={`プレビュー ${imagePreviewIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(imagePreviewIndex)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  {/* 画像インジケーター */}
                  {formData.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {formData.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setImagePreviewIndex(index)}
                          className={`w-2 h-2 rounded-full transition ${
                            index === imagePreviewIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* 左右スワイプボタン */}
                  {formData.images.length > 1 && (
                    <>
                      {imagePreviewIndex > 0 && (
                        <button
                          onClick={() => setImagePreviewIndex(imagePreviewIndex - 1)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      )}
                      {imagePreviewIndex < formData.images.length - 1 && (
                        <button
                          onClick={() => setImagePreviewIndex(imagePreviewIndex + 1)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full"
                        >
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* アップロードボタン */}
            {formData.images.length < 5 && (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition">
                  <ImagePlus size={32} className="mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    画像を選択またはドラッグ&ドロップ
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    残り{5 - formData.images.length}枚アップロード可能
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setCurrentStep(2);
          window.scrollTo(0, 0);
        }}
        disabled={!formData.title || !formData.startDate || !formData.endDate || formData.snsPlatforms.length === 0}
        className="button-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        次へ
      </button>
    </div>
  );

  // Step2: 報酬設定
  const renderStep2 = () => {
    const simulation = calculateSimulation();
    
    return (
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-4 flex items-center">
            <DollarSign className="mr-2 text-primary" size={20} />
            報酬設定・利益シミュレーション
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                想定単価（1人あたり利用金額）
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm">¥</span>
                <input
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: parseInt(e.target.value) || 0})}
                  className="w-full pl-8 pr-3 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                成果報酬率: {formData.rewardRate}%
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.rewardRate}
                onChange={(e) => setFormData({...formData, rewardRate: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                原価（1人あたりコスト）
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm">¥</span>
                <input
                  type="number"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({...formData, costPrice: parseInt(e.target.value) || 0})}
                  className="w-full pl-8 pr-3 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">
                インフルエンサーへの支払額（1投稿あたり）
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm">¥</span>
                <input
                  type="number"
                  value={formData.paymentAmount}
                  onChange={(e) => setFormData({...formData, paymentAmount: parseInt(e.target.value) || 0})}
                  className="w-full pl-8 pr-3 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* シミュレーション結果 */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10">
          <h3 className="text-sm font-semibold text-tertiary mb-3">
            利益シミュレーション（100人来店想定）
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">売上</span>
              <span className="text-lg font-bold text-primary">
                ¥{simulation.revenue.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">支払額</span>
              <span className="text-sm font-medium">
                ¥{formData.paymentAmount.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">成果報酬</span>
              <span className="text-sm font-medium">
                ¥{simulation.rewardCost.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">原価合計</span>
              <span className="text-sm font-medium">
                ¥{(formData.costPrice * 100).toLocaleString()}
              </span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">純利益</span>
                <span className={`text-xl font-bold ${simulation.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  ¥{simulation.netProfit.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 p-2 bg-white/50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">損益分岐点</div>
                <div className="text-sm font-semibold">{simulation.breakEvenPoint}人</div>
              </div>
            </div>
            
            {/* 利益率ゲージ */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>利益率</span>
                <span>{simulation.profitMargin.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    simulation.profitMargin > 20 ? 'bg-green-500' :
                    simulation.profitMargin > 10 ? 'bg-yellow-500' :
                    simulation.profitMargin > 0 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(Math.max(simulation.profitMargin, 0), 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setCurrentStep(1);
              window.scrollTo(0, 0);
            }}
            className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700"
          >
            戻る
          </button>
          <button
            onClick={() => {
              setCurrentStep(3);
              window.scrollTo(0, 0);
            }}
            className="flex-1 button-primary py-3"
          >
            次へ
          </button>
        </div>
      </div>
    );
  };

  // Step3: ストーリー生成（モックAIチャット）
  const renderStep3 = () => {
    const chatQuestions = [
      "今回の案件のこだわりを教えてください",
      "その商品・サービスの背景を教えてください",
      "お客様にどんな価値を届けたいですか？"
    ];

    const handleChatResponse = (response: string) => {
      const newHistory = [...formData.chatHistory, 
        { role: 'ai' as const, message: chatQuestions[chatStep] },
        { role: 'user' as const, message: response }
      ];
      
      setFormData({
        ...formData,
        chatHistory: newHistory
      });
      
      // 自動スクロール
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
      
      if (chatStep < chatQuestions.length - 1) {
        setChatStep(chatStep + 1);
      } else {
        // 最後の質問の場合、ストーリーを生成（すべての回答を統合）
        const allResponses = newHistory.filter(h => h.role === 'user').map(h => h.message);
        const generatedStory = `【${formData.title}】\n\n${allResponses[0]}\n\n${allResponses[1]}\n\n${allResponses[2]}\n\n皆様のご来店を心よりお待ちしております。`;
        
        setFormData({
          ...formData,
          chatHistory: newHistory,
          storyText: generatedStory
        });
      }
    };

    return (
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-4 flex items-center">
            <Sparkles className="mr-2 text-primary" size={20} />
            ストーリー生成
          </h2>
          
          {/* チャット履歴 */}
          <div id="chat-container" className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {formData.chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  chat.role === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className="text-sm">{chat.message}</div>
                </div>
              </div>
            ))}
            
            {/* 現在の質問 */}
            {chatStep < chatQuestions.length && formData.storyText === '' && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-xl bg-gray-100 text-gray-700">
                  <div className="text-sm">{chatQuestions[chatStep]}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* 入力エリア */}
          {formData.storyText === '' && (
            <div className="space-y-3">
              <textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="回答を入力してください..."
                className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (!isRecording) {
                      // モック：3秒後に自動でテキストを入力
                      setTimeout(() => {
                        const mockResponses = [
                          "新鮮な季節の食材を使った特別メニューで、地元農家さんから直送の野菜を使用しています。",
                          "創業20年の伝統を守りながら、新しい挑戦を続けています。毎朝仕入れる新鮮な素材が自慢です。",
                          "お客様に「ほっと一息つける空間」と「特別な味わい」を提供し、日常に小さな幸せを届けたいです。"
                        ];
                        setCurrentInput(mockResponses[chatStep] || mockResponses[0]);
                        setIsRecording(false);
                      }, 3000);
                    }
                  }}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Mic size={20} />
                  {isRecording ? '録音中...' : '音声入力'}
                </button>
                
                <button
                  onClick={() => {
                    if (currentInput.trim()) {
                      handleChatResponse(currentInput);
                      setCurrentInput('');
                    }
                  }}
                  disabled={!currentInput.trim()}
                  className="flex-1 button-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  送信
                </button>
              </div>
            </div>
          )}
          
          {/* 生成されたストーリー */}
          {formData.storyText && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-tertiary mb-2">生成されたストーリー</h3>
              
              {isEditingStory ? (
                <div className="space-y-3">
                  <textarea
                    value={tempStoryText}
                    onChange={(e) => setTempStoryText(e.target.value)}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={6}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormData({...formData, storyText: tempStoryText});
                        setIsEditingStory(false);
                      }}
                      className="flex-1 button-primary py-2 text-sm"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setIsEditingStory(false)}
                      className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-700 text-sm"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap mb-3">{formData.storyText}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTempStoryText(formData.storyText);
                        setIsEditingStory(true);
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      編集する
                    </button>
                    <button
                      onClick={() => {
                        setFormData({...formData, storyText: '', chatHistory: []});
                        setChatStep(0);
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      もう一度生成する
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setCurrentStep(2);
              window.scrollTo(0, 0);
            }}
            className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700"
          >
            戻る
          </button>
          <button
            onClick={() => {
              setCurrentStep(4);
              window.scrollTo(0, 0);
            }}
            disabled={!formData.storyText}
            className="flex-1 button-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      </div>
    );
  };

  // Step4: 確認・配信
  const renderStep4 = () => {
    const simulation = calculateSimulation();
    
    return (
      <div className="space-y-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-4">
            案件内容の確認
          </h2>
          
          <div className="space-y-4">
            {/* 基本情報 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">基本情報</h3>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">タイトル</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">期間</span>
                  <span className="font-medium">{formData.startDate} 〜 {formData.endDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">配信媒体</span>
                  <span className="font-medium">{formData.snsPlatforms.join(', ')}</span>
                </div>
              </div>
            </div>
            
            {/* 報酬設定 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">報酬設定</h3>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">支払額</span>
                  <span className="font-medium">¥{formData.paymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">成果報酬率</span>
                  <span className="font-medium">{formData.rewardRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">予想純利益</span>
                  <span className={`font-bold ${simulation.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    ¥{simulation.netProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* ストーリー */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">ストーリー</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.storyText}</p>
              </div>
            </div>
            
            {/* オプション */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">オプション</h3>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">成果報酬</span>
                  <span className="font-medium">{formData.hasReward ? 'あり' : 'なし'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">交通費支給</span>
                  <span className="font-medium">{formData.hasTransportation ? 'あり' : 'なし'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">投稿確認</span>
                  <span className="font-medium">
                    {formData.confirmationFlow === 'pre-check' ? '事前確認あり' :
                     formData.confirmationFlow === 'no-check' ? '確認なし' : '納品後確認'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 配信ボタン */}
        <div className="space-y-3">
          <button
            onClick={() => {
              if (confirm('案件を公募として配信しますか？')) {
                saveProjectAndRedirect('公募中');
              }
            }}
            className="w-full button-primary py-3"
          >
            公募する
          </button>
          
          <button
            onClick={() => setShowInfluencerModal(true)}
            className="w-full py-3 border border-primary text-primary rounded-xl"
          >
            指定したインフルエンサーにスカウト送信
          </button>
          
          <button
            onClick={() => {
              setCurrentStep(3);
              window.scrollTo(0, 0);
            }}
            className="w-full py-3 text-gray-600 text-sm"
          >
            戻る
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* ヘッダー */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-tertiary text-center">新規案件作成</h1>
        </div>
        
        {/* ステップインジケーター */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step.id 
                      ? 'bg-primary text-white' 
                      : currentStep > step.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
                  </div>
                  <span className={`text-[10px] mt-1 whitespace-nowrap ${
                    currentStep === step.id ? 'text-primary font-semibold' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="px-4 py-4">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
      
      {/* インフルエンサー選択モーダル */}
      {showInfluencerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-tertiary">インフルエンサー選択</h2>
                <button
                  onClick={() => setShowInfluencerModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* 検索ボックス */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="名前、IDで検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="得意ハッシュタグで検索"
                    value={searchByTag}
                    onChange={(e) => setSearchByTag(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* インフルエンサーリスト */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredInfluencers.map((influencer) => (
                  <div
                    key={influencer.id}
                    className={`p-3 border rounded-xl cursor-pointer transition ${
                      selectedInfluencers.includes(influencer.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleInfluencerSelection(influencer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
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
                        
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                          <span>{influencer.followers.toLocaleString()}フォロワー</span>
                          <span>エンゲージメント{influencer.engagement}%</span>
                        </div>
                        
                        <div className="mt-1 flex flex-wrap gap-1">
                          {influencer.specialtyTags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-2 text-sm font-semibold text-primary">
                        {influencer.matchScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 送信ボタン */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowInfluencerModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    if (selectedInfluencers.length === 0) {
                      alert('インフルエンサーを選択してください');
                      return;
                    }
                    if (confirm(`${selectedInfluencers.length}人のインフルエンサーにスカウトを送信しますか？`)) {
                      setShowInfluencerModal(false);
                      saveProjectAndRedirect('進行中');
                    }
                  }}
                  className="flex-1 button-primary py-3"
                  disabled={selectedInfluencers.length === 0}
                >
                  {selectedInfluencers.length}人に送信
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}