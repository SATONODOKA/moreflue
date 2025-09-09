interface ChatItemProps {
  id?: string;
  storeName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isUrgent?: boolean;
  deadline?: string;
}

const ChatItem = ({
  storeName,
  lastMessage,
  timestamp,
  unreadCount,
  isUrgent = false,
  deadline,
}: ChatItemProps) => {
  return (
    <div className="bg-white border-b border-gray-100 p-4 hover:bg-light-greige transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-smoky-navy">{storeName}</h3>
            {isUrgent && (
              <span className="bg-salmon-coral text-white text-xs px-2 py-1 rounded-full">
                急ぎ
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm truncate mb-1">{lastMessage}</p>
          {deadline && (
            <p className="text-sunset-yellow text-xs font-medium">
              期限: {deadline}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-gray-500">{timestamp}</span>
          {unreadCount > 0 && (
            <div className="bg-salmon-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem; 