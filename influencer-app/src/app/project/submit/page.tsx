'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectSubmitPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [postDate, setPostDate] = useState('');

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
          <h1 className="text-lg font-bold text-white">投稿納品</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* プロジェクト情報 */}
      <div className="bg-white p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" 
            alt="イタリアン・ベラヴィスタ"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-bold text-smoky-navy">イタリアン・ベラヴィスタ</h2>
            <p className="text-sm text-gray-600">納期: あと2日</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                納品待ち
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 投稿内容フォーム */}
      <div className="p-4 space-y-4">
        {/* 画像アップロード */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-smoky-navy mb-3">投稿画像</h3>
          {uploadedImage ? (
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="アップロード画像"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 bg-white text-gray-600 p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setUploadedImage('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop')}
              className="w-full h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-4xl mb-2">📸</span>
              <span className="text-gray-600 font-medium">画像を選択</span>
              <span className="text-xs text-gray-400 mt-1">タップしてアップロード</span>
            </button>
          )}
        </div>

        {/* キャプション入力 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-smoky-navy mb-3">投稿キャプション</h3>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="投稿する内容を入力してください..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-salmon-coral"
          />
          <p className="text-xs text-gray-500 mt-2">
            ハッシュタグ: #ベラヴィスタ #イタリアン #新宿グルメ
          </p>
        </div>

        {/* 投稿日時 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-smoky-navy mb-3">投稿予定日時</h3>
          <input
            type="datetime-local"
            value={postDate}
            onChange={(e) => setPostDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-salmon-coral"
          />
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">投稿前の確認事項</p>
              <ul className="space-y-1 text-xs">
                <li>• 料理写真を必ず含めてください</li>
                <li>• 指定のハッシュタグを使用してください</li>
                <li>• 投稿後はURLを共有してください</li>
              </ul>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => {
              alert('納品が完了しました！');
              router.push('/projects');
            }}
            className="w-full bg-salmon-coral text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            納品を完了する
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full bg-gray-200 text-smoky-navy py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            下書きとして保存
          </button>
        </div>
      </div>
    </div>
  );
}