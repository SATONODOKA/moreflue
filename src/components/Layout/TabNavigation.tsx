'use client';

import { useState } from 'react';
import { Home, PlusCircle, FolderOpen, MessageCircle, User } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'ホーム', icon: Home },
  { id: 'create', label: '案件作成', icon: PlusCircle },
  { id: 'manage', label: '案件管理', icon: FolderOpen },
  { id: 'chat', label: 'チャット', icon: MessageCircle },
  { id: 'profile', label: 'マイページ', icon: User },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 max-w-[430px] mx-auto">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-button ${isActive ? 'active' : 'inactive'}`}
            >
              <Icon size={20} className="mb-1" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 