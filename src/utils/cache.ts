// キャッシュ用のキー定数
export const CACHE_KEYS = {
  APPLIED_PROJECTS: 'moreflue_applied_projects',
  DECLINED_PROJECTS: 'moreflue_declined_projects',
  APPROVED_PROJECTS: 'moreflue_approved_projects',
  HOME_APPLIED_PROJECTS: 'moreflue_home_applied_projects',
  IN_PROGRESS_PROJECTS: 'moreflue_in_progress_projects',
  SESSION_FLAG: 'moreflue_session_flag', // セッション継続フラグ
} as const;

// ページリロード検出用のフラグをチェック・設定
const checkAndSetSessionFlag = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const sessionFlag = sessionStorage.getItem(CACHE_KEYS.SESSION_FLAG);
    const isReload = !sessionFlag;
    
    if (isReload) {
      // ページリロード時：セッションストレージをクリア
      sessionStorage.clear();
    }
    
    // セッション継続フラグを設定
    sessionStorage.setItem(CACHE_KEYS.SESSION_FLAG, 'active');
    return isReload;
  } catch (error) {
    console.warn('Failed to check session flag:', error);
    return false;
  }
};

// セッションストレージからデータを取得（ページ再読み込み時にリセット）
export const getCachedData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  // 初回アクセス時にページリロードをチェック
  checkAndSetSessionFlag();
  
  try {
    const cached = sessionStorage.getItem(key);
    return cached ? JSON.parse(cached) : defaultValue;
  } catch (error) {
    console.warn(`Failed to get cached data for key: ${key}`, error);
    return defaultValue;
  }
};

// セッションストレージにデータを保存
export const setCachedData = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to cache data for key: ${key}`, error);
  }
};

// セッションストレージからデータを削除
export const clearCachedData = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to clear cached data for key: ${key}`, error);
  }
};

// すべてのセッションキャッシュをクリア
export const clearAllCache = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // セッションストレージをクリア
    sessionStorage.clear();
  } catch (error) {
    // フォールバック：個別にキーを削除
    Object.values(CACHE_KEYS).forEach(key => {
      clearCachedData(key);
    });
  }
};

// 重複データを削除する関数
export const deduplicateArray = <T>(array: T[], keyFn: (item: T) => string): T[] => {
  const seen = new Set<string>();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// 応募済み案件の重複を削除
export const cleanupAppliedProjects = (): void => {
  const appliedProjects = getCachedData<any[]>(CACHE_KEYS.APPLIED_PROJECTS, []);
  const homeAppliedProjects = getCachedData<string[]>(CACHE_KEYS.HOME_APPLIED_PROJECTS, []);
  const inProgressProjects = getCachedData<any[]>(CACHE_KEYS.IN_PROGRESS_PROJECTS, []);
  
  // 応募済み案件の重複削除
  const cleanedAppliedProjects = deduplicateArray(appliedProjects, (item) => item.id);
  
  // ホーム応募済みリストの重複削除
  const cleanedHomeAppliedProjects = [...new Set(homeAppliedProjects)];
  
  // 進行中案件の重複削除
  const cleanedInProgressProjects = deduplicateArray(inProgressProjects, (item) => item.id);
  
  // クリーンアップされたデータを保存
  setCachedData(CACHE_KEYS.APPLIED_PROJECTS, cleanedAppliedProjects);
  setCachedData(CACHE_KEYS.HOME_APPLIED_PROJECTS, cleanedHomeAppliedProjects);
  setCachedData(CACHE_KEYS.IN_PROGRESS_PROJECTS, cleanedInProgressProjects);
};
