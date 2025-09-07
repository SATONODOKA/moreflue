'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

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
          const isActive = normalizedPathname === normalizedHref;
          
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