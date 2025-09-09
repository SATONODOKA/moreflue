interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

const StatsCard = ({ title, value, change, icon, onClick, isClickable = false }: StatsCardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg p-3 shadow-sm border border-gray-100 ${
        isClickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex items-center gap-1">
          {icon && <span className="text-xl">{icon}</span>}
          {isClickable && (
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
            </svg>
          )}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold text-smoky-navy">{value}</p>
        {change && (
          <div className={`text-sm font-medium ${
            change.type === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard; 