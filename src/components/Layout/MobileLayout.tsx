'use client';

import { useState, ReactNode, useEffect } from 'react';
import TabNavigation from './TabNavigation';
import HomeContent from '@/components/pages/HomeContent';
import CreateProjectContent from '@/components/pages/CreateProjectContent';
import ManageProjectContent from '@/components/pages/ManageProjectContent';
import ChatContent from '@/components/pages/ChatContent';
import ProfileContent from '@/components/pages/ProfileContent';

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // 案件管理タブへの切り替えイベントリスナー
    const handleSwitchToManageTab = () => {
      setActiveTab('manage');
    };

    window.addEventListener('switchToManageTab', handleSwitchToManageTab);

    return () => {
      window.removeEventListener('switchToManageTab', handleSwitchToManageTab);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'create':
        return <CreateProjectContent />;
      case 'manage':
        return <ManageProjectContent />;
      case 'chat':
        return <ChatContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* メインコンテンツエリア */}
      <main className="pb-20">
        {renderContent()}
      </main>
      
      {/* タブナビゲーション */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
} 