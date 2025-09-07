'use client';

import { useState, useEffect } from 'react';
import { Settings, Edit, MapPin, Clock, Users, Star, ExternalLink, Camera, Instagram, Wifi, Coffee, Car } from 'lucide-react';

interface ShopInfo {
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  mainImage: string;
  amenities: string[];
  socialLinks: {
    instagram?: string;
    website?: string;
  };
}

export default function ProfileContent() {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "カフェ・ド・パリ",
    category: "カフェ",
    description: "創業30年の老舗カフェです。毎朝手作りのパンと、こだわりの自家焙煎コーヒーで、お客様に温かいひとときをご提供しています。Instagramで映える店内と美味しいコーヒーで、多くの方に愛されるお店を目指しています。",
    location: "渋谷駅から徒歩8分",
    hours: "8:00-20:00",
    mainImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format",
    amenities: ["WiFi", "コンセント", "駐車場"],
    socialLinks: {
      instagram: "https://instagram.com/cafedeparis_shibuya",
      website: "https://cafedeparis.com"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 編集用の一時データ
  const [tempShopInfo, setTempShopInfo] = useState(shopInfo);

  // 編集保存
  const handleSave = () => {
    setShopInfo(tempShopInfo);
    setIsEditing(false);
  };

  // 編集キャンセル
  const handleCancel = () => {
    setTempShopInfo(shopInfo);
    setIsEditing(false);
  };

  // アメニティアイコンの取得
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi size={16} />;
      case 'コンセント': return <Coffee size={16} />;
      case '駐車場': return <Car size={16} />;
      default: return <Star size={16} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <div className="relative">
        {/* 設定ボタン */}
        <button
          onClick={() => setShowSettings(true)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Settings size={20} className="text-gray-700" />
        </button>

        {/* メイン画像 */}
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img
            src={shopInfo.mainImage}
            alt={shopInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* 編集ボタン */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            >
              <Edit size={16} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* 店舗情報オーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{shopInfo.name}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  {shopInfo.category}
                </span>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{shopInfo.location}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* 店舗詳細 */}
      <div className="p-4 space-y-4">
        {/* 編集モード */}
        {isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-3">店舗情報を編集</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">店舗名</label>
                <input
                  type="text"
                  value={tempShopInfo.name}
                  onChange={(e) => setTempShopInfo({...tempShopInfo, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
                <input
                  type="text"
                  value={tempShopInfo.category}
                  onChange={(e) => setTempShopInfo({...tempShopInfo, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">店舗説明</label>
                <textarea
                  value={tempShopInfo.description}
                  onChange={(e) => setTempShopInfo({...tempShopInfo, description: e.target.value})}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">アクセス</label>
                  <input
                    type="text"
                    value={tempShopInfo.location}
                    onChange={(e) => setTempShopInfo({...tempShopInfo, location: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">営業時間</label>
                  <input
                    type="text"
                    value={tempShopInfo.hours}
                    onChange={(e) => setTempShopInfo({...tempShopInfo, hours: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                保存
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* 店舗ストーリー */}
        <section className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-3">店舗ストーリー</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{shopInfo.description}</p>
        </section>

        {/* 詳細情報 */}
        <section className="card">
          <h2 className="text-lg font-semibold text-tertiary mb-3">詳細情報</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">アクセス: {shopInfo.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-700">営業時間: {shopInfo.hours}</span>
            </div>
            
            {/* アメニティ */}
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Users size={16} className="text-gray-500" />
                <span className="text-gray-700">設備・サービス</span>
              </div>
              <div className="flex gap-2 ml-6">
                {shopInfo.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            {/* SNSリンク */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex gap-3">
                {shopInfo.socialLinks.instagram && (
                  <button
                    onClick={() => window.open(shopInfo.socialLinks.instagram, '_blank')}
                    className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <Instagram size={16} />
                    <span className="text-sm">Instagram</span>
                    <ExternalLink size={12} />
                  </button>
                )}
                
                {shopInfo.socialLinks.website && (
                  <button
                    onClick={() => window.open(shopInfo.socialLinks.website, '_blank')}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">ウェブサイト</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 設定モーダル */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary">設定</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-sm">アカウント設定</div>
                  <div className="text-gray-500 text-xs">基本情報の変更</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-sm">通知設定</div>
                  <div className="text-gray-500 text-xs">プッシュ通知の管理</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-sm">プラン・請求</div>
                  <div className="text-gray-500 text-xs">サブスクリプションの管理</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-sm">ヘルプ・サポート</div>
                  <div className="text-gray-500 text-xs">よくある質問・お問い合わせ</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                  <div className="font-medium text-sm">ログアウト</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 