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
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              pathname === item.href
                ? 'text-salmon-coral bg-light-greige'
                : 'text-smoky-navy hover:text-salmon-coral'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 