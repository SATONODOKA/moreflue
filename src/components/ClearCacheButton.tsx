'use client';

import { clearAllCache } from '@/utils/cache';

const ClearCacheButton = () => {
  const handleClearCache = () => {
    if (confirm('すべてのセッションキャッシュをクリアしますか？\n（応募済み案件、承認済み案件などがリセットされます）\n※ページ再読み込みでも同様にリセットされます')) {
      clearAllCache();
      window.location.reload();
    }
  };

  // 開発環境でのみ表示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      onClick={handleClearCache}
      className="fixed bottom-20 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-xs z-50 opacity-50 hover:opacity-100"
    >
      🗑️ キャッシュクリア
    </button>
  );
};

export default ClearCacheButton; 