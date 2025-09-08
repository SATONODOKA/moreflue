'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/', 
      label: 'ホーム', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    { 
      href: '/projects', 
      label: '案件管理', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3zM3 9h18" />
        </svg>
      )
    },
    { 
      href: '/messages', 
      label: 'チャット', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    { 
      href: '/dashboard', 
      label: 'ダッシュボード', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    { 
      href: '/profile', 
      label: 'プロフィール', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // シンプルなアクティブ判定 - 現在のページのみハイライト
          let isActive = false;
          
          if (item.href === '/') {
            // ホームは完全一致のみ
            isActive = pathname === '/';
          } else if (item.href === '/projects') {
            // 案件管理は /projects のみ
            isActive = pathname === '/projects' || pathname === '/projects/';
          } else if (item.href === '/messages') {
            // チャットは /messages とその配下
            isActive = pathname === '/messages' || pathname === '/messages/' || pathname.startsWith('/messages/');
          } else if (item.href === '/dashboard') {
            // ダッシュボードは /dashboard のみ
            isActive = pathname === '/dashboard' || pathname === '/dashboard/';
          } else if (item.href === '/profile') {
            // プロフィールは /profile のみ
            isActive = pathname === '/profile' || pathname === '/profile/';
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
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation; 