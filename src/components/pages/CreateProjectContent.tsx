'use client';

import { useState } from 'react';
import { Upload, Target, Calendar, Users, Mic, Play, Pause, TrendingUp, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function CreateProjectContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: 'instagram-post', // 初期値を設定
    expectedRevenue: 100000, // 想定売上
    paymentAmount: 10000,    // 1投稿あたりの支払額
    rewardRate: 5,           // 成果報酬率
    duration: '1週間',
    targetAudience: '',
    storyText: '',
    confirmationFlow: 'pre-check'
  });

  // ROI計算を修正
  const calculateROI = () => {
    const totalCost = formData.paymentAmount + (formData.expectedRevenue * formData.rewardRate / 100);
    const netProfit = formData.expectedRevenue - totalCost;
    const profitMargin = (netProfit / formData.expectedRevenue) * 100;
    
    // 支払額と成果報酬率から応募の集まりやすさを判定
    const totalRewardRate = (formData.paymentAmount / formData.expectedRevenue * 100) + formData.rewardRate;
    
    return {
      expectedRevenue: formData.expectedRevenue,
      paymentAmount: formData.paymentAmount,
      rewardAmount: formData.expectedRevenue * formData.rewardRate / 100,
      totalCost,
      netProfit,
      profitMargin,
      applicationProbability: totalRewardRate >= 8 ? 'high' : totalRewardRate >= 5 ? 'medium' : 'low'
    };
  };

  const roi = calculateROI();

  const handleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setStoryGenerated(true);
        setFormData({
          ...formData,
          storyText: `当店は創業15年の老舗カフェです。毎朝5時から焙煎する自家製コーヒーと、地元の食材にこだわった手作りスイーツが自慢です。お客様に「ほっと一息つける場所」を提供したいという想いで、一杯一杯丁寧にお作りしています。特に当店の看板メニューである「季節のフルーツタルト」は、地元農家さんから直接仕入れた新鮮なフルーツを使用し、毎日限定10個しか作らない特別な一品です。`
        });
      }, 3000);
    }
  };

  const handleProjectPublish = () => {
    // 新しい案件を作成
    const newProject = {
      id: Date.now(),
      title: formData.title,
      description: formData.storyText,
      status: '募集中',
      budget: `¥${formData.paymentAmount.toLocaleString()}`,
      rewardRate: `${formData.rewardRate}%`,
      expectedRevenue: formData.expectedRevenue,
      reach: 0,
      engagement: 0,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1週間後
      confirmationFlow: formData.confirmationFlow,
      targetAudience: formData.targetAudience,
      duration: formData.duration
    };

    // localStorageに保存（実際の実装ではAPIに送信）
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    existingProjects.unshift(newProject);
    localStorage.setItem('projects', JSON.stringify(existingProjects));

    alert('案件を公開しました！案件管理タブで確認できます。');
  };

  const steps = [
    { id: 1, title: '数字シミュレーション' },
    { id: 2, title: 'ストーリー生成' },
    { id: 3, title: '詳細設定' },
    { id: 4, title: '確認・公開' }
  ];

  const renderStep1 = () => (
    <div className="space-y-2">
      <div className="card py-3">
        <h2 className="text-base font-semibold text-tertiary mb-2 flex items-center">
          <TrendingUp className="mr-2 text-primary" size={16} />
          利益シミュレーション
        </h2>
        
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-tertiary mb-1">想定売上金額</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">¥</span>
              <input
                type="number"
                className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="100000"
                value={formData.expectedRevenue}
                onChange={(e) => setFormData({...formData, expectedRevenue: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-tertiary mb-1">依頼内容</label>
            <select
              className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            >
              <option value="">選択してください</option>
              <option value="instagram-post">Instagram投稿</option>
              <option value="instagram-story">Instagramストーリー</option>
              <option value="tiktok-video">TikTok動画</option>
              <option value="youtube-short">YouTubeショート</option>
              <option value="blog-review">ブログレビュー</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-tertiary mb-1">1投稿あたりの支払額</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">¥</span>
              <input
                type="number"
                className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="10000"
                value={formData.paymentAmount}
                onChange={(e) => setFormData({...formData, paymentAmount: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-tertiary mb-1">成果報酬率: {formData.rewardRate}%</label>
            <input
              type="range"
              min="0"
              max="15"
              value={formData.rewardRate}
              onChange={(e) => setFormData({...formData, rewardRate: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-0.5">
              <span>0%</span>
              <span>15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROI結果表示 */}
      <div className="card bg-gradient-to-r from-primary/10 to-accent/10 py-2">
        <h3 className="text-sm font-semibold text-tertiary mb-2">利益シミュレーション結果</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-base font-bold text-primary">¥{roi.paymentAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">支払額</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-accent">¥{roi.rewardAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">成果報酬</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-base font-bold text-gray-600">¥{roi.totalCost.toLocaleString()}</div>
            <div className="text-xs text-gray-600">総コスト</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-tertiary">¥{roi.netProfit.toLocaleString()}</div>
            <div className="text-xs text-gray-600">残る利益</div>
          </div>
        </div>
        
        <div className={`flex items-center justify-center p-1.5 rounded-xl ${
          roi.applicationProbability === 'high' ? 'bg-green-100' :
          roi.applicationProbability === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
        }`}>
          {roi.applicationProbability === 'high' ? (
            <CheckCircle className="text-green-600 mr-1.5" size={14} />
          ) : (
            <AlertCircle className={`mr-1.5 ${roi.applicationProbability === 'medium' ? 'text-yellow-600' : 'text-red-600'}`} size={14} />
          )}
          <span className={`text-xs font-medium ${
            roi.applicationProbability === 'high' ? 'text-green-700' :
            roi.applicationProbability === 'medium' ? 'text-yellow-700' : 'text-red-700'
          }`}>
            {roi.applicationProbability === 'high' ? '応募が集まりやすい条件です' :
             roi.applicationProbability === 'medium' ? '応募は普通程度の条件です' : '応募が集まりにくい可能性があります'}
          </span>
        </div>
      </div>

      <button 
        onClick={() => {
          console.log('次へボタンクリック:', {
            expectedRevenue: formData.expectedRevenue,
            paymentAmount: formData.paymentAmount,
            description: formData.description,
            currentStep
          });
          setCurrentStep(2);
        }}
        className="button-primary w-full py-2.5"
        disabled={formData.expectedRevenue <= 0 || formData.paymentAmount <= 0 || !formData.description}
      >
        次へ
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold text-tertiary mb-4 flex items-center">
          <Sparkles className="mr-2 text-primary" size={20} />
          お店のこだわりストーリー
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            お店の魅力や想いを音声で教えてください。AIが魅力的な文章に変換します。
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Mic className={`mx-auto mb-4 ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} size={48} />
            
            {!isRecording && !storyGenerated && (
              <>
                <p className="text-gray-600 mb-4">音声録音でお店の魅力を伝えてください</p>
                <button 
                  onClick={handleVoiceRecording}
                  className="button-primary flex items-center mx-auto"
                >
                  <Play className="mr-2" size={16} />
                  録音開始
                </button>
              </>
            )}
            
            {isRecording && (
              <>
                <p className="text-red-600 mb-4">録音中... お店の魅力を語ってください</p>
                <button 
                  onClick={() => setIsRecording(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center mx-auto"
                >
                  <Pause className="mr-2" size={16} />
                  録音停止
                </button>
              </>
            )}
            
            {storyGenerated && (
              <div className="text-left">
                <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  AIがストーリーを生成しました！
                </div>
                <textarea
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.storyText}
                  onChange={(e) => setFormData({...formData, storyText: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-2">生成された文章は編集できます</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => setCurrentStep(1)}
          className="button-secondary flex-1"
        >
          戻る
        </button>
        <button 
          onClick={() => setCurrentStep(3)}
          className="button-primary flex-1"
          disabled={!storyGenerated}
        >
          次へ
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold text-tertiary mb-4">案件詳細情報</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">案件タイトル</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="例：新商品プロモーション"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">期間</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option value="1週間">1週間</option>
                  <option value="2週間">2週間</option>
                  <option value="1ヶ月">1ヶ月</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-tertiary mb-2">ターゲット層</label>
              <div className="relative">
                <Target className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="20-30代女性"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 投稿確認フロー選択 */}
      <div className="card">
        <h2 className="text-lg font-semibold text-tertiary mb-4">投稿確認フロー</h2>
        
        <div className="space-y-3">
          <label className="flex items-start space-x-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
            <input
              type="radio"
              name="confirmationFlow"
              value="pre-check"
              checked={formData.confirmationFlow === 'pre-check'}
              onChange={(e) => setFormData({...formData, confirmationFlow: e.target.value})}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-tertiary">事前に確認する</div>
              <div className="text-sm text-gray-600">投稿前に内容を確認してから公開</div>
            </div>
          </label>
          
          <label className="flex items-start space-x-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
            <input
              type="radio"
              name="confirmationFlow"
              value="post-check"
              checked={formData.confirmationFlow === 'post-check'}
              onChange={(e) => setFormData({...formData, confirmationFlow: e.target.value})}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-tertiary">確認せずに納品後チェック</div>
              <div className="text-sm text-gray-600">投稿後に成果を確認</div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => setCurrentStep(2)}
          className="button-secondary flex-1"
        >
          戻る
        </button>
        <button 
          onClick={() => setCurrentStep(4)}
          className="button-primary flex-1"
          disabled={!formData.title.trim()}
        >
          次へ
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold text-tertiary mb-4">案件プレビュー</h2>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-tertiary mb-2">{formData.title}</h3>
          <div className="text-sm text-gray-600 mb-3">{formData.storyText}</div>
          
          <div className="grid grid-cols-2 gap-4 text-xs mb-3">
            <div>
              <span className="text-gray-500">支払額:</span>
              <span className="font-medium text-primary ml-1">¥{formData.paymentAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500">成果報酬:</span>
              <span className="font-medium text-accent ml-1">{formData.rewardRate}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-tertiary">期間: {formData.duration}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              formData.confirmationFlow === 'pre-check' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {formData.confirmationFlow === 'pre-check' ? '事前確認あり' : 'スピード重視'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => setCurrentStep(3)}
          className="button-secondary flex-1"
        >
          戻って修正
        </button>
        <button 
          onClick={handleProjectPublish}
          className="button-primary flex-1"
        >
          案件を公開
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-3 space-y-2">
      {/* ヘッダー */}
      <header className="text-center py-2">
        <h1 className="text-xl font-bold text-tertiary mb-1">新規案件作成</h1>
        <p className="text-gray-600 text-xs">数字と想いで魅力的な案件を作成</p>
      </header>

      {/* ステップインジケーター - 2行に分けて表示 */}
      <div className="card py-2">
        <div className="grid grid-cols-2 gap-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-center p-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                step.id === currentStep 
                  ? 'bg-primary text-white' 
                  : step.id < currentStep 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.id < currentStep ? '✓' : step.id}
              </div>
              <div className="text-xs font-medium text-tertiary">
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ステップコンテンツ */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </div>
  );
} 