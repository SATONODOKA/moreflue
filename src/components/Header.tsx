interface HeaderProps {
  title: string;
  showNotification?: boolean;
  notificationCount?: number;
}

const Header = ({ title, showNotification = false, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-smoky-navy">{title}</h1>
        {showNotification && (
          <div className="relative">
            <button className="p-2 text-smoky-navy hover:text-salmon-coral transition-colors">
              <span className="text-xl">🔔</span>
            </button>
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 