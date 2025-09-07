'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/', label: 'ホーム', icon: '🏠' },
    { href: '/projects', label: '案件管理', icon: '📋' },
    { href: '/messages', label: 'チャット', icon: '💬' },
    { href: '/dashboard', label: 'ダッシュボード', icon: '📊' },
    { href: '/profile', label: 'プロフィール', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // 末尾スラッシュの有無を考慮してマッチング
          const normalizedPathname = pathname.replace(/\/$/, '') || '/';
          const normalizedHref = item.href.replace(/\/$/, '') || '/';
          
          // 大分類でのマッチングを行う（サブページでも親タブをアクティブに）
          let isActive = false;
          if (!isClient) {
            // サーバーサイドでは基本的なマッチングのみ
            isActive = normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref);
          } else {
            if (normalizedHref === '/') {
              // ホーム: / またはホームからの案件詳細でアクティブ
              if (normalizedPathname === '/') {
                isActive = true;
              } else if (normalizedPathname.startsWith('/project')) {
                // URLパラメータからsourceを確認（ホームからの遷移のみアクティブ）
                const source = searchParams.get('source');
                const tab = searchParams.get('tab');
                isActive = source === 'home' || (!source && !tab);
              }
            } else if (normalizedHref === '/projects') {
              // 案件管理: /projects でアクティブ
              // /project/[id] の場合はURLパラメータでソースを判定
              if (normalizedPathname === '/projects') {
                isActive = true;
              } else if (normalizedPathname.startsWith('/project')) {
                // URLパラメータからsourceを確認（案件管理からの遷移のみアクティブ）
                const source = searchParams.get('source');
                const tab = searchParams.get('tab');
                isActive = source === 'scout' || tab === 'scout' || tab === 'inProgress';
              }
            } else if (normalizedHref === '/messages') {
              // チャット: /messages, /messages/[id] の両方でアクティブ
              isActive = normalizedPathname === '/messages' || normalizedPathname.startsWith('/messages/');
            } else {
              // その他のタブは前方一致で判定
              isActive = normalizedPathname.startsWith(normalizedHref) || normalizedPathname === normalizedHref;
            }
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors relative ${
                isActive
                  ? 'text-salmon-coral bg-salmon-coral bg-opacity-10 font-bold'
                  : 'text-smoky-navy hover:text-salmon-coral'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-salmon-coral rounded-b-full"></div>
              )}
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation; 